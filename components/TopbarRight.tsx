
export default function TopbarRight({ children }: any) {
    return <>
        <div
            className="w-full md:w-1/4 flex flex-row p-2 justify-center md:justify-end">
            {children}
        </div>
    </>
}
