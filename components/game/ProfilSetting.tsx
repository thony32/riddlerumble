"use client"
import getIpInformation from "@/services/getIpInformation"
import { updatePseudo } from "@/services/user-action"
import { useUser } from "@/store/useUser"
import getCountryCode from "@/utils/getCountryCode"
import getInitial from "@/utils/getInitials"
import { Modal, ModalContent, ModalBody, ModalFooter, Button, useDisclosure, Avatar, Input } from "@nextui-org/react"
import { useMutation, useQuery } from "@tanstack/react-query"
import Image from "next/image"
import { useState } from "react"

const getIpInfo = async () => {
    const ipInfo = await getIpInformation()
    return ipInfo
}

const ProfilSetting = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const setUser = useUser((state) => state.setUser)
    const user = useUser((state) => state.user!)
    const [editPsedo, setEditPseudo] = useState(false)
    const [newPseudo, setNewPseudo] = useState(user.pseudo)

    const pseudoMutation = useMutation({
        mutationKey: ["pseudo"],
        mutationFn: async () => {
            const response = await updatePseudo(user.id, newPseudo)
            return response
        },
        onError: (error) => {
            console.error(error)
        },
        onSuccess: (data) => {
            setEditPseudo(false)
            if (data.status === "ok") setUser({ ...user, pseudo: newPseudo })
        },
    })

    const savePseudoEdit = () => {
        pseudoMutation.mutate()
    }

    const {
        isPending: isIpInfoPending,
        error: ipInfoError,
        data: ipInfoData,
    } = useQuery({
        queryKey: ["ipInfo"],
        queryFn: () => getIpInfo(),
        staleTime: 1000 * 60 * 60 * 24,
    })

    return (
        <div>
            <svg
                onClick={onOpen}
                className="w-6 cursor-pointer hover:rotate-180 duration-700 ease-soft-spring"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
            </svg>
            <Modal
                backdrop="blur"
                size="xl"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody>
                                <div className="flex justify-between h-full py-6">
                                    <div className="flex items-center h-full">
                                        <div className="space-y-5 relative">
                                            <div className="top-0 left-0">
                                                {isIpInfoPending ? (
                                                    <span className="loading loading-dots loading-md"></span>
                                                ) : (
                                                    <Image
                                                        width={64}
                                                        height={64}
                                                        src={`https://flagsapi.com/${ipInfoData?.localisation.countryCode}/shiny/64.png`}
                                                        alt={ipInfoData?.localisation.country as string}
                                                        className="w-10 h-10"
                                                    />
                                                )}
                                            </div>
                                            <div className="relative">
                                                <Avatar
                                                    showFallback
                                                    name={getInitial(user.full_name)}
                                                    src={user.avatar!}
                                                    className="w-32 h-32 text-large"
                                                />
                                            </div>
                                            <div className="text-center">
                                                <h1 className="text-2xl font-sans font-semibold">{user.score} Pts</h1>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="text-right font-sans space-y-3">
                                            {!editPsedo ? (
                                                <div className="relative">
                                                    <h1 className="text-3xl font-sans font-bold">{user.pseudo}</h1>
                                                    <svg
                                                        onClick={() => setEditPseudo(true)}
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={2}
                                                        stroke="currentColor"
                                                        className="w-4 absolute -top-3 -right-3 cursor-pointer hover:scale-125 duration-200 ease-soft-spring"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                                                        />
                                                    </svg>
                                                </div>
                                            ) : (
                                                <Input
                                                    autoFocus
                                                    value={newPseudo}
                                                    onChange={(e) => setNewPseudo(e.target.value)}
                                                    onBlur={savePseudoEdit}
                                                    type="text"
                                                    variant="underlined"
                                                    label="Pseudo"
                                                />
                                            )}
                                            <h2 className="text-xl">{user.full_name}</h2>
                                            <h2 className="text-sm font-sans">{user.email}</h2>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div>
                                    <div className="flex justify-between items-center">
                                        <h1 className="text-xl">Last games</h1>
                                        <svg
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="currentColor"
                                            className="w-8"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="m6.115 5.19.319 1.913A6 6 0 0 0 8.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 0 0 2.288-4.042 1.087 1.087 0 0 0-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 0 1-.98-.314l-.295-.295a1.125 1.125 0 0 1 0-1.591l.13-.132a1.125 1.125 0 0 1 1.3-.21l.603.302a.809.809 0 0 0 1.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 0 0 1.528-1.732l.146-.292M6.115 5.19A9 9 0 1 0 17.18 4.64M6.115 5.19A8.965 8.965 0 0 1 12 3c1.929 0 3.716.607 5.18 1.64"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    variant="flat"
                                    onPress={onClose}
                                >
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}

export default ProfilSetting
