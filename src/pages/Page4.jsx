import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

// Import all marquee images (using optimized versions ~100-200KB each)
import img1 from '../assets/optimized/1.jpg'
import img2 from '../assets/optimized/2.jpg'
import img3 from '../assets/optimized/3.jpg'
import img4 from '../assets/optimized/4.jpg'
import img5 from '../assets/optimized/5.jpg'
import img6 from '../assets/optimized/6.jpg'
import img7 from '../assets/optimized/7.jpg'
import img8 from '../assets/optimized/8.jpg'
import img11 from '../assets/optimized/11.jpg'
import img12 from '../assets/optimized/12.jpg'
import img13 from '../assets/optimized/13.jpg'
import img14 from '../assets/optimized/14.jpg'
import img15 from '../assets/optimized/15.jpg'
import img16 from '../assets/optimized/16.jpg'
import img17 from '../assets/optimized/17.jpg'
import img18 from '../assets/optimized/18.jpg'
import img19 from '../assets/optimized/19.jpg'
import img20 from '../assets/optimized/20.jpg'
import mainImg from '../assets/optimized/main.jpg'

gsap.registerPlugin(ScrollTrigger)

// Array of images for marquees (img9 was corrupted and removed)
const marquee1Images = [img1, img2, img3, img4, img5, img12, img7, img8, img6, img11]
const marquee2Images = [img12, img13, img14, img15, img16, img17, img18, img19, img20, img1]

export default function Page4() {
    const container = useRef(null)
    const textRef = useRef(null)
    const marquee1Ref = useRef(null)
    const marquee2Ref = useRef(null)
    const heroImageRef = useRef(null)

    // Main heading text
    const paragraph = "RECKON is JIET Jodhpur’s offline hackathon that brings students together to solve real-world problems using technology. It is a 24-hour event where participants collaborate in teams, build innovative solutions, and learn through hands-on experience."

    // 30 words Lorem for content section
    const loremMain = "With 100+ teams and 400+ participants, RECKON brings together some of the most passionate student innovators. The campus turns into a hub of creativity, collaboration, and competition. Every edition pushes participants to think bigger, build better, and learn faster."

    // Small paragraph beside it
    const smallParagraph = "It creates an environment where ideas are guided by responsibility, creativity, and collaboration. Every participant contributes to a shared vision of innovation."

    // Split text into words
    const words = paragraph.split(" ")

    useGSAP(() => {
        const wordElements = textRef.current.querySelectorAll('.word')

        // Text color fill animation
        gsap.fromTo(wordElements,
            { color: "#d4d4d4" },
            {
                color: "#0A0A0A",
                duration: 1,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: container.current,

                    start: "top bottom",
                    end: "center center",
                    scrub: true,
                }
            }
        )

        // Marquee 1: Right to Left - GPU accelerated for smooth scrolling
        gsap.fromTo(marquee1Ref.current,
            { xPercent: 0 },
            {
                xPercent: -35,
                ease: "none",
                force3D: true, // Force GPU acceleration
                scrollTrigger: {
                    trigger: container.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.5, // Reduced scrub for smoother response
                    fastScrollEnd: true, // Prevent lag during fast scroll
                }
            }
        )

        const mm = gsap.matchMedia();

        // Marquee 2: Left to Right - GPU accelerated
        // Desktop: Stops early for hero image interaction, centers hero image (index 4)
        mm.add("(min-width: 768px)", () => {
            // Calculate the xPercent needed to center the hero image (index 4)
            // Hero image is the 5th image (index 4) in set 0
            // We need to position it so it lands in the center of the viewport
            const calculateCenterPercent = () => {
                const marqueeEl = marquee2Ref.current;
                if (!marqueeEl) return -20;

                const images = marqueeEl.querySelectorAll('img, div[id^="m2-"]');
                if (images.length === 0) return -20;

                const heroImage = marqueeEl.querySelector('#m2-set0-img4');
                if (!heroImage) return -20;

                const marqueeWidth = marqueeEl.scrollWidth;
                const viewportWidth = window.innerWidth;
                const heroRect = heroImage.getBoundingClientRect();
                const marqueeRect = marqueeEl.getBoundingClientRect();

                // Get hero image center position relative to marquee start
                const heroOffsetFromMarqueeStart = heroImage.offsetLeft + (heroImage.offsetWidth / 2);

                // We want hero center to be at viewport center
                const viewportCenter = viewportWidth / 2;

                // Calculate the translateX needed (as percentage of marquee width)
                const translateX = viewportCenter - heroOffsetFromMarqueeStart;
                const xPercent = (translateX / marqueeWidth) * 100;

                return xPercent;
            };

            // Use a slight delay to ensure DOM is ready
            const endPercent = calculateCenterPercent();

            gsap.fromTo(marquee2Ref.current,
                { xPercent: -25 },
                {
                    xPercent: endPercent,
                    ease: "none",
                    force3D: true,
                    scrollTrigger: {
                        trigger: container.current,
                        start: "top bottom",
                        end: "85% center",
                        scrub: 0.5,
                        fastScrollEnd: true,
                    }
                }
            )
        });

        // Mobile: Continuous scrolling without stopping
        mm.add("(max-width: 767px)", () => {
            gsap.fromTo(marquee2Ref.current,
                { xPercent: -25 },
                {
                    xPercent: 0, // Move further effectively since it runs longer
                    ease: "none",
                    force3D: true,
                    scrollTrigger: {
                        trigger: container.current,
                        start: "top bottom",
                        end: "bottom top", // Runs until fully out of view
                        scrub: 0.5,
                        fastScrollEnd: true,
                    }
                }
            )
        });

        // Track if background has been switched
        let hasSwitched = false

        // Hero image animation: Move down within Page 4, scale to cover viewport
        // ONLY FOR DESKTOP: Different y values for different screen sizes
        // mm is already declared above

        // Helper function to create hero animation - targets the paragraph in Page5 directly
        const createHeroAnimation = () => {
            const targetParagraph = document.getElementById('hero-target-paragraph');
            if (!heroImageRef.current || !targetParagraph) return;

            const heroEl = heroImageRef.current;
            const targetScale = 2.5;

            // Calculate the final Y position based on document positions
            const getTargetY = () => {
                // Get positions relative to document (add scrollY to convert from viewport)
                const heroRect = heroEl.getBoundingClientRect();
                const targetRect = targetParagraph.getBoundingClientRect();
                const scrollY = window.scrollY;

                // Hero's current document positions
                const heroDocTop = heroRect.top + scrollY;
                const heroHeight = heroRect.height;

                // Target paragraph's document position (top edge)
                const targetDocTop = targetRect.top + scrollY;

                // Hero center position in document
                const heroCenter = heroDocTop + heroHeight / 2;

                // When scaled by 2.5x, the hero grows from its center
                // Scaled bottom will be at: heroCenter + (heroHeight * targetScale / 2) + yOffset
                // We want scaled bottom = targetDocTop
                // So: heroCenter + (heroHeight * targetScale / 2) + yOffset = targetDocTop
                // yOffset = targetDocTop - heroCenter - (heroHeight * targetScale / 2)

                const scaledHalfHeight = (heroHeight * targetScale) / 2;
                const gap = 9; // Gap between hero image bottom and paragraph top
                const yOffset = targetDocTop - heroCenter - scaledHalfHeight - gap;

                return yOffset;
            };

            // Create the animation with calculated Y
            gsap.to(heroEl, {
                y: getTargetY,  // GSAP will call this function
                scale: targetScale,
                zIndex: 100,
                ease: "power1.inOut",
                scrollTrigger: {
                    trigger: container.current,
                    start: "80% center",
                    // markers : true,
                    end: "138% bottom",
                    scrub: 1,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        // Background switch logic
                        if (self.progress >= 0.55 && !hasSwitched) {
                            hasSwitched = true
                            container.current.style.backgroundColor = '#0A0A0A'
                            window.dispatchEvent(new CustomEvent('page4BgSwitch', { detail: { dark: true } }))
                        } else if (self.progress < 0.5 && hasSwitched) {
                            hasSwitched = false
                            container.current.style.backgroundColor = 'white'
                            window.dispatchEvent(new CustomEvent('page4BgSwitch', { detail: { dark: false } }))
                        }
                    }
                }
            })
        };

        // HERO IMAGE ANIMATION - Now uses a single function for all desktop breakpoints
        // The y position is calculated dynamically based on the target div position
        mm.add("(min-width: 768px)", () => {
            createHeroAnimation();
        });

        // ONLY FOR MOBILE: Switch background based on scroll position (no hero image animation)
        mm.add("(max-width: 767px)", () => {
            ScrollTrigger.create({
                trigger: container.current,

                start: "95% center", // Trigger earlier on mobile
                end: "bottom bottom",
                onUpdate: (self) => {
                    // Switch to dark at 55% progress (relative to start/end), switch back to white when scrolling back
                    if (self.progress >= 0.1 && !hasSwitched) {
                        hasSwitched = true
                        container.current.style.backgroundColor = '#0A0A0A'
                        window.dispatchEvent(new CustomEvent('page4BgSwitch', { detail: { dark: true } }))
                    } else if (self.progress < 0.1 && hasSwitched) {
                        hasSwitched = false
                        container.current.style.backgroundColor = 'white'
                        window.dispatchEvent(new CustomEvent('page4BgSwitch', { detail: { dark: false } }))
                    }
                }
            })
        });
    }, { scope: container })

    return (
        <section
            ref={container}
            className="w-full flex flex-col bg-white text-[#0A0A0A] relative min-h-[200vh] md:min-h-[250vh]"
            style={{ transition: 'background-color 0.45s ease', marginTop: '-1px' }}
        >
            {/* Main heading text */}
            <div className="max-w-5xl text-center px-4 mx-auto">
                <p
                    ref={textRef}
                    className="text-3xl md:text-6xl leading-tight font-medium"
                    style={{ fontFamily: 'var(--font-pixel)' }}
                >
                    {words.map((word, i) => (
                        <span key={i} className="word inline-block mr-2 text-gray-600">
                            {word}
                        </span>
                    ))}
                </p>
            </div>

            {/* Marquee 1: Right to Left */}
            <div
                className="w-full overflow-hidden mt-16 md:mt-24 lg:mt-28 xl:mt-32 2xl:mt-36 py-4 md:py-5 lg:py-6 xl:py-7 2xl:py-8"
                style={{ marginLeft: '-2%', width: '104%' }}
            >
                <div
                    ref={marquee1Ref}
                    className="flex items-center gap-2 md:gap-3 lg:gap-4 xl:gap-5 2xl:gap-6"
                    style={{ width: 'fit-content', willChange: 'transform' }}
                >
                    {/* Duplicate images for seamless loop */}
                    {[...Array(2)].map((_, setIndex) => (
                        marquee1Images.map((imgSrc, i) => (
                            <img
                                key={`${setIndex}-${i}`}
                                id={`m1-set${setIndex}-img${i}`}
                                src={imgSrc}
                                alt={`marquee image ${i + 1}`}
                                loading="lazy"
                                className="w-48 h-32 md:w-64 md:h-44 lg:w-72 lg:h-48 xl:w-80 xl:h-56 2xl:w-96 2xl:h-64 object-cover shrink-0"
                            />
                        ))
                    ))}
                </div>
            </div>

            {/* Content Section: Two columns */}
            <div className="max-w-6xl mx-auto px-4 md:px-8 mt-12 md:mt-24 mb-8 md:mb-16 flex flex-col md:flex-row gap-6 md:gap-12">
                <div className="flex-1">
                    <p
                        className="text-lg md:text-2xl leading-relaxed"
                        style={{ fontFamily: 'var(--font-pixel)' }}
                    >
                        {loremMain}
                    </p>
                </div>
                <div className="flex-1 md:max-w-xs border-l-2 border-[#0A0A0A] pl-4 md:pl-6">
                    <p
                        className="text-xs md:text-base leading-relaxed uppercase font-semibold"
                        style={{ fontFamily: 'var(--font-pixel)' }}
                    >
                        {smallParagraph}
                    </p>
                </div>
            </div>

            {/* Marquee 2: Static */}
            <div
                className="w-full overflow-visible py-4 md:py-5 lg:py-6 xl:py-7 2xl:py-8"
            >
                <div
                    ref={marquee2Ref}
                    className="flex items-center gap-2 md:gap-3 lg:gap-4 xl:gap-5 2xl:gap-6"
                    style={{ width: 'fit-content', willChange: 'transform' }}
                >
                    {/* Image m2-set0-img4 has the animation effect - uses main.JPG */}
                    {[...Array(2)].map((_, setIndex) => (
                        marquee2Images.map((imgSrc, i) => {
                            const isHeroImage = setIndex === 0 && i === 4
                            // Hero image uses main.JPG for the special animation
                            const imageUrl = isHeroImage ? mainImg : imgSrc

                            if (isHeroImage) {
                                // Hero image uses div with background for better scaling
                                return (
                                    <div
                                        key={`${setIndex}-${i}`}
                                        id={`m2-set${setIndex}-img${i}`}
                                        ref={heroImageRef}
                                        className="w-48 h-32 md:w-64 md:h-44 lg:w-72 lg:h-48 xl:w-80 xl:h-56 2xl:w-96 2xl:h-64 shrink-0"
                                        style={{
                                            backgroundImage: `url(${imageUrl})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                        }}
                                    />
                                )
                            }

                            return (
                                <img
                                    key={`${setIndex}-${i}`}
                                    id={`m2-set${setIndex}-img${i}`}
                                    src={imageUrl}
                                    alt={`marquee image ${i + 11}`}
                                    loading="lazy"
                                    className="w-48 h-32 md:w-64 md:h-44 lg:w-72 lg:h-48 xl:w-80 xl:h-56 2xl:w-96 2xl:h-64 object-cover shrink-0"
                                />
                            )
                        })
                    ))}
                </div>
            </div>

        </section>
    )
}
