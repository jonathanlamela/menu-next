
import AccountManage from "@/components/AccountManage";
import CartButton from "@/components/CartButton";

import Header from "@/components/Header";
import HeaderMenu from "@/components/HeaderMenu";
import HomeButton from "@/components/HomeButton";
import Topbar from "@/components/Topbar";
import TopbarLeft from "@/components/TopbarLeft";
import TopbarRight from "@/components/TopbarRight";

import BreadcrumbLink from "@/components/BreadcrumbLink";
import Messages from "@/components/Messages";
import FormSignin from "@/components/forms/SigninForm";
import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import BreadcrumbDivider from "@/components/BreadcrumbDivider";
import BreadcrumbText from "@/components/BreadcrumbText";
import { signinValidator } from "@/src/validators";
import { createUser } from "@/src/services/accountService";
import mailService from "@/src/services/mailService";
import { pushMessage } from "@/src/services/messageService";
import { MessageType, SigninFields } from "@/src/types";
import { redirect } from "next/navigation";

export const revalidate = false



export async function generateMetadata({ params }: any) {
  return {
    title: "Signin",
  }
}


async function action(object: SigninFields) {
  'use server';

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



export default async function Signin({ searchParams }: any) {



  return (
    <main className="flex flex-col flex-grow">
      <Topbar>
        <TopbarLeft>
          <HomeButton></HomeButton>
        </TopbarLeft>
        <TopbarRight>
          <CartButton></CartButton>
          <AccountManage></AccountManage>
        </TopbarRight>
      </Topbar>

      <Header></Header>
      <HeaderMenu>
        <BreadcrumbContainer>
          <BreadcrumbLink href="/auth/login">
            Profilo
          </BreadcrumbLink>
          <BreadcrumbDivider></BreadcrumbDivider>
          <BreadcrumbText>Crea account</BreadcrumbText>
        </BreadcrumbContainer>
      </HeaderMenu>
      <div className="px-8 pt-8">
        <Messages></Messages>
      </div>
      <div className='flex flex-grow justify-center items-start md:items-center'>
        <FormSignin action={action}></FormSignin>
      </div>
    </main>
  );
}

