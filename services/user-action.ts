import e from "@/dbschema/edgeql-js"
import { client } from "@/edgedb";

class UserAction {
    async getData(identity: string): Promise<any> {
        const getUserData = e.select(e.Users, (user) => ({
            avatar: true,
            email: true,
            full_name: true,
            pseudo: true,
            score: true,
            nationality: true,
            filter_single: e.op(user.identity.id, '=', e.uuid(identity))
        }))
        const user = await getUserData.run(client)
        return user;
    }
}

export default new UserAction();