import { Button } from "@nextui-org/button"
import Plyr from "plyr-react"
import "plyr-react/plyr.css"
import { useRef } from "react"



const TutoVideo = () => {
  const videoPlayer = useRef(null) as any

  const playVideo = () => {
    if (videoPlayer.current) {
      videoPlayer.current.play()
    }
  }
  return (
    <div className="grid grid-cols-2 h-screen" onMouseEnter={playVideo}>
      <div className="flex items-center">
        <div className="space-y-5">
          <h1 className="text-7xl font-extrabold">What is Enigmap ?</h1>
          <p className="w-2/3">
            In this game, players embark on a treasure hunt by solving riddles to locate specific places on a map.
            Each riddle provides clues about the treasure's location, prompting careful exploration of the virtual map.
            Players must interpret the clues to identify landmarks or geographical features.
            Once they believe they've found the right spot, they click to see if they've discovered the treasure.
            This immersive experience blends adventure with intellectual challenges for hours of thrilling entertainment.
          </p>
          <Button size="lg" className="bg-emerald-500 text-xl text-base-100 flex items-center group">
            <span>Play Now</span>
            <svg className="w-8 group-hover:translate-x-2 duration-150 fill-base-100" viewBox="0 0 31.719 31.688">
              <path
                d="M30.852,14.177 L29.318,15.711 C28.342,16.687 26.575,17.340 25.192,17.216 L21.178,16.870 L16.973,21.075 L17.814,24.083 C18.205,25.477 17.727,27.302 16.702,28.326 L14.188,30.840 C13.633,31.396 12.892,31.703 12.101,31.703 L12.101,31.703 C11.311,31.703 10.570,31.397 10.014,30.841 L0.847,21.673 C-0.303,20.522 -0.303,18.650 0.847,17.499 L17.511,0.836 C18.663,-0.314 20.536,-0.313 21.686,0.836 L30.852,10.002 C31.408,10.558 31.714,11.299 31.714,12.090 C31.714,12.880 31.408,13.621 30.852,14.177 ZM29.450,11.404 L20.284,2.238 C19.906,1.860 19.290,1.862 18.912,2.239 L2.249,18.900 C1.872,19.278 1.872,19.894 2.250,20.272 L11.416,29.439 C11.779,29.801 12.424,29.802 12.786,29.438 L15.300,26.924 C15.811,26.413 16.099,25.313 15.904,24.617 L14.947,21.193 C14.928,21.150 14.922,21.105 14.910,21.060 L14.895,21.008 C14.892,20.995 14.895,20.984 14.893,20.971 C14.877,20.886 14.867,20.803 14.874,20.717 C14.882,20.388 15.049,20.093 15.328,19.916 L19.892,15.352 C20.059,15.053 20.374,14.865 20.732,14.862 C20.765,14.859 20.797,14.851 20.831,14.852 C20.833,14.852 20.835,14.851 20.838,14.851 L25.363,15.240 C26.133,15.300 27.361,14.864 27.915,14.309 L29.450,12.775 C29.828,12.397 29.828,11.782 29.450,11.404 ZM20.813,10.875 L22.813,10.875 L22.813,12.875 L20.813,12.875 L20.813,10.875 ZM20.813,6.906 L22.813,6.906 L22.813,8.907 L20.813,8.907 L20.813,6.906 ZM16.844,10.875 L18.844,10.875 L18.844,12.875 L16.844,12.875 L16.844,10.875 ZM16.844,6.906 L18.844,6.906 L18.844,8.907 L16.844,8.907 L16.844,6.906 ZM12.522,22.426 C12.329,22.620 12.075,22.717 11.821,22.717 C11.568,22.717 11.314,22.620 11.120,22.426 L9.838,21.144 L8.556,22.426 C8.363,22.620 8.109,22.717 7.855,22.717 C7.602,22.717 7.348,22.620 7.154,22.426 C6.767,22.039 6.767,21.411 7.154,21.024 L8.436,19.742 L7.154,18.460 C6.767,18.073 6.767,17.445 7.154,17.058 C7.542,16.671 8.169,16.671 8.556,17.058 L9.838,18.340 L11.120,17.058 C11.508,16.671 12.135,16.671 12.522,17.058 C12.910,17.445 12.910,18.073 12.522,18.460 L11.240,19.742 L12.522,21.024 C12.910,21.411 12.910,22.039 12.522,22.426 Z" />
            </svg>
          </Button>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="stack w-full">
          <div className="card shadow-md bg-primary text-primary-content">
            <div className="overflow-hidden w-full rounded-2xl">
              <Plyr
                autoPlay={true}
                source={{
                  type: "video",
                  sources: [
                    {
                      src: "https://www.youtube.com/watch?v=6y9rMxzu-HY",
                      provider: "youtube",
                    },
                  ],
                }}
              />
            </div>
          </div>
          <div className="card shadow bg-primary text-primary-content">
            <div className="card-body">
            </div>
          </div>
          <div className="card shadow-sm bg-primary text-primary-content">
            <div className="card-body">
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TutoVideo
