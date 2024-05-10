import ReactPlayer from "react-player"
import Plyr from "plyr-react"
import "plyr-react/plyr.css"

const TutoVideo = () => {
    return (
        <div>
            <div className="flex flex-col justify-center">
                <ReactPlayer
                    width="75%"
                    height="75dvh"
                    url="https://www.youtube.com/watch?v=6y9rMxzu-HY&pp=ygUSZGFucyB0b24gY3VsIGphbWVs"
                />
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
        </div>
    )
}

export default TutoVideo
