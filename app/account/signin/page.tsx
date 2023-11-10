
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
import FormSignin from "@/components/account/FormSignin";



export async function generateMetadata({ params }: any) {
  return {
    title: "Signin",
  }
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
        <ol className="flex flex-row space-x-2 items-center pl-8 text-white h-16">
          <li>
            <BreadcrumbLink href="/account/login">
              Profilo
            </BreadcrumbLink>
          </li>
          <li>::</li>
          <li>Crea account</li>
        </ol>
      </HeaderMenu>
      <div className="px-8 pt-8">
        <Messages></Messages>
      </div>
      <div className='flex flex-grow justify-center items-start md:items-center'>
        <FormSignin></FormSignin>
      </div>
    </main>
  );
}

/**
 *
 * <BaseLayout title='Crea account'>
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
                    <li>Crea account</li>
                </ol>
            </HeaderMenu>
            <div className="px-8 pt-8">
                <Messages></Messages>
            </div>
            <div className='flex flex-grow justify-center items-start md:items-center'>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full p-8 md:p-0 md:w-1/2 lg:w-1/3 flex flex-col space-y-2" method='post' action="/account/postSignin">
                    <div className="flex flex-col space-y-2">
                        <label className="form-label">Nome</label>
                        <input type="text"
                            {...register("firstname")}
                            className={errors.firstname ? "text-input-invalid" : "text-input"} />
                        <div className="invalid-feedback">
                            {errors.firstname?.message}
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label className="form-label">Cognome</label>
                        <input type="text"
                            {...register("lastname")}
                            className={errors.lastname ? "text-input-invalid" : "text-input"} />
                        <div className="invalid-feedback">
                            {errors.lastname?.message}
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label className="form-label">Email</label>
                        <input type="text"
                            {...register("email")}
                            className={errors.email ? "text-input-invalid" : "text-input"} />
                        <div className="invalid-feedback">
                            {errors.email?.message}
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label className="form-label">Password</label>
                        <input type="password"
                            {...register("password")}
                            className={errors.password ? "text-input-invalid" : "text-input"} />
                        <div className="invalid-feedback">
                            {errors.password?.message}
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label className="form-label">Conferma password</label>
                        <input type="password"
                            {...register("confirmPassword")}
                            className={errors.confirmPassword ? "text-input-invalid" : "text-input"} />
                        <div className="invalid-feedback">
                            {errors.confirmPassword?.message}
                        </div>
                    </div>
                    <div className="flex flex-row space-x-2">
                        <button type="submit" className="btn-primary space-x-2">
                            <ButtonCircularProgress isPending={isPending}></ButtonCircularProgress>
                            <span>Crea account</span>
                        </button>
                    </div>
                </form>
            </div>
        </BaseLayout>
 */
