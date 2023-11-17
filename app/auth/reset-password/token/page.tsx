
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
import ResetPasswordUpdateForm from "@/components/forms/ResetPasswordUpdateForm";
import { redirect, useRouter } from "next/navigation";
import { pushMessage } from "@/src/services/messageService";
import { MessageType } from "@/src/types";

export async function generateMetadata({ params }: any) {
  return {
    title: "Reset password",
  }
}

async function validateRequest(searchParams: any) {
  if (!searchParams.token) {
    redirect("/auth/login");
  }
}

export default async function ResetPassword({ searchParams }: any) {

  await validateRequest(searchParams);

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
        <ol className="flex flex-row space-x-2 items-center pl-8 text-white h-16">
          <li>
            <BreadcrumbLink href="/auth/login">
              Profilo
            </BreadcrumbLink>
          </li>
          <li>::</li>
          <li>Reset password</li>
        </ol>
      </HeaderMenu>
      <div className="px-8 pt-8">
        <Messages></Messages>
      </div>
      <div className='flex flex-grow flex-col justify-center items-center'>
        <ResetPasswordUpdateForm />
      </div>
    </main>
  );
}

