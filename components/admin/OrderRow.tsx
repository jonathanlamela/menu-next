import AdminDeleteButton from "@/components/admin/AdminDeleteButton";
import AdminEditButton from "@/components/admin/AdminEditButton";
import { deleteOrderState } from "@/src/services/orderStateService";
import { OrderDTO, OrderStateDTO } from "@/src/types";


export default function OrderRow(props: { order: OrderDTO }) {
    const { order } = props;

    const actions = () => {
        return <>

        </>
    }

    return <>
        <div className="hidden lg:flex w-full flex-row flex-grow">
            <div className="w-1/12 flex items-center justify-center">
                {order.id}
            </div>
            <div className="w-5/12 flex items-center">{order.user ? `${order.user?.firstname} ${order.user?.lastname}` : "Eliminato"}</div>
            <div className="w-2/12 flex items-center">{order.orderState?.deleted ? `${order.orderState?.name} (Eliminato)` : order.orderState?.name}</div>
            <div className="w-1/12 justify-center flex items-center">{order.total.toNumber().toFixed(2)} €</div>
            <div className="w-3/12 text-center flex flex-row space-x-2 items-center content-center justify-center">
                <AdminEditButton link={`ordini/modifica/${order.id}`}></AdminEditButton>
            </div>
        </div>
        <div className="flex lg:hidden w-full flex-col p-8 space-y-4">
            <div className="w-full flex flex-row space-x-4 items-center">
                <div className="w-1/4 font-bold text-end">Id</div>
                <div className="w-3/4">{order.id}</div>
            </div>
            <div className="w-full flex flex-row space-x-4 items-center">
                <div className="w-1/4 font-bold text-end">Cliente</div>
                <div className="w-3/4">{order.user ? `${order.user?.firstname} ${order.user?.lastname}` : "Eliminato"}</div>
            </div>
            <div className="w-full flex flex-row space-x-4 items-center">
                <div className="w-1/4 font-bold text-end">Stato ordine</div>
                <div className="w-3/4">{order.orderState?.deleted ? `${order.orderState?.name} (Eliminato)` : order.orderState?.name}</div>
            </div>
            <div className="w-full flex flex-row space-x-4 items-center">
                <div className="w-1/4 font-bold text-end">Totale</div>
                <div className="w-3/4">{order.total.toNumber().toFixed(2)} €</div>
            </div>
            <div className="w-full flex flex-row space-x-4 items-center">
                <div className="w-1/4 font-bold text-end">Azioni</div>
                <div className="w-3/4 flex flex-row">
                    <AdminEditButton link={`ordine/modifica/${order.id}`}></AdminEditButton>
                </div>
            </div>
        </div >
    </>
}
