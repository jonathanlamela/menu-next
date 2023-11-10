import { prisma } from "@/src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const email = searchParams.has("email") && searchParams.get("email") != ""
    ? searchParams.get("email")
    : null;

  if (!email) {
    return NextResponse.json({
      "result": false,
      "errors": {
        "email": "email is required",
      },
    }, {
      status: 500,
    });
  }

  return NextResponse.json({
    "result": await prisma.user.count({
      where: {
        email: email,
      },
    }) > 0,
  });
}
