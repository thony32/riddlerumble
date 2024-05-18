"use client"
import { Canvas } from "@react-three/fiber"
import { Suspense, useEffect, useRef } from "react"
import { CuteModel } from "./CutePlanet"
import { useProgress } from "@react-three/drei"
import { useQuery } from "@tanstack/react-query"
import { getSession } from "@/services/user-action"

const Loading = () => {
  return (
    <div>
      <h1>Loading...</h1>
    </div>
  )
}

const ModelContainer = () => {
  const { loaded, total } = useProgress()
  const planet_ref = useRef() as any
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
          <ambientLight color={0xffffff} intensity={0.5} />
          <spotLight
            position={[1, 6, 1.5]}
            angle={0.2}
            penumbra={1}
            intensity={2.5}
            castShadow
            shadow-mapSize={[2048, 2048]}
          />
          <directionalLight />
          <CuteModel ref={planet_ref} />
        </Canvas>
      </Suspense>

    </div>
  )
}

export default ModelContainer