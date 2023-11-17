"use server";

import { prisma } from "@/src/lib/prisma";
import { Prisma } from "@prisma/client";
const bcrypt = require("bcrypt");
var generator = require("generate-password");

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

export async function generateNewActivationToken(email: string) {
  var token = generator.generate({
    length: 20,
    numbers: true,
  });

  await prisma.user.update({
    data: {
      activationToken: token,
    },
    where: {
      email: email,
    },
  });

  return token;
}

export async function validateUserLogin(data: {
  email: string;
  password: string;
}) {
  var user = await prisma.user.findFirst({
    select: {
      passwordHash: true,
    },
    where: {
      email: data.email,
    },
  });

  return user != null && bcrypt.compare(data.password, user.passwordHash);
}

export async function getUserByEmail(email: string) {
  return await prisma.user.findFirst({
    where: {
      email: email,
    },
    select: {
      id: true,
      firstname: true,
      lastname: true,
      role: true,
      verified: true,
      email: true,
    },
  });
}

export async function activateAccount(email: string, token: string) {
  return await prisma.user.update({
    data: {
      activationToken: null,
      verified: true,
    },
    where: {
      email: email,
      activationToken: token,
    },
  });
}
