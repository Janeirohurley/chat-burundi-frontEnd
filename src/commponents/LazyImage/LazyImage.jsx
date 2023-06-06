import React, { useEffect, useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component"
const LazyImage = (props) => {
    const [inView, setView] = useState(false)
    const ref = useRef()
    let callback = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setTimeout(() => setView(true), 1000)
            }
        })
    }
    useEffect(() => {
        let observer = new IntersectionObserver(callback)
        if (ref?.current) {
            observer.observe(ref.current)
        }

        return () => {
            // observer.unobserve(ref.current)
            observer.disconnect()
        }
    }, [])

    return inView ?
        (<LazyLoadImage
            width={"100%"} {...props} alt={"post-pict"} effect="blur"
            placeholderSrc={props.src}
        />) : (
            <div
                ref={ref} style={{ width: "100%", height: "200px", backgroundImage: " linear-gradient( 135deg, #FFE985 10%, #FA742B 100%)" }}
                id={props.id}

            />
        )
}
export default LazyImage