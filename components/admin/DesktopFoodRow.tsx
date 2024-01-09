import AdminDeleteButton from "@/components/admin/AdminDeleteButton";
import AdminEditButton from "@/components/admin/AdminEditButton";
import { deleteFood } from "@/src/services/foodService";
import { FoodDTO } from "@/src/types";


export default function DesktopFoodRow(props: { food: FoodDTO }) {
    const { food } = props;

    const actions = () => {
        return <>
            <AdminEditButton link={`/amministrazione/catalogo/cibi/modifica/${food.id}`}></AdminEditButton>
            <AdminDeleteButton
                action={deleteFood} id={food.id!} question="Operazione rischiosa" text={
                    <>
                        <p>Questa operazione eliminerà il cibo &quot;<strong>{food.name}</strong>&quot; in maniera irreversibile. Sei sicuro di volerlo fare?</p>
                    </>
                }
            ></AdminDeleteButton>

        </>
    }

    return <>
        <div className="hidden lg:flex w-full flex-row flex-grow">
            <div className="w-1/12 text-center flex items-center justify-center">
                {food.id}
            </div>
            <div className="w-6/12 flex items-center">{food.name} {food.deleted ? "(Eliminato)" : null}</div>
            <div className="w-2/12 flex justify-center items-center">{food.category?.name} {food.category?.deleted ? "(Eliminata)" : null}</div>
            <div className="w-1/12 flex justify-center items-center">{`${food.price.toFixed(2)} €`}</div>
            <div className="w-3/12 flex flex-row space-x-2 items-center content-center justify-center">
                {food.deleted ? <div className="h-10 flex items-center">Nessun azione</div> : actions()}
            </div>
        </div>
    </>
}
