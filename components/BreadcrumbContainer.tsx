
export default function BreadcrumbContainer({ children }: any) {

    return <>
        <ol className="flex flex-row space-x-2 items-center pl-8 text-white h-16">
            {children}
        </ol>
    </>;

}
