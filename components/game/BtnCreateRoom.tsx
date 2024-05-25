import useSelectedRoom from "@/store/useSelectedRoom"
import { useUser } from "@/store/useUser"
import { Button } from "@nextui-org/button"
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react"
import { useMutation } from "@tanstack/react-query"
import React, { useEffect } from "react"
import useResponsive from "@/utils/useResponsive"
import { createRoom } from "@/services/game-service"
import introJs from "intro.js"
import toast from "react-hot-toast"

/**
 * Button component for creating a room
 * Renders different UI elements based on device size
 */

function BtnCreateRoom() {

    // Get user data from custom hook
    const user = useUser((state) => state.user)
    
    // Get selected room state and setter from custom hook
    const setSelectedRoom = useSelectedRoom((state) => state.setSelectedRoom)
    const selectedRoom = useSelectedRoom((state) => state.selectedRoom)

    // Use mutation hook for creating low-level room
    const createLowMutation = useMutation({
        mutationKey: ["createLow"],
        mutationFn: async () => {
            return await createRoom("normal-level", user?.pseudo || "")
        },
        onError: () => {
            toast.error("Failed to create low level room. Please try again.")
        },
        onSuccess: ({ room }) => {
            setSelectedRoom(room.id)
        },
    })

    // Use mutation hook for creating high-level room
    const createHighMutation = useMutation({
        mutationKey: ["createHigh"],
        mutationFn: async () => {
            return await createRoom("high-level", user?.pseudo || "")
        },
        onError: () => {
            toast.error("Failed to create high level room. Please try again.")
        },
        onSuccess: ({ room }) => {
            setSelectedRoom(room.id)
        },
    })


    // UseDisclosure hook for modal state management
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    // UseResponsive hook for handling responsive design
    const { isMobile, isTablet } = useResponsive()

    // useEffect for initializing intro.js tour
    useEffect(() => {
        introJs()
            .setOptions({
                nextLabel: " Suivant ",
                prevLabel: " Précédent ",
                doneLabel: " Done ",
                dontShowAgain: true,
                showBullets: false,
                steps: [
                    {
                        title: "Hello! Welcome into the game!",
                        intro: "I would to take you on the page tour",
                    },
                    {
                        title: "The instructions and rules",
                        intro: "Click here to read the game rules and instructions for more amazing experience",
                        element: document.querySelector("#intro") as HTMLElement,
                    },
                ],
            })
            .start()
    }, [])

    // Render the component
    return (
        <div className="flex justify-between items-center">
            <div>
                {isMobile || isTablet ? (
                    <Dropdown className="-z-[999]">
                        <DropdownTrigger>
                            <Button variant="bordered">Create</Button>
                        </DropdownTrigger>
                        <div className="-z-50">
                            <DropdownMenu variant="faded" className="space-y-3">
                                <DropdownItem className="space-x-4">
                                    <div className="flex items-center gap-4">
                                        <Button size="md" onClick={() => createLowMutation.mutate()} className="py-4" color="warning" disabled={!!selectedRoom}>
                                            {createLowMutation.isPending ? (
                                                <div className="flex justify-center">
                                                    <span className="loading loading-dots loading-lg"></span>
                                                </div>
                                            ) : (
                                                <span>Normal Level</span>
                                            )}
                                        </Button>
                                        <span>Or</span>
                                        <Button size="md" onClick={() => createHighMutation.mutate()} className="py-4" color="danger" disabled={!!selectedRoom}>
                                            {createHighMutation.isPending ? (
                                                <div className="flex justify-center">
                                                    <span className="loading loading-dots loading-lg"></span>
                                                </div>
                                            ) : (
                                                <span>High Level</span>
                                            )}
                                        </Button>
                                    </div>
                                </DropdownItem>
                            </DropdownMenu>
                        </div>
                    </Dropdown>
                ) : (
                    <div className="dropdown dropdown-hover  dropdown-right">
                        <div tabIndex={0} role="button" className="m-1">
                            <Button className="py-10 px-6 gap-5">
                                <span className="text-2xl">Create</span>
                                <svg className="w-7 fill-current" viewBox="0 0 24 24">
                                    <path d="M10,13H4a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V14A1,1,0,0,0,10,13ZM9,19H5V15H9ZM20,3H14a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V4A1,1,0,0,0,20,3ZM19,9H15V5h4Zm1,7H18V14a1,1,0,0,0-2,0v2H14a1,1,0,0,0,0,2h2v2a1,1,0,0,0,2,0V18h2a1,1,0,0,0,0-2ZM10,3H4A1,1,0,0,0,3,4v6a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V4A1,1,0,0,0,10,3ZM9,9H5V5H9Z" />
                                </svg>
                            </Button>
                        </div>
                        <ul tabIndex={0} className="dropdown-content -translate-y-2 z-[1] menu p-2 shadow bg-base-100 rounded-box w-96">
                            <div className="px-1 py-2">
                                <div className="flex w-full">
                                    <div className="grid h-20 flex-grow card rounded-box place-items-center">
                                        <Button size="lg" onClick={() => createLowMutation.mutate()} className="py-10" color="warning" disabled={!!selectedRoom}>
                                            {createLowMutation.isPending ? (
                                                <div className="flex justify-center">
                                                    <span className="loading loading-dots loading-lg"></span>
                                                </div>
                                            ) : (
                                                <span>Normal Level</span>
                                            )}
                                        </Button>
                                    </div>
                                    <div className="divider divider-horizontal">OR</div>
                                    <div className="grid h-20 flex-grow card rounded-box place-items-center">
                                        <Button size="lg" onClick={() => createHighMutation.mutate()} className="py-10" color="danger" disabled={!!selectedRoom}>
                                            {createHighMutation.isPending ? (
                                                <div className="flex justify-center">
                                                    <span className="loading loading-dots loading-lg"></span>
                                                </div>
                                            ) : (
                                                <span>High Level</span>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </ul>
                    </div>
                )}
            </div>
            <div>
                <Button isIconOnly onPress={onOpen} id="intro">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                        />
                    </svg>
                </Button>
                <Modal size="4xl" isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" scrollBehavior="inside">
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex justify-between items-center">
                                    <h1 className="text-2xl">Instructions and rules</h1>
                                    <svg className="w-14 fill-current" viewBox="0 0 24 24">
                                        <path d="M4 7h11v2H4zm0 4h11v2H4zm0 4h7v2H4zm15.299-2.708-4.3 4.291-1.292-1.291-1.414 1.415 2.706 2.704 5.712-5.703z"></path>
                                    </svg>
                                </ModalHeader>
                                <ModalBody className="space-y-5">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 text-justify gap-10">
                                        <div>
                                            <div className="flex justify-between items-center">
                                                <h6 className="font-bold text-lg">DevTools Usage</h6>
                                                <svg className="w-8 fill-current" viewBox="0 0 24 24">
                                                    <path d="M7.826 10.083a.784.784 0 0 0-.468-.175h-.701v4.198h.701a.786.786 0 0 0 .469-.175c.155-.117.233-.292.233-.525v-2.798c.001-.233-.079-.408-.234-.525zM19.236 3H4.764C3.791 3 3.002 3.787 3 4.76v14.48c.002.973.791 1.76 1.764 1.76h14.473c.973 0 1.762-.787 1.764-1.76V4.76A1.765 1.765 0 0 0 19.236 3zM9.195 13.414c0 .755-.466 1.901-1.942 1.898H5.389V8.665h1.903c1.424 0 1.902 1.144 1.903 1.899v2.85zm4.045-3.562H11.1v1.544h1.309v1.188H11.1v1.543h2.142v1.188h-2.498a.813.813 0 0 1-.833-.792V9.497a.813.813 0 0 1 .792-.832h2.539l-.002 1.187zm4.165 4.632c-.531 1.235-1.481.99-1.906 0l-1.548-5.818h1.309l1.193 4.569 1.188-4.569h1.31l-1.546 5.818z"></path>
                                                </svg>
                                            </div>
                                            <p>
                                                Please refrain from opening DevTools while playing.
                                            </p>
                                        </div>
                                        <div>
                                            <div className="flex justify-between items-center">
                                                <h6 className="font-bold text-lg">Time limits</h6>
                                                <svg className="w-8 fill-current" viewBox="0 0 24 24">
                                                    <path d="M12.25 2c-5.514 0-10 4.486-10 10s4.486 10 10 10 10-4.486 10-10-4.486-10-10-10zM18 13h-6.75V6h2v5H18v2z"></path>
                                                </svg>
                                            </div>
                                            <ol>
                                                <li><strong className="text-info">High-Level Room: </strong>Each player has <span className="text-info">7 minutes</span> to reach the target.</li>
                                                <li><strong className="text-info">Normal-Level Room: </strong>Each player has <span className="text-info">5 minutes</span> to reach the target.</li>
                                            </ol>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 text-justify gap-10">
                                        <div>
                                            <div className="flex justify-between items-center">
                                                <h6 className="font-bold text-lg">Room Capacity</h6>
                                                <svg className="w-8 fill-current" viewBox="0 0 24 24" fill="none">
                                                    <path d="M16.65 5.71875H7.35C4.4 5.71875 2 8.11875 2 11.0687V16.6488C2 19.5988 4.4 21.9988 7.35 21.9988H16.65C19.6 21.9988 22 19.5988 22 16.6488V11.0687C22 8.11875 19.6 5.71875 16.65 5.71875ZM14.5 12.0188C14.5 11.4688 14.95 11.0188 15.5 11.0188C16.05 11.0188 16.5 11.4688 16.5 12.0188C16.5 12.5688 16.05 13.0287 15.5 13.0287C14.95 13.0287 14.5 12.5888 14.5 12.0388V12.0188ZM10.13 16.0688C9.98 16.2188 9.79 16.2888 9.6 16.2888C9.41 16.2888 9.22 16.2188 9.07 16.0688L8.04 15.0387L7.05 16.0288C6.9 16.1788 6.71 16.2488 6.52 16.2488C6.33 16.2488 6.14 16.1788 5.99 16.0288C5.7 15.7388 5.7 15.2587 5.99 14.9688L6.98 13.9788L6.02 13.0188C5.73 12.7288 5.73 12.2488 6.02 11.9588C6.31 11.6688 6.79 11.6688 7.08 11.9588L8.04 12.9188L9.03 11.9288C9.32 11.6388 9.8 11.6388 10.09 11.9288C10.38 12.2188 10.38 12.6988 10.09 12.9887L9.1 13.9788L10.13 15.0088C10.42 15.2988 10.42 15.7788 10.13 16.0688ZM13.54 14.9988C12.99 14.9988 12.53 14.5488 12.53 13.9988C12.53 13.4488 12.97 12.9988 13.52 12.9988H13.54C14.09 12.9988 14.54 13.4488 14.54 13.9988C14.54 14.5488 14.1 14.9988 13.54 14.9988ZM15.5 16.9688C14.95 16.9688 14.5 16.5288 14.5 15.9788V15.9587C14.5 15.4087 14.95 14.9587 15.5 14.9587C16.05 14.9587 16.5 15.4087 16.5 15.9587C16.5 16.5087 16.06 16.9688 15.5 16.9688ZM17.48 14.9988C16.93 14.9988 16.47 14.5488 16.47 13.9988C16.47 13.4488 16.91 12.9988 17.46 12.9988H17.48C18.03 12.9988 18.48 13.4488 18.48 13.9988C18.48 14.5488 18.04 14.9988 17.48 14.9988Z" />
                                                    <path d="M13.6394 2.71L13.6294 3.65C13.6194 4.53 12.8894 5.26 11.9994 5.26C11.8494 5.26 11.7594 5.36 11.7594 5.49C11.7594 5.62 11.8594 5.72 11.9894 5.72H10.3794C10.3694 5.65 10.3594 5.57 10.3594 5.49C10.3594 4.59 11.0894 3.86 11.9794 3.86C12.1294 3.86 12.2294 3.76 12.2294 3.63L12.2394 2.69C12.2494 2.31 12.5594 2 12.9394 2H12.9494C13.3394 2 13.6394 2.32 13.6394 2.71Z" />
                                                </svg>
                                            </div>
                                            <p>
                                                Each room can accommodate a <span className="text-info">maximum of 4 players</span>.
                                            </p>
                                        </div>
                                        <div>
                                            <div className="flex justify-between items-center">
                                                <h6 className="font-bold text-lg">Scoring</h6>
                                                <svg className="w-8 fill-current" viewBox="0 0 297 297">
                                                    <path d="M267.84,0H29.159C17.898,0,8.735,9.162,8.735,20.424v100.091c0,11.262,9.162,20.425,20.424,20.425H267.84
		c11.262,0,20.425-9.162,20.425-20.425V20.425C288.265,9.162,279.102,0,267.84,0z M36.473,20.172h42.732
		c3.86,0,6.988,3.129,6.988,6.988s-3.129,6.988-6.988,6.988H36.473c-3.86,0-6.988-3.129-6.988-6.988S32.613,20.172,36.473,20.172z
		 M46.821,113.779c0,3.86-3.129,6.988-6.988,6.988s-6.988-3.129-6.988-6.988V68.796h-3.511c-3.86,0-6.988-3.129-6.988-6.988
		s3.129-6.988,6.988-6.988h10.499c3.86,0,6.988,3.129,6.988,6.988V113.779z M89.868,87.794c0,3.86-3.129,6.988-6.988,6.988H68.869
		v12.009H82.88c3.86,0,6.988,3.129,6.988,6.988c0,3.86-3.129,6.988-6.988,6.988H61.881c-3.86,0-6.988-3.129-6.988-6.988V87.794
		c0-3.86,3.129-6.988,6.988-6.988h14.011V68.796H61.881c-3.86,0-6.988-3.129-6.988-6.988s3.129-6.988,6.988-6.988H82.88
		c3.86,0,6.988,3.129,6.988,6.988V87.794z M168.087,113.779c0,3.86-3.129,6.988-6.988,6.988h-25.198
		c-3.86,0-6.988-3.129-6.988-6.988c0-3.86,3.129-6.988,6.988-6.988h18.21V95.044h-18.21c-3.86,0-6.988-3.129-6.988-6.988
		c0-3.86,3.129-6.988,6.988-6.988h18.21V68.796h-18.21c-3.86,0-6.988-3.129-6.988-6.988s3.129-6.988,6.988-6.988h25.198
		c3.86,0,6.988,3.129,6.988,6.988V113.779z M169.866,34.149h-42.733c-3.86,0-6.988-3.129-6.988-6.988s3.129-6.988,6.988-6.988
		h42.733c3.86,0,6.988,3.129,6.988,6.988S173.726,34.149,169.866,34.149z M251.399,113.779c0,3.86-3.129,6.988-6.988,6.988
		s-6.988-3.129-6.988-6.988V68.796h-3.511c-3.86,0-6.988-3.129-6.988-6.988s3.129-6.988,6.988-6.988h10.499
		c3.86,0,6.988,3.129,6.988,6.988V113.779z M260.527,34.149h-42.732c-3.86,0-6.988-3.129-6.988-6.988s3.129-6.988,6.988-6.988
		h42.732c3.86,0,6.988,3.129,6.988,6.988S264.387,34.149,260.527,34.149z" />
                                                    <path d="M138.517,287.017c0,5.513,4.47,9.983,9.983,9.983s9.983-4.47,9.983-9.983v-96.455h-19.966V287.017z" />
                                                    <path d="M110.529,176.656h75.941c3.597,0,6.513-2.916,6.513-6.513v-10.84c0-3.597-2.916-6.513-6.513-6.513h-75.941
		c-3.597,0-6.513,2.916-6.513,6.513v10.84C104.016,173.74,106.932,176.656,110.529,176.656z" />
                                                </svg>
                                            </div>
                                            <ol>
                                                <li>Playing in a <span className="text-info">high-level</span> room <span className="text-info">earns</span> each player <span className="text-info">10 points</span>.</li>
                                                <li>Players who <span className="text-info">do not submit</span> their results will receive <span className="text-info">0 points</span>.</li>
                                                <li><span className="text-warning">Switching tabs during the game</span> results in a penalty of <span className="text-warning">-10 points</span>.</li>
                                            </ol>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 text-justify gap-10">
                                        <div>
                                            <div className="flex justify-between items-center">
                                                <h6 className="font-bold text-lg">Joining Rooms</h6>
                                                <svg className="w-8 fill-current" viewBox="0 0 490 490">
                                                    <ellipse cx="86.91" cy="51.162" rx="50.324" ry="51.162" />
                                                    <path d="M0,203.351h173.821c0-48.798-38.911-88.357-86.91-88.357C38.911,114.993,0,154.552,0,203.351z" />
                                                    <ellipse cx="403.09" cy="337.811" rx="50.324" ry="51.162" />
                                                    <path d="M403.09,401.643c-47.999,0-86.91,39.559-86.91,88.357H490C490,441.202,451.089,401.643,403.09,401.643z" />
                                                    <polygon points="109.632,240.988 79.007,240.988 79.007,352.661 315.252,352.661 315.252,322.036 109.632,322.036 	" />
                                                </svg>
                                            </div>
                                            <p>
                                                A player can only join one room at a time.
                                            </p>
                                        </div>
                                        <div>
                                            <div className="flex justify-between items-center">
                                                <h6 className="font-bold text-lg">Joker Mechanic</h6>
                                                <svg className="w-8 fill-current" viewBox="0 0 29.904 29.904">
                                                    <path d="M28.405,14.7c-0.479,0-0.897,0.228-1.172,0.576c-1.56-1.127-4.992-2.994-7.975-0.271c0,0-3.021-4.168-0.982-7.569
			c0.246,0.178,0.547,0.286,0.875,0.286c0.827,0,1.5-0.671,1.5-1.5s-0.673-1.5-1.5-1.5c-0.828,0-1.502,0.671-1.502,1.5
			c0,0.168,0.032,0.327,0.084,0.478c-2.141,0.819-5.836,2.858-6.39,7.307c0,0-3.429-4.541-8.573-1.594
			c-0.265-0.425-0.732-0.711-1.27-0.711c-0.829,0-1.501,0.672-1.501,1.5s0.672,1.5,1.501,1.5c0.828,0,1.499-0.672,1.499-1.5
			c0-0.047-0.01-0.091-0.014-0.137c1.794,0.14,4.67,1.726,5.461,10.151l0.09,0.688c0,0.707,2.858,1.279,6.382,1.279
			c3.526,0,6.383-0.574,6.383-1.279c0,0,0.229-5.78,5.611-7.623c0.041,0.791,0.688,1.423,1.491,1.423c0.83,0,1.5-0.673,1.5-1.5
			C29.907,15.371,29.235,14.7,28.405,14.7z" />
                                                </svg>
                                            </div>
                                            <ol>
                                                <li>If a player has a joker, they can <span className="text-info">drag</span> and submit a bomb to <span className="text-info">hinder other players</span>.</li>
                                                <li>Bombs cannot be placed within 500 kilometers of the target.</li>
                                            </ol>
                                        </div>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button variant="light" onPress={onClose}>
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
