/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { Avatar, Button } from "@nextui-org/react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useUser } from "@/store/useUser"
import { ReactTyped } from "react-typed"
import React, { useCallback, useState, useEffect, useRef } from "react"
import { Map, MapMouseEvent, MapRef, Marker, MarkerDragEvent } from "react-map-gl"
import Countdown, { CountdownRendererFn } from "react-countdown"
import Link from "next/link"
import dynamic from "next/dynamic"
const SvgDecoEnigme = dynamic(() => import("@/components/misc/SvgDecoEnigme"))
import * as turf from "@turf/turf"
import "mapbox-gl/dist/mapbox-gl.css"
import { redirect } from "next/navigation"
import { MAX_PLAYERS } from "@/utils/constants"
import useSelectedRoom from "@/store/useSelectedRoom"
const SvgMarker = dynamic(() => import("@/components/misc/SvgMarker"))
const SvgMarkerTarget = dynamic(() => import("@/components/misc/SvgMarkerTarget"))
import { create_player_stat, create_temp_room, fetchRoom, updateUserScore } from "@/services/party-service"
import Completionist from "@/components/game/Completionist"
import { MAPBOX_TOKEN } from "@/env"
import checkIfJoined from "@/utils/checkIfJoined"
import getUsersPseudo from "@/utils/getUsersPseudo"
import { SubmitResultParams } from "@/types/submit-result-params"
import { submitResult } from "@/utils/submitResult"
import toast, { Toaster } from 'react-hot-toast';
import { setBombCoordonate } from "@/services/game-service"
const PARTY_START_TIME_KEY = "partyStartTime"

const Party = ({ params }: { params: { id: string } }) => {
    const { isPending: isRoomPending, data: roomData } = useQuery({
        queryKey: ["roomData"],
        queryFn: () => fetchRoom(params.id),
        staleTime: 1000 * 60 * 60 * 24,
    })
    const [markerAllPlayers, setMarkerAllPlayers] = useState([])
    const [bombMarker, setBombMarker] = useState([]) as any
    const [bombSet, setBombSet] = useState(false)
    const [bombSubmitted, setBombSubmitted] = useState(false)
    const [bombFinalMarker, setBombFinalMarker] = useState([]) as any

    const timerRender: CountdownRendererFn = ({ minutes, seconds, completed }) => {
        if (completed) {
            return <Completionist params={params} setBombSubmitted={setBombSubmitted} setBombFinalMarker={setBombFinalMarker} setMarkerAllPlayers={setMarkerAllPlayers} setShowTarget={setShowTarget} mapRef={mapRef} targetMarker={targetMarker} />
        } else {
            const formattedMinutes = String(minutes).padStart(2, "0")
            const formattedSeconds = String(seconds).padStart(2, "0")

            return (
                <span className="text-3xl bg-base-200 px-2 rounded-lg">
                    {formattedMinutes}:{formattedSeconds}
                </span>
            )
        }
    }

    const mapRef = useRef<MapRef>(null!)
    const [marker, setMarker] = useState({
        latitude: 18,
        longitude: 46,
    })

    const [showTarget, setShowTarget] = useState(false)
    const [targetMarker, setTargetMarker] = useState({
        latitude: -18,
        longitude: 46,
    })

    useEffect(() => {
        if (roomData) {
            setTargetMarker({
                latitude: roomData.latitude,
                longitude: roomData.longitude,
            })
        }
    }, [roomData])

    const [startTime, setStartTime] = useState<number | null>(null)
    const [distance, setDistance] = useState(0)
    const [elapsedTime, setElapsedTime] = useState("")
    const [totalScore, setTotalScore] = useState(0)

    useEffect(() => {
        const savedStartTime = localStorage.getItem(PARTY_START_TIME_KEY)
        if (savedStartTime) {
            setStartTime(parseInt(savedStartTime, 10))
        } else {
            const newStartTime = Date.now()
            setStartTime(newStartTime)
            localStorage.setItem(PARTY_START_TIME_KEY, newStartTime.toString())
        }
    }, [])

    const onMarkerDrag = useCallback((event: MarkerDragEvent) => {
        setMarker({
            longitude: event.lngLat.lng,
            latitude: event.lngLat.lat,
        })
    }, [])

    const onMarkerDragEnd = useCallback((event: MarkerDragEvent) => {
        var from = turf.point([event.lngLat.lng, event.lngLat.lat])
        var to = turf.point([targetMarker.longitude, targetMarker.latitude])
        var options = { units: "kilometers" }
        var distance = turf.distance(from, to, options)

        setDistance(distance)
    }, [])

    const onBombMarkerDragEnd = useCallback((event: MarkerDragEvent) => {
        setBombMarker({
            longitude: event.lngLat.lng,
            latitude: event.lngLat.lat,
        })
    }, [])

    const clickPostion = (event: MapMouseEvent) => {
        if (!showTarget) {
            setMarker({
                longitude: event.lngLat.lng,
                latitude: event.lngLat.lat,
            })
            var from = turf.point([event.lngLat.lng, event.lngLat.lat])
            var to = turf.point([targetMarker.longitude, targetMarker.latitude])
            var options = { units: "kilometers" }
            var distance = turf.distance(from, to, options)

            setDistance(distance)
        }
    }

    const user = useUser((state) => state.user)
    const createTempRoom = useMutation({
        mutationKey: ["createTempRoom"],
        mutationFn: async () => {
            return await create_temp_room(marker.latitude, marker.longitude, elapsedTime, user?.id, roomData && roomData.id)
        },
        onError: (error) => {
            console.log(error)
        },
    })

    const createPlayerStat = useMutation({
        mutationKey: ["createPlayerStat"],
        mutationFn: async () => {
            return await create_player_stat(totalScore, user?.id, roomData && roomData.id)
        },
        onError: (error) => {
            console.log(error)
        },
    })

    const updateUserScoreMutation = useMutation({
        mutationKey: ["updateUserScoreMutatiom"],
        mutationFn: async () => {
            return await updateUserScore(user?.id, totalScore)
        },
        onError: (error) => {
            console.log(error)
        },
    })
    const setSelectedRoom = useSelectedRoom((state) => state.setSelectedRoom)

    const handleSubmitResult = () => {
        const submitParams: SubmitResultParams = {
            startTime,
            distance,
            setElapsedTime,
            setShowTarget,
            setTotalScore,
            penalityPoints,
            roomData,
            targetMarker,
            mapRef,
            createTempRoom,
            createPlayerStat,
            updateUserScoreMutation,
            user,
            setSelectedRoom: setSelectedRoom,
            PARTY_START_TIME_KEY,
        }
        submitResult(submitParams)
    }

    const [penalityPoints, setPenalityPoints] = useState(0)

    // NOTE: prevent dev tools and context menus
    useEffect(() => {
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault()
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey && e.shiftKey && e.key === "I") || (e.ctrlKey && e.key === "u") || e.key === "F12") {
                e.preventDefault()
            }
        }

        const handleTabNavSwitch = () => {
            if (document.hidden && !showTarget) {
                setPenalityPoints(penalityPoints + 10)
            }
        }

        document.addEventListener("contextmenu", handleContextMenu)
        document.addEventListener("keydown", handleKeyDown)
        document.addEventListener("visibilitychange", handleTabNavSwitch)

        return () => {
            document.removeEventListener("contextmenu", handleContextMenu)
            document.removeEventListener("keydown", handleKeyDown)
            document.removeEventListener("visibilitychange", handleTabNavSwitch)
        }
    }, [])

    if (startTime === null) {
        return (
            <div className="h-screen flex justify-center items-center">
                <span className="loading loading-ring loading-lg"></span>
            </div>
        )
    }

    const checkUnauthorization = () => {
        if (roomData) {
            const pseudoArray = getUsersPseudo(roomData?.user_pseudo)
            return !roomData.isActive || pseudoArray.length !== MAX_PLAYERS || !checkIfJoined(pseudoArray, user?.pseudo)
        }
    }

    const placeBomb = () => {
        setBombSet(true)
        setBombSubmitted(false)
        setBombMarker({
            latitude: targetMarker.latitude + 0.01,
            longitude: targetMarker.longitude - 0.2,
        })
        mapRef?.current.flyTo({
            center: [targetMarker.latitude + 0.01, targetMarker.longitude - 0.2],
            zoom: 10,
            essential: true,
        })
    }

    const submitBomb = () => {
        var from = turf.point([bombMarker.longitude, bombMarker.latitude])
        var to = turf.point([targetMarker.longitude, targetMarker.latitude])
        var options = { units: "kilometers" }
        var distance = turf.distance(from, to, options)

        if (distance <= 500) {
            toast.error("You can't place the bomb so close to the target, be FAIR PLAY !!!");
        } else {
            setBombCoordonate(roomData.id, `${bombMarker.latitude},${bombMarker.longitude}`);
            toast.success("Bomb placed successfully, You little devil !!!");
            setBombSet(false)
            setBombSubmitted(true)
        }
    }

    if (checkUnauthorization() && process.env.NODE_ENV === "production") {
        redirect("/game/")
    }

    return (
        <div className="w-full min-h-screen py-6 xl:overflow-hidden z-50 bg-base-100">
            <Toaster />
            <div className="flex flex-col xl:grid xl:grid-cols-12 gap-10">
                <div className="xl:col-span-2 relative space-y-8">
                    <div className="xl:translate-y-14">
                        <div className="flex flex-col justify-center items-center my-5 space-y-2">
                            {roomData?.joker == user?.pseudo && <h1 className="text-center text-success text-xl">You got the Joker !!!</h1>}
                            {
                                !bombSubmitted &&
                                <>
                                    {
                                        !bombSet ?
                                            <Button onClick={placeBomb} className="bg-warning text-warning-content">
                                                <span>Place bomb</span>
                                                <svg className="w-6" viewBox="0 0 24 24">
                                                    <path d="m18.293 4.293-1.086 1.086-1.086-1.086a.999.999 0 0 0-1.414 0l-1.249 1.249A8.427 8.427 0 0 0 10.499 5C5.813 5 2 8.813 2 13.5S5.813 22 10.499 22s8.5-3.813 8.5-8.5a8.42 8.42 0 0 0-.431-2.654L19.914 9.5a.999.999 0 0 0 0-1.414l-1.293-1.293 1.09-1.09C19.94 5.474 20.556 5 21 5h1V3h-1c-1.4 0-2.584 1.167-2.707 1.293zM10.499 10c-.935 0-1.813.364-2.475 1.025A3.48 3.48 0 0 0 7 13.5H5c0-1.468.571-2.849 1.609-3.888A5.464 5.464 0 0 1 10.499 8v2z"></path>
                                                </svg>
                                            </Button>
                                            :
                                            <Button onClick={submitBomb} className="bg-success">
                                                <span>Submit bomb</span>
                                                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                </svg>
                                            </Button>
                                    }
                                </>

                            }
                        </div>
                        {roomData && <h1 className={`text-center ${roomData.level == "high-level" && "text-red-500"}`}>{roomData.level == "high-level" ? "High Level (+10 pts)" : "Normal Level"}</h1>}
                        <h1 className="text-3xl text-center">Find the place</h1>
                        <SvgDecoEnigme />
                        {isRoomPending ? (
                            <div className="flex justify-center">
                                <span className="loading loading-bars loading-md"></span>
                            </div>
                        ) : (
                            <div className="text-center sm:text-left">
                                <ReactTyped startWhenVisible strings={[roomData.prompt]} typeSpeed={40} />
                            </div>
                        )}
                        <SvgDecoEnigme />
                    </div>
                    <div className="w-full py-2">
                        <div className="space-y-4">
                            {!showTarget && penalityPoints != 0 && (
                                <div className="text-center translate-y-2">
                                    <label className="text-red-500">Penality Points : - {penalityPoints} pts</label>
                                </div>
                            )}
                            {showTarget && (
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-2xl">Score: {totalScore}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-5">
                                            <div className="flex gap-1 items-center">
                                                <svg className="w-6 stroke-current" viewBox="0 0 64 64" strokeWidth="3" fill="none">
                                                    <path d="M17.94,54.81a.1.1,0,0,1-.14,0c-1-1.11-11.69-13.23-11.69-21.26,0-9.94,6.5-12.24,11.76-12.24,4.84,0,11.06,2.6,11.06,12.24C28.93,41.84,18.87,53.72,17.94,54.81Z" />
                                                    <circle cx="17.52" cy="31.38" r="4.75" />
                                                    <path d="M49.58,34.77a.11.11,0,0,1-.15,0c-.87-1-9.19-10.45-9.19-16.74,0-7.84,5.12-9.65,9.27-9.65,3.81,0,8.71,2,8.71,9.65C58.22,24.52,50.4,33.81,49.58,34.77Z" />
                                                    <circle cx="49.23" cy="17.32" r="3.75" />
                                                    <path d="M17.87,54.89a28.73,28.73,0,0,0,3.9.89" />
                                                    <path d="M24.68,56.07c2.79.12,5.85-.28,7.9-2.08,5.8-5.09,2.89-11.25,6.75-14.71a16.72,16.72,0,0,1,4.93-3" strokeDasharray="7.8 2.92" />
                                                    <path d="M45.63,35.8a23,23,0,0,1,3.88-.95" />
                                                </svg>
                                                <span className="text-sm">Distance:</span>
                                            </div>
                                            <p className="text-sm">{distance.toFixed(2)} km</p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex gap-1 items-center">
                                                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="w-5 stroke-current">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg>
                                                <span className="text-sm">Elapse time :</span>
                                            </div>
                                            <p className="text-sm">{elapsedTime == "" ? "Failed" : elapsedTime}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="flex justify-center">
                                {!showTarget ? (
                                    <Button onClick={handleSubmitResult} className="bg-green-500 text-white font-semibold">
                                        Submit
                                    </Button>
                                ) : (
                                    <Link href={"/game"}>
                                        <Button>Close</Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-10 rounded-2xl relative">
                    <div className="xl:absolute z-50 xl:top-3 xl:left-3">{roomData && <Countdown date={startTime + 20000} renderer={timerRender} />}</div>
                    <Map
                        ref={mapRef}
                        mapStyle="mapbox://styles/mapbox/streets-v12"
                        initialViewState={{
                            longitude: 46,
                            latitude: -18,
                            zoom: 4,
                        }}
                        onClick={clickPostion}
                        mapboxAccessToken="pk.eyJ1IjoidGhvbnkzMiIsImEiOiJjbHc5azQ5bWQwNWhjMmtxa2Q5dTcyNWxhIn0.pXpGUWi_9wWY3zwfflmzSQ"
                        style={{ width: "100%", height: "85dvh", margin: 0, padding: 0, borderRadius: "1rem", overflow: "hidden" }}
                    >
                        <Marker longitude={marker.longitude} latitude={marker.latitude} anchor="bottom" draggable={!showTarget ? true : false} onDrag={onMarkerDrag} onDragEnd={onMarkerDragEnd}>
                            <SvgMarker />
                        </Marker>
                        {/* result marker */}
                        {showTarget && (
                            <Marker longitude={targetMarker.longitude} latitude={targetMarker.latitude} anchor="bottom">
                                <SvgMarkerTarget />
                            </Marker>
                        )}
                        {/* all players markers */}
                        {markerAllPlayers &&
                            markerAllPlayers.map((marker: any, index: number) => (
                                <Marker key={index} longitude={marker.longitude} latitude={marker.latitude} anchor="bottom">
                                    <Avatar isBordered color="primary" showFallback name="M" src={marker.User.avatar!} />
                                </Marker>
                            ))}

                        {
                            roomData?.joker == user?.pseudo && bombSet &&
                            <Marker draggable={bombSubmitted == false ? true : false} longitude={bombMarker.longitude} latitude={bombMarker.latitude} onDragEnd={onBombMarkerDragEnd} anchor="bottom">
                                <svg className="w-10 fill-error" viewBox="0 0 24 24">
                                    <path d="m18.293 4.293-1.086 1.086-1.086-1.086a.999.999 0 0 0-1.414 0l-1.249 1.249A8.427 8.427 0 0 0 10.499 5C5.813 5 2 8.813 2 13.5S5.813 22 10.499 22s8.5-3.813 8.5-8.5a8.42 8.42 0 0 0-.431-2.654L19.914 9.5a.999.999 0 0 0 0-1.414l-1.293-1.293 1.09-1.09C19.94 5.474 20.556 5 21 5h1V3h-1c-1.4 0-2.584 1.167-2.707 1.293zM10.499 10c-.935 0-1.813.364-2.475 1.025A3.48 3.48 0 0 0 7 13.5H5c0-1.468.571-2.849 1.609-3.888A5.464 5.464 0 0 1 10.499 8v2z"></path>
                                </svg>
                            </Marker>
                        }
                        {
                            bombFinalMarker && bombFinalMarker.longitude && bombFinalMarker.latitude &&
                            <Marker longitude={bombFinalMarker.longitude} latitude={bombFinalMarker.latitude} anchor="bottom">
                                <svg className="w-10 fill-error" viewBox="0 0 24 24">
                                    <path d="m18.293 4.293-1.086 1.086-1.086-1.086a.999.999 0 0 0-1.414 0l-1.249 1.249A8.427 8.427 0 0 0 10.499 5C5.813 5 2 8.813 2 13.5S5.813 22 10.499 22s8.5-3.813 8.5-8.5a8.42 8.42 0 0 0-.431-2.654L19.914 9.5a.999.999 0 0 0 0-1.414l-1.293-1.293 1.09-1.09C19.94 5.474 20.556 5 21 5h1V3h-1c-1.4 0-2.584 1.167-2.707 1.293zM10.499 10c-.935 0-1.813.364-2.475 1.025A3.48 3.48 0 0 0 7 13.5H5c0-1.468.571-2.849 1.609-3.888A5.464 5.464 0 0 1 10.499 8v2z"></path>
                                </svg>
                            </Marker>
                        }
                    </Map>
                </div>
            </div >
        </div >
    )
}

export default Party
