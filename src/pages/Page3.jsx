import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import page3bgimage from '../assets/optimized/page3bgimage.jpg'

gsap.registerPlugin(ScrollTrigger)

export default function Page3() {
    const containerRef = useRef(null)
    const topLayerRef = useRef(null)
    const middleLayerRef = useRef(null)
    const bottomLayerRef = useRef(null)

    // Mobile detection
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }
        handleResize() // Check on mount
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useGSAP(() => {
        // Set initial states explicitly to prevent glitches on scroll back
        gsap.set(topLayerRef.current, { y: 0, color: 'white', webkitTextStroke: '0px transparent', opacity: 1 })
        gsap.set(bottomLayerRef.current, { y: 0, color: 'white', webkitTextStroke: '0px transparent', opacity: 1 })
        gsap.set(middleLayerRef.current, { scale: 1, x: 0 })

        // Phase 1: Slide-in animation (NO pin - page scrolls normally)
        // Starts when Page3 bottom enters viewport, ends when Page3 covers full screen
        const slideInTl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                // markers: true,
                start: "10% bottom",
                end: "top -50%",
                scrub: 1.5,
                invalidateOnRefresh: true, // Recalculate on resize/refresh
            }
        })

        // All three layers slide to center simultaneously
        slideInTl.fromTo(topLayerRef.current,
            { x: '80vw' },
            { x: 0, duration: 1, ease: "power3.out" },
            0
        )
        slideInTl.fromTo(middleLayerRef.current,
            { x: '-80vw' },
            { x: 0, duration: 1, ease: "power3.out" },
            0
        )
        slideInTl.fromTo(bottomLayerRef.current,
            { x: '80vw' },
            { x: 0, duration: 1, ease: "power3.out" },
            0
        )

        // Phase 2: Pin the page and perform merge animation
        const mergeTl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=300%",
                scrub: 1,
                pin: true,
                invalidateOnRefresh: true, // Recalculate functional values on resize/refresh
            }
        })

        // Top layer moves down and becomes stroke-only (submerge)
        mergeTl.fromTo(topLayerRef.current,
            { y: 0, color: 'white', webkitTextStroke: '0px transparent', opacity: 1 },
            {
                y: '100%',
                color: 'transparent',
                webkitTextStroke: '1px rgba(255,255,255,0.25)',
                opacity: 0,
                duration: 1,
                ease: "power2.inOut",
            }, 0.1)

        // Bottom layer moves up and becomes stroke-only (at the same time)
        mergeTl.fromTo(bottomLayerRef.current,
            { y: 0, color: 'white', webkitTextStroke: '0px transparent', opacity: 1 },
            {
                y: '-100%',
                color: 'transparent',
                webkitTextStroke: '1px rgba(255,255,255,0.25)',
                opacity: 0,
                duration: 1,
                ease: "power2.inOut",
            }, 0.1)

        // Small scale emphasis after submerge
        mergeTl.fromTo(middleLayerRef.current,
            { scale: 1, x: 0 },
            {
                scale: 1.1,
                duration: 0.3,
                ease: "power2.out",
            }, 0.8)

        // ZOOM IN EFFECT - getting pulled inside the letter K
        // Shift text left so K becomes centered, then zoom in massively
        // Using GSAP functional values - recalculated on every ScrollTrigger refresh
        mergeTl.to(middleLayerRef.current, {
            scale: () => window.innerWidth < 768 ? 60 : 40,
            x: () => window.innerWidth < 768 ? '-200vw' : '-120vw',
            duration: 1.8,
            ease: "power2.in"
        }, 1.2)

    }, { scope: containerRef })

    const textStyle = {
        fontFamily: 'var(--font-pixel)',
    }

    return (
        <section
            ref={containerRef}
            className="min-h-screen w-full relative flex items-center justify-center overflow-hidden"
            style={{
                backgroundImage: `url(${page3bgimage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            {/* Text Animation Container */}
            <div className="relative flex flex-col items-center justify-center" style={{ gap: 0, lineHeight: 0.85 }}>
                {/* Top Layer - "WHAT IS" */}
                <div
                    ref={topLayerRef}
                    className="font-bold whitespace-nowrap"
                    style={{
                        ...textStyle,
                        color: 'white',
                        fontSize: isMobile ? 'clamp(5rem, 25vw, 20rem)' : 'clamp(4rem, 18vw, 16rem)',
                    }}
                >
                    WHAT IS
                </div>

                {/* Middle Layer - "RECKON" - highest z-index to stay on top */}
                <div
                    ref={middleLayerRef}
                    className="font-bold whitespace-nowrap relative"
                    style={{
                        ...textStyle,
                        color: 'white',
                        fontSize: isMobile ? 'clamp(5rem, 25vw, 20rem)' : 'clamp(4rem, 18vw, 16rem)',
                        zIndex: 10,
                    }}
                >
                    RECKON
                </div>

                {/* Bottom Layer - "WHAT IS" */}
                <div
                    ref={bottomLayerRef}
                    className="font-bold whitespace-nowrap"
                    style={{
                        ...textStyle,
                        color: 'white',
                        fontSize: isMobile ? 'clamp(5rem, 25vw, 20rem)' : 'clamp(4rem, 18vw, 16rem)',
                    }}
                >
                    WHAT IS
                </div>
            </div>
        </section>
    )
}
