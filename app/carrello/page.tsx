import AccountManage from "@/components/AccountManage";
import CartButton from "@/components/CartButton";
import CartRow from "@/components/CartRow";
import CategoryPills from "@/components/CategoryPills";
import CheckoutButton from "@/components/CheckoutButton";
import Header from "@/components/Header";
import HeaderMenu from "@/components/HeaderMenu";
import HomeButton from "@/components/HomeButton";
import Topbar from "@/components/Topbar";
import TopbarLeft from "@/components/TopbarLeft";
import TopbarRight from "@/components/TopbarRight";
import { getCart } from "@/src/services/cartService";
import { CartState } from "@/src/types";

export const metadata = {
  title: 'Carrello',
}

export default async function Cart() {

  const cart: CartState = await getCart();

  const content = () => {
    if (Object.keys(cart.items).length > 0) {
      const { items, total } = cart;

      return <>
        <div className="flex flex-col">
          <div className="w-full">
            <table className="flex flex-col">
              <thead>
                <tr className='flex'>
                  <th className="w-3/6 text-left">Cibo</th>
                  <th className="w-1/6 text-center">Quantità</th>
                  <th className="w-1/6 text-center">Prezzo</th>
                  <th className="w-1/6 text-center">Azioni</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(items).map((row: any) => <CartRow actionsVisible={true} row={row} key={row.item.id}></CartRow>)}
              </tbody>
              <tfoot>
                <tr className='flex text-center pt-2'>
                  <td className="w-3/6"></td>
                  <td className="w-1/6 font-semibold">Totale</td>
                  <td className="w-1/6">{total.toFixed(2)} €</td>
                  <td className="w-1/6"></td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="w-full">
            <CheckoutButton></CheckoutButton>
          </div>
        </div>
      </>

    } else {
      return <>
        <p>Non ci sono elementi nel carrello</p>
      </>
    }
  }


  return (
    <main>
      <Topbar>
        <TopbarLeft>
          <HomeButton></HomeButton>
        </TopbarLeft>
        <TopbarRight>
          <CartButton></CartButton>
          <AccountManage></AccountManage>
        </TopbarRight>
      </Topbar>
      <Header></Header>
      <HeaderMenu>
        <CategoryPills></CategoryPills>
      </HeaderMenu>
      <div className="p-8">
        {content()}
      </div>
    </main>
  );
}
