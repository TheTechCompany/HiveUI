import { useMemo, useState } from "react"
import useResizeAware from "react-resize-aware";

export const useViewport = () => {
    const [resizeListener, sizes] = useResizeAware();
    
    const width = sizes.width || window.innerWidth;
    const height = sizes.height || window.innerHeight;

    
    const isTablet = useMemo(() => {
        return width < 1080;
    }, [width, height])

    const isMobile = useMemo(() => {
        return width < 800
    }, [width, height])


    return {width, height, isMobile, isTablet, resizeListener}
}