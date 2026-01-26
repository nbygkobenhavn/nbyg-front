import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    // Перевірка секретного ключа для безпеки
    const secret = req.nextUrl.searchParams.get("secret");
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json(
        { message: "Invalid secret" },
        { status: 401 }
      );
    }

    const body = await req.json();
    
    // Обробка даних від Sanity webhook (може бути в різних форматах)
    let type: string | undefined;
    let slug: string | undefined;

    // Формат від плагіна: { type: "blogPost", slug: "..." }
    if (body.type) {
      type = body.type;
      slug = body.slug;
    }
    // Формат від Sanity webhook: { type: "blogPost", slug: "..." } (те саме, але перевіряємо обидва)
    else if (body._type === "blogPost") {
      type = "blogPost";
      slug = body.slug;
    }

    // Якщо публікується стаття блогу
    if (type === "blogPost") {
      // Інвалідуємо головну сторінку блогу
      revalidatePath("/blog");
      
      // Якщо є slug, інвалідуємо також конкретну статтю
      if (slug) {
        revalidatePath(`/blog/${slug}`);
      }
      
      // Інвалідуємо sitemap
      revalidatePath("/sitemap.xml");
      
      return NextResponse.json({
        revalidated: true,
        paths: ["/blog", slug ? `/blog/${slug}` : null, "/sitemap.xml"].filter(Boolean),
        now: Date.now(),
      });
    }

    return NextResponse.json({
      revalidated: false,
      message: "Unknown type or missing data",
      received: body,
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Error revalidating", error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}
