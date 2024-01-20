
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
import { getServerSession } from "next-auth";
import authOptions from "@/src/authOptions";
import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import BreadcrumbDivider from "@/components/BreadcrumbDivider";
import BreadcrumbText from "@/components/BreadcrumbText";
import { CrudType } from "@/src/types";
import { getAllOrderByCustomerId } from "@/src/services/orderService";
import LoadingContent from "@/components/LoadingContent";
import AdminOrderToggler from "@/components/admin/AdminOrderToggler";
import AdminPagination from "@/components/admin/AdminPagination";
import AdminPerPage from "@/components/admin/AdminPerPage";
import { Suspense } from "react";
import Link from "next/link";
import { EyeIcon } from "@heroicons/react/24/outline";

export async function generateMetadata({ params }: any) {
    return {
        title: "I miei ordini",
    }
}


export default async function IlMioProfilo({ searchParams }: any) {

    const sessionData = await getServerSession(authOptions);

    const user = sessionData?.user!;

    var ascend = (searchParams["ascending"] ?? "true") == 'true';
    var orderBy = searchParams["orderBy"] ?? "id";
    var page = parseInt(searchParams["page"] ?? "1");
    var perPage = parseInt(searchParams["perPage"] ?? "20");

    var params: CrudType = {
        paginated: true,
        ascending: ascend,
        orderBy: orderBy,
        page: page,
        perPage: perPage,
        deleted: true
    };

    const data = await getAllOrderByCustomerId(user.id, params);

    const { items, count } = data;

    const content = () => {

        if (count == 0) {
            return <>
                <div className="w-full flex flex-col flex-grow">
                    <p>Non ci sono ordini da mostrare</p>
                </div>
            </>
        }

        return <>
            <div className="w-full flex flex-col flex-grow">
                <div className="hidden lg:flex w-full flex-row">
                    <div className="h-10 w-full flex flex-row items-center font-bold">
                        <div className="w-1/12 text-center">
                            <AdminOrderToggler
                                className="flex w-full flex-row space-x-1 justify-center"
                                field="id"
                                label="Id"
                                params={params} />
                        </div>
                        <div className="w-6/12 text-left">
                            <span>Stato ordine</span>
                        </div>
                        <div className="w-2/12 text-center">
                            <AdminOrderToggler
                                className="flex w-full flex-row space-x-1 justify-start"
                                field="total"
                                label="Totale"
                                params={params} />
                        </div>
                        <div className="w-3/12 text-center">Azioni</div>
                    </div>
                </div>
                <div className="w-full flex-col flex-grow">
                    <Suspense fallback={<LoadingContent></LoadingContent>}>
                        {items.map(row => {
                            return <>
                                <div className="w-full odd:bg-gray-100">
                                    <div className="hidden lg:flex w-full flex-row flex-grow">
                                        <div className="w-1/12 text-center flex items-center justify-center">
                                            {row.id}
                                        </div>
                                        <div className="w-6/12 text-left flex items-center">
                                            {row.orderState?.name}
                                        </div>
                                        <div className="w-2/12 text-left flex items-center">
                                            {row.total.toFixed(2)} €
                                        </div>
                                        <div className="w-3/12 text-center flex flex-row space-x-2 items-center content-center justify-center">
                                            <Link href={`ordini/${row.id}`} className="flex flex-row h-10 space-x-2 items-center justify-center p-2 hover:bg-green-700 hover:text-white"
                                            >
                                                <EyeIcon className="w-6 h-6"></EyeIcon>
                                                <span className="hidden md:block">Dettagli</span>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="flex lg:hidden w-full flex-col p-8 space-y-4">
                                        <div className="w-full flex flex-row space-x-4 items-center">
                                            <div className="w-1/4 font-bold text-end">Id</div>
                                            <div className="w-3/4">{row.id}</div>
                                        </div>
                                        <div className="w-full flex flex-row space-x-4 items-center">
                                            <div className="w-1/4 font-bold text-end">Stato ordine</div>
                                            <div className="w-3/4"></div>
                                        </div>
                                        <div className="w-full flex flex-row space-x-4 items-center">
                                            <div className="w-1/4 font-bold text-end">Azioni</div>
                                            <div className="w-3/4 flex flex-row">

                                            </div>
                                        </div>
                                    </div >
                                </div>
                            </>
                        })}
                    </Suspense>
                </div>
                <div className="w-full flex px-4 py-4">
                    <AdminPerPage params={params}></AdminPerPage>
                </div>
                <div className="w-full flex px-4 py-4 bg-gray-100">
                    <AdminPagination params={params} count={count} ></AdminPagination>
                </div>
            </div>
        </>
    }


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
                    <BreadcrumbLink href="/account">
                        Profilo
                    </BreadcrumbLink>
                    <BreadcrumbDivider></BreadcrumbDivider>
                    <BreadcrumbText>I miei ordini</BreadcrumbText>
                </BreadcrumbContainer>
            </HeaderMenu>
            <div className="pl-8 pr-8 pt-8 flex flex-col space-y-4 pb-8 flex-grow">
                <Messages></Messages>
                <div className="w-full pb-4">
                    <p className="text-2xl antialiased font-bold">I miei ordini</p>
                </div>
                {content()}



            </div>
        </main>
    );
}

