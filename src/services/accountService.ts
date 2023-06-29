"use server";
import { getProviders, signIn } from "next-auth/react";

import { LoginFields } from "@/src/types/globalTypes";

export async function login(data: LoginFields) {
  console.log(data);

  signIn("email", {
    email: data.email,
    password: data.password,
  });
}
