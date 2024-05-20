import { Button } from "@nextui-org/button"
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal"
import { useEffect } from "react"

const PreventSwitch = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                onOpen()
            }
        }

        document.addEventListener("visibilitychange", handleVisibilityChange)

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange)
        }
    }, [onOpen])

    const handleStay = () => {
        onClose()
        window.focus()
    }

    return (
        <Modal
            backdrop="blur"
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Wanna leave</ModalHeader>
                        <ModalBody>
                            <p>Are you sure mate?</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="primary"
                                size="lg"
                                onPress={handleStay}
                            >
                                No, just joking
                            </Button>
                            <Button
                                color="danger"
                                variant="light"
                                size="lg"
                                onPress={onClose}
                            >
                                Yes, I am sure
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default PreventSwitch
