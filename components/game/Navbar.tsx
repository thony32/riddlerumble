import { auth } from "@/edgedb"
import getInitial from "@/utils/getInitials"
import { Avatar } from "@nextui-org/avatar"
import { Button } from "@nextui-org/button"
import Link from "next/link"

const Navbar = async ({ user }: any) => {
    return (
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-2xl">Enigmap</h1>
            </div>
            <div className="flex gap-8 items-center">
                <div className="flex items-center gap-2">
                    <Avatar showFallback name={getInitial(user.full_name)} src={user.avatar} />
                    <div className="flex flex-col text-right">
                        <span>{user.full_name}</span>
                        <span className="font-sans text-xs font-semibold">{user.pseudo}</span>
                    </div>
                </div>
                <Link href={auth.getSignoutUrl()}>
                    <Button className="rounded-full" isIconOnly aria-label="Logout">
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                        </svg>
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default Navbar
export const useClient = true;