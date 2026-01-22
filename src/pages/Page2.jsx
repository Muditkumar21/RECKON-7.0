import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export default function Page2() {
    const container = useRef(null)
    const textRef = useRef(null)

    const paragraph = "RECKON is a platform where ideas are shaped through curiosity and effort. It brings together creative minds to explore ideas, learn new skills, and build meaningful solutions.The journey encourages growth, challenges comfort zones, and creates lasting impact through learning and teamwork."

    // Split text into words
    const words = paragraph.split(" ")

    useGSAP(() => {
        const wordElements = textRef.current.querySelectorAll('.word')

        gsap.fromTo(wordElements,
            { color: "#4b5563" }, // Start Gray (Tailwind gray-600)
            {
                color: "#ffffff", // End White
                duration: 1,
                stagger: 0.1,
                scrollTrigger: {
                    // markers: true,
                    trigger: container.current,
                    start: "40% 100%", // Start earlier to see effect
                    end: "bottom center",
                    scrub: true,
                }
            }
        )
    }, { scope: container })

    return (
        <section ref={container} className="min-h-screen w-full flex justify-center items-center bg-[#0A0A0A] text-white p-8 relative overflow-hidden">
            <div className="max-w-3xl text-center">
                <p
                    ref={textRef}
                    className="text-2xl md:text-5xl leading-tight font-medium"
                    style={{ fontFamily: 'var(--font-pixel)' }}
                >
                    {words.map((word, i) => (
                        <span key={i} className="word inline-block mr-2 text-gray-600">
                            {word}
                        </span>
                    ))}
                </p>
            </div>
        </section>
    )
}
