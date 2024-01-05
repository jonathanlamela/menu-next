import { activateAccount } from "@/src/services/accountService";
import { pushMessage } from "@/src/services/messageService";
import { MessageType } from "@/src/types";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  if (searchParams.has("token") && searchParams.has("email")) {
    await activateAccount(
      searchParams.get("email")!,
      searchParams.get("token")!
    );

    pushMessage({
      text: "Il tuo account è attivo, ora puoi accedere con le tue credenziali",
      type: MessageType.SUCCESS,
    });
  } else {
    pushMessage({
      text: "Richiesta non valida",
      type: MessageType.ERROR,
    });
  }

  return redirect("/auth/login");
}
