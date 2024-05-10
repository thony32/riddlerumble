import ReactPlayer from "react-player"
import Plyr from "plyr-react"
import "plyr-react/plyr.css";

const TutoVideo = () => {
    return (
        <div>
            <div className="flex flex-col justify-center">
                <ReactPlayer
                    width="75%"
                    height="75dvh"
                    url="https://www.youtube.com/watch?v=6y9rMxzu-HY&pp=ygUSZGFucyB0b24gY3VsIGphbWVs"
                />
                <Plyr
                    source={{
                        type: "video",
                        sources: [{ src: "KhjTa_7Nq6Y", provider: "youtube" }],
                    }}
                />
            </div>
        </div>
    )
}

export default TutoVideo
