"use client"
import { Canvas } from "@react-three/fiber"
import { lazy, useRef } from "react"
const CutePlanet = lazy(() => import("./CutePlanet"))
import { useQuery } from "@tanstack/react-query"
import { getSession } from "@/services/user-action"
import useResponsive from "@/utils/useResponsive"

const ModelContainer = () => {
    const planet_ref = useRef() as any
    const { isMobile, isTablet } = useResponsive()
    const invokePlanet = () => {
        planet_ref.current?.invoke()
    }

    const { isPending: sessionPending } = useQuery({
        queryKey: ["session"],
        queryFn: async () => {
            return await getSession()
        },
    })

    if (!sessionPending) {
        invokePlanet()
    }

    return (
        <div className="h-screen -translate-y-16 md:-translate-y-24 xl:translate-y-0 ">
            <Canvas>
                <ambientLight color={0xffffff} intensity={0.5} />
                <spotLight position={[1, 6, 1.5]} angle={0.2} penumbra={1} intensity={2.5} castShadow shadow-mapSize={[2048, 2048]} />
                <directionalLight />
                <CutePlanet ref={planet_ref} scale={isMobile ? [0.5, 0.5, 0.5] : isTablet ? [0.75, 0.75, 0.75] : [1, 1, 1]} />
            </Canvas>
        </div>
    )
}

export default ModelContainer
