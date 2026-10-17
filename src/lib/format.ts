import { toLatinDigits } from "@/lib/phone";

const faDate = new Intl.DateTimeFormat("fa-IR", {
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "short",
});

const faTime = new Intl.DateTimeFormat("fa-IR", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

export function formatPersianDate(isoDate: string): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  if (!y || !m || !d) return isoDate;
  return faDate.format(new Date(y, m - 1, d));
}

export function formatPersianTime(time: string): string {
  const [h, min] = time.split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(min)) return time;
  const base = new Date(2000, 0, 1, h, min);
  return toLatinDigits(faTime.format(base)).replace(/\s/g, "");
}

export function toPersianDigits(value: string | number): string {
  return String(value).replace(/\d/g, (d) =>
    String.fromCharCode(d.charCodeAt(0) + 1728),
  );
}
