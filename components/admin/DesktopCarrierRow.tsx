import AdminDeleteButton from "@/components/admin/AdminDeleteButton";
import AdminEditButton from "@/components/admin/AdminEditButton";
import { deleteCarrier } from "@/src/services/carrierService";
import { deleteCategory } from "@/src/services/categoryService";
import { CarrierDTO, CategoryDTO } from "@/src/types";


export default function DesktopCarrierRow(props: { carrier: CarrierDTO }) {
    const { carrier } = props;

    const actions = () => {
        return <>
            <AdminEditButton link={`/amministrazione/vendite/corrieri/modifica/${carrier.id}`}></AdminEditButton>
            <AdminDeleteButton
                action={deleteCarrier} id={carrier.id!} question="Operazione rischiosa" text={
                    <>
                        <p>Questa operazione eliminerà il corriere &quot;<strong>{carrier.name}</strong>&quot; in maniera irreversibile. Sei sicuro di volerlo fare?</p>
                    </>}
            ></AdminDeleteButton>
        </>
    }

    return <>
        <div className="hidden lg:flex w-full flex-row flex-grow">
            <div className="w-1/12 flex items-center justify-center">
                {carrier.id}
            </div>
            <div className="w-7/12 flex items-center">{carrier.name} {carrier.deleted ? "(Eliminato)" : null}</div>
            <div className="w-1/12 justify-center flex items-center">{`${carrier.costs.toFixed(2)} €`}</div>
            <div className="w-3/12 text-center flex flex-row space-x-2 items-center content-center justify-center">
                {carrier.deleted ? <div className="h-10 flex items-center">Nessuna azione</div> : actions()}
            </div>
        </div>
    </>
}
