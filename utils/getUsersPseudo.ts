export default function getUsersPseudo(user_pseudo: string) {
    return user_pseudo.split(", ").filter(Boolean)
}
