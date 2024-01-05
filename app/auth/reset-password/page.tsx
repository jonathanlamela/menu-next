
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
import ResetPasswordRequireForm from "@/components/forms/ResetPasswordRequireForm";
import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import BreadcrumbDivider from "@/components/BreadcrumbDivider";
import BreadcrumbText from "@/components/BreadcrumbText";
import { generateResetPasswordToken, getUserByEmail } from "@/src/services/accountService";
import mailService from "@/src/services/mailService";
import { pushMessage } from "@/src/services/messageService";
import { MessageType, ResetPasswordFields } from "@/src/types";
import { redirect } from "next/navigation";

export async function generateMetadata({ params }: any) {
  return {
    title: "Reset password",
  }
}

async function processForm(object: ResetPasswordFields) {
  'use server';

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



export default async function ResetPassword({ searchParams }: any) {


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
          <BreadcrumbText>Reset password</BreadcrumbText>
        </BreadcrumbContainer>
      </HeaderMenu>
      <div className="px-8 pt-8">
        <Messages></Messages>
      </div>
      <div className='flex flex-grow flex-col justify-center items-center'>
        <ResetPasswordRequireForm action={processForm} />
      </div>
    </main>
  );
}

