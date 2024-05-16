"use client"
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

const getAllUser = async () => {
    const response = await fetch('/api/getAllUser');
    if (!response.ok) {
        throw new Error('Failed to fetch IP info');
    }
    const jsonData = await response.json();
    return jsonData;
}

const Ranking = () => {

    const {
        isPending: isAllUserPending,
        error: allUserError,
        data: allUserData,
    } = useQuery({
        queryKey: ["allUser"],
        queryFn: () => getAllUser(),
        staleTime: 1000 * 60 * 60 * 24,
    })

    console.log(allUserData)

    const players = [
        { rank: 1, evolution: 1, name: "JEAN-LOUP AUTRET", team: "EDG LES RONALDAMAX", score: 65 },
        { rank: 2, evolution: 1, name: "LILOUAN V", team: "CSC OTTOKS", score: 63 },
        { rank: 3, evolution: 0, name: "MARTIN LAFARGUE", team: "DOUAT", score: 58 },
        { rank: 4, evolution: 1, name: "MARCO DI STASIO", team: "PANIS", score: 50 },
        { rank: 5, evolution: 1, name: "AMAURY MAM", team: "CRETEIL", score: 47 },
        { rank: 6, evolution: 1, name: "SIMON FISEL", team: "PARIS", score: 45 },
        { rank: 7, evolution: 0, name: "THOMAS JORDA", team: "LYON", score: 45 },
        { rank: 8, evolution: 1, name: "KARIM GHARIANI", team: "LILLE", score: 45 },
        { rank: 9, evolution: 1, name: "JOHNNY LEROUX", team: "PARIS", score: 42 },
        { rank: 10, evolution: 1, name: "CLÉMENT PODEVIN", team: "PARIS", score: 41 },
    ]

    return (
        <div className="rounded-lg px-[20%]">
            <div className="px-4 py-2 flex items-center border-b border-current">
                <div className="flex-1 font-bold text-xl">ENIGMAP</div>
                <div className='text-xl'>INTERNATIONAL RANKING</div>
            </div>
            <table className="w-full text-sm">
                <thead>
                    <tr>
                        <th className="w-[5%] px-4 py-2 text-center">Rank</th>
                        <th className="w-[10%] px-4 py-2 text-center">AVATAR</th>
                        <th className="px-4 py-2 text-left">PLAYER</th>
                        <th className="px-4 py-2 text-right">SCORE</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        isAllUserPending ?
                            <>
                                Chargement
                            </>
                            :
                            allUserData.map((player: any, index: any) => (
                                <tr
                                    key={index}
                                    className="border-b border-current"
                                >
                                    <td className="px-4 py-2 text-center">{index + 1}</td>
                                    <td className="px-4 py-2 flex justify-center">
                                        <div className="avatar">
                                            <div className="w-8 rounded-full">
                                                <Image
                                                    src={player.avatar}
                                                    alt="Avatar"
                                                    width={50}
                                                    height={50}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2">
                                        <div>{player.pseudo}</div>
                                        <div className="text-current opacity-55 text-xs">{player.full_name}</div>
                                    </td>
                                    <td className="px-4 py-2 text-right">{player.score}</td>
                                </tr>
                            ))}
                </tbody>
            </table>
        </div>
    )
}

export default Ranking
