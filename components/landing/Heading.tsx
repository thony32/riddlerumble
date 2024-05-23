"use client"
import { Button } from "@nextui-org/button"
import { useQuery } from "@tanstack/react-query"
import { getOAuthUrl, getSession } from "@/services/user-action"
import { useRef, useState } from "react"
import Link from "next/link"
import Wordz from "../misc/Wordz"
import dynamic from "next/dynamic"
const SvgMapDraw = dynamic(() => import("../misc/SvgMapDraw"))
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal"
import { Input, Select, SelectItem } from "@nextui-org/react"
import { setCookie } from "cookies-next"
import { useRouter } from "next/navigation"

const Heading = () => {
    const [isLoading, setIsLoading] = useState(false)

    const { data: isSignedIn, isPending: sessionPending } = useQuery({
        queryKey: ["session"],
        queryFn: async () => {
            return await getSession()
        },
    })

    const { data: urlsData, isPending: urlsPending } = useQuery({
        queryKey: ["oauth_url"],
        queryFn: async () => {
            const urls = await getOAuthUrl()
            return urls
        },
    })

    const { isPending: isCountryPending, data: countryData } = useQuery({
        queryKey: ["countryData"],
        queryFn: async () => {
            const response = await fetch("/api/getAllCountry")
            if (!response.ok) {
                throw new Error("Failed to fetch IP info")
            }
            const jsonData = await response.json()
            return jsonData
        },
        staleTime: 1000 * 60 * 60 * 24,
    })

    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    const pseudo_ref = useRef() as any
    const nationality_ref = useRef() as any
    const router = useRouter()
    const handleOAuth = () => {
        setIsLoading(true)
        setCookie("pseudo", pseudo_ref.current.value)
        setCookie("nationality", nationality_ref.current.value)

        router.push(urlsData?.googleUrl ?? "")
    }

    return (
        <div className="h-screen flex justify-center items-center relative">
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
                <SvgMapDraw />
            </div>
            <div className="w-[80%] xl:w-1/2 text-center space-y-8">
                <Wordz />
                <div className="space-y-5">
                    <div>
                        <div>
                            <h1 className="text-[3em] md:text-[7rem] xl:text-[9rem] font-title-bold">RiddleRumble</h1>
                            <h5 className="text-[1em] md:text-[3rem] xl:text-[5rem] font-title-bold">The Map Quest</h5>
                        </div>
                    </div>
                    <div className="w-full flex flex-col md:flex-row justify-between gap-5 md:gap-[30%]">
                        <div className="text-justify text-lg md:text-2xl xl:text-3xl max-xl:first-letter:text-3xl first-letter:text-5xl">Set off on a thrilling quest through an interactive map, where every location hides a cryptic puzzle.</div>
                        <div className="text-justify text-lg md:text-2xl xl:text-3xl max-xl:first-letter:text-3xl first-letter:text-5xl">Dive into our enigma-filled adventure and unravel the secrets waiting to be discovered!</div>
                    </div>
                    <div className="flex justify-center">
                        {sessionPending ? (
                            <div className="flex justify-center">
                                <Button className="bg-blue-500 text-white">
                                    <span className="loading loading-dots loading-md"></span>
                                </Button>
                            </div>
                        ) : isSignedIn ? (
                            <Link href="/game">
                                <Button
                                    className="flex items-center gap-2 bg-blue-500 text-white tracking-wider font-title group"
                                    size="lg"
                                    onClick={() => setIsLoading(true)}>
                                    <span className="font-title-bold">Play Now</span>
                                    {isLoading ? (
                                        <div className="flex justify-center">
                                            <span className="loading loading-dots loading-md"></span>
                                        </div>
                                    ) : (
                                        <svg
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                                            />
                                        </svg>
                                    )}
                                </Button>
                            </Link>
                        ) : (
                            <div className="flex max-md:flex-col flex-row gap-5 items-center">
                                <Link href={urlsData?.googleUrl ?? ""}>
                                    <Button
                                        onClick={() => setIsLoading(true)}
                                        className="bg-blue-500 text-white"
                                        size="lg">
                                        {isLoading ? (
                                            <div className="flex justify-center">
                                                <span className="loading loading-dots loading-md"></span>
                                            </div>
                                        ) : (
                                            <>
                                                <span className="text-xl">Connect</span>
                                                <svg
                                                    className="w-7 fill-current group-hover:rotate-[360deg] duration-700"
                                                    viewBox="0 0 24 24">
                                                    <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                                                </svg>
                                            </>
                                        )}
                                    </Button>
                                </Link>
                                <span className="text-xl text-white">or</span>
                                <Button
                                    className="bg-sky-500 text-white"
                                    size="lg"
                                    onPress={onOpen}>
                                    <span className="text-xl">New account</span>
                                    <svg
                                        className="w-7 fill-current group-hover:scale-125 duration-100"
                                        viewBox="0 0 24 24">
                                        <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                                    </svg>
                                </Button>
                                <Modal
                                    scrollBehavior="inside"
                                    backdrop="blur"
                                    isOpen={isOpen}
                                    onOpenChange={onOpenChange}
                                    isDismissable={false}
                                    isKeyboardDismissDisabled={true}>
                                    <ModalContent>
                                        {(onClose) => (
                                            <>
                                                <ModalHeader className="flex flex-col gap-1">Little information about you</ModalHeader>
                                                <ModalBody>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <Input
                                                            ref={pseudo_ref}
                                                            type="text"
                                                            variant="underlined"
                                                            label="Pseudo"
                                                        />
                                                        <Select
                                                            ref={nationality_ref}
                                                            variant="underlined"
                                                            label="Select country"
                                                            className="w-full">
                                                            {isCountryPending ? (
                                                                <SelectItem key={"0"}>
                                                                    <span className="loading loading-dots loading-md"></span>
                                                                </SelectItem>
                                                            ) : (
                                                                countryData &&
                                                                countryData.map((country: any) => (
                                                                    <SelectItem
                                                                        className="flex justify-between"
                                                                        key={country.name + ", " + country.Iso2}
                                                                        value={country.name + ", " + country.Iso2}>
                                                                        {country.name + ", " + country.Iso2}
                                                                    </SelectItem>
                                                                ))
                                                            )}
                                                        </Select>
                                                    </div>
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button
                                                        variant="light"
                                                        onPress={onClose}>
                                                        Back
                                                    </Button>
                                                    <Button
                                                        color="primary"
                                                        onClick={() => handleOAuth()}>
                                                        {isLoading ? (
                                                            <div className="flex justify-center">
                                                                <span className="loading loading-dots loading-md"></span>
                                                            </div>
                                                        ) : (
                                                            <>Continue</>
                                                        )}
                                                    </Button>
                                                </ModalFooter>
                                            </>
                                        )}
                                    </ModalContent>
                                </Modal>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Heading
