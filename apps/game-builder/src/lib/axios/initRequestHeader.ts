import { type AxiosHeaders } from "axios";
import { cookies } from "next/headers";

export default function initRequestHeader() {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  const connectSidCookie = cookies().get("connect.sid")?.value;
  connectSidCookie && headers.set("Cookie", `connect.sid=${connectSidCookie}`);

  return headers as unknown as AxiosHeaders;
}
