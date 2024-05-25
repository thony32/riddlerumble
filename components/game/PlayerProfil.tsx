"use client"
import { useUser } from "@/store/useUser"
import { Avatar } from "@nextui-org/avatar"
import { Button } from "@nextui-org/button"
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal"
import { Input, Select, SelectItem } from "@nextui-org/react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import getCountryCode from "@/utils/getCountryCode"
import getInitial from "@/utils/getInitials"
import Image from "next/image"
import * as Yup from "yup"
import LastGames from "./LastGames"
import dynamic from "next/dynamic"
import { getAllCountry, getAllUser, syncUserScore } from "@/services/profil-service"
import toast from "react-hot-toast"
const SvgMedalNovice = dynamic(() => import("../misc/SvgMedalNovice"))
const SvgMedalCasual = dynamic(() => import("../misc/SvgMedalCasual"))
const SvgMedalPro = dynamic(() => import("../misc/SvgMedalPro"))
const SvgMedalExpert = dynamic(() => import("../misc/SvgMedalExpert"))
const SvgMedalAmiral = dynamic(() => import("../misc/SvgMedalAmiral"))

const validationSchema = Yup.object({
    pseudo: Yup.string().required("Pseudo is required"),
    full_name: Yup.string().required("Full name is required"),
    nationality: Yup.string().required("Nationality is required"),
})

const PlayerProfil = () => {
    const user = useUser((state) => state.user!)
    const setUser = useUser((state) => state.setUser)

    const { isPending: isAllUserPending, data: allUserData } = useQuery({
        queryKey: ["allUser"],
        queryFn: () => getAllUser(),
        staleTime: 1000 * 60 * 60 * 24,
    })

    const { isPending: isCountryPending, data: countryData } = useQuery({
        queryKey: ["countryData"],
        queryFn: () => getAllCountry(),
        staleTime: 1000 * 60 * 60 * 24,
    })

    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [isUpdating, setIsUpdating] = useState(false)

    const formik = useFormik({
        initialValues: {
            pseudo: user.pseudo,
            full_name: user.full_name,
            nationality: user.nationality,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                setIsUpdating(true)
                const response = await fetch("/api/user/update", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user_id: user.id,
                        pseudo: values.pseudo,
                        full_name: values.full_name,
                        nationality: values.nationality,
                    }),
                })
                const result = await response.json()
                if (response.ok) {
                    setUser({ ...user, pseudo: values.pseudo, full_name: values.full_name, nationality: values.nationality })
                } else {
                    console.error("Update failed:", result)
                }
            } catch (error) {
                console.error("An error occurred:", error)
            } finally {
                setIsUpdating(false)
            }
        },
    })

    const syncUserScoreMutation = useMutation({
        mutationKey: ["syncUserScoreMutation"],
        mutationFn: async () => {
            return await syncUserScore(user.id!)
        },
        onError: () => {
            toast.error("Failed to sync user score. Please try again.")
        },
        onSuccess: (data) => {
            console.log("User score updated successfully! ", data)
        },
    })

    useEffect(() => {
        syncUserScoreMutation.mutate()
    }, [])
    return (
        <>
            {user && (
                <div className="md:px-3 py-2 space-y-7">
                    <div className="flex justify-between items-center">
                        <div className="relative max-md:space-y-5">
                            <div className="md:absolute md:-top-5 md:-left-3 flex justify-center">
                                <Image className="w-7 md:w-10" src={`https://flagsapi.com/${getCountryCode(user.nationality!)}/shiny/64.png`} width={64} height={64} alt="medal" />
                            </div>
                            <Avatar className="w-28 h-28 xl:w-36 xl:h-36 text-large shadow-xl" showFallback name={getInitial(user.full_name!)} src={user.avatar!} />
                            <div className="my-5 flex justify-center">
                                {user.score! <= 50 && <SvgMedalNovice />}
                                {user.score! > 50 && user.score! <= 100 && <SvgMedalCasual />}
                                {user.score! > 100 && user.score! <= 200 && <SvgMedalPro />}
                                {user.score! > 200 && user.score!<= 400 && <SvgMedalExpert />}
                                {user.score! > 400 && <SvgMedalAmiral />}
                            </div>
                        </div>
                        <div className="text-center md:text-right md:w-1/2">
                            <div className="flex justify-end">
                                <svg
                                    onClick={onOpen}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6 cursor-pointer hover:scale-125 duration-150 ease-soft-spring"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                    />
                                </svg>
                                <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
                                    <ModalContent>
                                        {(onClose) => (
                                            <>
                                                <ModalHeader className="flex flex-col gap-1">Update profil info</ModalHeader>
                                                <form onSubmit={formik.handleSubmit}>
                                                    <ModalBody>
                                                        <div className="grid grid-cols-2 gap-5">
                                                            <Input type="text" variant="underlined" label="Pseudo" {...formik.getFieldProps("pseudo")} />
                                                            <Input type="text" variant="underlined" label="Full name" {...formik.getFieldProps("full_name")} />
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-5">
                                                            <Input readOnly type="text" variant="underlined" label="Nationality" {...formik.getFieldProps("nationality")} />
                                                            <Select
                                                                variant="underlined"
                                                                label="Select country"
                                                                className="w-full"
                                                                value={formik.values.nationality!}
                                                                onChange={(e) => formik.setFieldValue("nationality", e.target.value)}
                                                            >
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
                                                                            value={country.name + ", " + country.Iso2}
                                                                        >
                                                                            {country.name + ", " + country.Iso2}
                                                                        </SelectItem>
                                                                    ))
                                                                )}
                                                            </Select>
                                                        </div>
                                                    </ModalBody>
                                                    <ModalFooter>
                                                        <Button onPress={onClose}>Close</Button>
                                                        <Button type="submit" color="primary">
                                                            <span>Update</span>
                                                            {isUpdating && <span className="loading loading-dots loading-sm"></span>}
                                                        </Button>
                                                    </ModalFooter>
                                                </form>
                                            </>
                                        )}
                                    </ModalContent>
                                </Modal>
                            </div>
                            <h1 className="text-xl md:text-3xl text-right">{user.pseudo}</h1>
                            <p className="text-right">{user.full_name}</p>
                            <p className="opacity-40 break-words text-right">{user.email}</p>
                            <hr className="my-5" />
                            <div className="space-y-1">
                                <div className="flex justify-between items-center">
                                    <svg className="w-8 fill-primary" viewBox="0 0 24 24">
                                        <path d="M21 4h-3V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v1H3a1 1 0 0 0-1 1v3c0 4.31 1.799 6.91 4.819 7.012A6.001 6.001 0 0 0 11 17.91V20H9v2h6v-2h-2v-2.09a6.01 6.01 0 0 0 4.181-2.898C20.201 14.91 22 12.31 22 8V5a1 1 0 0 0-1-1zM4 8V6h2v6.83C4.216 12.078 4 9.299 4 8zm8 8c-2.206 0-4-1.794-4-4V4h8v8c0 2.206-1.794 4-4 4zm6-3.17V6h2v2c0 1.299-.216 4.078-2 4.83z"></path>
                                    </svg>
                                    <span className="text-lg md:text-2xl text-primary">{user.score} pts</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <svg className="w-8 stroke-primary" viewBox="0 0 24 24" fill="none">
                                        <path d="M8.67 14H4C2.9 14 2 14.9 2 16V22H8.67V14Z" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <path
                                            d="M13.33 10H10.66C9.56003 10 8.66003 10.9 8.66003 12V22H15.33V12C15.33 10.9 14.44 10 13.33 10Z"
                                            strokeWidth="1.5"
                                            strokeMiterlimit="10"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path d="M20 17H15.33V22H22V19C22 17.9 21.1 17 20 17Z" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span className="text-lg md:text-2xl text-primary">
                                        {isAllUserPending ? (
                                            <span className="loading loading-dots loading-md"></span>
                                        ) : (
                                            <>
                                                {allUserData.findIndex((userData: any) => userData.pseudo === user.pseudo) + 1} / {allUserData.length} players
                                            </>
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="border-current" />
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <h1 className="text-2xl first-letter:text-3xl">Last seven games</h1>
                            <svg className="w-8 fill-current" viewBox="0 0 24 24">
                                <path d="M12 8v5h5v-2h-3V8z"></path>
                                <path d="M21.292 8.497a8.957 8.957 0 0 0-1.928-2.862 9.004 9.004 0 0 0-4.55-2.452 9.09 9.09 0 0 0-3.626 0 8.965 8.965 0 0 0-4.552 2.453 9.048 9.048 0 0 0-1.928 2.86A8.963 8.963 0 0 0 4 12l.001.025H2L5 16l3-3.975H6.001L6 12a6.957 6.957 0 0 1 1.195-3.913 7.066 7.066 0 0 1 1.891-1.892 7.034 7.034 0 0 1 2.503-1.054 7.003 7.003 0 0 1 8.269 5.445 7.117 7.117 0 0 1 0 2.824 6.936 6.936 0 0 1-1.054 2.503c-.25.371-.537.72-.854 1.036a7.058 7.058 0 0 1-2.225 1.501 6.98 6.98 0 0 1-1.313.408 7.117 7.117 0 0 1-2.823 0 6.957 6.957 0 0 1-2.501-1.053 7.066 7.066 0 0 1-1.037-.855l-1.414 1.414A8.985 8.985 0 0 0 13 21a9.05 9.05 0 0 0 3.503-.707 9.009 9.009 0 0 0 3.959-3.26A8.968 8.968 0 0 0 22 12a8.928 8.928 0 0 0-.708-3.503z"></path>
                            </svg>
                        </div>
                        <div className="w-full">
                            <LastGames id_user={user.id!} />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default PlayerProfil
