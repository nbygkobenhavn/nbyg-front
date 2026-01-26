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
    const trimmedText = text.trim();
    
    // Перевіряємо, чи JSON обгорнутий в HTML тег <script type="application/ld+json">
    let jsonText = trimmedText;
    
    // Якщо текст починається з <script, намагаємося витягти JSON з тегу
    if (trimmedText.startsWith("<script")) {
      // Шукаємо вміст між тегами <script>...</script>
      const scriptMatch = trimmedText.match(
        /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i
      );
      
      if (scriptMatch && scriptMatch[1]) {
        jsonText = scriptMatch[1].trim();
      } else {
        // Якщо не знайшли стандартний формат, намагаємося знайти будь-який JSON у тексті
        const jsonMatch = trimmedText.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
        if (jsonMatch && jsonMatch[1]) {
          jsonText = jsonMatch[1].trim();
        } else {
          console.warn(
            `Response from ${url} contains <script> tag but no valid JSON found. Skipping.`
          );
          return null;
        }
      }
    }
    
    // Перевіряємо, чи витягнутий текст починається з '{' або '[' (валідний JSON)
    if (!jsonText.startsWith("{") && !jsonText.startsWith("[")) {
      console.warn(
        `Response from ${url} doesn't appear to be JSON. Skipping.`
      );
      return null;
    }

    // Парсимо JSON
    const json = JSON.parse(jsonText);
    return json;
  } catch (error) {
    console.error("Failed to fetch schema JSON:", error);
    return null;
  }
}

