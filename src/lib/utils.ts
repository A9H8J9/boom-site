export { cn } from "cn"

/** Human-readable Persian relative time for an ISO date string. */
export function timeAgo(iso: string): string {
  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (seconds < 60) return "همین حالا";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes.toLocaleString("fa-IR")} دقیقه پیش`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours.toLocaleString("fa-IR")} ساعت پیش`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days.toLocaleString("fa-IR")} روز پیش`;
  return faDate(iso);
}

/** Persian long date, e.g. «۱۸ آبان ۱۴۰۵». */
export function faDate(iso: string): string {
  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(iso));
}

/** First letters of the first two words, joined with a ZWNJ — e.g. «س‌م». */
export function initialsOf(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("‌");
}
