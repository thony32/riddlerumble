/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { Avatar, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useUser } from "@/store/useUser"
import React, { useCallback, useState, useEffect, useRef } from "react"
import Map, { MapMouseEvent, MapRef, Marker, MarkerDragEvent } from "react-map-gl"
import Countdown, { CountdownRendererFn } from "react-countdown"
import Link from "next/link"
import SvgDecoEnigme from "@/components/Misc/SvgDecoEnigme"
import Image from "next/image"
import getCountryCode from "@/utils/getCountryCode"
import * as turf from "@turf/turf"
import "mapbox-gl/dist/mapbox-gl.css"

const PARTY_START_TIME_KEY = "partyStartTime"

const fetchRoom = async (roomId: string) => {
    const response = await fetch('/api/getRoom', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ room_id: roomId })
    });
    if (!response.ok) {
        throw new Error('Failed to fetch room data');
    }
    return response.json();
};

const create_temp_room = async (latitude: number, longitude: number, time: string, id_user: string, id_room: string) => {
    const response = await fetch("/api/createTempRoom", {
        body: JSON.stringify({ latitude, longitude, time, id_user, id_room }),
        method: "POST",
        headers: { "Content-Type": "application/json" },
    })
    if (!response.ok) throw new Error("Failed to create temp room")
    return await response.json()
}

const create_player_stat = async (score: number, id_user: string, id_room: string) => {
    const response = await fetch("/api/createPlayerStat", {
        body: JSON.stringify({ score, id_user, id_room }),
        method: "POST",
        headers: { "Content-Type": "application/json" },
    })
    if (!response.ok) throw new Error("Failed to create temp room")
    return await response.json()
}

const getTempRoom = async (id_room: string) => {
    const response = await fetch("/api/getTempRoomPerRoom", {
        body: JSON.stringify({ id_room }),
        method: "POST",
        headers: { "Content-Type": "application/json" },
    })
    if (!response.ok) throw new Error("Failed to fetch temp room")
    const jsonData = await response.json();
    return jsonData;
}

const disableRoom = async (id_room: string) => {
    const response = await fetch("/api/disableRoom", {
        body: JSON.stringify({ id_room }),
        method: "PUT",
        headers: { "Content-Type": "application/json" },
    })
    if (!response.ok) throw new Error("Failed to create temp room")
    return await response.json()
}

function Party({ params }: { params: { id: string } }) {
    const {
        isPending: isRoomPending,
        data: roomData,
    } = useQuery({
        queryKey: ["roomData"],
        queryFn: () => fetchRoom(params.id),
        staleTime: 1000 * 60 * 60 * 24,
    })

    const Completionist = () => {
        localStorage.removeItem(PARTY_START_TIME_KEY)
        const { isOpen, onOpen, onOpenChange } = useDisclosure();

        const {
            isPending: isTempRoomPending,
            data: tempRoomData,
        } = useQuery({
            queryKey: ["tempRoomData"],
            queryFn: () => getTempRoom(params.id),
        })

        const disableRoomFun = useMutation({
            mutationKey: ["disableRoomFun"],
            mutationFn: async () => {
                return await disableRoom(params.id)
            },
            onError: (error) => {
                console.log(error)
            },
            onSuccess: (data) => {
                console.log("Room disabled! ", data)
            },
        })

        useEffect(() => {
            setShowTarget(true)
            onOpen()
            mapRef.current?.flyTo({ center: [targetMarker.longitude, targetMarker.latitude], duration: 2000, zoom: 5 })
            disableRoomFun.mutate()
        }, [])
        return (
            <Modal className="-translate-x-[100%]" placement="bottom-center" isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Result</ModalHeader>
                            <ModalBody>
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 text-left">Pseudo</th>
                                            <th className="px-4 py-2 text-right">Time</th>
                                            <th className="px-4 py-2 text-right">Coordonates</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            isTempRoomPending ?
                                                <tr className="border-b border-current w-full">
                                                    <td colSpan={1} className='py-2'>
                                                        <div className='flex justify-start'>
                                                            <span className="loading loading-dots loading-md"></span>
                                                        </div>
                                                    </td>
                                                    <td colSpan={1} className='py-2'>
                                                        <div className='flex justify-end'>
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
                                                tempRoomData?.map((tempRoom: any, index: number) => (
                                                    <tr
                                                        key={index}
                                                        className="border-b border-current"
                                                    >
                                                        <td className="px-4 py-2 flex items-center gap-2 justify-between">
                                                            <div className="flex flex-col gap-1">
                                                                <Avatar
                                                                    className="w-5 h-5"
                                                                    showFallback
                                                                    name={tempRoom.id_user.pseudo}
                                                                    src={tempRoom.id_user.avatar}
                                                                    alt="Avatar"
                                                                />
                                                                <Image
                                                                    width={64}
                                                                    height={64}
                                                                    src={`https://flagsapi.com/${getCountryCode(tempRoom.id_user.nationality)}/shiny/64.png`}
                                                                    alt={tempRoom.id_user.pseudo}
                                                                    className="w-4"
                                                                />
                                                            </div>
                                                            <span>{tempRoom.id_user.pseudo}</span>
                                                        </td>
                                                        <td className="px-4 py-2 text-right">
                                                            {tempRoom.time}
                                                        </td>
                                                        <td className="px-4 py-2 text-right">Lat: {tempRoom.latitude.toFixed(2)} , Long: {tempRoom.longitude.toFixed(2)}</td>
                                                    </tr>
                                                ))
                                        }
                                    </tbody>
                                </table>
                            </ModalBody>
                            <ModalFooter>
                                <Link href={'/game'}>
                                    <Button>
                                        Close
                                    </Button>
                                </Link>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        )
    }

    const timerRender: CountdownRendererFn = ({ minutes, seconds, completed }) => {
        if (completed) {
            return <Completionist />
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

    if (roomData) {
        setTargetMarker({
            latitude: roomData.latitude,
            longitude: roomData.longitude
        })
    }

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

    const calculateScoreDistance = (distance: number, maxDistance: number = 1750) => {
        distance = Math.min(distance, maxDistance)
        let score = 100 - (distance / maxDistance) * 100
        score = Math.max(0, Math.min(100, score))

        return Math.round(score)
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
        onSuccess: (data) => {
            console.log("Temp Room created successfully! ", data)
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
        onSuccess: (data) => {
            console.log("Player Stat created successfully! ", data)
        },
    })

    const submitResult = () => {
        const elapsedTime = Date.now() - (startTime || Date.now())
        const elapsedMinutes = Math.floor(elapsedTime / 60000)
        const elapsedSeconds = Math.floor((elapsedTime % 60000) / 1000)
        const formattedElapsedTime = `${String(elapsedMinutes).padStart(2, "0")}:${String(elapsedSeconds).padStart(2, "0")}`
        setElapsedTime(formattedElapsedTime)

        const maxTime = 300000
        const timePercentage = (elapsedTime / maxTime) * 100
        const timeScore = Math.round(Math.max(0, 100 - timePercentage))

        const scoreDistance = calculateScoreDistance(distance)

        const goldenRatio = (1 + Math.sqrt(5)) / 2
        const distanceWeight = goldenRatio * 0.3
        const timeWeight = 1 / goldenRatio

        const totalScore = Math.round((scoreDistance * distanceWeight + timeScore * timeWeight) / (distanceWeight + timeWeight))
        setShowTarget(true)
        setTotalScore(roomData.level == 'high-level' ? totalScore : totalScore + 10)
        mapRef.current?.flyTo({ center: [targetMarker.longitude, targetMarker.latitude], duration: 2000, zoom: 5 })
        createTempRoom.mutate()
        createPlayerStat.mutate()
        localStorage.removeItem(PARTY_START_TIME_KEY)
    }

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
            if (document.hidden) {
                console.log("add penality points");
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

    return (
        <div className="w-full h-screen py-6 relative overflow-hidden">
            <div className="grid grid-cols-12 gap-10">
                <div className="col-span-2 relative space-y-4">
                    <div className="translate-y-14">
                        {
                            roomData &&
                            <h1 className={`text-center ${roomData.level == 'high-level' && 'text-red-500'}`}>{roomData.level == 'high-level' ? 'High Level (+10 pts)' : 'Normal Level'}</h1>
                        }
                        <h1 className="text-3xl text-center">Find the place</h1>
                        <SvgDecoEnigme />
                        {
                            isRoomPending ?
                                <div className="flex justify-center">
                                    <span className="loading loading-bars loading-md"></span>
                                </div>
                                :
                                <>
                                    <div dangerouslySetInnerHTML={{ __html: roomData.prompt }} />
                                </>
                        }
                        <SvgDecoEnigme />
                    </div>
                    <div className="absolute bottom-0 w-full py-2">
                        <div className="space-y-4">
                            {showTarget && (
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-2xl">Score: {totalScore}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-5">
                                            <div className="flex gap-1 items-center">
                                                <svg
                                                    className="w-6 stroke-current"
                                                    viewBox="0 0 64 64"
                                                    strokeWidth="3"
                                                    fill="none"
                                                >
                                                    <path d="M17.94,54.81a.1.1,0,0,1-.14,0c-1-1.11-11.69-13.23-11.69-21.26,0-9.94,6.5-12.24,11.76-12.24,4.84,0,11.06,2.6,11.06,12.24C28.93,41.84,18.87,53.72,17.94,54.81Z" />
                                                    <circle
                                                        cx="17.52"
                                                        cy="31.38"
                                                        r="4.75"
                                                    />
                                                    <path d="M49.58,34.77a.11.11,0,0,1-.15,0c-.87-1-9.19-10.45-9.19-16.74,0-7.84,5.12-9.65,9.27-9.65,3.81,0,8.71,2,8.71,9.65C58.22,24.52,50.4,33.81,49.58,34.77Z" />
                                                    <circle
                                                        cx="49.23"
                                                        cy="17.32"
                                                        r="3.75"
                                                    />
                                                    <path d="M17.87,54.89a28.73,28.73,0,0,0,3.9.89" />
                                                    <path
                                                        d="M24.68,56.07c2.79.12,5.85-.28,7.9-2.08,5.8-5.09,2.89-11.25,6.75-14.71a16.72,16.72,0,0,1,4.93-3"
                                                        strokeDasharray="7.8 2.92"
                                                    />
                                                    <path d="M45.63,35.8a23,23,0,0,1,3.88-.95" />
                                                </svg>
                                                <span className="text-sm">Distance:</span>
                                            </div>
                                            <p className="text-sm">{distance.toFixed(2)} km</p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex gap-1 items-center">
                                                <svg
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    className="w-5 stroke-current"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                    />
                                                </svg>
                                                <span className="text-sm">Elapse time :</span>
                                            </div>
                                            <p className="text-sm">{elapsedTime == "" ? "Failed" : elapsedTime}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="flex justify-center">
                                {!showTarget && (
                                    <Button
                                        onClick={submitResult}
                                        className="bg-green-500 text-white font-semibold"
                                    >
                                        Submit
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-10 rounded-2xl relative">
                    <div className="absolute z-50 top-3 left-3">
                        {
                            roomData &&
                            <Countdown
                                date={startTime + (roomData.delay)}
                                renderer={timerRender}
                            />
                        }
                    </div>
                    <Map
                        ref={mapRef as React.RefObject<MapRef>}
                        mapStyle="mapbox://styles/mapbox/streets-v12"
                        initialViewState={{
                            longitude: 46,
                            latitude: -18,
                            zoom: 4,
                        }}
                        onClick={clickPostion}
                        mapboxAccessToken="pk.eyJ1IjoidGhvbnkzMiIsImEiOiJjbHc5azQ5bWQwNWhjMmtxa2Q5dTcyNWxhIn0.pXpGUWi_9wWY3zwfflmzSQ"
                        style={{ width: "100%", height: "90dvh", margin: 0, padding: 0, borderRadius: "1rem", overflow: "hidden" }}
                    >
                        <Marker
                            longitude={marker.longitude}
                            latitude={marker.latitude}
                            anchor="bottom"
                            draggable={!showTarget ? true : false}
                            onDrag={onMarkerDrag}
                            onDragEnd={onMarkerDragEnd}
                        >
                            <svg
                                className="stroke-black w-10"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M12 22C16 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 8 18 12 22Z"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </Marker>
                        {showTarget && (
                            <Marker
                                longitude={targetMarker.longitude}
                                latitude={targetMarker.latitude}
                                anchor="bottom"
                            >
                                <svg
                                    className="stroke-black w-14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M16 13.3744C19.5318 14.0688 22 15.6547 22 17.5C22 19.9853 17.5228 22 12 22C6.47715 22 2 19.9853 2 17.5C2 15.6547 4.46819 14.0688 8 13.3744M12 17V3L17.3177 6.27244C17.7056 6.51114 17.8995 6.63049 17.9614 6.78085C18.0154 6.912 18.0111 7.0599 17.9497 7.18771C17.8792 7.33426 17.6787 7.44222 17.2777 7.65815L12 10.5"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </Marker>
                        )}
                    </Map>
                </div>
            </div>
        </div>
    )
}

export default Party
