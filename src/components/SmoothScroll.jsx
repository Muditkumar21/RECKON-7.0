import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SmoothScroll = ({ disabled = false }) => {
    const lenisRef = useRef(null)

    useEffect(() => {
        // Detect mobile devices
        const isMobile = window.matchMedia('(max-width: 768px)').matches ||
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

        // Initialize Lenis with optimized settings
        // Use slower scrolling on mobile (higher duration = slower scroll)
        const lenis = new Lenis({
            duration: isMobile ? 2.5 : 1.2, // Slower on mobile
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true,
            smoothTouch: true,
            lerp: isMobile ? 0.05 : 0.1, // Lower lerp = slower interpolation on mobile
        })

        lenisRef.current = lenis

        // Sync Lenis scroll with GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update)

        // Add Lenis to GSAP ticker for smooth animation loop
        const update = (time) => {
            lenis.raf(time * 1000)
        }

        gsap.ticker.add(update)

        // Disable lag smoothing to prevent jitter
        gsap.ticker.lagSmoothing(0)

        // Cleanup on unmount
        return () => {
            lenis.destroy()
            gsap.ticker.remove(update)
        }
    }, [])

    // Handle disabled state changes
    useEffect(() => {
        if (lenisRef.current) {
            if (disabled) {
                lenisRef.current.stop()
            } else {
                lenisRef.current.start()
            }
        }
    }, [disabled])

    return null
}

export default SmoothScroll