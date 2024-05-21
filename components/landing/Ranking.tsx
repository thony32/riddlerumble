"use client"
import { Avatar } from '@nextui-org/avatar';
import { useQuery } from '@tanstack/react-query';
import getCountryCode from '@/utils/getCountryCode';
import getInitial from '@/utils/getInitials';
import Image from 'next/image';

type Player = {
    avatar: string
    email: string
    full_name: string
    pseudo: string
    score: number
    nationality: string
}

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

    return (
        <div className="flex flex-col xl:grid xl:grid-cols-2 px-[10%] gap-10">
            <div>
                <div className="px-2 py-2 flex items-center border-b border-current">
                    <div className="flex-1 font-bold text-lg xl:text-xl">ENIGMAP</div>
                    <div className='text-lg xl:text-xl'>INTERNATIONAL RANKING</div>
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
                                <tr className="border-b border-current w-full">
                                    <td colSpan={1} className='py-2'>
                                        <div className='flex justify-center'>
                                            <span className="loading loading-dots loading-md"></span>
                                        </div>
                                    </td>
                                    <td colSpan={1} className='py-2'>
                                        <div className='flex justify-center'>
                                            <span className="loading loading-dots loading-md"></span>
                                        </div>
                                    </td>
                                    <td colSpan={1} className='py-2'>
                                        <div className='flex justify-start px-4'>
                                            <span className="loading loading-dots loading-md"></span>
                                        </div>
                                    </td>
                                    <td colSpan={1} className='py-2'>
                                        <div className='flex justify-end px-4'>
                                            <span className="loading loading-dots loading-md"></span>
                                        </div>
                                    </td>
                                </tr>
                                :
                                allUserData?.map((player: Player, index: number) => (
                                    <tr
                                        key={index}
                                        className="border-b border-current"
                                    >
                                        <td className="px-4 py-2 text-center">{index + 1}</td>
                                        <td className="px-4 py-2 flex justify-center">
                                            <div className="avatar">
                                                <div className="w-8 rounded-full">
                                                    <Avatar
                                                        showFallback
                                                        name={getInitial(player.full_name)}
                                                        src={player.avatar}
                                                        alt="Avatar"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-2">
                                            <div className='flex gap-3 items-center'>
                                                <Image
                                                    width={64}
                                                    height={64}
                                                    src={`https://flagsapi.com/${getCountryCode(player.nationality)}/shiny/64.png`}
                                                    alt={getInitial(player.full_name)}
                                                    className="w-7 h-7"
                                                />
                                                <div>
                                                    <div>{player.pseudo}</div>
                                                    <div className="text-current opacity-55 text-xs">{player.full_name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-2 text-right">{player.score}</td>
                                    </tr>
                                ))
                        }
                        {
                            allUserError && (
                                <tr className="border-b border-current w-full">
                                    <td colSpan={4} className='py-2'>
                                        <div className='flex justify-center'>
                                            <span className="text-red-400">Failed to fetch data</span>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <div className='flex items-center relative'>
                <h1 className='text-right text-4xl md:text-6xl xl:text-8xl'>
                    Player Rankings: Discover <span className='text-primary'>the top</span> scores in real time!
                </h1>
            </div>
        </div>
    )
}

export default Ranking
