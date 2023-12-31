import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const token: any = await getToken({ req: req });

    if (token) {
      if (req.nextUrl.pathname.startsWith("/amministrazione")) {
        if (token.role != "admin") {
          return NextResponse.redirect(new URL("/403", req.url));
        }
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
  }
);

export const config = {
  matcher: ["/account/:path*", "/amministrazione/:path*"],
};
