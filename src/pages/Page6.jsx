import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import roadmapBg from '../assets/roadmap_bg_opt.png';

gsap.registerPlugin(ScrollTrigger);

const roadmapData = [
    {
        stage: "LVL 1",
        title: "LOGIN",
        desc: "JOIN THE SERVER. REGISTER YOUR TEAM. SYNC DATA.",
        theme: "cyan",
        icon: (
            <div className="w-12 h-12 relative">
                <div className="absolute inset-0 border-2 border-[#00f3ff] bg-[#00f3ff]/20"></div>
                <div className="absolute top-2 left-2 text-[#00f3ff] font-bold text-xl">&gt;_</div>
                <div className="absolute bottom-2 right-2 w-3 h-3 bg-[#00f3ff] animate-pulse"></div>
            </div>
        )
    },
    {
        stage: "LVL 2",
        title: "QUESTS",
        desc: "CHOOSE YOUR PROBLEM STATEMENT. BEGIN THE GRIND.",
        theme: "green",
        icon: (
            <div className="w-12 h-12 relative border-2 border-[#39ff14] bg-[#39ff14]/10 flex items-center justify-center">
                <div className="text-[#39ff14] text-2xl font-bold">?</div>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#39ff14]"></div>
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#39ff14]"></div>
            </div>
        )
    },
    {
        stage: "LVL 3",
        title: "GRIND",
        desc: "48H TOTAL WAR. CONVERT COFFEE INTO SOURCE CODE.",
        theme: "red",
        icon: (
            <div className="w-12 h-12 relative border-2 border-[#ff003c] bg-[#ff003c]/10 flex items-center justify-center overflow-hidden">
                <div className="w-8 h-4 border-t-4 border-r-4 border-[#ff003c] rounded-tr-xl transform translate-y-1"></div>
                <div className="absolute bottom-1 w-6 h-2 bg-[#ff003c]"></div>
            </div>
        )
    },
    {
        stage: "LVL 4",
        title: "BUFFS",
        desc: "MENTOR SESSION. LEVEL UP YOUR TECH STACK.",
        theme: "purple",
        icon: (
            <div className="w-12 h-12 relative border-2 border-[#bf00ff] bg-[#bf00ff]/10 flex items-center justify-center">
                <div className="w-0 h-0 border-l-10 border-l-transparent border-r-10 border-r-transparent border-b-20 border-b-[#bf00ff]"></div>
                <div className="absolute top-1 w-2 h-2 bg-[#bf00ff] rounded-full animate-bounce"></div>
            </div>
        )
    },
    {
        stage: "LVL 5",
        title: "BOSS",
        desc: "FINAL PITCH. DEFEAT THE JURY. WIN THE LOOT.",
        theme: "gold",
        icon: (
            <div className="w-12 h-12 relative border-2 border-[#ffd700] bg-[#ffd700]/10 flex items-center justify-center">
                <div className="w-8 h-4 border-b-4 border-[#ffd700] flex justify-between items-end">
                    <div className="w-1 h-3 bg-[#ffd700]"></div>
                    <div className="w-1 h-5 bg-[#ffd700] -translate-y-1"></div>
                    <div className="w-1 h-3 bg-[#ffd700]"></div>
                </div>
            </div>
        )
    },
];

const getThemeColors = (theme) => {
    switch (theme) {
        case 'cyan': return { main: '#00f3ff', shadow: 'rgba(0, 243, 255, 0.5)' }; // Cyan / Login
        case 'green': return { main: '#39ff14', shadow: 'rgba(57, 255, 20, 0.5)' }; // Neon Green / Quests
        case 'red': return { main: '#ff003c', shadow: 'rgba(255, 0, 60, 0.5)' }; // Cyber Red / Grind
        case 'purple': return { main: '#bf00ff', shadow: 'rgba(191, 0, 255, 0.5)' }; // Purple / Buffs
        case 'gold': return { main: '#ffd700', shadow: 'rgba(255, 215, 0, 0.5)' }; // Gold / Boss
        default: return { main: '#dcbd02', shadow: 'rgba(220, 189, 2, 0.5)' };
    }
}



const Page6 = () => {
    const containerRef = useRef(null);

    return (
        <div
            id="roadmap"
            ref={containerRef}
            className="text-[#0A0A0A] py-16 md:py-24 px-4 md:px-12 min-h-screen overflow-hidden"
            style={{
                fontFamily: 'var(--font-pixel)',
                backgroundColor: '#dcbd02',
                backgroundImage: `url(${roadmapBg})`,
                backgroundRepeat: 'repeat',
                backgroundSize: '300px'
            }}
        >
            <div className="max-w-6xl mx-auto relative">

                {/* HEADER */}
                <div className="mb-16 md:mb-20 text-center">
                    <p className="uppercase text-[10px] md:text-xs tracking-[0.4em] mb-4 animate-pulse">
                        [ LOADING MAP... ]
                    </p>
                    <h1 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter leading-none">
                        ROADMAP
                    </h1>
                </div>

                {/* ROADMAP CONTAINER */}
                <div className="relative">

                    {/* STRAIGHT VERTICAL SOLID LINE */}
                    {/* Desktop Line - Center */}
                    <div
                        className="absolute left-1/2 top-0 bottom-0 w-3 -translate-x-1/2 hidden md:block bg-[#0A0A0A]"
                        style={{ zIndex: 0 }}
                    />
                    {/* Mobile Line - Left Aligned */}
                    <div
                        className="absolute left-6 top-0 bottom-0 w-3 -translate-x-1/2 block md:hidden bg-[#0A0A0A]"
                        style={{ zIndex: 0 }}
                    />

                    {/* ROADMAP ITEMS - Alternating layout with nodes */}
                    <div className="relative z-10">

                        {roadmapData.map((item, index) => {
                            const isLeft = index % 2 === 0;
                            const themeColors = getThemeColors(item.theme);

                            return (
                                <div
                                    key={index}
                                    className={`relative flex items-center mb-16 md:mb-24 pl-16 md:pl-0 ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}
                                >
                                    {/* NODE - Positioned at center on desktop, left on mobile */}
                                    <div
                                        className="absolute z-20 left-6 md:left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 bg-[#dcbd02] border-[6px] md:border-8 border-[#0A0A0A] flex items-center justify-center shadow-[4px_4px_0px_rgba(10,10,10,1)]"
                                        style={{ borderRadius: '0' }}
                                    >
                                        <div className="w-4 h-4 md:w-5 md:h-5 bg-[#0A0A0A]" style={{ borderRadius: '0' }} />
                                    </div>

                                    {/* Horizontal Connector Line */}
                                    {/* Desktop Connector */}
                                    <div
                                        className={`absolute top-1/2 h-2 bg-[#0A0A0A] hidden md:block`}
                                        style={{
                                            width: '8%',
                                            left: isLeft ? 'auto' : '50%',
                                            right: isLeft ? '50%' : 'auto',
                                            transform: 'translateY(-50%)',
                                            zIndex: 1
                                        }}
                                    />
                                    {/* Mobile Connector */}
                                    <div
                                        className={`absolute top-1/2 h-2 bg-[#0A0A0A] block md:hidden`}
                                        style={{
                                            width: '2rem',
                                            left: '1.5rem',
                                            transform: 'translateY(-50%)',
                                            zIndex: 1
                                        }}
                                    />

                                    {/* CARD - Themed Screen Style */}
                                    <div
                                        className={`w-full md:w-[42%] p-1 md:p-1.5 
                                            bg-[#0A0A0A] border-4 md:border-[6px] border-[#0A0A0A]
                                            hover:translate-x-1 hover:-translate-y-1
                                            transition-transform duration-200 cursor-pointer
                                            shadow-[8px_8px_0px_rgba(10,10,10,0.5)]`}
                                        style={{ borderRadius: '0' }}
                                    >
                                        {/* Inner Screen Container */}
                                        <div
                                            className="w-full h-full p-6 md:p-8 relative overflow-hidden flex flex-col justify-between min-h-[180px]"
                                            style={{
                                                backgroundColor: '#050505',
                                                backgroundImage: `
                                                    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                                                    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
                                                `,
                                                backgroundSize: '20px 20px',
                                                border: `2px solid ${themeColors.main}`
                                            }}
                                        >

                                            {/* Header Bar */}
                                            <div className="flex justify-end items-start mb-4">
                                                {/* Stage Label */}
                                                <div
                                                    className="px-2 py-1 text-[10px] md:text-xs font-bold uppercase tracking-widest"
                                                    style={{
                                                        color: '#0A0A0A',
                                                        backgroundColor: themeColors.main,
                                                        boxShadow: `0 0 10px ${themeColors.main}`
                                                    }}
                                                >
                                                    {item.stage}
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div>
                                                <h3
                                                    className="text-3xl md:text-5xl font-bold uppercase mb-2 tracking-tight"
                                                    style={{
                                                        color: themeColors.main,
                                                        textShadow: `2px 2px 0px rgba(0,0,0,1), 0 0 15px ${themeColors.shadow}`
                                                    }}
                                                >
                                                    {item.title}
                                                </h3>
                                                <p className="text-xs md:text-sm font-medium leading-relaxed uppercase tracking-tight text-white/80">
                                                    {item.desc}
                                                </p>
                                            </div>

                                            {/* Scanline Effect Overlay (Optional/Subtle) */}
                                            <div className="absolute inset-0 pointer-events-none opacity-10"
                                                style={{
                                                    background: 'linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.5) 51%)',
                                                    backgroundSize: '100% 4px'
                                                }}
                                            />

                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                    </div>

                </div>

                {/* YOUTUBE VIDEO SECTION */}
                <div className="w-full max-w-4xl mx-auto mt-16 md:mt-24 px-4">
                    <div className="relative w-full aspect-video border-4 md:border-[6px] border-[#0A0A0A] shadow-[8px_8px_0px_rgba(10,10,10,0.5)] bg-[#0A0A0A]">
                        <iframe
                            className="w-full h-full"
                            src="https://www.youtube.com/embed/vmiF-qrzi-o"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Page6;
