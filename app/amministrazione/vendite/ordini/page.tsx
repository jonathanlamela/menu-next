
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
import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import BreadcrumbDivider from "@/components/BreadcrumbDivider";
import BreadcrumbText from "@/components/BreadcrumbText";
import { CrudType } from "@/src/types";
import { getAllOrders } from "@/src/services/orderService";
import Link from "next/link";
import AdminSearchForm from "@/components/admin/AdminSearchForm";
import AdminPagination from "@/components/admin/AdminPagination";
import AdminPerPage from "@/components/admin/AdminPerPage";
import AdminOrderToggler from "@/components/admin/AdminOrderToggler";
import OrderRow from "@/components/admin/OrderRow";

export async function generateMetadata({ params }: any) {
    return {
        title: "Ordini",
    }
}

export default async function Index({ searchParams }: any) {

    var ascend = (searchParams["ascending"] ?? "true") == 'true';
    var orderBy = searchParams["orderBy"] ?? "id";
    var page = parseInt(searchParams["page"] ?? "1");
    var perPage = parseInt(searchParams["perPage"] ?? "20");
    var search = searchParams["search"];

    var params: CrudType = {
        paginated: true,
        ascending: ascend,
        orderBy: orderBy,
        page: page,
        perPage: perPage,
        search: search,
        deleted: true
    };

    const data = await getAllOrders(params);

    const { items, count } = data;

    const content = () => {

        if (count == 0) {
            return <>
                <div className="w-full flex flex-col flex-grow">
                    <div className="p-4">
                        <p>Non ci sono stati ordine da mostrare</p>
                    </div>
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
                        <div className="w-5/12 text-left">
                            <AdminOrderToggler
                                className="flex w-full flex-row space-x-1 justify-start"
                                field="customer"
                                label="Cliente"
                                params={params} />
                        </div>
                        <div className="w-2/12 text-left">
                            <AdminOrderToggler
                                className="flex w-full flex-row space-x-1 justify-start"
                                field="orderState"
                                label="Stato ordine"
                                params={params} />
                        </div>
                        <div className="w-1/12 text-left">
                            <AdminOrderToggler
                                className="flex w-full flex-row space-x-1 justify-center"
                                field="total"
                                label="Totale"
                                params={params} />
                        </div>
                        <div className="w-3/12 text-center">Azioni</div>
                    </div>
                </div>
                <div className="w-full flex-col flex-grow">
                    {items.map(row => {
                        return <>
                            <div className="w-full odd:bg-gray-100">
                                <OrderRow order={row} key={row.id}></OrderRow>
                            </div>
                        </>
                    })}
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
                    <BreadcrumbText>Vendite</BreadcrumbText>
                    <BreadcrumbDivider></BreadcrumbDivider>
                    <BreadcrumbText>Ordini</BreadcrumbText>
                </BreadcrumbContainer>
            </HeaderMenu>

            <div className="flex flex-col px-8 py-4 flex-grow">
                <Messages></Messages>
                <div className="w-full pb-4">
                    <p className="text-2xl antialiased font-bold">Stati ordine</p>
                </div>
                <div className="flex w-full bg-gray-100 p-2">

                    <div className="w-full flex justify-end">
                        <AdminSearchForm params={params} placeholder="Cerca un ordine" />
                    </div>
                </div>
                {content()}

            </div>
        </main>
    );
}

