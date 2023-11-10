import { createUser } from "@/src/services/accountService";
import mailService from "@/src/services/mailService";
import { pushMessage } from "@/src/services/messageService";
import { MessageType } from "@/src/types";
import { signinValidator } from "@/src/validators";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.formData();

  var object: any = {};
  data.forEach((value, key) => object[key] = value);

  //Validate the body
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
      var activationUrl =
        `${process.env.SERVER_URL}account/verifica-account/token?token=${user.activationToken}`;
      await mailService.sendActivateAccountCode(user.email, activationUrl);

      pushMessage({
        text: "Account creato con successo verifica la tua casella di posta",
        type: MessageType.SUCCESS,
      });

      return NextResponse.redirect(`${process.env.SERVER_URL}/account/login`);
    }
  } else {
    pushMessage({
      text:
        "Si è verificato un errore durante la creazione dell'account, contatta l'amministratore",
      type: MessageType.ERROR,
    });

    return NextResponse.redirect(`${process.env.SERVER_URL}/account/login`);
  }
}
