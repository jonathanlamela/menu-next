import AdminDeleteButton from "@/components/admin/AdminDeleteButton";
import AdminEditButton from "@/components/admin/AdminEditButton";
import { deleteCategory } from "@/src/actions/category";
import { CategoryDTO } from "@/src/types";


export default function MobileCategoryRow(props: { category: CategoryDTO }) {
    const { category } = props;

    const actions = () => {
        return <>
            <AdminEditButton link={`/amministrazione/catalogo/categorie/modifica/${category.id}`}></AdminEditButton>
            <AdminDeleteButton
                action={deleteCategory} id={category.id} question="Operazione rischiosa" text={`Questa operazione eliminerà la categoria "${category.name}" in maniera irreversibile. Sei sicuro di volerlo fare?`}
            ></AdminDeleteButton>
        </>
    }

    return <>
        <div className="flex lg:hidden w-full flex-col p-8 space-y-4">
            <div className="w-full flex flex-row space-x-4 items-center">
                <div className="w-1/4 font-bold text-end">Id</div>
                <div className="w-3/4">{category.id}</div>
            </div>
            <div className="w-full flex flex-row space-x-4 items-center">
                <div className="w-1/4 font-bold text-end">Nome</div>
                <div className="w-3/4">{category.name}</div>
            </div>
            <div className="w-full flex flex-row space-x-4 items-center">
                <div className="w-1/4 font-bold text-end">Azioni</div>
                <div className="w-3/4 flex flex-row">
                    {category.deleted ? <div className="h-10 flex items-center">Nessuna azione</div> : actions()}
                </div>
            </div>
        </div >
    </>
}
