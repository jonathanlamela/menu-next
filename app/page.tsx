import AccountManage from "@/components/AccountManage";
import CartButton from "@/components/CartButton";
import CategoryPills from "@/components/CategoryPills";
import Header from "@/components/Header";
import HeaderMenu from "@/components/HeaderMenu";
import SearchForm from "@/components/SearchForm";
import Topbar from "@/components/Topbar";
import TopbarLeft from "@/components/TopbarLeft";
import TopbarRight from "@/components/TopbarRight";

export default function Home() {
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
    </main>
  )
}
