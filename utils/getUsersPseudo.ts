export default function getUsersPseudo(user_pseudo: string) {
    console.log("Erreur maivana : ", user_pseudo)
    return user_pseudo.split(", ").filter(Boolean)
}
