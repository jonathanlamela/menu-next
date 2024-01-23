'use client';

import { OrderDTO } from "@/src/types";
import { useState } from "react";



export default function AdminUpdateOrderSummary(props: { order: OrderDTO }) {
    const { order } = props;


    const [isTransitioning, setIsTransitioning] = useState(false); // Nuovo stato




    const preview = () => {
        return <>
            <div className="w-full flex flex-row p-4">
                <div className="w-full flex flex-col space-y-2">
                    <div className="w-full flex">
                        <label className="form-label">Riepilogo</label>
                    </div>
                    <div className="w-full flex justify-end">
                        <div className="w-full md:w-1/3 flex flex-col">
                            <div className="w-full flex flex-row  p-2">
                                <p className="w-1/2">Spese di consegna</p>
                                <p className="w-1/2 text-end">{parseFloat(`${order.carrier?.costs}`).toFixed(2)} €</p>
                            </div>
                            <div className="w-full flex flex-row  p-2">
                                <p className="w-1/2">Totale articoli</p>
                                <p className="w-1/2 text-end">{parseFloat(`${order.total}`).toFixed(2)} €</p>
                            </div>
                            <div className="w-full flex flex-row bg-slate-200 p-2">
                                <p className="w-1/2">Totale ordine</p>
                                <p className="w-1/2 text-end">{(parseFloat(`${order.total}`) + parseFloat(`${order.carrier?.costs}`)).toFixed(2)} €</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    }



    return (
        <div className={`w-full transition-opacity ${isTransitioning ? "opacity-0" : "opacity-100"}`}>
            {preview()}
        </div>
    );
}
