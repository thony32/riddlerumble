import Plyr from "plyr-react"
import "plyr-react/plyr.css"

const TutoVideo = () => {
  return (
    <div>

      <div style={{ width: 640, height: 360, borderRadius: 20, overflow: "hidden" }}>
        <Plyr
          source={{
            type: "video",
            sources: [
              {
                src: "https://www.youtube.com/watch?v=KhjTa_7Nq6Y",
                provider: "youtube",
              },
            ],
          }}
        />
      </div>
    </div>
  )
}

export default TutoVideo
