import dayjs from "dayjs";

export function formatDateString(date: string) {
  return dayjs(date).format("YYYY.MM.DD");
}
