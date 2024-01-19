'use client';
import { createOrder } from "@/src/services/orderService";
import { CarrierDTO, CartState, RiepilogoOrdineFields } from "@/src/types";
import { useForm } from "react-hook-form";


export default function OrderSummaryForm(props: { cart: CartState, carrier: CarrierDTO }) {

    var orderTotal = (parseFloat(`${props.carrier.costs}`) || 0) + (parseFloat(`${props.cart.total}`) || 0);

    const { register, handleSubmit, formState: { errors } } = useForm<RiepilogoOrdineFields>({
        defaultValues: {
            note: props.cart.note
        }
    });

    const processForm = async (data: RiepilogoOrdineFields) => {
        var formData = new FormData();
        formData.set("note", data.note);
        await createOrder(formData);
    }

    return <>
        <div className="flex flex-col space-y-4 pt-4">
            <div className="w-full md:w-1/2">
                <h6 className="uppercase font-semibold">Tipologia di consegna</h6>
                <p>{props.carrier?.name}</p>
            </div>
            <div className="w-full">
                <h6 className="uppercase font-semibold">Dettagli di consegna</h6>
                <div className="w-full flex flex-col">
                    {props.cart.deliveryAddress ? <>
                        <div className="flex flex-row">
                            <p className="font-medium w-1/2">Indirizzo consegna</p>
                            <p className="w-1/2">{props.cart.deliveryAddress}</p>
                        </div>
                    </> : null}
                    <div className="flex flex-row">
                        <p className="w-1/2 font-medium">Orario di consegna/ritiro</p>
                        <p className="w-1/2">{props.cart.deliveryTime}</p>
                    </div>
                </div>
            </div>
            <div className="w-full ">
                <h6 className="uppercase font-semibold pb-4">Dettagli ordine</h6>
                <div className="p-4 bg-slate-100">
                    <table className="flex flex-col">
                        <thead>
                            <tr className="flex border-b">
                                <th className="w-4/6 text-left">Cibo</th>
                                <th className="w-1/6 text-center">Quantità</th>
                                <th className="w-1/6 text-center">Prezzo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.values(props.cart.items).map(row => {
                                return <tr key={row.item.id} className="flex border-b justify-center items-center py-2" >
                                    <td className="w-4/6">{row.item.name}</td>
                                    <td className="w-1/6 text-center">{row.quantity}</td>
                                    <td className="w-1/6 text-center">
                                        {parseFloat(`${row.item.price}`).toFixed(2)} €
                                    </td>
                                </tr>
                            })}
                            <tr className="flex border-b justify-center items-center py-2">
                                <td className="w-4/6">Spese di consegna</td>
                                <td className="w-1/6 text-center">1</td>
                                <td className="w-1/6 text-center">
                                    {parseFloat(`${props.carrier.costs}`).toFixed(2)} €
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr className="flex border-b py-2">
                                <td className="w-4/6 text-left"></td>
                                <td className="w-1/6 text-center font-bold">Totale</td>
                                <td className="w-1/6 text-center">
                                    {parseFloat(`${orderTotal}`).toFixed(2)} €
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
            <div className="w-full md:w-1/2">
                <form className="flex flex-col m-0" onSubmit={handleSubmit(processForm)}>
                    <div className="flex flex-col py-2">
                        <label className="form-label">Note</label>
                        <textarea {...register("note")}
                            className="text-input"></textarea>
                    </div>
                    <div className="flex flex-col py-2 items-start">
                        <button type="submit" className="btn-success">Invia ordine</button>
                    </div>
                </form>
            </div>
        </div >

    </>
}
