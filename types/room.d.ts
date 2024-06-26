export type Room = {
    id: string
    delay: number
    latitude: string
    longitude: string
    level: string
    prompt: string
    user_pseudo: string
    isActive: boolean
    created_at: Date | null
    modified_at: Date | null
}
