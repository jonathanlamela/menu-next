"use server";

import { createUser } from "@/src/services/accountService";
import mailService from "@/src/services/mailService";
import { pushMessage } from "@/src/services/messageService";
import { MessageType } from "@/src/types";
import { signinValidator } from "@/src/validators";
import { redirect } from "next/navigation";

export default async function submitSignin(formData: FormData) {
  console.log(formData);

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
      var activationUrl = `${process.env.SERVER_URL}account/verifica-account/token?token=${user.activationToken}`;
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

  redirect(`/account/login`);
}
