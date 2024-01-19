
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
import { getAllCategories } from "@/src/services/categoryService";
import Link from "next/link";
import AdminOrderToggler from "@/components/admin/AdminOrderToggler";
import { CrudType } from "@/src/types";
import AdminPagination from "@/components/admin/AdminPagination";
import AdminPerPage from "@/components/admin/AdminPerPage";
import AdminSearchForm from "@/components/admin/AdminSearchForm";
import CategoryRow from "@/components/admin/CategoryRow";
import { Suspense } from "react";
import LoadingContent from "@/components/LoadingContent";

export async function generateMetadata({ params }: any) {
    return {
        title: "Categorie",
    }
}

export default async function Index({ searchParams }: {
    params: {}
    searchParams: { [key: string]: string | undefined }
}) {

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

    const data = await getAllCategories(params);

    const { items, count } = data;

    const content = () => {

        if (count == 0) {
            return <>
                <div className="w-full flex flex-col flex-grow">
                    <div className="p-4">
                        <p>Non ci sono categorie da mostrare</p>
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
                        <div className="w-8/12 text-left">
                            <AdminOrderToggler
                                className="flex w-full flex-row space-x-1 justify-start"
                                field="name"
                                label="Nome"
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
                                    <CategoryRow category={row} key={row.id} />
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
                    <BreadcrumbText>Catalogo</BreadcrumbText>
                    <BreadcrumbDivider></BreadcrumbDivider>
                    <BreadcrumbText>Categorie</BreadcrumbText>
                </BreadcrumbContainer>
            </HeaderMenu>

            <div className="flex flex-col px-8 py-4 flex-grow">
                <Messages></Messages>
                <div className="w-full pb-4">
                    <p className="text-2xl antialiased font-bold">Categorie</p>
                </div>
                <div className="flex w-full bg-gray-100 p-2">
                    <div className="w-1/2">
                        <div className="flex">
                            <Link href="categorie/crea" className="btn-primary">Crea</Link>
                        </div>
                    </div>
                    <div className="w-1/2 flex justify-end">
                        <AdminSearchForm params={params} placeholder="Cerca una categoria" />
                    </div>
                </div>
                {content()}

            </div>
        </main>
    );
}

