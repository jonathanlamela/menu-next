
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
import { getAllCategories, getCategoryById } from "@/src/services/categoryService";
import { redirect } from "next/navigation";
import { getFoodById } from "@/src/services/foodService";
import AdminFoodForm from "@/components/forms/admin/AdminFoodForm";


export async function generateMetadata({ params }: any) {
    return {
        title: "Modifica cibo",
    }
}

export default async function Page({ searchParams, params }: {
    params: any
    searchParams: { [key: string]: string | undefined }
}) {

    const food = await getFoodById(parseInt(params["id"]));

    if (!food) {
        redirect(`/`);
    }

    var categoryData = await getAllCategories({
        ascending: true,
        orderBy: "id",
        paginated: false,
        page: 1,
        perPage: 100,
        deleted: false
    });

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
                    <BreadcrumbLink href="/amministrazione/catalogo/cibi">
                        Cibi
                    </BreadcrumbLink>
                    <BreadcrumbDivider></BreadcrumbDivider>
                    <BreadcrumbText>Modifica cibo</BreadcrumbText>
                </BreadcrumbContainer>
            </HeaderMenu>

            <div className="flex flex-col px-8 py-4 flex-grow">
                <Messages></Messages>
                <div className="w-full pb-4">
                    <p className="text-2xl antialiased font-bold">Modifica cibo</p>
                </div>
                <AdminFoodForm food={food} categories={categoryData.categories}></AdminFoodForm>

            </div>
        </main>
    );
}



