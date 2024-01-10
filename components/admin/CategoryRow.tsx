import AdminDeleteButton from "@/components/admin/AdminDeleteButton";
import AdminEditButton from "@/components/admin/AdminEditButton";
import { deleteCategory } from "@/src/services/categoryService";
import { CategoryDTO } from "@/src/types";


export default function CategoryRow(props: { category: CategoryDTO }) {
    const { category } = props;

    const actions = () => {
        return <>
            <AdminEditButton link={`categorie/modifica/${category.id}`}></AdminEditButton>
            <AdminDeleteButton
                action={deleteCategory} id={category.id!} question="Operazione rischiosa" text={
                    <>
                        <p>Questa operazione eliminerà la categoria &quot;<strong>{category.name}</strong>&quot; in maniera irreversibile. Sei sicuro di volerlo fare?</p>
                    </>}
            ></AdminDeleteButton>
        </>
    }

    return <>
        <div className="hidden lg:flex w-full flex-row flex-grow">
            <div className="w-1/12 text-center flex items-center justify-center">
                {category.id}
            </div>
            <div className="w-8/12 text-left flex items-center">{category.name} {category.deleted ? "(Eliminata)" : null}</div>
            <div className="w-3/12 text-center flex flex-row space-x-2 items-center content-center justify-center">
                {category.deleted ? <div className="h-10 flex items-center">Nessuna azione</div> : actions()}
            </div>
        </div>
        <div className="flex lg:hidden w-full flex-col p-8 space-y-4">
            <div className="w-full flex flex-row space-x-4 items-center">
                <div className="w-1/4 font-bold text-end">Id</div>
                <div className="w-3/4">{category.id}</div>
            </div>
            <div className="w-full flex flex-row space-x-4 items-center">
                <div className="w-1/4 font-bold text-end">Nome</div>
                <div className="w-3/4">{category.name} {category.deleted ? "(Eliminata)" : null}</div>
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
