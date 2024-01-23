
import { Html } from '@react-email/html';
import { Tailwind } from '@react-email/components';
import { OrderStateDTO } from '@/src/types';

export default function CustomerOrderStateUpdatedEmail(props: { orderState: OrderStateDTO }) {

  const { orderState } = props;


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
        <div className="p-16 font-sans">
          <div className="bg-white shadow-md p-8">
            <p className="text-lg text-center m-0">Ristorante | Pizzeria</p>
            <h1 className="text-xl text-center m-0">Fittizzio</h1>
            <div className="flex flex-col space-y-1">
              <p>
                Lo stato del tuo ordine è stato aggiornato in:
                <span className='pl-2 font-bold'>{orderState?.name}</span>
              </p>

            </div>
          </div>
        </div>
      </Html>
    </Tailwind>

  );
}
