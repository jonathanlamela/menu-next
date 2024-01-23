
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
import AdminUpdateDeliveryInfo from "@/components/admin/AdminUpdateDeliveryInfo";
import { getAllCarriers } from "@/src/services/carrierService";
import AdminUpdateDeliveryType from "@/components/admin/AdminUpdateDeliveryType";
import { getAllOrderStates } from "@/src/services/orderStateService";
import AdminUpdateOrderState from "@/components/admin/AdminUpdateOrderState";
import AdminUpdateOrderDetail from "@/components/admin/AdminUpdateOrderDetail";
import { getAllFoods } from "@/src/services/foodService";
import AdminUpdateOrderNote from "@/components/admin/AdminUpdaterOrderNote";
import AdminUpdateOrderSummary from "@/components/admin/AdminUpdateOrderSummary";

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

    var carriers = await getAllCarriers({
        ascending: true,
        orderBy: "id",
        paginated: false,
        deleted: true,
        page: 1,
        perPage: 100
    })

    var orderStatesData = await getAllOrderStates({
        ascending: true,
        orderBy: "id",
        paginated: false,
        deleted: true,
        page: 1,
        perPage: 100
    })

    var foodsData = await getAllFoods({
        ascending: true,
        orderBy: "id",
        paginated: false,
        deleted: true,
        page: 1,
        perPage: 100
    });

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
            <div className="flex flex-col px-8 py-8 flex-grow space-y-2">
                <Messages></Messages>
                <div className="w-full pb-4">
                    <p className="text-2xl antialiased font-bold">{`Ordine N. ${item.id}`}</p>
                </div>
                <div className="hidden flex-row lg:flex space-x-2">
                    <div className="w-1/2 flex flex-col space-y-2">
                        <div className="w-full border border-gray-200 p-2 flex flex-col space-y-2 items-center ">
                            <AdminUpdateOrderState order={item} orderStates={orderStatesData.items} />
                        </div>
                        <div className="w-full border border-gray-200 p-2 flex flex-col space-y-2 items-center ">
                            <AdminUpdateDeliveryType carriers={carriers.items} order={item} />
                        </div>
                    </div>
                    <div className="w-1/2">
                        <div className="w-full border border-gray-200 mb-2 p-2 flex flex-col items-center">
                            <AdminUpdateDeliveryInfo order={item} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col lg:hidden space-y-2">
                    <div className="w-full lg:w-1/2 border border-gray-200  p-2 flex flex-col space-y-2 items-center">
                        <AdminUpdateOrderState order={item} orderStates={orderStatesData.items} />
                    </div>
                    <div className="w-full lg:w-1/2 border border-gray-200  p-2 flex flex-col space-y-2 items-center ">
                        <AdminUpdateDeliveryType carriers={carriers.items} order={item} />
                    </div>
                    <div className="w-full lg:w-1/2 border border-gray-200  p-2 flex flex-col space-y-2 items-center">
                        <AdminUpdateDeliveryInfo order={item} />
                    </div>
                </div>
                <div className="w-full flex">
                    <div className="w-full border border-gray-200  p-2 flex flex-col space-y-2 items-center">
                        <AdminUpdateOrderDetail order={item} foods={foodsData.items} />
                    </div>
                </div>
                <div className="w-full flex">
                    <div className="w-full border border-gray-200  p-2 flex flex-col space-y-2 items-center">
                        <AdminUpdateOrderNote order={item} />
                    </div>
                </div>
                <div className="w-full flex">
                    <div className="w-full border border-gray-200  p-2 flex flex-col space-y-2 items-center">
                        <AdminUpdateOrderSummary order={item} />
                    </div>
                </div>

            </div >
        </main>
    );
}

