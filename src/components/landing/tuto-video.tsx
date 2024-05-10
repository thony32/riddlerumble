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
                        sources: [{ src: "https://www.youtube.com/watch?v=KhjTa_7Nq6Y&list=RDKhjTa_7Nq6Y&start_radio=1", provider: "youtube" }],
                    }} className="rounded-xl"
                />
            </div>
        </div>
    )
}

export default TutoVideo
