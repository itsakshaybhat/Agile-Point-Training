import { NextResponse } from "next/server";

export default function proxy(request) {
  console.log("Middleware executed");

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};