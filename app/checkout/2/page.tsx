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
import DeliveryInfoForm from "@/components/forms/DeliveryInfoForm";
import PickCarrierForm from "@/components/forms/PickDeliveryTypeForm";
import { getCart } from "@/src/services/cartService";
import Link from "next/link";


export default async function Page() {

    var cart = await getCart();

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
                    <BreadcrumbLink href="1">
                        1
                    </BreadcrumbLink>
                    <BreadcrumbDivider></BreadcrumbDivider>
                    <BreadcrumbText>2</BreadcrumbText>
                </BreadcrumbContainer>
            </HeaderMenu>
            <div className="p-8 w-full">
                <div className="flex flex-col flex-grow space-y-2">
                    <div className="w-full md:w-1/2">
                        <Link href="checkout/1">
                            <h5 className="font-semibold text-lg border-b-slate-300 border-b-2 pb-2">
                                1. Corriere
                            </h5>
                        </Link>
                    </div>
                    <div className="w-full md:w-1/2">
                        <DeliveryInfoForm cart={cart} />
                    </div>
                    <div className="w-full md:w-1/2">
                        <h5 className="font-semibold text-lg border-b-slate-300 border-b-2 pb-2">
                            3. Riepilogo ordine
                        </h5>
                    </div>
                </div>
            </div>
        </main>
    </>
}
