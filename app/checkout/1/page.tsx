import AccountManage from "@/components/AccountManage";
import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import BreadcrumbDivider from "@/components/BreadcrumbDivider";
import BreadcrumbLink from "@/components/BreadcrumbLink";
import BreadcrumbText from "@/components/BreadcrumbText";
import CartButton from "@/components/CartButton";
import CategoryPills from "@/components/CategoryPills";
import Header from "@/components/Header";
import HeaderMenu from "@/components/HeaderMenu";
import HomeButton from "@/components/HomeButton";
import Topbar from "@/components/Topbar";
import TopbarLeft from "@/components/TopbarLeft";
import TopbarRight from "@/components/TopbarRight";
import PickCarrierForm from "@/components/forms/PickDeliveryTypeForm";
import { getAllCarriers } from "@/src/services/carrierService";
import { getCart } from "@/src/services/cartService";


export default async function Page() {

    var cart = await getCart();
    var carriersData = await getAllCarriers({
        ascending: true,
        deleted: false,
        orderBy: "id",
        page: 1,
        paginated: false,
        perPage: 100
    })

    return <>
        <main>
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
                    <BreadcrumbLink href="/carrello">
                        Carrello
                    </BreadcrumbLink>
                    <BreadcrumbDivider></BreadcrumbDivider>
                    <BreadcrumbText>1</BreadcrumbText>
                </BreadcrumbContainer>
            </HeaderMenu>
            <div className="p-8 w-full">
                <div className="flex flex-col flex-grow space-y-2">
                    <div className="w-full flex items-center">
                        <PickCarrierForm cart={cart} carriers={carriersData.items}></PickCarrierForm>
                    </div>
                    <div className="w-full flex items-center">
                        <h5 className="font-semibold h-10 w-full md:w-1/2 text-lg border-b-slate-300 border-b-2 flex items-center">
                            2. Dettagli consegna
                        </h5>
                    </div>
                    <div className="w-full flex items-center">
                        <h5 className="font-semibold h-10 w-full md:w-1/2 text-lg border-b-slate-300 border-b-2 flex items-center">
                            3. Riepilogo ordine
                        </h5>
                    </div>
                </div>
            </div>
        </main>
    </>
}
