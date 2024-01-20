
import { Html } from '@react-email/html';
import { Carrier, OrderDetail } from '@prisma/client';
import { Tailwind } from '@react-email/components';

export default function CustomerOrderCreatedEmail(props: { rows?: OrderDetail[], carrier?: Carrier, total?: number }) {

  const { rows } = props;


  return (
    <Tailwind config={{
      theme: {
        fontFamily: {
          'sans': ['Helvetica'],
          'body': ['Helvetica'],
        }
      }
    }}>
      <Html className='bg-slate-200'>
        <div className="p-16  font-sans">
          <div className="bg-white shadow-md p-8">
            <p className="text-lg text-center m-0">Ristorante | Pizzeria</p>
            <h1 className="text-xl text-center m-0">Fittizzio</h1>
            <div className="flex flex-col space-y-1">
              <p>
                Il tuo ordine è stato creato, ecco alcune informazioni sul tuo ordine e su cosa hai ordinato.
              </p>
              <div>
                <table>
                  <tr>
                    <th>Cibo</th>
                    <th>Quantità</th>
                    <th>Prezzo unitario</th>
                  </tr>
                  {rows?.map((row) => {
                    return <tr key={row.id}>
                      <td>{row.name}</td>
                      <td className='text-center'>{row.quantity}</td>
                      <td className='text-center'>{row.unitPrice.toFixed(2)} €</td>
                    </tr>
                  })}
                  <tr>
                    <td></td>
                    <td className='text-center'>Totale</td>
                    <td className='text-center'>{props.total?.toFixed(2)} €</td>
                  </tr>
                </table>
              </div>
              <div>
                <p className='font-bold'>Informazioni sulla consegna</p>
                <p>Tipo consegna: {props.carrier?.name}</p>
                <p>Costo consegna: {props.carrier?.costs.toFixed(2)} €</p>
              </div>
            </div>
          </div>
        </div>
      </Html>
    </Tailwind>

  );
}
