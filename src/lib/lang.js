/**
 * lang.js — tiny i18n helper.
 *
 * Content is authored as `{ en, zh }` pairs. The page sets
 * `document.documentElement.lang` and `<main data-lang>` based on the
 * current language. CSS hides the inactive language pair on mobile.
 *
 * Usage in JSX:
 *   <p>{langPair(thing)}</p>
 * where `thing` is either a string or a `{ en, zh }` object. It returns
 * the active-language string. It does NOT render both — both-pair
 * headings should be authored as two `<span data-lang-only="...">` nodes
 * by the caller (see ChapterHeader).
 */
export function langPair(value, currentLang) {
  if (value == null) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object" && ("en" in value || "zh" in value)) {
    const lang =
      currentLang ||
      (typeof document !== "undefined"
        ? document.documentElement.getAttribute("data-lang")
        : "en") ||
      "en";
    return value[lang] || value.en || value.zh || "";
  }
  return String(value);
}
