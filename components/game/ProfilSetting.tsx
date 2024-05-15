"use client"
import { Modal, ModalContent, ModalBody, ModalFooter, Button, useDisclosure, Avatar } from "@nextui-org/react";
import { set } from "animejs";
import { useEffect, useState } from "react";

const ProfilSetting = ({ user }: any) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [ipInfo,setIpInfo] = useState(null) as any;

    useEffect(() => {
        const getIpInformation = async () => {
            const response = await fetch('http://localhost:3000/api/getClientNationality');
            if (!response.ok) {
                throw new Error('Failed to fetch IP info');
            }
            const data = await response.json();
            console.log(data);
            setIpInfo(data);
        }
        getIpInformation();
    }, [])
    return (
        <div>
            <svg onClick={onOpen} className="w-6 cursor-pointer hover:rotate-180 duration-700 ease-soft-spring" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody>
                                <div className='flex justify-between h-full py-6'>
                                    <div className="flex items-center h-full">
                                        <div className="space-y-5 relative">
                                            <div className="top-0 left-0">
                                                <img src={ipInfo.flag} alt={ipInfo.localisation.country} className="w-10 h-10" />
                                            </div>
                                            <Avatar showFallback name="Enigmap" src={user.avatar} className="w-32 h-32 text-large" />
                                            <div className="text-center">
                                                <h1 className="text-2xl font-sans font-semibold">{user.score} Pts</h1>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right font-sans">
                                        <h1 className="text-3xl font-sans font-bold">{user.pseudo}</h1>
                                        <h2 className="text-xl">{user.full_name}</h2>
                                        <h2 className="text-sm font-sans">{user.email}</h2>
                                    </div>
                                </div>
                                <hr />
                                <div>
                                    <h1>Last game</h1>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button variant="flat" onPress={onClose}>
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