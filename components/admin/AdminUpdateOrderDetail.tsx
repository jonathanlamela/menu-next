'use client';
import AdminUpdateOrderAddItem from "@/components/admin/AdminUpdateOrderAddItem";
import { decreaseItemQty, increaseItemQty, removeItem } from "@/src/services/orderService";
import { FoodDTO, OrderDTO, OrderDetailDTO } from "@/src/types";
import { useState } from "react";



export default function AdminUpdateOrderDetail(props: { order: OrderDTO, foods: FoodDTO[] }) {
    const { order, foods } = props;
    const [isEdit, setIsEdit] = useState(false);



    const [isTransitioning, setIsTransitioning] = useState(false); // Nuovo stato
    const toggleEdit = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            setIsEdit(!isEdit);
            setIsTransitioning(false);
        }, 300); // Regola questa durata in millisecondi in base alle tue preferenze di animazione
    };

    const increaseQtyAction = async (row: OrderDetailDTO) => {
        await increaseItemQty(row.id)
    }

    const reduceQtyAction = async (row: OrderDetailDTO) => {
        await decreaseItemQty(row.id)
    }

    const removeItemAction = async (row: OrderDetailDTO) => {
        await removeItem(row.id);
    }

    function toggleButton() {
        return <>
            <div className="relative">
                <button className="absolute right-0 top-0" onClick={() => toggleEdit()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                </button>
            </div>
        </>;
    }

    const preview = () => {
        return <>
            <div className="w-full flex flex-row p-4">
                <div className="w-full flex flex-col space-y-2">
                    <div className="w-full flex">
                        <label className="form-label">Dettaglio ordine</label>
                    </div>
                    <div className="w-full flex flex-col">
                        <div className="w-full flex flex-col">
                            <div className="hidden h-10 lg:flex flex-row items-center">
                                <div className="flex w-9/12 items-center font-bold">
                                    Nome
                                </div>
                                <div className="flex w-1/12 items-center justify-center font-bold">
                                    Quantità
                                </div>
                                <div className="flex w-1/12 items-center justify-center font-bold">
                                    Prezzo unitario
                                </div>
                                <div className="flex w-1/12 items-center justify-center font-bold">
                                    Totale
                                </div>
                            </div>
                            <div className="w-full">
                                {order.details?.map((row: OrderDetailDTO) => <>
                                    <div className="w-full odd:bg-gray-100">
                                        <div className="h-10 hidden lg:flex flex-row items-center flex-grow">
                                            <div className="flex w-9/12 px-2">{row.name}</div>
                                            <div className="flex w-1/12 items-center justify-center">{row.quantity}</div>
                                            <div className="flex w-1/12 items-center justify-center">{parseFloat(`${row.unitPrice}`).toFixed(2)} €</div>
                                            <div className="flex w-1/12 items-center justify-center">{(parseFloat(`${row.unitPrice}`) * row.quantity).toFixed(2)} €</div>
                                        </div>
                                        <div className="flex flex-col lg:hidden space-y-4 p-8">
                                            <div className="flex flex-row">
                                                <p className="font-semibold w-1/2">Nome</p>
                                                <p className="w-1/2">{row.name}</p>
                                            </div>
                                            <div className="flex flex-row space-x-4">
                                                <p className="font-semibold w-1/2">Quantità</p>
                                                <p className="w-1/2">{row.quantity}</p>
                                            </div>
                                            <div className="flex flex-row space-x-4">
                                                <p className="font-semibold w-1/2">Prezzo unitario</p>
                                                <p className="w-1/2">{parseFloat(`${row.unitPrice}`).toFixed(2)} €</p>
                                            </div>
                                            <div className="flex flex-row space-x-4">
                                                <p className="font-semibold w-1/2">Totale</p>
                                                <p className="w-1/2">{(parseFloat(`${row.unitPrice}`) * row.quantity).toFixed(2)} €</p>
                                            </div>
                                        </div>
                                    </div>
                                </>)}
                            </div>
                        </div>
                    </div>
                </div>
                {toggleButton()}
            </div>
        </>
    }

    const editForm = () => {
        return <>
            <div className="w-full flex flex-row p-4 space-x-4">
                <div className="w-full flex flex-col space-y-2" >
                    <div className="w-full flex">
                        <label className="form-label">Dettaglio ordine</label>
                    </div>
                    <div className="w-full flex flex-col">
                        <div className="w-full flex flex-col">
                            <div className="hidden lg:flex h-10 flex-row items-center">
                                <div className="flex w-6/12 items-center font-bold">
                                    Nome
                                </div>
                                <div className="flex w-1/12 items-center justify-center font-bold">
                                    Quantità
                                </div>
                                <div className="flex w-2/12 items-center justify-center font-bold">
                                    Prezzo unitario
                                </div>
                                <div className="flex w-2/12 items-center justify-center font-bold">
                                    Prezzo totale
                                </div>
                                <div className="flex w-2/12 items-center justify-center font-bold">
                                    Azioni
                                </div>
                            </div>
                            <div className="w-full">
                                {order.details?.map((row: OrderDetailDTO) => <>

                                    <div className="w-full odd:bg-gray-100 flex flex-grow">
                                        <div className="h-10 w-full lg:flex hidden">
                                            <div className="flex w-6/12 px-2 items-center">{row.name}</div>
                                            <div className="flex w-1/12 items-center justify-center">{row.quantity}</div>
                                            <div className="flex w-2/12 items-center justify-center">{parseFloat(`${row.unitPrice}`).toFixed(2)} €</div>
                                            <div className="flex w-2/12 items-center justify-center">{(parseFloat(`${row.unitPrice}`) * row.quantity).toFixed(2)} €</div>
                                            <div className="flex w-2/12 items-center justify-center">
                                                {actions(row)}
                                            </div>
                                        </div>

                                        <div className="w-full flex flex-col lg:hidden space-y-4 p-8">
                                            <div className="flex flex-row">
                                                <p className="font-semibold w-1/2">Nome</p>
                                                <p className="w-1/2">{row.name}</p>
                                            </div>
                                            <div className="flex flex-row space-x-4">
                                                <p className="font-semibold w-1/2">Quantità</p>
                                                <p className="w-1/2">{row.quantity}</p>
                                            </div>
                                            <div className="flex flex-row space-x-4">
                                                <p className="font-semibold w-1/2">Prezzo unitario</p>
                                                <p className="w-1/2">{parseFloat(`${row.unitPrice}`).toFixed(2)} €</p>
                                            </div>
                                            <div className="flex flex-row space-x-4">
                                                <p className="font-semibold w-1/2">Totale</p>
                                                <p className="w-1/2">{(parseFloat(`${row.unitPrice}`) * row.quantity).toFixed(2)} €</p>
                                            </div>
                                            <div className="flex flex-row space-x-4">
                                                <p className="font-semibold w-1/2">Azioni</p>
                                                <p className="w-1/2">{actions(row)}</p>
                                            </div>
                                        </div>

                                    </div>
                                </>)}
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex">
                        <label className="form-label">Aggiungi all&apos;ordine</label>
                    </div>
                    <div className="w-full flex">
                        <AdminUpdateOrderAddItem foods={foods} order={order} />
                    </div>
                </div>
                {toggleButton()}
            </div>
        </>
    }

    const actions = (row: OrderDetailDTO) => {
        return <div className="flex flex-row space-x-2  content-center items-center md:flex-row lg:justify-center
        md:space-y-0">
            <button className="p-2 bg-gray-300 hover:text-white hover:bg-gray-700 rounded-xl" onClick={(e) => increaseQtyAction(row)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                </svg>
            </button>
            <button className="p-2 bg-gray-300 hover:text-white hover:bg-gray-700  rounded-xl" onClick={(e) => reduceQtyAction(row)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M5.5 10a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z" />
                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                </svg>
            </button>
            <button type="submit" className="p-2 bg-gray-300 hover:text-white hover:bg-gray-700  rounded-xl" onClick={(e) => removeItemAction(row)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M6.146 8.146a.5.5 0 0 1 .708 0L8 9.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 10l1.147 1.146a.5.5 0 0 1-.708.708L8 10.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 10 6.146 8.854a.5.5 0 0 1 0-.708z" />
                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                </svg>
            </button>
        </div>
    }



    return (
        <div className={`w-full transition-opacity ${isTransitioning ? "opacity-0" : "opacity-100"}`}>
            {isEdit ? editForm() : preview()}
        </div>
    );
}



