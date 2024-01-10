import { CrudType } from "@/src/types";
import Link from "next/link";


export default function AdminPagination(props: { params: CrudType, count: number }) {


    const { count, params } = props;

    var pages = Math.ceil(count / params.perPage);

    const renderPage = (num: number) => {
        if (num == params.page) {
            return <>
                <Link href={
                    {
                        href: "./",
                        query: {
                            ...params,
                            page: num
                        }
                    }
                }>
                    <button key={num} className="btn-secondary-outlined-active">{num}</button>
                </Link>
            </>
        } else {
            return <>
                <Link href={
                    {
                        href: "./",
                        query: {
                            ...params,
                            page: num
                        }
                    }
                }>
                    <button key={num} className="btn-secondary-outlined">{num}</button>
                </Link>
            </>
        }
    }

    const nextButton = () => {
        var num = params.page + 1;

        if (num <= pages) {

            return <>
                <Link key={num} href={
                    {
                        href: "./",
                        query: {
                            ...params,
                            page: num
                        }
                    }
                }>
                    <button className="btn-secondary-outlined">Prossima</button>
                </Link>
            </>

        } else {

            return <button disabled key={num} className="btn-secondary-outlined">Prossima</button>
        }

    }

    const previuousButton = () => {
        var num = params.page - 1;

        if (num > 0) {
            return <>
                <Link key={num} href={
                    {
                        href: "./",
                        query: {
                            ...params,
                            page: num
                        }
                    }
                }>
                    <button className="btn-secondary-outlined">Precedente</button>
                </Link>
            </>
        } else {
            return <button disabled key={num} className="btn-secondary-outlined">Precedente</button>
        }

    }

    return <>
        <div className="flex flex-row space-x-2 h-10">
            {previuousButton()}
            {[...Array(pages)].map((num: number, index: number) => renderPage(index + 1))}
            {nextButton()}
        </div>
    </>
}
