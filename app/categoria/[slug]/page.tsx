import AccountManage from "@/components/AccountManage";
import CartButton from "@/components/CartButton";
import CategoryPills from "@/components/CategoryPills";
import FoodItem from "@/components/FoodItem";
import Header from "@/components/Header";
import HeaderMenu from "@/components/HeaderMenu";
import SearchForm from "@/components/SearchForm";
import Topbar from "@/components/Topbar";
import TopbarLeft from "@/components/TopbarLeft";
import TopbarRight from "@/components/TopbarRight";
import { getCategoryBySlug, getFoodsByCategorySlug } from "@/src/services/categoryService";


export async function generateMetadata({ params }: any) {
  const category = await getCategoryBySlug(params.slug);

  return {
    title: `Categoria ${category?.name.toLowerCase()}`,
  }
}

export default async function Categoria({ params }: { params: { slug: string } }) {

  const category = await getCategoryBySlug(params.slug);
  const foods = await getFoodsByCategorySlug(params.slug);

  return (
    <main>
      <Topbar>
        <TopbarLeft>
          <SearchForm></SearchForm>
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
      <div className="flex flex-col p-8">
        <div className="w-full pb-4">
          <h4 className="font-bold text-lg">Categoria {category?.name.toLowerCase()}</h4>
        </div>
        <div className="w-full space-y-4">
          {foods.length === 0 ? <p>Non ci sono cibi per questa categoria</p> : null}
          {foods ? foods.map((item: any) => <FoodItem item={item} key={item.id}></FoodItem>) : null}
        </div>
      </div>
    </main>
  )
}
