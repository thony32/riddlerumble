"use client"
import React from "react"

function ButtonTest({ link }: { link: string }) {
    function handleCLick() {
        alert(link)
    }
    return (
        <button
            onClick={() => handleCLick()}
            className="flex items-center gap-2 bg-blue-500 text-white tracking-wider font-title rounded-lg"
        >
            button
        </button>
    )
}

export default ButtonTest
