
import AccountManage from "@/components/AccountManage";
import CartButton from "@/components/CartButton";

import Header from "@/components/Header";
import HeaderMenu from "@/components/HeaderMenu";
import HomeButton from "@/components/HomeButton";
import Topbar from "@/components/Topbar";
import TopbarLeft from "@/components/TopbarLeft";
import TopbarRight from "@/components/TopbarRight";
import Link from "next/link";

import { LoginFields } from "@/src/types/globalTypes";
import BreadcrumbLink from "@/components/BreadcrumbLink";
import Messages from "@/components/Messages";
import LoginForm from "@/components/LoginForm";
import { login } from "@/src/services/accountService";
import { redirect } from "next/dist/server/api-utils";

export async function generateMetadata({ params }: any) {
  return {
    title: "Login",
  }
}

const onSubmit = async (data: FormData) => {
  'use server';
  await login({
    email: `${data.get('email')?.valueOf()}`,
    password: `${data.get('password')?.valueOf()}`,
    backUrl: `${data.get('backUrl')?.valueOf()}`,
  });
}

export default async function Login({ searchParams }: any) {
  const backUrl = searchParams.backUrl ?? null;

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
            <BreadcrumbLink href="/account/login">
              Profilo
            </BreadcrumbLink>
          </li>
          <li>::</li>
          <li>Accedi</li>
        </ol>
      </HeaderMenu>
      <div className="px-8 pt-8">
        <Messages></Messages>
      </div>
      <div className='flex flex-grow flex-col justify-center items-center'>
        <LoginForm backUrl={backUrl} formSubmit={onSubmit} ></LoginForm>
      </div>
    </main >
  );
}

