export const WALINE_SERVER_URL =
  process.env.NEXT_PUBLIC_WALINE_SERVER_URL?.replace(/\/$/, "") ??
  "https://hamuhamu.vercel.app";
