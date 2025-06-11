import React, { useEffect, useState } from "react";

function getElementDimensions(selector) {

    if (typeof window === "undefined" || !document.getElementById(selector)) return { width: 0, height: 0 };

    const { width, height } = getComputedStyle(document.getElementById(selector));

    const w = parseInt(width.toString().replace("px", ""));
    const h = parseInt(height.toString().replace("px", ""));


    return {
        width: w,
        height: h
    };
}

export function useElementDimensions(selector) {
    const [elementDimensions, setElementDimensions] = useState(
        getElementDimensions(selector)
    );

    useEffect(() => {
        function handleResize() {
            setElementDimensions(getElementDimensions());
        }
        if (document.getElementById(selector) && typeof window !== "undefined") {
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
    }, [typeof window, document.getElementById(selector)]);

    return elementDimensions;
}