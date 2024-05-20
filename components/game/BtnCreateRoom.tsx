import useSelectedRoom from "@/store/useSelectedRoom"
import { useUser } from "@/store/useUser"
import { Button } from "@nextui-org/button"
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import React from "react"

const create_room = async (level: string, pseudo: string) => {
    const response = await fetch("/api/createRoom", {
        body: JSON.stringify({ level, user_pseudo: pseudo }),
        method: "POST",
        headers: { "Content-Type": "application/json" },
    })
    if (!response.ok) throw new Error("Failed to create room")
    return await response.json()
}

function BtnCreateRoom() {
    const user = useUser((state) => state.user)
    const setSelectedRoom = useSelectedRoom((state) => state.setSelectedRoom)
    const createLowMutation = useMutation({
        mutationKey: ["createLow"],
        mutationFn: async () => {
            return await create_room("", user?.pseudo || "")
        },
        onError: (error) => {
            console.log(error)
        },
        onSuccess: (data) => {
            console.log("Room created successfully! ", data)
        },
    })
    const createHighMutation = useMutation({
        mutationKey: ["createHigh"],
        mutationFn: async () => {
            return await create_room("high-level", user?.pseudo || "")
        },
        onError: (error) => {
            console.log(error)
        },
        onSuccess: ({ room }) => {
            setSelectedRoom(room.id)
        },
    })

    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    return (
        <div className="flex justify-between items-center">
            <div>
                <div className="dropdown dropdown-hover  dropdown-right">
                    <div
                        tabIndex={0}
                        role="button"
                        className="m-1"
                    >
                        <Button className="py-10 px-6 gap-5">
                            <span className="text-2xl">Create</span>
                            <svg
                                className="w-7 fill-current"
                                viewBox="0 0 24 24"
                            >
                                <path d="M10,13H4a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V14A1,1,0,0,0,10,13ZM9,19H5V15H9ZM20,3H14a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V4A1,1,0,0,0,20,3ZM19,9H15V5h4Zm1,7H18V14a1,1,0,0,0-2,0v2H14a1,1,0,0,0,0,2h2v2a1,1,0,0,0,2,0V18h2a1,1,0,0,0,0-2ZM10,3H4A1,1,0,0,0,3,4v6a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V4A1,1,0,0,0,10,3ZM9,9H5V5H9Z" />
                            </svg>
                        </Button>
                    </div>
                    <ul
                        tabIndex={0}
                        className="dropdown-content -translate-y-2 z-[1] menu p-2 shadow bg-base-100 rounded-box w-96"
                    >
                        <div className="px-1 py-2">
                            <div className="flex w-full">
                                <div className="grid h-20 flex-grow card rounded-box place-items-center">
                                    <Button
                                        size="lg"
                                        onClick={() => createLowMutation.mutate()}
                                        className="py-10"
                                        color="warning"
                                    >
                                        {createLowMutation.isPending ? (
                                            <div className="flex justify-center">
                                                <span className="loading loading-dots loading-lg"></span>
                                            </div>
                                        ) : (
                                            <span>Low Level Room</span>
                                        )}
                                    </Button>
                                </div>
                                <div className="divider divider-horizontal">OR</div>
                                <div className="grid h-20 flex-grow card rounded-box place-items-center">
                                    <Button
                                        size="lg"
                                        onClick={() => createHighMutation.mutate()}
                                        className="py-10"
                                        color="danger"
                                    >
                                        {createHighMutation.isPending ? (
                                            <div className="flex justify-center">
                                                <span className="loading loading-dots loading-lg"></span>
                                            </div>
                                        ) : (
                                            <span>High Level Room</span>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
            <div>
                <Button
                    isIconOnly
                    onPress={onOpen}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                        />
                    </svg>
                </Button>
                <Modal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    backdrop="blur"
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Asio instruction avao ato</ModalHeader>
                                <ModalBody>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed
                                        porttitor quam.
                                    </p>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed
                                        porttitor quam.
                                    </p>
                                    <p>
                                        Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit duis
                                        sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur proident Lorem eiusmod et.
                                        Culpa deserunt nostrud ad veniam.
                                    </p>
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        variant="light"
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
        </div>
    )
}

export default BtnCreateRoom
