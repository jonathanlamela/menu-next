
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
import LoginForm from "@/components/LoginForm";

export async function generateMetadata({ params }: any) {
  return {
    title: "Login",
  }
}

import { getCsrfToken } from "next-auth/react"


export default async function Login({ searchParams }: any) {

  var csrfToken = await getCsrfToken();

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
        <LoginForm callbackUrl={searchParams.callbackUrl ?? "/account"} csrfToken={csrfToken} ></LoginForm>
      </div>
    </main >
  );
}

