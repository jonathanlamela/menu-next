
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
import AdminCategoryForm from "@/components/forms/admin/AdminCategoryForm";
import { CategoryFields } from "@/src/types";
import { createCategory } from "@/src/actions/category";


export async function generateMetadata({ params }: any) {
    return {
        title: "Crea categoria",
    }
}

export default async function Page({ searchParams }: {
    params: {}
    searchParams: { [key: string]: string | undefined }
}) {
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
                    <BreadcrumbLink href="/amministrazione/catalogo/categorie">
                        Categorie
                    </BreadcrumbLink>
                    <BreadcrumbDivider></BreadcrumbDivider>
                    <BreadcrumbText>Crea categoria</BreadcrumbText>
                </BreadcrumbContainer>
            </HeaderMenu>

            <div className="flex flex-col px-8 py-4 flex-grow">
                <Messages></Messages>
                <div className="w-full pb-4">
                    <p className="text-2xl antialiased font-bold">Crea categoria</p>
                </div>
                <AdminCategoryForm></AdminCategoryForm>

            </div>
        </main>
    );
}

