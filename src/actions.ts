"use server";

import {
  createUser,
  generateNewActivationToken,
  generateResetPasswordToken,
  getUserByEmail,
  updatePasswordByToken,
} from "@/src/services/accountService";
import mailService from "@/src/services/mailService";
import { pushMessage } from "@/src/services/messageService";
import { MessageType } from "@/src/types";
import { signinValidator } from "@/src/validators";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export async function submitSignin(formData: FormData) {
  var object: any = {};
  formData.forEach((value, key) => (object[key] = value));

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
      mailService.initService();
      await mailService.sendActivateAccountCode(user.email, activationUrl);

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

export async function submitVerificaAccount(formData: FormData) {
  var object: any = {};
  formData.forEach((value, key) => (object[key] = value));

  var { email } = object;

  if (email) {
    var user = await getUserByEmail(email);

    if (user) {
      var token = await generateNewActivationToken(email);
      var activationUrl = `${process.env.SERVER_URL}/auth/verifica-account/token?token=${token}&email=${email}`;
      mailService.initService();
      await mailService.sendActivateAccountCode(user.email, activationUrl);
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

export async function submitResetPasswordRequest(formData: FormData) {
  var object: any = {};
  formData.forEach((value, key) => (object[key] = value));

  var { email } = object;

  if (email) {
    var user = await getUserByEmail(email);

    if (user) {
      var token = await generateResetPasswordToken(email);
      mailService.initService();
      await mailService.sendResetPassword(
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

export async function submitResetPasswordByToken(formData: FormData) {
  var object: any = {};
  formData.forEach((value, key) => (object[key] = value));

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