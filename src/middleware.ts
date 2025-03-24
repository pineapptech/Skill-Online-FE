import { NextResponse, type NextRequest } from "next/server";

const filesToView = ["/documents/etsap-onboarding-guide.pdf"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  if (filesToView.includes(pathname)) {
    response.headers.set(
      "Content-Disposition",
      `inline; filename="${pathname}"`
    );
  }

  return response;
}
