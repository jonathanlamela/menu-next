"use server";

import { prisma } from "@/src/lib/prisma";
import { LoginFields } from "@/src/types";
import { Prisma } from "@prisma/client";
const bcrypt = require("bcrypt");
var generator = require("generate-password");

export async function login(data: LoginFields) {
}

export async function getUser() {
  return null;
}

export async function createUser(data: Prisma.userCreateInput) {
  data.passwordHash = bcrypt.hashSync(data.passwordHash, 10);
  data.activationToken = generator.generate({
    length: 20,
    numbers: true,
  });

  var user = await prisma.user.create({
    data: data,
  });

  if (user) {
    return user;
  } else {
    return false;
  }
}
