
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
import { getOrderById, payOrder } from "@/src/services/orderService";
import { redirect } from "next/navigation";
import { totalmem } from "os";

export async function generateMetadata({ params }: any) {
    return {
        title: "Ordine",
    }
}


export default async function IlMioProfilo(props: any) {

    const { params } = props;
    const data = await getServerSession(authOptions);

    const user = data?.user!;

    const { id } = params;

    var item = await getOrderById(parseInt(id));

    if (!item) {
        redirect("/")
    }

    var orderTotal =
        (parseFloat(`${item.carrier?.costs}`) || 0) + (parseFloat(`${item.total}`) || 0);

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
                    <BreadcrumbLink href="../">Ordini</BreadcrumbLink>
                    <BreadcrumbDivider></BreadcrumbDivider>
                    <BreadcrumbText>Ordine n. {item?.id}</BreadcrumbText>
                </BreadcrumbContainer>
            </HeaderMenu>
            <div className="pl-8 pr-8 pt-8 flex flex-col space-y-4 pb-8">
                <Messages></Messages>
                <div className="w-full">
                    <p className="text-2xl antialiased font-bold">Dettagli ordine</p>
                </div>

            </div>
        </main>
    );
}

