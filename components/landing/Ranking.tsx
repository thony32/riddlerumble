import  Image  from 'next/image';

const Ranking = () => {
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
        <div className="bg-gray-900 text-white rounded-lg px-[10%]">
            <div className="px-4 py-2 flex items-center border-b border-gray-800">
                <div className="flex-1 font-bold">ENIGMAP</div>
                <div>INTERNATIONAL RANKING</div>
            </div>
            <table className="w-full text-sm">
                <thead>
                    <tr>
                        <th className="px-4 py-2 text-left">RANG</th>
                        <th className="px-4 py-2 text-left">AVATAR</th>
                        <th className="px-4 py-2 text-left">JOUEUR</th>
                        <th className="px-4 py-2 text-right">SCORE MOYEN</th>
                        <th className="px-4 py-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {players.map((player, index) => (
                        <tr
                            key={index}
                            className="border-b border-gray-800"
                        >
                            <td className="px-4 py-2">{player.rank}</td>
                            <td className="px-4 py-2 avatar">
                                <div className="avatar">
                                    <div className="w-8 rounded-full">
                                        <Image
                                            src="/images/pegi.png"
                                            alt="Avatar"
                                            width={50}
                                            height={50}
                                        />
                                    </div>
                                </div>
                            </td>
                            <td className="px-4 py-2">
                                <div>{player.name}</div>
                                <div className="text-gray-500 text-xs">{player.team}</div>
                            </td>
                            <td className="px-4 py-2 text-right">{player.score}</td>
                            <td className="px-4 py-2 text-right">
                                <button className="text-blue-500 btn btn-ghost btn-xs">{">"}</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Ranking
