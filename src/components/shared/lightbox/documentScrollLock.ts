/**
 * Блокировка прокрутки документа без сдвига макета.
 * Счётчик ссылок — несколько монтированных AppLightbox на странице.
 */
let docScrollLockCount = 0;
let savedHtmlOverflow: string | undefined;

export function acquireDocumentScrollLock(): () => void {
  if (docScrollLockCount === 0) {
    const html = document.documentElement;
    savedHtmlOverflow = html.style.overflow;
    html.style.overflow = "hidden";
  }
  docScrollLockCount += 1;

  return () => {
    docScrollLockCount -= 1;
    if (docScrollLockCount > 0) return;

    docScrollLockCount = 0;
    const html = document.documentElement;
    if (savedHtmlOverflow !== undefined && savedHtmlOverflow !== "") {
      html.style.overflow = savedHtmlOverflow;
    } else {
      html.style.removeProperty("overflow");
    }
    savedHtmlOverflow = undefined;
  };
}
