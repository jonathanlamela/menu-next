"use server";

import { prisma } from "@/src/lib/prisma";
import { PersonalInfoFields } from "@/src/types";
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

export async function generateResetPasswordToken(email: string) {
  var token = generator.generate({
    length: 20,
    numbers: true,
  });

  await prisma.user.update({
    data: {
      resetToken: token,
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

export async function updatePasswordByToken(password: string, token: string) {
  var passwordHash = bcrypt.hashSync(password, 10);

  var user = await prisma.user.findFirst({
    where: {
      resetToken: token,
    },
  });

  if (user) {
    await prisma.user.update({
      data: {
        passwordHash: passwordHash,
        resetToken: null,
      },
      where: {
        id: user.id,
      },
    });
    return true;
  } else {
    return false;
  }
}

export async function updatePersonalInfo(
  email: string,
  data: PersonalInfoFields
) {
  return await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      firstname: data.firstname,
      lastname: data.lastname,
    },
  });
}

const validateLogin = async (
  email: string,
  password: string
): Promise<boolean> => {
  var user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (user) {
    return bcrypt.compareSync(password, user.passwordHash);
  } else {
    return false;
  }
};

export async function updatePassword(
  currentPassword: string,
  newPassword: string,
  userEmail: string
) {
  if (await validateLogin(userEmail, currentPassword)) {
    await prisma.user.update({
      data: {
        passwordHash: bcrypt.hashSync(newPassword, 10),
      },
      where: {
        email: userEmail,
      },
    });
    return true;
  } else {
    return false;
  }
}
