
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
import LoginForm from "@/components/forms/LoginForm";
import VerificaAccount from "@/components/forms/VerificaAccountForm";
import VerificaAccountForm from "@/components/forms/VerificaAccountForm";
import ResetPasswordRequireForm from "@/components/forms/ResetPasswordRequireForm";

export async function generateMetadata({ params }: any) {
  return {
    title: "Reset password",
  }
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
        <ResetPasswordRequireForm />
      </div>
    </main>
  );
}

