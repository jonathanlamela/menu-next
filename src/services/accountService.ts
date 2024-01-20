"use server";

import { prisma } from "@/src/lib/prisma";
import { Prisma } from "@prisma/client";
const bcrypt = require("bcrypt");
var generator = require("generate-password");

import authOptions from "@/src/authOptions";
import { pushMessage } from "@/src/services/messageService";
import {
  ChangePasswordFields,
  MessageType,
  PersonalInfoFields,
  ResetPasswordFields,
  ResetPasswordTokenFields,
  SigninFields,
  VerifyAccountFields,
} from "@/src/types";
import {
  changePasswordValidator,
  personalInfoValidator,
  signinValidator,
} from "@/src/validators";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { sendActivateAccountCodeEmail } from "@/src/services/mailService";

export async function createUser(data: Prisma.UserCreateInput) {
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

export async function validateLogin(
  email: string,
  password: string
): Promise<boolean> {
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
}

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

export async function changePasswordAction(dataObj: ChangePasswordFields) {
  const data = await getServerSession(authOptions);

  var validationResult = await changePasswordValidator.isValid(dataObj);

  if (validationResult && data?.user) {
    var result = await updatePassword(
      dataObj.currentPassword,
      dataObj.password,
      data?.user?.email!
    );

    if (result) {
      pushMessage({
        text: "Password cambiata con successo",
        type: MessageType.SUCCESS,
      });

      return {
        result: "success",
      };
    } else {
      pushMessage({
        text:
          "Impossibile eseguire l'operazione, la password attuale potrebbe essere errata",
        type: MessageType.ERROR,
      });

      return {
        result: "failed",
      };
    }
  } else {
    return {
      result: "failed",
    };
  }
}

export async function personalInfoAction(object: PersonalInfoFields) {
  var validationResult = await personalInfoValidator.isValid(object);

  const data = await getServerSession(authOptions);

  if (validationResult) {
    await updatePersonalInfo(data?.user!.email!, {
      firstname: object.firstname,
      lastname: object.lastname,
    });

    pushMessage({
      text: "Informazioni aggiornate con successo",
      type: MessageType.SUCCESS,
    });
  } else {
    pushMessage({
      text:
        "Si è verificato un errore durante l'aggiornamento delle informazioni",
      type: MessageType.ERROR,
    });

    return {
      result: "error",
    };
  }

  redirect("/account/informazioni-personali");
}

export async function resetPasswordAction(object: ResetPasswordFields) {
  var { email } = object;

  if (email) {
    var user = await getUserByEmail(email);

    if (user) {
      var token = await generateResetPasswordToken(email);
      await sendResetPassword(
        user.email,
        `${process.env.SERVER_URL}/auth/reset-password/token?token=${token}`
      );
    }

    pushMessage({
      text: "Controlla la tua email per resettare la tua password",
      type: MessageType.SUCCESS,
    });
  } else {
    pushMessage({
      text: "Richiesta non valida",
      type: MessageType.ERROR,
    });
  }
  redirect(`/auth/login`);
}

export async function resetPasswordTokenAction(
  object: ResetPasswordTokenFields
) {
  var { password, token } = object;

  var result = await updatePasswordByToken(password, token);

  if (result) {
    pushMessage({
      text: "Password cambiata con successo",
      type: MessageType.SUCCESS,
    });
  } else {
    pushMessage({
      text: "Richiesta fallita",
      type: MessageType.ERROR,
    });
  }

  redirect(`/auth/login`);
}

export async function verifyAccountAction(object: VerifyAccountFields) {
  var { email } = object;

  if (email) {
    var user = await getUserByEmail(email);

    if (user) {
      var token = await generateNewActivationToken(email);
      var activationUrl = `${process.env.SERVER_URL}/auth/verifica-account/token?token=${token}&email=${email}`;
      await sendActivateAccountCodeEmail(user.email, activationUrl);
    }

    pushMessage({
      text: "Controlla la tua email per attivare il tuo account",
      type: MessageType.SUCCESS,
    });
  } else {
    pushMessage({
      text: "Richiesta non valida",
      type: MessageType.ERROR,
    });
  }
  redirect(`/auth/login`);
}

export async function signinAction(object: SigninFields) {
  var validationResult = await signinValidator.isValid(object);

  if (validationResult) {
    var { email, firstname, lastname, password } = object;
    var user = await createUser({
      email: email as string,
      firstname: firstname as string,
      lastname: lastname as string,
      passwordHash: password as string,
    });

    if (user) {
      var activationUrl = `${process.env.SERVER_URL}/auth/verifica-account/token?token=${user.activationToken}&email=${email}`;
      await sendActivateAccountCodeEmail(user.email, activationUrl);

      pushMessage({
        text: "Account creato con successo verifica la tua casella di posta",
        type: MessageType.SUCCESS,
      });
    }
  } else {
    pushMessage({
      text:
        "Si è verificato un errore durante la creazione dell'account, contatta l'amministratore",
      type: MessageType.ERROR,
    });
  }

  redirect(`/auth/login`);
}
function sendResetPassword(email: string, arg1: string) {
  throw new Error("Function not implemented.");
}
