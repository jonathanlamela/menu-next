

export default function Topbar({ children }: any) {
    return <>
        <div className="w-full bg-red-900 flex flex-col md:flex-row p-1">
            {children}
        </div>
    </>
}
