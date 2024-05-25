export default function getUsersPseudo(user_pseudo: string | null) {
    if (!user_pseudo) {
        console.log("Erreur maivana : user_pseudo is null or undefined");
        return [];
    }
    console.log("Erreur maivana : ", user_pseudo);
    return user_pseudo.split(", ").filter(Boolean);
}