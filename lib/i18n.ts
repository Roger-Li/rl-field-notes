export const locales = ["en", "zh"] as const;

export type Locale = (typeof locales)[number];

const ZH_PREFIX = "/zh";

export function getLang(locale: Locale) {
  return locale === "zh" ? "zh-CN" : "en";
}

export function normalizePath(path: string) {
  if (!path || path === "/") {
    return "/";
  }

  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized !== "/" && normalized.endsWith("/")
    ? normalized.slice(0, -1)
    : normalized;
}

export function stripLocalePrefix(pathname: string) {
  const normalized = normalizePath(pathname);

  if (normalized === ZH_PREFIX) {
    return "/";
  }

  if (normalized.startsWith(`${ZH_PREFIX}/`)) {
    return normalized.slice(ZH_PREFIX.length);
  }

  return normalized;
}

export function withLocalePath(locale: Locale, pathname: string) {
  const normalized = stripLocalePrefix(pathname);

  if (locale === "en") {
    return normalized;
  }

  return normalized === "/" ? ZH_PREFIX : `${ZH_PREFIX}${normalized}`;
}

export function switchLocalePath(pathname: string, targetLocale: Locale) {
  return withLocalePath(targetLocale, pathname);
}

export function getGiscusLang(locale: Locale) {
  return locale === "zh" ? "zh-CN" : "en";
}
