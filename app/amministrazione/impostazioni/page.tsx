
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
import AdminSettingForm from "@/components/forms/admin/AdminSettingForm";
import { getSettings } from "@/src/services/settingService";
import { getAllOrderStates } from "@/src/services/orderStateService";

export async function generateMetadata({ params }: any) {
    return {
        title: "Impostazioni",
    }
}

export default async function Index({ searchParams }: any) {

    var setting = await getSettings();
    var orderStatesData = await getAllOrderStates({
        ascending: true,
        orderBy: "id",
        page: 1,
        perPage: 100,
        paginated: false,
        deleted: true
    })

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
                    <BreadcrumbText>Impostazioni negozio</BreadcrumbText>
                </BreadcrumbContainer>
            </HeaderMenu>
            <div className="px-8 pt-8">
                <Messages></Messages>
            </div>
            <div className="flex flex-col px-8 flex-grow">
                <div className="w-full">
                    <p className="text-2xl antialiased font-bold">Impostazioni</p>
                </div>
                <AdminSettingForm setting={setting!} orderStates={orderStatesData.items}></AdminSettingForm>
            </div>
        </main>
    );
}

