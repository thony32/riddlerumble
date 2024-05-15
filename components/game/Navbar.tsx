import getInitial from "@/utils/getInitials"
import { Avatar } from "@nextui-org/avatar"
import BtnLogout from "./BtnLogout"
import ProfilSetting from "./ProfilSetting"
const Navbar = async ({ user }: any) => {
    return (
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-2xl">Enigmap</h1>
            </div>
            <div className="flex gap-8 items-center">
                <div className="flex items-center gap-2 relative">
                    <Avatar showFallback name={getInitial(user.full_name)} src={user.avatar} />
                    <div className="flex flex-col text-right">
                        <span>{user.full_name}</span>
                        <span className="font-sans text-xs font-semibold">{user.pseudo}</span>
                    </div>
                    <div className="absolute -top-2 -left-3 z-50">
                        <ProfilSetting user={user} />
                    </div>
                </div>
                <BtnLogout />
            </div>
        </div>
    )
}

export default Navbar