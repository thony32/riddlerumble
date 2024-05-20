"use client"
import { useMediaQuery } from "react-responsive"

const useResponsive = () => {
    const isMobile = useMediaQuery({ maxWidth: 767 })
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1365 })
    const isWide = useMediaQuery({ minWidth: 1366, maxWidth: 1919 })
    const isUltraWide = useMediaQuery({ minWidth: 1920, maxWidth: 2559 })
    const is2K = useMediaQuery({ minWidth: 2560 })

    return {
        isMobile,
        isTablet,
        isWide,
        isUltraWide,
        is2K,
    }
}

export default useResponsive
