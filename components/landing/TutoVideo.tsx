"use client"
import { Button } from "@nextui-org/button"
import React from "react"

const TutoVideo = () => {
    return (
        <div className="flex flex-col justify-center gap-5 xl:grid xl:grid-cols-2 xl:gap-0 xl:h-screen">
            <div className="flex items-center">
                <div className="space-y-5">
                    <div className="flex flex-col items-center xl:items-start gap-4">
                        <h1 className="text-4xl md:text-7xl font-title-bold">What is <span className="text-secondary font-title-bold">RiddleRumble</span> ?</h1>
                        <p className="md:w-3/4 xl:w-2/3 md:text-2xl xl:text-start text-center">
                            In this game, players embark on a treasure hunt by solving riddles to <span className="text-info">locate specific places</span> on a map. Each riddle provides clues about the treasure&apos;s location, prompting
                            careful exploration of the virtual map. Players must <span className="text-info">interpret the clues</span> to identify landmarks or geographical features. Once they believe they&apos;ve found the right spot, they
                            click to see if they&apos;ve discovered the treasure. This immersive experience blends adventure with <span className="text-info">intellectual challenges</span> for hours of thrilling entertainment.
                        </p>
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
