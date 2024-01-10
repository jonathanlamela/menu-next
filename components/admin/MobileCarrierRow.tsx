import AdminDeleteButton from "@/components/admin/AdminDeleteButton";
import AdminEditButton from "@/components/admin/AdminEditButton";
import { deleteCategory } from "@/src/services/categoryService";
import { CarrierDTO, CategoryDTO } from "@/src/types";


export default function MobileCarrierRow(props: { carrier: CarrierDTO }) {
    const { carrier } = props;

    const actions = () => {
        return <>
            <AdminEditButton link={`/amministrazione/catalogo/categorie/modifica/${carrier.id}`}></AdminEditButton>
            <AdminDeleteButton
                action={deleteCategory} id={carrier.id!} question="Operazione rischiosa" text={`Questa operazione eliminerà il corriere "${carrier.name}" in maniera irreversibile. Sei sicuro di volerlo fare?`}
            ></AdminDeleteButton>
        </>
    }

    return <>
        <div className="flex lg:hidden w-full flex-col p-8 space-y-4">
            <div className="w-full flex flex-row space-x-4 items-center">
                <div className="w-1/4 font-bold text-end">Id</div>
                <div className="w-3/4">{carrier.id}</div>
            </div>
            <div className="w-full flex flex-row space-x-4 items-center">
                <div className="w-1/4 font-bold text-end">Nome</div>
                <div className="w-3/4">{carrier.name}</div>
            </div>
            <div className="w-full flex flex-row space-x-4 items-center">
                <div className="w-1/4 font-bold text-end">Costo</div>
                <div className="w-3/4">{`${carrier.costs.toFixed(2)} €`}</div>
            </div>
            <div className="w-full flex flex-row space-x-4 items-center">
                <div className="w-1/4 font-bold text-end">Azioni</div>
                <div className="w-3/4 flex flex-row">
                    {carrier.deleted ? <div className="h-10 flex items-center">Nessuna azione</div> : actions()}
                </div>
            </div>
        </div >
    </>
}
