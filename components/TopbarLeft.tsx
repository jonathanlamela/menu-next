
export default function TopbarLeft({ children }: any) {
    return <>
        <div
            className="w-full md:w-3/4 flex p-2 justify-center md:justify-start">
            {children}
        </div>
    </>
}
