import { Html, Tailwind } from "@react-email/components";


export default function AccountActivationCode({ link }: any) {

  return <>
    <Tailwind config={{
      theme: {
        fontFamily: {
          'sans': ['Helvetica'],
          'body': ['Helvetica'],
        }
      }
    }}>
      <Html className='bg-slate-200'>
        <div className="p-16 bg-slate-200 font-sans">
          <div className="bg-white shadow-md p-8">
            <p className="text-lg text-center m-0">Ristorante | Pizzeria</p>
            <h1 className="text-xl text-center m-0">Fittizzio</h1>
            <div className="flex flex-col space-y-2">
              <p>
                Attiva il tuo account, cliccando sul seguente bottone.
              </p>
              <div className="flex items-center justify-center">
                <a href={link} className="bg-red-800 hover:bg-red-500 text-white p-4">
                  Attiva account
                </a>
              </div>
              <p>
                Se il link dal bottone non funziona, copia il seguente link nel browser:
              </p>
              <p>{link}</p>
            </div>
          </div>
        </div>
      </Html>
    </Tailwind>
  </>
}
