import getInitial from "@/utils/getInitials"
import { Avatar } from "@nextui-org/avatar"
import BtnLogout from "./BtnLogout"
import { useUser } from "@/store/useUser"
import Link from "next/link"

const Navbar = () => {
    const user = useUser((state) => state.user)

    return (
        <div className="flex justify-between items-center border-b-1 border-current pb-4">
            <div>
                <Link href="/">
                    <h1 className="text-2xl">Enigmap</h1>
                </Link>
            </div>
            <div className="flex gap-8 items-center">
                <div className="flex items-center gap-2 relative">
                    {user != null && (
                        <>
                            <Avatar
                                isBordered
                                color="primary"
                                showFallback
                                name={getInitial(user.full_name)}
                                src={user.avatar!}
                            />
                            <div className="flex flex-col text-right">
                                <span>{user.full_name}</span>
                                <span className="font-sans text-xs font-semibold">{user.pseudo}</span>
                            </div>
                        </>
                    )}
                </div>
                <BtnLogout />
            </div>
        </div>
    )
}

export default Navbar
