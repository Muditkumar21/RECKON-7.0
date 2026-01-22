import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

// Team member images (optimized)
import heenalImg from '../assets/team-optimized/heenal.jpg'
import harshitImg from '../assets/team-optimized/Harshit kachhwaha.JPG.jpg'
import yazdaanImg from '../assets/team-optimized/yazdaan_ahmed.jpg'
import himanshuImg from '../assets/team-optimized/HIMANSHU BHANDARI.JPG.jpg'
import kavyaImg from '../assets/team-optimized/kavya_khatri.jpg'
import nikshayImg from '../assets/team-optimized/Nikshay Soni.JPG.jpg'
import kartikeyImg from '../assets/team-optimized/kartikeya_goyal.jpg'
import lakshitImg from '../assets/team-optimized/Lakshit Pareek.JPG.jpg'
import anshulImg from '../assets/team-optimized/Anshul Bharti Goswami.jpg'
import harryImg from '../assets/team-optimized/Harry Gehlot.JPG.jpg'
import prahladImg from '../assets/team-optimized/PRAHLAD SINGH .jpg'
import puneetImg from '../assets/team-optimized/puneet.JPG.jpg'
import dimpleImg from '../assets/team-optimized/dimple.jpg'
import divyanshImg from '../assets/team-optimized/divyansh_vyas_pr.jpg'
import rajImg from '../assets/team-optimized/Raj Singh Rajpurohit.jpg'
import keshavImg from '../assets/team-optimized/keshav gaur.JPEG.jpg'
import shrutiImg from '../assets/team-optimized/shruti.JPG.jpg'
import namitImg from '../assets/team-optimized/namitmathur.jpg'
import muditImg from '../assets/team-optimized/mudit.jpg'
import arpitImg from '../assets/team-optimized/arpit.jpg'
import nishantImg from '../assets/team-optimized/Nishant Rankawat.jpg'
import bhavyaImg from '../assets/team-optimized/bhavya.jpg'

// Team Data with names, roles, and images (arranged by hierarchy)
const teamData = [
    // Co-Lead
    { name: "HEENAL KAWAR RATHORE", role: "CO-LEAD DSC-JU", image: heenalImg },

    // All Leads (Technical, Management, PR, Media & Design)
    { name: "NAMIT MATHUR", role: "LEAD TECHNICAL", image: namitImg },
    { name: "LAKSHIT PAREEK", role: "LEAD MANAGEMENT", image: lakshitImg },
    { name: "PUNEET GOUR", role: "LEAD PR", image: puneetImg },
    { name: "HARSHIT KACCHWAHA", role: "LEAD MEDIA & DESIGN", image: harshitImg },

    // All Co-Leads (Technical, Management, PR, Media & Design)
    { name: "MUDIT KUMAR", role: "CO-LEAD TECHNICAL", image: muditImg },
    { name: "ANSHUL BHARTI GOSWAMI", role: "CO-LEAD MANAGEMENT", image: anshulImg },
    { name: "DIMPLE ACHARYA", role: "CO-LEAD PR", image: dimpleImg },
    { name: "YAZDAAN AHMED", role: "CO-LEAD MEDIA & DESIGN", image: yazdaanImg },

    // Technical Team
    { name: "ARPIT SINGHAL", role: "TECHNICAL", image: arpitImg },
    { name: "NISHANT", role: "TECHNICAL", image: nishantImg },
    { name: "BHAVYA SHARMA", role: "TECHNICAL", image: bhavyaImg },

    // Management Team
    { name: "HARRY GEHLOT", role: "MANAGEMENT", image: harryImg },
    { name: "PRAHLAD SINGH", role: "MANAGEMENT", image: prahladImg },

    // PR Team
    { name: "DIVYANSH VYAS", role: "PR", image: divyanshImg },
    { name: "RAJ SINGH RAJPUROHIT", role: "PR", image: rajImg },
    { name: "KESHAV GAUR", role: "PR", image: keshavImg },
    { name: "SHRUTI SURANA", role: "PR", image: shrutiImg },

    // Media & Design Team
    { name: "HIMANSHU BHANDARI", role: "MEDIA & DESIGN", image: himanshuImg },
    { name: "KAVYA KHATRI", role: "MEDIA & DESIGN", image: kavyaImg },
    { name: "NIKSHAY SONI", role: "MEDIA & DESIGN", image: nikshayImg },
    { name: "KARTIKEY GOYEL", role: "MEDIA & DESIGN", image: kartikeyImg },
]


export default function Page8() {
    const container = useRef(null)
    const splitDivRef = useRef(null)
    const imageWrapperRef = useRef(null)
    const [currentImage, setCurrentImage] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)

    // Handle slide change
    const handleSlide = (direction) => {
        if (isAnimating) return

        setIsAnimating(true)
        const imageWrapper = imageWrapperRef.current
        const splitDiv = splitDivRef.current

        // Calculate next index
        let nextIndex
        if (direction === 'next') {
            nextIndex = (currentImage + 1) % teamData.length
        } else {
            nextIndex = (currentImage - 1 + teamData.length) % teamData.length
        }

        const tl = gsap.timeline({
            onComplete: () => setIsAnimating(false)
        })

        // Phase 1: Expand the split div (cover current image)
        tl.to(splitDiv, {
            height: imageWrapper.offsetHeight * 1.2,
            duration: 0.75,
            ease: "power2.inOut",
        })

        // Change image when bar is fully expanded (before contracting)
        tl.call(() => {
            setCurrentImage(nextIndex)
        })

        // Phase 2: Contract the split div (reveal new image)
        tl.to(splitDiv, {
            height: 0,
            duration: 0.75,
            ease: "power2.inOut",
        })
    }

    const currentMember = teamData[currentImage % teamData.length]

    return (
        <section
            ref={container}
            className="min-h-screen w-full flex items-center justify-center p-8 md:p-12 overflow-hidden"
            style={{
                fontFamily: 'var(--font-pixel)',
                backgroundColor: '#ffffff',
            }}
        >
            {/* Main Retro Container */}
            <div className="w-full max-w-7xl bg-[#dcbd02] border-[6px] border-[#0A0A0A] shadow-[12px_12px_0px_0px_#0A0A0A] relative flex flex-col md:flex-row min-h-[600px]">

                {/* Vertical Divider Line */}
                <div className="hidden md:block absolute left-1/2 top-12 bottom-12 w-[4px] bg-[#0A0A0A] -translate-x-1/2 z-10"></div>

                {/* MOBILE TITLE (Visible only on mobile) */}
                <div className="w-full p-8 pb-0 text-center block md:hidden order-1">
                    <h1 className="text-5xl font-black text-[#0A0A0A] uppercase leading-none tracking-tight">
                        MEET THE <br /> TEAM
                    </h1>
                    <p className="mt-4 text-base text-[#0A0A0A] font-semibold leading-relaxed">
                        Meet the incredible team behind Reckon 7.0!<br />Our passionate crew from DSC-JU brings together diverse talents in design, management, PR, and technology to create an unforgettable hackathon experience.
                    </p>
                </div>

                {/* LEFT SIDE: Content (Controls) */}
                <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center items-center md:items-start relative order-3 md:order-1">
                    <div className="mb-8 hidden md:block">
                        <h1 className="text-5xl md:text-7xl font-black text-[#0A0A0A] uppercase leading-none tracking-tight mb-4">
                            MEET THE <br /> TEAM
                        </h1>
                        <p className="text-base md:text-lg text-[#0A0A0A] font-semibold leading-relaxed max-w-md">
                            Meet the incredible team behind Reckon 7.0!<br />Our passionate crew from DSC-JU brings together diverse talents in design, management, PR, and technology to create an unforgettable hackathon experience.
                        </p>
                    </div>

                    {/* Retro Navigation Buttons */}
                    <div className="flex flex-row md:flex-col gap-4 w-fit">
                        <button
                            onClick={() => handleSlide('prev')}
                            disabled={isAnimating}
                            className={`w-16 h-16 md:w-20 md:h-20 bg-[#0A0A0A] border-4 border-[#0A0A0A] flex items-center justify-center
                                shadow-[6px_6px_0px_0px_#ffffff] active:shadow-none active:translate-x-[6px] active:translate-y-[6px]
                                transition-all duration-100 group
                                ${isAnimating ? 'opacity-80' : 'hover:-translate-y-1'}`}
                        >
                            <FaArrowLeft className="text-2xl md:text-3xl text-[#dcbd02] group-hover:text-white transition-colors" />
                        </button>
                        <button
                            onClick={() => handleSlide('next')}
                            disabled={isAnimating}
                            className={`w-16 h-16 md:w-20 md:h-20 bg-[#0A0A0A] border-4 border-[#0A0A0A] flex items-center justify-center
                                shadow-[6px_6px_0px_0px_#ffffff] active:shadow-none active:translate-x-[6px] active:translate-y-[6px]
                                transition-all duration-100 group
                                ${isAnimating ? 'opacity-80' : 'hover:-translate-y-1'}`}
                        >
                            <FaArrowRight className="text-2xl md:text-3xl text-[#dcbd02] group-hover:text-white transition-colors" />
                        </button>
                    </div>

                    {/* Counter */}
                    <div className="relative mt-8 md:mt-0 md:absolute md:bottom-8 md:right-16 text-xl font-black text-[#0A0A0A]">
                        {String(currentImage + 1).padStart(2, '0')} / {String(teamData.length).padStart(2, '0')}
                    </div>
                </div>

                {/* RIGHT SIDE: Image Frame */}
                <div className="w-full md:w-1/2 p-8 md:p-16 flex items-center justify-center bg-[#dcbd02] relative order-2 md:order-2">

                    {/* Monitor Frame */}
                    <div className="relative w-full max-w-md aspect-4/5 bg-[#0A0A0A] p-3 rounded-lg shadow-[8px_8px_0px_0px_#ffffff]">
                        {/* Monitor Inner Bezel */}
                        <div className="w-full h-full border-4 border-[#dcbd02] rounded-sm p-1 relative overflow-hidden bg-[#e0e0e0]">

                            {/* Inner Screen Container */}
                            <div ref={imageWrapperRef} className="w-full h-full relative overflow-hidden bg-[#0a0a0a]">
                                <img
                                    src={currentMember.image}
                                    alt={currentMember.name}
                                    className="w-full h-full object-cover transition-all duration-500"
                                />
                                {/* Split Div */}
                                <div
                                    ref={splitDivRef}
                                    className="absolute left-0 right-0 top-1/2 -translate-y-1/2 bg-[#dcbd02]"
                                    style={{ height: 0 }}
                                />
                            </div>

                            {/* Scanline Overlay */}
                            <div className="absolute inset-0 pointer-events-none opacity-20"
                                style={{
                                    background: 'linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.5) 51%)',
                                    backgroundSize: '100% 4px'
                                }}
                            />
                        </div>

                        {/* Name Tag (Below Screen) */}
                        <div className="mt-3 bg-[#dcbd02] border-2 border-[#dcbd02] p-2 text-center">
                            <h3 className="text-[#0A0A0A] font-bold text-xs md:text-sm uppercase tracking-widest">
                                {currentMember.name} | {currentMember.role}
                            </h3>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}
