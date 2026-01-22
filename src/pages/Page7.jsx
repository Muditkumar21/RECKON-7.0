import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import {
    FaBook,
    FaWheelchair,
    FaMicrochip,
    FaCoins,
    FaGamepad,
    FaBrain,
    FaLeaf,
    FaHeartbeat,
    FaCube,
    FaArrowRight,
    FaBullhorn,
    FaHandshake
} from 'react-icons/fa'
import roadmapBg from '../assets/roadmap_bg_opt.png'

// Problem Statement Categories data
const problemCategories = [
    { title: "Edutech", desc: "Transforming education through innovative technology solutions", icon: FaBook },
    { title: "Accessibility", desc: "Making technology accessible for differently abled individuals", icon: FaWheelchair },
    { title: "IOT & Automation", desc: "Connected devices and smart automation systems", icon: FaMicrochip },
    { title: "FinTech", desc: "Revolutionary financial technology solutions", icon: FaCoins },
    { title: "Gaming & Entertainment", desc: "Immersive experiences with AR, VR, and XR", icon: FaGamepad },
    { title: "AI & Machine Learning", desc: "Cutting-edge artificial intelligence solutions", icon: FaBrain },
    { title: "Sustainability", desc: "E-waste management and sustainable tech solutions", icon: FaLeaf },
    { title: "Healthcare & MedCare", desc: "Innovative medical and healthcare technology", icon: FaHeartbeat },
    { title: "Web3 & Blockchain", desc: "Decentralized systems and blockchain technology solutions", icon: FaCube },
]

// Sponsor logos (placeholder)
const sponsors = [
    "Sponsor 1", "Sponsor 2", "Sponsor 3", "Sponsor 4", "Sponsor 5",
    "Sponsor 6", "Sponsor 7", "Sponsor 8", "Sponsor 9", "Sponsor 10"
]

// CTA data
const ctaData = [
    {
        title: "RECKON 7.0",
        subtitle: "REGISTER NOW",
        buttons: [{ text: "Register", primary: true, link: "https://reckon-7.devfolio.co/overview" }],
        icon: FaArrowRight
    },
    {
        title: "BECOME AN",
        subtitle: "AMBASSADOR",
        buttons: [{ text: "Apply Now", primary: true }],
        icon: FaBullhorn
    },
    {
        title: "BECOME A",
        subtitle: "SPONSOR",
        buttons: [{ text: "Sponsor Us", primary: true, link: "https://docs.google.com/forms/d/e/1FAIpQLSe9coLSh-O-JubmbYTKS-fjVdeZzUcvPc5uDHDs-Awq10mIHg/viewform" }],
        icon: FaHandshake
    }
]

export default function Page7() {
    const container = useRef(null)
    const marqueeRef = useRef(null)

    // Simple always-running marquee animation
    useEffect(() => {
        if (marqueeRef.current) {
            const marquee = marqueeRef.current
            const animation = gsap.to(marquee, {
                xPercent: -50,
                ease: "none",
                duration: 20,
                repeat: -1,
            })

            return () => animation.kill()
        }
    }, [])

    return (
        <section
            ref={container}
            className="w-full overflow-hidden"
            style={{
                fontFamily: 'var(--font-pixel)',
                backgroundColor: '#dcbd02',
                backgroundImage: `url(${roadmapBg})`,
                backgroundRepeat: 'repeat',
                backgroundSize: '300px'
            }}
        >
            {/* SECTION 1: Problem Statement Categories */}
            <div id="problem-statement" className="py-16 md:py-20 px-4 md:px-12">
                <div className="max-w-6xl mx-auto">
                    {/* Header with retro pill styling */}
                    <div className="flex justify-center mb-12">
                        <div className="bg-[#dcbd02] border-4 md:border-[6px] border-[#0A0A0A] p-2 md:p-4 shadow-[8px_8px_0px_0px_rgba(10,10,10,1)]">
                            <h2 className="text-4xl md:text-5xl font-black text-[#0A0A0A] uppercase tracking-tight leading-none px-4 md:px-8">
                                PROBLEM STATEMENT CATEGORIES
                            </h2>
                        </div>
                    </div>

                    {/* Categories Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                        {problemCategories.map((category, index) => (
                            <div
                                key={index}
                                onClick={() => window.open('/Problem Statements.html', '_blank')}
                                className="group relative bg-[#0A0A0A] p-1 
                                    border-[6px] border-[#0A0A0A] 
                                    shadow-[6px_6px_0px_0px_rgba(10,10,10,1)] md:shadow-[10px_10px_0px_0px_rgba(10,10,10,1)] 
                                    hover:shadow-[14px_14px_0px_0px_rgba(10,10,10,1)] 
                                    hover:-translate-x-1 hover:-translate-y-1
                                    transition-all duration-200 cursor-pointer
                                    flex flex-col items-center text-center"
                                style={{
                                    borderRadius: '12px'
                                }}
                            >
                                {/* Inner yellow border for double border effect */}
                                <div className="w-full h-full border-2 border-[#dcbd02] p-6 pb-8 flex flex-col items-center bg-[#0A0A0A] rounded-[8px]">

                                    {/* Icon Box - Floating at top */}
                                    <div className="w-20 h-20 bg-[#dcbd02] border-4 border-[#dcbd02] rounded-lg flex items-center justify-center mb-6 
                                        shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] group-hover:scale-110 transition-transform duration-200">
                                        <category.icon className="text-4xl text-[#0A0A0A]" />
                                    </div>

                                    <h3 className="text-[#dcbd02] font-black text-xl md:text-2xl mb-3 uppercase tracking-wide">
                                        {category.title}
                                    </h3>

                                    <p className="text-[#dcbd02]/70 text-xs md:text-sm font-bold uppercase leading-relaxed max-w-[90%]">
                                        {category.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* SECTION 2: Sponsors */}
            <div className="bg-[#0A0A0A] py-12 md:py-16 overflow-hidden relative border-y-8 border-[#dcbd02]">
                {/* Section Title */}
                <h2 className="text-4xl md:text-6xl font-black text-[#dcbd02] text-center mb-10 tracking-tight uppercase">
                    SPONSORS
                </h2>

                {/* Marquee Container */}
                <div className="relative overflow-hidden w-full">
                    <div
                        ref={marqueeRef}
                        className="flex items-center gap-8 md:gap-12"
                        style={{ width: 'fit-content' }}
                    >
                        {/* Duplicate sponsors for seamless loop */}
                        {[...sponsors, ...sponsors, ...sponsors, ...sponsors].map((sponsor, index) => (
                            <div
                                key={index}
                                className="shrink-0 bg-[#dcbd02] border-4 border-[#dcbd02] px-8 py-4 min-w-[150px] md:min-w-[200px] text-center
                                    md:min-h-[80px] flex items-center justify-center
                                    shadow-[6px_6px_0px_0px_#ffffff]
                                    hover:translate-y-1 transition-transform cursor-pointer"
                                style={{
                                    clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)'
                                }}
                            >
                                <span className="text-[#0A0A0A] text-lg font-black uppercase">{sponsor}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* SECTION 3: CTAs - Horizontal Layout */}
            <div className="py-20 px-4 md:px-12 bg-[#dcbd02]/0">
                {/* Note: I added /0 transparency or should I remove bg? 
               Wait, Page6 has `div className="relative z-10"` inside the background.
               Here, Section 1, 2, 3 are inside the main `section` which HAS the background.
               So internal divs should probably be transparent or have no bg unless they NEED it.
               Section 1 has `py-16 ...` (transparent).
               Section 2 has `bg-[#0A0A0A]` (Opaque black).
               Section 3 has `bg-[#dcbd02]` currently.
               If the main section has the pattern, Section 3 should probably be transparent to show the pattern?
               Or if Section 3 is supposed to be yellow-on-yellow, then maybe keep it.
               But the pattern is on the background.
               If I want the pattern to show, Section 3 should NOT have a solid color unless it's a card.
               Section 3 container has `bg-[#dcbd02]`. I should remove this to let the pattern show?
               The user said "background ... same as page 6". Page 6 has the pattern EVERYWHERE except where cards block it.
               So I should remove `bg-[#dcbd02]` from Section 3 container.
            */}
                <div className="max-w-7xl mx-auto">
                    {/* 3-column grid for CTAs */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {ctaData.map((cta, index) => (
                            <div
                                key={index}
                                className="bg-[#0A0A0A] p-2 border-[6px] border-[#0A0A0A] 
                                    shadow-[6px_6px_0px_0px_rgba(10,10,10,1)] md:shadow-[12px_12px_0px_0px_rgba(10,10,10,1)]
                                    hover:shadow-[12px_12px_0px_0px_rgba(10,10,10,1)] md:hover:shadow-[16px_16px_0px_0px_rgba(10,10,10,1)]
                                    hover:-translate-y-1 md:hover:-translate-y-2
                                    transition-all duration-200 group relative overflow-hidden"
                                style={{ borderRadius: '16px' }}
                            >
                                <div className="bg-[#0A0A0A] border-2 border-[#dcbd02] h-full p-6 md:p-8 flex flex-col justify-between items-center md:items-start text-center md:text-left rounded-[10px]">

                                    <div className="w-full">
                                        {/* Icon */}
                                        <div className="text-4xl text-[#dcbd02] mb-6 opacity-80 flex justify-center md:justify-start">
                                            <cta.icon />
                                        </div>

                                        {/* Titles */}
                                        <h3 className="text-xl md:text-2xl text-[#dcbd02] uppercase tracking-wide font-medium mb-1">
                                            {cta.title}
                                        </h3>
                                        <h3 className="text-2xl md:text-4xl text-[#dcbd02] font-black uppercase tracking-tight mb-8">
                                            {cta.subtitle}
                                        </h3>
                                    </div>

                                    {/* Buttons */}
                                    <div className="mt-auto">
                                        {cta.buttons.map((btn, btnIndex) => (
                                            <button
                                                key={btnIndex}
                                                onClick={() => btn.link && window.open(btn.link, '_blank')}
                                                className={`w-full py-4 px-6 text-center
                                                    font-black uppercase text-lg tracking-wider
                                                    transition-all duration-200
                                                    ${btn.primary
                                                        ? 'bg-[#dcbd02] text-[#0A0A0A] hover:bg-white'
                                                        : 'bg-transparent text-[#dcbd02] hover:bg-[#dcbd02] hover:text-[#0A0A0A]'
                                                    }
                                                    `}
                                                style={{
                                                    clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)'
                                                }}
                                            >
                                                {btn.text}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
