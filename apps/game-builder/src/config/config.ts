const API_URL = process.env.NEXT_PUBLIC_BACKEND_API as string;
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_API as string;
const AUTH_KEY = process.env.AUTH_KEY as string;
const AUTH_SECRET = process.env.AUTH_SECRET as string;

export { API_URL, SOCKET_URL, AUTH_KEY, AUTH_SECRET };
