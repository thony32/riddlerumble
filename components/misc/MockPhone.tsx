import Image from "next/image"

const MockPhone = () => {
    return (
        <div className="container h-full">
            <div className="device phone bg-white h-full flex justify-center items-center">
                <div className="h-full bg-gray-100 w-[90%] flex justify-center items-center">
                    <Image className="w-full h-full" src="/images/phone.png" width={500} height={800} alt="mockup-phone" />
                </div>
            </div>
        </div>

    )
}

export default MockPhone