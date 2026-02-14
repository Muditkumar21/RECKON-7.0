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
    FaHandshake,
    FaLightbulb
} from 'react-icons/fa'
import roadmapBg from '../assets/roadmap_bg_opt.png'
import sponsorBrochure from '../assets/PDFS/Reckon 7.0 Sponsorship Brochure - Change is here (1).pdf'
import ambassadorBrochure from '../assets/PDFS/Student B.pdf'

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
    { title: "Student Innovation", desc: "Empowering student-led innovations", icon: FaLightbulb },
]

// Sponsor Images (Local)
import sponsor1 from '../assets/sponsors/Gemini_Generated_Image_8jre9h8jre9h8jre-Photoroom.png'
import sponsor2 from '../assets/sponsors/Gemini_Generated_Image_8yxg048yxg048yxg-Photoroom.png'
import sponsor3 from '../assets/sponsors/Gemini_Generated_Image_apnic2apnic2apni-Photoroom.png'
import sponsor4 from '../assets/sponsors/Gemini_Generated_Image_ek7yagek7yagek7y-Photoroom.png'
import sponsor5 from '../assets/sponsors/Gemini_Generated_Image_ia9tp2ia9tp2ia9t-Photoroom.png'
import sponsor6 from '../assets/sponsors/Gemini_Generated_Image_rns47qrns47qrns4-Photoroom.png'
import sponsor7 from '../assets/sponsors/Gemini_Generated_Image_swyhjvswyhjvswyh-Photoroom.png'
import sponsor8 from '../assets/sponsors/Gemini_Generated_Image_wtzf4bwtzf4bwtzf-Photoroom.png'
import sponsor9 from '../assets/sponsors/Gemini_Generated_Image_uvzq0uuvzq0uuvzq-Photoroom.png'

// Sponsor logos
const sponsors = [
    { name: "Sponsor 1", logo: sponsor1 },
    { name: "Sponsor 2", logo: sponsor2 },
    { name: "Sponsor 3", logo: sponsor3 },
    { name: "Sponsor 4", logo: sponsor4 },
    { name: "Sponsor 5", logo: sponsor5 },
    { name: "Sponsor 6", logo: sponsor6 },
    { name: "Sponsor 7", logo: sponsor7 },
    { name: "Sponsor 8", logo: sponsor8 },
    { name: "Sponsor 9", logo: sponsor9 },
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
        buttons: [
            { text: "Apply Now", primary: true, link: "https://forms.gle/rDXHpHuCEzivgx416" },
            { text: "Download Brochure", primary: false, link: ambassadorBrochure }
        ],
        icon: FaBullhorn
    },
    {
        title: "BECOME A",
        subtitle: "SPONSOR",
        buttons: [
            { text: "Sponsor Us", primary: true, link: "https://forms.gle/wsMm8N6J3V8A4htn6" },
            { text: "Download Brochure", primary: false, link: sponsorBrochure }
        ],
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
                duration: 40, // Slower for better readability
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
                                className={`group relative bg-[#0A0A0A] p-1 
                                    border-[6px] border-[#0A0A0A] 
                                    shadow-[6px_6px_0px_0px_rgba(10,10,10,1)] md:shadow-[10px_10px_0px_0px_rgba(10,10,10,1)] 
                                    hover:shadow-[14px_14px_0px_0px_rgba(10,10,10,1)] 
                                    hover:-translate-x-1 hover:-translate-y-1
                                    transition-all duration-200 cursor-pointer
                                    flex flex-col items-center text-center
                                    ${index === problemCategories.length - 1 ? 'lg:col-start-2' : ''}`}
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
            <div className="bg-[#0A0A0A] py-4 md:py-6 overflow-hidden relative">
                {/* Marquee Container */}
                <div className="relative overflow-hidden w-full">
                    <div
                        ref={marqueeRef}
                        className="flex items-center gap-8 md:gap-14"
                        style={{ width: 'fit-content' }}
                    >
                        {/* Duplicate sponsors for seamless loop */}
                        {[...sponsors, ...sponsors].map((sponsor, index) => (
                            <div
                                key={index}
                                className="shrink-0 px-4 py-2 min-w-[180px] md:min-w-[240px] text-center
                                    md:min-h-[120px] flex items-center justify-center
                                    transition-transform cursor-pointer overflow-hidden"
                            >
                                {sponsor.logo ? (
                                    <img
                                        src={sponsor.logo}
                                        alt={sponsor.name}
                                        className="max-h-[90px] md:max-h-[110px] max-w-[180px] md:max-w-[220px] object-contain transition-all duration-300"
                                        loading="lazy"
                                        style={{
                                            imageRendering: 'pixelated'
                                        }}
                                    />
                                ) : (
                                    <span className="text-[#dcbd02] text-xl font-black uppercase">{sponsor.name}</span>
                                )}
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
                                    <div className="mt-auto w-full flex flex-col gap-3">
                                        {cta.buttons.map((btn, btnIndex) => (
                                            <button
                                                key={btnIndex}
                                                onClick={() => btn.link && window.open(btn.link, '_blank')}
                                                className={`w-full text-center
                                                    font-black uppercase tracking-wider
                                                    transition-all duration-200
                                                    ${btn.primary
                                                        ? 'py-3 px-6 text-lg bg-[#dcbd02] text-[#0A0A0A] hover:bg-white shadow-[4px_4px_0px_rgba(255,255,255,0.2)]'
                                                        : 'py-2 text-sm md:text-base bg-transparent text-[#dcbd02] hover:text-white hover:underline underline-offset-4'
                                                    }
                                                    `}
                                                style={btn.primary ? {
                                                    clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)'
                                                } : {}}
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
