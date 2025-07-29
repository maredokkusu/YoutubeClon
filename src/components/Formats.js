import { ExpandIcon } from "lucide-react";

export function formatRelativeDate(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const secondsAgo = Math.floor((now - date) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  for (const interval of intervals) {
    const count = Math.floor(secondsAgo / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}
export function formatViews(views) {
  const num = Number(views);
  if (isNaN(num)) return "";

  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + " M";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + " K";
  return num.toString();
}
export function formatVideoDate(date){}