"use client"
import MockTablet from "../misc/MockTablet"
import MockPhone from "../misc/MockPhone"
import MockDesktop from "../misc/MockDesktop"
import "../../styles/Mockup.css"

const Mockup = () => {
    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="space-y-10">
                <p className="text-4xl sm:text-7xl text-center sm:text-start sm:w-4/5 font-title-bold">
                    <span className="text-secondary font-title-bold">RR - The Map Quest</span> adapts beautifully to <span className="text-secondary font-title-bold">any screen size</span>, providing a seamless experience on all devices.
                </p>
                <div className="text-center sm:text-start">
                    <p className="text-xl sm:text-3xl"><span className="text-info">Android</span> and <span className="text-info">IOS</span> coming soon</p>
                </div>
            </div>
            <div className="flex justify-center gap-3 items-center pb-[8%] sm:pb-0">
                <div className="w-[50px] sm:w-[80px] h-[78px] sm:h-[128px] sm:translate-y-[85%]">
                    <MockPhone />
                </div>
                <div className="w-[175px] sm:w-[400px] h-[109px] sm:h-[250px]">
                    <MockDesktop />
                </div>
                <div className="w-[100px] sm:w-[250px] h-[63px] sm:h-[156px] sm:translate-y-[70%] sm:-translate-x-20">
                    <MockTablet />
                </div>
            </div>
        </div>
    )
}

export default Mockup