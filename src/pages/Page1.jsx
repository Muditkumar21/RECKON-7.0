import { useState, useRef, useEffect } from "react"
import FlipBlock from "../components/FlipBlock"
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export default function Page1() {
    const container = useRef(null)
    const triggerRef = useRef(null) // Separate invisible trigger element
    const [text, setText] = useState("")
    const [isDeleting, setIsDeleting] = useState(false)
    const [loopNum, setLoopNum] = useState(0)
    const [typingSpeed, setTypingSpeed] = useState(150)
    const [isFlipped, setIsFlipped] = useState(false) // Track if scroll flip is complete
    const [showGaps, setShowGaps] = useState(true) // Track if gaps should show (delayed during flip animation)
    const [showTitle, setShowTitle] = useState(false) // Track if title allow to show

    const words = ["CODE", "CREATE", "CONQUEROR"]

    useGSAP(() => {
        // Pin the section (Page1 stays pinned, does NOT move)
        ScrollTrigger.create({
            trigger: container.current,

            pin: true,
            start: "top top",
            end: "+=130%",
        })

        // Separate ScrollTrigger for the animation - uses the invisible trigger div
        ScrollTrigger.create({
            trigger: triggerRef.current,
            start: "top top",
            end: "+=130%",
            onEnter: () => {
                setIsFlipped(true)
                setShowGaps(false) // Hide gaps immediately when flipping to image
                // Animate to "Image" side (Back)
                gsap.to(".flip-block-inner", {
                    rotationX: (i, target) => {
                        const current = gsap.getProperty(target, "rotationX")
                        let nextTurn = Math.ceil(current / 180)
                        if (nextTurn % 2 === 0) nextTurn++
                        if (nextTurn * 180 <= current) nextTurn += 2
                        return nextTurn * 180
                    },
                    duration: 1,
                    ease: "power2.inOut",
                    stagger: { amount: 0.2, from: "random" },
                    overwrite: true, // Kill any conflicting animations
                    onComplete: () => setShowTitle(true) // Title pops after all blocks flip
                })
            },
            onLeaveBack: () => {
                setShowTitle(false)
                setShowGaps(true) // Show gaps immediately when flip back starts

                // Animate back to "Text" side (Front)
                gsap.to(".flip-block-inner", {
                    rotationX: (i, target) => {
                        const current = gsap.getProperty(target, "rotationX")
                        let nextTurn = Math.floor(current / 180)
                        if (nextTurn % 2 !== 0) nextTurn--
                        if (nextTurn * 180 >= current) nextTurn -= 2
                        return nextTurn * 180
                    },
                    duration: 1,
                    ease: "power2.inOut",
                    stagger: { amount: 0.2, from: "random" },
                    overwrite: true, // Kill any conflicting animations
                    onComplete: () => {
                        setIsFlipped(false) // Only remove square styling after animation completes
                        setTitleText("") // Clear the title text after flip completes so it can be typed again
                    }
                })
            }
        })



    }, { scope: container })

    const timerRef = useRef(null) // Trace timer for cleanup

    const [titleText, setTitleText] = useState("")

    // Title Typewriter Effect
    useEffect(() => {
        if (!showTitle) {
            // Don't clear text so it stays during flip back
            return
        }

        // Reset text when starting to type
        setTitleText("")

        const targetText = "RECKON 7.0"
        let charIndex = 0

        const typeInterval = setInterval(() => {
            if (charIndex < targetText.length) {
                charIndex++
                setTitleText(targetText.substring(0, charIndex))
            } else {
                clearInterval(typeInterval)
            }
        }, 150)

        return () => clearInterval(typeInterval)
    }, [showTitle])

    // Typewriter Effect Logic (Existing for Grid)
    useEffect(() => {
        // Pause typing if the board is flipped (text hidden)
        if (isFlipped) return

        const handleType = () => {
            const i = loopNum % words.length
            const fullText = words[i]

            setText(isDeleting
                ? fullText.substring(0, text.length - 1)
                : fullText.substring(0, text.length + 1)
            )

            setTypingSpeed(isDeleting ? 100 : 250)

            if (!isDeleting && text === fullText) {
                // Track this timeout so it can be cleared if user scrolls away
                timerRef.current = setTimeout(() => setIsDeleting(true), 1500)
            } else if (isDeleting && text === "") {
                setIsDeleting(false)
                setLoopNum(loopNum + 1)
            }
        }

        timerRef.current = setTimeout(handleType, typingSpeed)

        return () => clearTimeout(timerRef.current)
    }, [text, isDeleting, loopNum, typingSpeed, words, isFlipped])

    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }
        handleResize() // Check on mount
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const gridCols = isMobile ? 3 : 6
    const gridRows = 6
    const totalBlocks = gridCols * gridRows

    // Images with absolute positions (percentages relative to the whole grid)
    // Mobile and desktop have different positions due to different column counts
    const images = isMobile ? [
        // Mobile positions (3 columns) - repositioned for narrower grid
        { name: 'register', top: '-2%', left: '2%', width: '60%', rotation: '-5deg' },
        { name: 'keyboard', top: '72%', left: '-5%', width: '65%', rotation: '5deg' },
        { name: 'javascript', top: '14%', left: '56%', width: '45%', rotation: '5deg' },
        { name: 'github', top: '68%', left: '60%', width: '40%', rotation: '10deg' },
        { name: 'gemini', top: '60%', left: '32%', width: '35%', rotation: '-8deg' },
        { name: 'chatgpt', top: '23%', left: '11%', width: '45%', rotation: '-1deg' },
    ] : [
        // Desktop positions (6 columns)
        { name: 'register', top: '-3%', left: '5%', width: '27%', rotation: '-5deg' },
        { name: 'keyboard', top: '60%', left: '2%', width: '28%', rotation: '5deg' },
        { name: 'javascript', top: '3%', left: '75%', width: '20%', rotation: '5deg' },
        { name: 'github', top: '60%', left: '80%', width: '19%', rotation: '15deg' },
        { name: 'gemini', top: '70%', left: '45%', width: '18%', rotation: '-8deg' },
        { name: 'chatgpt', top: '2%', left: '40%', width: '20%', rotation: '-1deg' },
    ];

    return (
        <section ref={container} className="h-screen w-full relative bg-[#D08700] overflow-hidden">

            {/* Invisible trigger element - ONLY for triggering ScrollTrigger animation */}
            <div
                ref={triggerRef}
                style={{
                    position: 'absolute',
                    top: '25px', // Positioned 20px from top, so animation triggers after ~20px scroll
                    left: 0,
                    width: '20px',
                    height: '20px',
                    background: 'transparent',
                    pointerEvents: 'none',
                    zIndex: -1, // Behind everything
                }}
            />



            {/* Layer 1: Base Grid (Interactive Flip Blocks with Text Integrated) */}
            <div
                className={`absolute inset-0 grid grid-cols-3 md:grid-cols-6 grid-rows-6 z-0 ${showGaps ? 'gap-px p-px' : 'gap-0 p-0'}`}
            >
                {[...Array(totalBlocks)].map((_, i) => (
                    <FlipBlock
                        key={i}
                        i={i}
                        text={text}
                        images={images} // Pass the global images array
                        cols={gridCols}
                        rows={gridRows}
                        disabled={isFlipped}
                        className="w-full h-full"
                    />
                ))}
            </div>

            {/* Title Text Overlay - Rendered once instead of in each FlipBlock for performance */}
            {showTitle && (
                <div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
                    style={{
                        transform: 'translateZ(0)', // Force GPU layer
                        willChange: 'contents',
                    }}
                >
                    <h1
                        className="font-pixel text-[15vw] leading-none font-bold text-white whitespace-nowrap"
                        style={{
                            textShadow: '0 10px 30px rgba(0,0,0,0.8)',
                        }}
                    >
                        {titleText}
                        <span className="animate-cursor-blink text-white">|</span>
                    </h1>
                </div>
            )}
        </section>
    )
}
