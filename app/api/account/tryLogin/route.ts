import { prisma } from "@/src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (!email) {
    return NextResponse.json(
      {
        result: false,
        errors: {
          email: "email is required",
        },
      },
      {
        status: 500,
      }
    );
  }

  if (!password) {
    return NextResponse.json(
      {
        result: false,
        errors: {
          password: "password is required",
        },
      },
      {
        status: 500,
      }
    );
  }

  var user = prisma.user.findFirst({
    where: {
      email: email,
    },
    select: {
      id: true,
    },
  });

  return NextResponse.json({ isValid: user != null });
}
