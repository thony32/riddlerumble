"use client"
import { Button } from "@nextui-org/button"
import React from "react"

const TutoVideo = () => {
    return (
        <div className="flex flex-col justify-center gap-5 xl:grid xl:grid-cols-2 xl:gap-0 xl:h-screen">
            <div className="flex items-center">
                <div className="space-y-16">
                    <div className="flex flex-col items-center xl:items-start gap-4">
                        <h1 className="text-4xl md:text-7xl font-title-bold">What is <span className="text-primary font-title-bold">RiddleRumble</span> ?</h1>
                        <p className="md:w-3/4 xl:w-2/3 md:text-2xl xl:text-start text-center">
                            In this game, players embark on a treasure hunt by solving riddles to <span className="text-info">locate specific places</span> on a map. Each riddle provides clues about the treasure&apos;s location, prompting
                            careful exploration of the virtual map. Players must <span className="text-info">interpret the clues</span> to identify landmarks or geographical features. Once they believe they&apos;ve found the right spot, they
                            click to see if they&apos;ve discovered the treasure. This immersive experience blends adventure with <span className="text-info">intellectual challenges</span> for hours of thrilling entertainment.
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center sm:justify-start gap-10 z-[999]">
                        <div className="flex gap-4 items-center justify-center flex-col group">
                            <svg className="w-20 sm:w-40 group-hover:scale-125 duration-500 ease-soft-spring fill-primary" viewBox="0 0 32 32">
                                <path d="M22,20c-1.2,0-2.3,0.3-3.3,1H17v-3.1c4.5-0.5,8-4.3,8-8.9c0-5-4-9-9-9S7,4,7,9c0,4.6,3.5,8.4,8,8.9V21h-1.7
	c-1-0.7-2.1-1-3.3-1c-3.3,0-6,2.7-6,6s2.7,6,6,6c1.2,0,2.3-0.3,3.3-1h5.4c1,0.7,2.1,1,3.3,1c3.3,0,6-2.7,6-6S25.3,20,22,20z M12,27
	h-1v1c0,0.6-0.4,1-1,1s-1-0.4-1-1v-1H8c-0.6,0-1-0.4-1-1s0.4-1,1-1h1v-1c0-0.6,0.4-1,1-1s1,0.4,1,1v1h1c0.6,0,1,0.4,1,1
	S12.6,27,12,27z M22.9,8h-2.3c-0.1-2-0.5-3.7-1.1-5C21.3,4,22.6,5.9,22.9,8z M20.7,10h2.3c-0.3,2.1-1.6,4-3.4,5
	C20.2,13.7,20.6,12,20.7,10z M16,2c1,0,2.4,2.3,2.7,6h-5.3C13.6,4.3,15,2,16,2z M9.1,10h2.3c0.1,2,0.5,3.7,1.1,5
	C10.7,14,9.4,12.1,9.1,10z M11.3,8H9.1c0.3-2.1,1.6-4,3.4-5C11.8,4.3,11.4,6,11.3,8z M16,16c-1,0-2.4-2.3-2.7-6h5.3
	C18.4,13.7,17,16,16,16z M21.9,27.4c0,0.1-0.1,0.2-0.2,0.3c-0.1,0.1-0.2,0.2-0.3,0.2S21.1,28,21,28c-0.3,0-0.5-0.1-0.7-0.3
	c-0.1-0.1-0.2-0.2-0.2-0.3c0-0.1-0.1-0.3-0.1-0.4s0-0.3,0.1-0.4c0-0.1,0.1-0.2,0.2-0.3c0.1-0.1,0.2-0.2,0.3-0.2
	c0.4-0.2,0.8-0.1,1.1,0.2c0.1,0.1,0.2,0.2,0.2,0.3c0,0.1,0.1,0.3,0.1,0.4S22,27.3,21.9,27.4z M23.7,25.7C23.5,25.9,23.3,26,23,26
	c-0.1,0-0.3,0-0.4-0.1s-0.2-0.1-0.3-0.2C22.1,25.5,22,25.3,22,25c0-0.1,0-0.3,0.1-0.4c0-0.1,0.1-0.2,0.2-0.3
	c0.1-0.1,0.2-0.2,0.3-0.2c0.2-0.1,0.5-0.1,0.8,0c0.1,0,0.2,0.1,0.3,0.2c0.1,0.1,0.2,0.2,0.2,0.3c0,0.1,0.1,0.3,0.1,0.4
	C24,25.3,23.9,25.5,23.7,25.7z" />
                            </svg>
                            <span className="text-4xl text-primary">Multiplayer</span>
                        </div>
                        <div className="flex gap-4 items-center justify-center flex-col group">
                            <span className="text-4xl text-primary">Funny</span>
                            <svg className="w-20 sm:w-40 group-hover:scale-125 duration-500 ease-soft-spring stroke-primary" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
                                <path
                                    d="M8.9126 15.9336C10.1709 16.249 11.5985 16.2492 13.0351 15.8642C14.4717 15.4793 15.7079 14.7653 16.64 13.863"
                                    strokeWidth="1.5" strokeLinecap="round" />
                                <path
                                    d="M13 16.0004L13.478 16.9742C13.8393 17.7104 14.7249 18.0198 15.4661 17.6689C16.2223 17.311 16.5394 16.4035 16.1708 15.6524L15.7115 14.7168"
                                    strokeWidth="1.5" />
                            </svg>
                        </div>
                        <div className="flex gap-4 items-center justify-center flex-col group">
                            <svg className="w-20 sm:w-40 group-hover:scale-125 duration-500 ease-soft-spring fill-primary" viewBox="0 0 512 512">
                                <path
                                    d="M341.325,245.332c-11.797,0-21.333,9.536-21.333,21.333v21.461c-18.219-13.653-40.619-21.461-64-21.461
				c-58.816,0-106.667,47.851-106.667,106.667c0,58.816,47.851,106.667,106.667,106.667c18.731,0,37.184-4.928,53.333-14.272
				c10.219-5.888,13.717-18.965,7.808-29.141c-5.909-10.24-18.965-13.739-29.141-7.808c-9.685,5.589-20.757,8.555-32,8.555
				c-35.285,0-64-28.715-64-64s28.715-64,64-64c18.219,0,35.221,8.085,47.232,21.333h-25.899c-11.797,0-21.333,9.536-21.333,21.333
				s9.536,21.333,21.333,21.333h64c11.797,0,21.333-9.536,21.333-21.333v-85.333C362.658,254.868,353.122,245.332,341.325,245.332z" />
                                <path d="M446.784,186.113c-9.749-73.387-76.949-154.112-157.76-154.112c-43.328,0-87.381,21.291-116.8,55.445
				c-9.408-3.435-19.371-5.205-29.525-5.205c-45.973,0-83.648,36.224-85.952,81.643C22.784,185.772,0,226.198,0,266.668
				c0,25.344,8.405,53.461,23.061,77.12c18.091,29.227,50.261,47.936,85.227,50.389c-0.96-6.827-1.621-13.76-1.621-20.843
				c0-82.325,66.987-149.333,149.333-149.333c11.541,0,23.083,1.387,34.304,4.075c11.691-15.424,30.208-25.408,51.029-25.408
				c35.285,0,64,28.715,64,64v85.333c0,16.427-6.357,31.317-16.555,42.667h13.675c55.36,0,103.168-41.216,108.843-93.845
				c0.469-4.203,0.704-8.491,0.704-12.821C512,239.02,486.912,200.684,446.784,186.113z" />
                            </svg>
                            <span className="text-4xl text-primary">Realtime</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center">
                <div className="stack w-full">
                    <div className="card shadow-md bg-primary text-primary-content">
                        <div className="overflow-hidden w-full rounded-2xl">
                            <iframe
                                className="w-full h-[75dvh]"
                                src={`https://www.youtube.com/embed/GUF43rwIQ9E`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                    <div className="card shadow bg-primary text-primary-content">
                        <div className="card-body"></div>
                    </div><></>
                    <div className="card shadow-sm bg-primary text-primary-content">
                        <div className="card-body"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TutoVideo
