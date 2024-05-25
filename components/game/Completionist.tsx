import React, { useEffect, forwardRef, MutableRefObject } from "react"
import { Avatar, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react"
import { useQuery, useMutation } from "@tanstack/react-query"
import Link from "next/link"
import Image from "next/image"
import getCountryCode from "@/utils/getCountryCode"
import { getTempRoom, disableRoom, fetchRoom, updateScoreBomb } from "@/services/party-service"
import { MapRef } from "react-map-gl"
import calculDistancePosition from "@/utils/calculDistancePostion"

const PARTY_START_TIME_KEY = "partyStartTime"

interface CompletionistProps {
    params: { id: string }
    setBombSubmitted: (bomb: boolean) => void
    setBombFinalMarker: (data: any) => void
    setMarkerAllPlayers: (data: any) => void
    setShowTarget: (show: boolean) => void
    mapRef: MutableRefObject<MapRef | null>
    targetMarker: { latitude: number; longitude: number }
}

const Completionist: React.FC<CompletionistProps> = forwardRef(({ params, setBombSubmitted, setBombFinalMarker, setMarkerAllPlayers, setShowTarget, mapRef, targetMarker }, ref) => {
    useEffect(() => {
        localStorage.removeItem(PARTY_START_TIME_KEY)
    }, [])

    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    const { data: tempRoomData, isPending: isTempRoomPending } = useQuery({
        queryKey: ["tempRoomData", params.id],
        queryFn: () => getTempRoom(params.id),
    })

    const { data: roomDataFinal, isPending: isRoomDataFinalPending } = useQuery({
        queryKey: ["roomDataFinal", params.id],
        queryFn: () => fetchRoom(params.id),
    })

    const updateScore = async (tempRoom: any, bombCoordinates: any) => {
        await updateScoreBomb(tempRoom, params.id, bombCoordinates)
    }

    useEffect(() => {
        setMarkerAllPlayers(tempRoomData)
        setBombSubmitted(true)
        if (!isRoomDataFinalPending) {
            setBombFinalMarker({
                latitude: roomDataFinal?.bombCoordinates.split(',')[0],
                longitude: roomDataFinal?.bombCoordinates.split(',')[1],
            })
            updateScore(tempRoomData, roomDataFinal?.bombCoordinates)
        }
    }, [tempRoomData, isRoomDataFinalPending, setMarkerAllPlayers, setBombSubmitted, setBombFinalMarker, roomDataFinal])

    const disableRoomMutation = useMutation({
        mutationKey: ["disableRoom", params.id],
        mutationFn: async () => disableRoom(params.id),
        onError: (error) => console.error(error),
    })

    useEffect(() => {
        setShowTarget(true)
        mapRef.current?.flyTo({
            bearing: 90,
            center: [targetMarker.longitude, targetMarker.latitude],
            duration: 2000,
            zoom: 8,
        })
        onOpen()
    }, [setMarkerAllPlayers, setShowTarget, mapRef, targetMarker, onOpen])

    useEffect(() => {
        if (isOpen && !disableRoomMutation.isPending && !disableRoomMutation.isSuccess) {
            disableRoomMutation.mutate()
        }
    }, [isOpen, disableRoomMutation])

    return (
        <Modal size="2xl" className="-translate-x-[50%]" placement="bottom-center" isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
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
                                        <th className="px-4 py-2 text-right">Coordinates (Lat,Long)</th>
                                        <th className="px-4 py-2 text-right">Bomb (km from you)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isTempRoomPending && isRoomDataFinalPending ? (
                                        <tr className="border-b border-current w-full">
                                            <td colSpan={3} className="py-2">
                                                <div className="flex justify-center">
                                                    <span className="loading loading-dots loading-md"></span>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        tempRoomData?.map((tempRoom: any, index: number) => (
                                            <tr key={index} className="border-b border-current">
                                                <td className="px-4 py-2 flex items-center gap-2">
                                                    <Avatar className="w-5 h-5" showFallback name={tempRoom.User.pseudo} src={tempRoom.User.avatar} alt="Avatar" />
                                                    <Image
                                                        width={64}
                                                        height={64}
                                                        src={`https://flagsapi.com/${getCountryCode(tempRoom.User.nationality)}/shiny/64.png`}
                                                        alt={tempRoom.User.pseudo}
                                                        className="w-4"
                                                    />
                                                    <span>{tempRoom.User.pseudo}</span>
                                                </td>
                                                <td className="px-4 py-2 text-right">{tempRoom.time}</td>
                                                <td className="px-4 py-2 text-right">
                                                    {tempRoom.latitude.toFixed(2)},{tempRoom.longitude.toFixed(2)}
                                                </td>
                                                <td className="px-4 py-2 text-right">
                                                    {
                                                        roomDataFinal?.bombCoordinates && calculDistancePosition({ latitude: tempRoom.latitude, longitude: tempRoom.longitude }, { latitude: roomDataFinal?.bombCoordinates.split(',')[0], longitude: roomDataFinal?.bombCoordinates.split(',')[1] }).toFixed(2) <= 300 &&
                                                        <span className="text-error">BOOM! -20 pts ({calculDistancePosition({ latitude: tempRoom.latitude, longitude: tempRoom.longitude }, { latitude: roomDataFinal?.bombCoordinates.split(',')[0], longitude: roomDataFinal?.bombCoordinates.split(',')[1] }).toFixed(2)} km)</span>
                                                    }
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </ModalBody>
                        <ModalFooter>
                            <Link href={"/game"}>
                                <Button>Close</Button>
                            </Link>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
})

export default Completionist
