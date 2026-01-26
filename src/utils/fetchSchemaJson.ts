/**
 * Завантажує та парсить JSON файл з URL
 * @param url - URL JSON файлу
 * @returns Парсений JSON об'єкт або null якщо не вдалося завантажити
 */
export async function fetchSchemaJson(
  url: string | null | undefined
): Promise<Record<string, unknown> | Array<Record<string, unknown>> | null> {
  if (!url || typeof url !== "string") {
    return null;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return null;
    }

    // Перевіряємо Content-Type, щоб переконатися, що це JSON
    const contentType = response.headers.get("content-type");
    if (
      contentType &&
      !contentType.includes("application/json") &&
      !contentType.includes("text/json")
    ) {
      console.warn(
        `Expected JSON but got ${contentType} from ${url}. Skipping.`
      );
      return null;
    }

    // Спочатку отримуємо текст, щоб перевірити, чи це дійсно JSON
    const text = await response.text();
    
    // Перевіряємо, чи текст починається з '{' або '[' (валідний JSON)
    const trimmedText = text.trim();
    if (!trimmedText.startsWith("{") && !trimmedText.startsWith("[")) {
      console.warn(
        `Response from ${url} doesn't appear to be JSON. Skipping.`
      );
      return null;
    }

    // Парсимо JSON
    const json = JSON.parse(trimmedText);
    return json;
  } catch (error) {
    console.error("Failed to fetch schema JSON:", error);
    return null;
  }
}

