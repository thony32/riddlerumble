import dynamic from "next/dynamic"
const PlayerProfil = dynamic(() => import("./PlayerProfil"))

const Stats = () => {
    return (
        <div className="p-5 max-[1500px]:hidden">
            <div className="space-y-10 sticky top-0">
                <div className="flex items-center gap-5">
                    <h1 className="text-3xl">Your Stats</h1>
                    <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-8">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
                        />
                    </svg>
                </div>
                <div className="h-[80dvh] overflow-y-auto">
                    <PlayerProfil />
                </div>
            </div>
        </div>
    )
}

export default Stats
