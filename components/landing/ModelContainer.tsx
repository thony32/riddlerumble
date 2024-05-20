"use client"
import { Canvas } from "@react-three/fiber"
import { Suspense, useRef } from "react"
import { CuteModel } from "./CutePlanet"
import { useQuery } from "@tanstack/react-query"
import { getSession } from "@/services/user-action"
import useResponsive from "@/utils/useResponsive"

const Loading = () => {
    return (
        <div>
            <h1>Loading...</h1>
        </div>
    )
}

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
        <div className="h-screen">
            <Suspense fallback={<Loading />}>
                <Canvas>
                    <ambientLight
                        color={0xffffff}
                        intensity={0.5}
                    />
                    <spotLight
                        position={[1, 6, 1.5]}
                        angle={0.2}
                        penumbra={1}
                        intensity={2.5}
                        castShadow
                        shadow-mapSize={[2048, 2048]}
                    />
                    <directionalLight />
                    <CuteModel
                        ref={planet_ref}
                        scale={isMobile ? [0.5, 0.5, 0.5] : isTablet ? [0.75, 0.75, 0.75] : [1, 1, 1]}
                    />
                </Canvas>
            </Suspense>
        </div>
    )
}

export default ModelContainer
