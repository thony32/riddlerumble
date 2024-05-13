"use client"
import React from "react"

function ButtonTest() {
    
    return (
        <button
            onClick={() => alert("kindy!")}
            className="flex items-center gap-2 bg-blue-500 text-white tracking-wider font-title rounded-lg"
        >
            button
        </button>
    )
}

export default ButtonTest
