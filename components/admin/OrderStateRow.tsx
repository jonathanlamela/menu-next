import AdminDeleteButton from "@/components/admin/AdminDeleteButton";
import AdminEditButton from "@/components/admin/AdminEditButton";
import { deleteOrderState } from "@/src/services/orderStateService";
import { OrderStateDTO } from "@/src/types";


export default function OrderStateRow(props: { orderState: OrderStateDTO }) {
    const { orderState } = props;

    const actions = () => {
        return <>
            <AdminEditButton link={`stati-ordine/modifica/${orderState.id}`}></AdminEditButton>
            <AdminDeleteButton
                action={deleteOrderState} id={orderState.id!} question="Operazione rischiosa" text={
                    <>
                        <p>Questa operazione eliminerà lo stato ordine &quot;<strong>{orderState.name}</strong>&quot; in maniera irreversibile. Sei sicuro di volerlo fare?</p>
                    </>}
            ></AdminDeleteButton>
        </>
    }

    return <>
        <div className="hidden lg:flex w-full flex-row flex-grow">
            <div className="w-1/12 flex items-center justify-center">
                {orderState.id}
            </div>
            <div className="w-6/12 flex items-center">{orderState.name} {orderState.deleted ? "(Eliminato)" : null}</div>
            <div className="w-2/12 justify-center flex items-center"><span className={orderState.cssBadgeClass ?? ""}>Lorem impsum</span></div>
            <div className="w-3/12 text-center flex flex-row space-x-2 items-center content-center justify-center">
                {orderState.deleted ? <div className="h-10 flex items-center">Nessuna azione</div> : actions()}
            </div>
        </div>
        <div className="flex lg:hidden w-full flex-col p-8 space-y-4">
            <div className="w-full flex flex-row space-x-4 items-center">
                <div className="w-1/4 font-bold text-end">Id</div>
                <div className="w-3/4">{orderState.id}</div>
            </div>
            <div className="w-full flex flex-row space-x-4 items-center">
                <div className="w-1/4 font-bold text-end">Nome</div>
                <div className="w-3/4">{orderState.name}</div>
            </div>
            <div className="w-full flex flex-row space-x-4 items-center">
                <div className="w-1/4 font-bold text-end">Classe CSS badge</div>
                <div className="w-3/4"><span className={orderState.cssBadgeClass ?? ""}>Lorem impsum</span></div>
            </div>
            <div className="w-full flex flex-row space-x-4 items-center">
                <div className="w-1/4 font-bold text-end">Azioni</div>
                <div className="w-3/4 flex flex-row">
                    {orderState.deleted ? <div className="h-10 flex items-center">Nessuna azione</div> : actions()}
                </div>
            </div>
        </div >
    </>
}
