"use client"

import { getUserGames } from "@/services/profil-service"
import getUsersPseudo from "@/utils/getUsersPseudo"
import { useQuery } from "@tanstack/react-query"
import { formatDistanceToNow } from "date-fns"

const LastGames = ({ id_user }: { id_user: string }) => {
    const { isPending: isUserGamesPending, data: userGamesData } = useQuery({
        queryKey: ["userGamesData"],
        queryFn: () => getUserGames(id_user),
        staleTime: 1000 * 60 * 60 * 24,
    })

    return (
        <div>
            <table className="w-full text-sm overflow-x-auto">
                <thead>
                    <tr>
                        <th className="py-2 px-3"></th>
                        <th className="py-2 px-3 text-right">Date</th>
                        <th className="py-2 px-3 text-right">Level</th>
                        <th className="py-2 px-3 text-center">Score</th>
                        <th className="py-2 px-3 text-center">Players</th>
                    </tr>
                </thead>
                <tbody>
                    {isUserGamesPending ? (
                        <tr className="border-b border-current w-full">
                            <td colSpan={1} className="py-2">
                                <div className="flex justify-center">
                                    <span className="loading loading-dots loading-md"></span>
                                </div>
                            </td>
                            <td colSpan={1} className="py-2">
                                <div className="flex justify-end">
                                    <span className="loading loading-dots loading-md"></span>
                                </div>
                            </td>
                            <td colSpan={1} className="py-2">
                                <div className="flex justify-end">
                                    <span className="loading loading-dots loading-md"></span>
                                </div>
                            </td>
                            <td colSpan={1} className="py-2">
                                <div className="flex justify-center">
                                    <span className="loading loading-dots loading-md"></span>
                                </div>
                            </td>
                            <td colSpan={1} className="py-2">
                                <div className="flex justify-center">
                                    <span className="loading loading-dots loading-md"></span>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        userGamesData.map((game: any, index: number) => (
                            <tr key={game.id} className="border-b border-current w-full">
                                <td className="py-2 px-3 text-center">{index + 1}</td>
                                <td className="py-2 px-3 text-right flex max-sm:flex-col justify-between items-center gap-2">
                                    <span className="text-xs">{new Date(game.created_at).toLocaleDateString()}</span>
                                    <span className="text-[6pt] sm:text-xs badge badge-info">
                                        {formatDistanceToNow(new Date(game.created_at || new Date()), { includeSeconds: true, addSuffix: true })}
                                    </span>
                                </td>
                                <td className="py-2 px-3 text-right">{game.Room.level == "normal-level" ? "Normal" : "High"}</td>
                                <td className="py-2 px-3 text-center">{game.score}</td>
                                <td className="py-2 px-3 text-center">{getUsersPseudo(game.Room.user_pseudo).length}</td>
                            </tr>
                        ))
                    )}
                    {!isUserGamesPending && userGamesData && userGamesData.length == 0 && (
                        <tr className="border-b border-current w-full">
                            <td colSpan={5} className="py-2">
                                <div className="flex justify-center">
                                    <span>No games found</span>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default LastGames
