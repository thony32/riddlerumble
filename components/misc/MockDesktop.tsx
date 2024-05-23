import Image from "next/image"

const MockDesktop = () => {
    return (
        <div className="container h-full">
            <div className="device desktop h-full  flex justify-center items-center bg-white">
                <div className="h-full bg-gray-100 w-full flex justify-center items-center">
                    <div className='flex justify-center items-center w-full h-full'>
                        <Image className="w-full h-full" src="/images/desktop.png" width={800} height={800} alt="mockup-desktop" />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default MockDesktop