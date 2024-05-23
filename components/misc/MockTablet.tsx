import React from 'react'

const MockTablet = () => {
    return (
        <div className="container h-full">
            <div className="device tablet bg-white h-full py-2 flex justify-center items-center">
                <div className="h-full bg-gray-100 w-[90%] flex justify-center items-center">
                    <div className='flex justify-center items-center w-full h-full'>
                        Tablet View
                    </div>
                    {/* <img className="h-full w-full" src="/tablet_mock.png" /> */}
                </div>
            </div>
        </div>

    )
}

export default MockTablet