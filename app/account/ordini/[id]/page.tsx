
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
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import authOptions from "@/src/authOptions";
import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import BreadcrumbDivider from "@/components/BreadcrumbDivider";
import BreadcrumbText from "@/components/BreadcrumbText";
import DashboardAdmin from "@/components/account/DashboardAdmin";
import DashboardDefault from "@/components/account/DashboardDefault";
import mailService from "@/src/services/mailService";

export async function generateMetadata({ params }: any) {
    return {
        title: "Ordine",
    }
}


export default async function IlMioProfilo({ searchParams, params }: any) {

    const data = await getServerSession(authOptions);

    console.log(params);

    const { id } = params;



    await mailService.sendCustomerOrderCreatedEmail(parseInt(id));


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
            <div className="pl-8 pr-8 pt-8 flex flex-col space-y-4 pb-8">
                <Messages></Messages>

            </div>
        </main>
    );
}

