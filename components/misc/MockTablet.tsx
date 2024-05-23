import Image from "next/image"

const MockTablet = () => {
    return (
        <div className="container h-full">
            <div className="device tablet bg-white h-full py-2 flex justify-center items-center">
                <div className="h-full bg-gray-100 w-[90%] flex justify-center items-center">
                    <div className='flex justify-center items-center w-full h-full'>
                        <Image className="w-full h-full" src="/images/tablet.png" width={800} height={800} alt="mockup-tablet" />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default MockTablet