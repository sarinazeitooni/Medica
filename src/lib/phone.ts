/** Convert Persian/Arabic digits to Latin digits. */
export function toLatinDigits(value: string): string {
  return value
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 1776))
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 1632));
}

/**
 * Normalize Iranian mobile numbers to 09XXXXXXXXX.
 * Accepts 09…, +989…, 00989…, 989…, and Persian digits.
 */
export function normalizeIranianMobile(raw: string): string {
  let value = toLatinDigits(raw).trim().replace(/[\s\-()]/g, "");

  if (value.startsWith("+98")) {
    value = `0${value.slice(3)}`;
  } else if (value.startsWith("0098")) {
    value = `0${value.slice(4)}`;
  } else if (value.startsWith("98") && value.length === 12) {
    value = `0${value.slice(2)}`;
  }

  return value;
}

export function isValidIranianMobile(raw: string): boolean {
  return /^09\d{9}$/.test(normalizeIranianMobile(raw));
}

export function formatIranianMobileDisplay(raw: string): string {
  const normalized = normalizeIranianMobile(raw);
  if (!/^09\d{9}$/.test(normalized)) return raw;
  return `${normalized.slice(0, 4)} ${normalized.slice(4, 7)} ${normalized.slice(7)}`;
}
