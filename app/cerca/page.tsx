import AccountManage from "@/components/AccountManage";
import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import BreadcrumbDivider from "@/components/BreadcrumbDivider";
import BreadcrumbLink from "@/components/BreadcrumbLink";
import BreadcrumbText from "@/components/BreadcrumbText";
import CartButton from "@/components/CartButton";
import FoodItemWithCategory from "@/components/FoodItemWithCategory";
import Header from "@/components/Header";
import HeaderMenu from "@/components/HeaderMenu";
import SearchForm from "@/components/SearchForm";
import Topbar from "@/components/Topbar";
import TopbarLeft from "@/components/TopbarLeft";
import TopbarRight from "@/components/TopbarRight";
import { searchFoods } from "@/src/services/foodService";
import { SearchFields } from "@/src/types";
import { redirect } from "next/navigation";


async function getResults(searchObject: SearchFields): Promise<{ foods: [], count: number }> {
  if (searchObject.search == null || searchObject.search == "") {
    redirect('/');
  } else {
    const result = await searchFoods({
      search: searchObject.search,
      page: 1,
      perPage: 100,
      orderBy: "id",
      ascend: true,
      paginated: false
    });

    return result;
  }
}


export default async function Cerca(props: any) {
  const searchParams = props.searchParams;
  const value = searchParams.chiave ?? null;

  const { foods, count } = await getResults({
    search: searchParams.chiave ?? null
  });


  const content = () => {

    return <>
      <div className="flex flex-col p-8">
        <div className="w-full pb-4">
          <h4 className="font-bold text-lg">{`Risultati di ricerca per ${value}`}</h4>
        </div>
        <div className="w-full space-y-4">
          {count === 0 ? <p>Nessun risultato trovato</p> : null}
          {count > 0 ? searchResultsRender() : null}
        </div>
      </div>
    </>
  };

  const searchResultsRender = () => {
    return foods.map((item: any) => <FoodItemWithCategory item={item} key={item.id}></FoodItemWithCategory>);
  }
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
        <BreadcrumbContainer>
          <BreadcrumbLink href="/">
            Home
          </BreadcrumbLink>
          <BreadcrumbDivider></BreadcrumbDivider>
          <BreadcrumbText>Ricerca</BreadcrumbText>
        </BreadcrumbContainer>
      </HeaderMenu>
      {content()}
    </main>
  );
}
