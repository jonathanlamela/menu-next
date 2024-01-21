
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

    if (item && item.userId != user.id) {
        redirect("/403")
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
                    <BreadcrumbLink href="./">I miei ordini</BreadcrumbLink>
                    <BreadcrumbDivider></BreadcrumbDivider>
                    <BreadcrumbText>Ordine n. {item?.id}</BreadcrumbText>
                </BreadcrumbContainer>
            </HeaderMenu>
            <div className="pl-8 pr-8 pt-8 flex flex-col space-y-4 pb-8">
                <Messages></Messages>
                <div className="w-full">
                    <p className="text-2xl antialiased font-bold">Dettagli ordine</p>
                </div>
                <div className="w-full flex flex-col">
                    <b>Stato dell&apos;ordine</b>
                    <span>{item?.orderState?.name}</span>
                </div>
                <div className="w-full flex flex-col">
                    <b>Tipologia di consegna</b>
                    <span>{item?.carrier?.name}</span>
                </div>
                <div className="w-full flex flex-col">
                    <b>Costo consegna</b>
                    <span>{item?.carrier?.costs.toFixed(2)} €</span>
                </div>
                {item?.isPaid ? <></> : <>
                    <div className="w-full flex flex-col items-start">
                        <b>Azioni sull&apos;ordine</b>
                        <form action={payOrder}>
                            <input type="hidden" name="orderId" value={item?.id} />
                            <button type="submit" className="btn btn-sm btn-success">Paga ora</button>
                        </form>
                    </div>
                </>}
                <div className="w-full lg:w-1/3 flex flex-col">
                    <b>Cosa c&apos;è nel tuo ordine</b>
                    <div className="p-4 bg-slate-100">
                        <table className="p-4 w-full">
                            <thead>
                                <tr>
                                    <th className="text-left">Cibo</th>
                                    <th className="text-center" scope="col">Quantità</th>
                                    <th className="text-center" scope="col">Prezzo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {item?.details.map((row: any) => {
                                    return <>
                                        <tr className="align-middle" key={row.id}>
                                            <td>{row.name}</td>
                                            <td className="text-center">{row.quantity}</td>
                                            <td className="text-center">{parseFloat(row.unitPrice).toFixed(2)} €</td>
                                        </tr>
                                    </>
                                })}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td></td>
                                    <td className="text-center">
                                        <b>Totale</b>
                                    </td>
                                    <td className="text-center">{orderTotal.toFixed(2)} €</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
}

