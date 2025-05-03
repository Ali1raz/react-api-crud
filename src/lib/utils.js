export function formatDate(isoDate) {
  const date = new Date(isoDate);
  const formatted = date.toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return formatted;
}
