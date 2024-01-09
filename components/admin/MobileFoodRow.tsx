import AdminDeleteButton from "@/components/admin/AdminDeleteButton";
import AdminEditButton from "@/components/admin/AdminEditButton";
import { deleteFood } from "@/src/services/foodService";
import { FoodDTO } from "@/src/types";


export default function MobileFoodRow(props: { food: FoodDTO }) {
    const { food } = props;

    const actions = () => {
        return <>
            <AdminEditButton link={`/amministrazione/catalogo/cibi/modifica/${food.id}`}></AdminEditButton>
            <AdminDeleteButton
                action={deleteFood} id={food.id} question="Operazione rischiosa" text={
                    <>
                        <p>Questa operazione eliminerà il cibo &quot;<strong>{food.name}</strong>&quot; in maniera irreversibile. Sei sicuro di volerlo fare?</p>
                    </>
                }
            ></AdminDeleteButton>

        </>
    }

    return <>
        <div className="flex lg:hidden w-full flex-col p-8 space-y-4">
            <div className="w-full flex flex-row space-x-4 items-center">
                <div className="w-1/4 font-bold text-end">Id</div>
                <div className="w-3/4">{food.id}</div>
            </div>
            <div className="w-full flex flex-row space-x-4 items-center">
                <div className="w-1/4 font-bold text-end">Nome</div>
                <div className="w-3/4">{food.name} {food.deleted ? "(Eliminato)" : null}</div>
            </div>
            <div className="w-full flex flex-row space-x-4 items-center">
                <div className="w-1/4 font-bold text-end">Categoria</div>
                <div className="w-3/4">{food.category?.name} {food.category?.deleted ? "(Eliminata)" : null}</div>
            </div>
            <div className="w-full flex flex-row space-x-4 items-center">
                <div className="w-1/4 font-bold text-end">Prezzo</div>
                <div className="w-3/4">{`${food.price.toFixed(2)} €`}</div>
            </div>
            <div className="w-full flex flex-row space-x-4 items-center">
                <div className="w-1/4 font-bold text-end">Azioni</div>
                <div className="w-3/4 flex flex-row">
                    {food.deleted ? <div className="h-10 flex items-center">Nessuna azione</div> : actions()}
                </div>
            </div>
        </div >
    </>
}
