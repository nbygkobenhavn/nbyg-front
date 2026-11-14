import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

// Мапінг типів документів на шляхи для ревалідації
const documentTypePaths: Record<string, string[]> = {
  homePage: ["/"],
  blogPage: ["/blog"],
  blogPost: ["/blog"],
  servicesPage: ["/byggeydelser"],
  aboutPage: ["/om-os"],
  contactsPage: ["/kontakt-os"],
  galleryPage: ["/galleri"],
  terraceCalculatorPage: ["/terrasseprisberegner"],
  roofCalculatorPage: ["/tagprisberegner"],
  cookiePolicyPage: ["/cookiepolitik"],
  page: ["/byggeydelser"],
};

// Типи документів, які мають динамічні шляхи на основі slug
const dynamicSlugTypes = ["blogPost", "page"];

export async function POST(req: NextRequest) {
  try {
    // Перевірка секретного ключа для безпеки
    const secret = req.nextUrl.searchParams.get("secret");
    if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json(
        { message: "Invalid secret" },
        { status: 401 }
      );
    }

    const body = await req.json();
    
    // Обробка даних від Sanity webhook
    let documentType: string | undefined;
    let slug: string | undefined;

    // Формат від Sanity webhook: { _type: "blogPost", slug: { current: "..." } }
    if (body._type) {
      documentType = body._type;
      // Sanity відправляє slug як об'єкт з полем current
      slug = typeof body.slug === "string" ? body.slug : body.slug?.current;
    }

    if (!documentType) {
      return NextResponse.json({
        revalidated: false,
        message: "Missing document type (_type)",
        received: body,
      });
    }

    const pathsToRevalidate: string[] = [];

    // Додаємо базові шляхи для типу документа
    if (documentTypePaths[documentType]) {
      pathsToRevalidate.push(...documentTypePaths[documentType]);
    }

    // Додаємо динамічні шляхи для документів зі slug
    if (dynamicSlugTypes.includes(documentType) && slug) {
      if (documentType === "blogPost") {
        pathsToRevalidate.push(`/blog/${slug}`);
      } else if (documentType === "page") {
        pathsToRevalidate.push(`/byggeydelser/${slug}`);
        // Якщо є дочірні сторінки, вони також можуть бути залежними
        // Але для простоти інвалідуємо всю секцію /byggeydelser
      }
    }

    // Завжди інвалідуємо sitemap при зміні будь-якого контенту
    pathsToRevalidate.push("/sitemap.xml");

    // Інвалідуємо головну сторінку, якщо змінюється контент, який може впливати на неї
    const homePageAffectingTypes = [
      "homePage",
      "servicesPage",
      "blogPage",
      "galleryPage",
    ];
    if (homePageAffectingTypes.includes(documentType)) {
      pathsToRevalidate.push("/");
    }

    // Чекаємо, поки Sanity API CDN віддасть опубліковану версію (useCdn: true),
    // інакше сторінка перегенерується зі старими даними і застрягне на добу.
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Виконуємо ревалідацію всіх шляхів
    pathsToRevalidate.forEach((path) => {
      revalidatePath(path);
    });

    // Сторінки тримають revalidate = 86400 лише як запасний варіант, тож будь-яка
    // публікація скидає весь сайт: спільні блоки (хедер, футер, налаштування)
    // і типи, яких немає в мапінгу вище, теж оновлюються одразу.
    revalidatePath("/", "layout");

    return NextResponse.json({
      revalidated: true,
      documentType,
      slug: slug || null,
      paths: pathsToRevalidate,
      now: Date.now(),
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Error revalidating", error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}
