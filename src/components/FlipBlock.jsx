import { useRef, memo } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import reckonHeroImage from '../assets/optimized/reckonheroblackandwhite.jpg'
import registerImage from '../assets/registerimage.png'
import keyboardImage from '../assets/keyboardimage.png'
import javascriptImage from '../assets/javascriptimage.png'
import githubImage from '../assets/githubimage.png'
import geminiImage from '../assets/geminiimage.png'
import chatgptImage from '../assets/chatgptimage.png'

// Map of image names to imported images
const frontImageSources = {
    register: registerImage,
    keyboard: keyboardImage,
    javascript: javascriptImage,
    github: githubImage,
    gemini: geminiImage,
    chatgpt: chatgptImage,
}

// Memoized FlipBlock to prevent unnecessary re-renders during typewriter animation
const FlipBlock = memo(function FlipBlock({ className, i, text, images = [], disabled, cols = 6, rows = 6 }) {
    const containerRef = useRef(null)
    const flipperRef = useRef(null)

    const { contextSafe } = useGSAP({ scope: containerRef })

    const handleMouseEnter = contextSafe(() => {
        if (disabled || gsap.isTweening(flipperRef.current)) return;

        gsap.to(flipperRef.current, {
            rotationX: "+=360",
            duration: 1.2, // Reduced slightly for responsiveness, 2s is too slow feeling like lag
            ease: "back.out(2)", // Smoother single wobble, less jerky than elastic
            force3D: true, // Force GPU
            onComplete: () => {
                // Reset to 0 immediately to avoid accumulation or offset issues
                gsap.set(flipperRef.current, { rotationX: 0 })
            }
        })
    })

    // Calculate position based on dynamic grid size
    const col = i % cols;
    const row = Math.floor(i / cols);

    return (
        <div
            ref={containerRef}
            className={`relative perspective-[1000px] ${className}`}
            onMouseEnter={handleMouseEnter}
        >
            <div
                ref={flipperRef}
                className="flip-block-inner w-full h-full relative transform-3d"
                style={{ willChange: 'transform' }}
            >
                {/* Front Face - Yellow with Text Puzzle and optional Image */}
                <div className="absolute inset-0 bg-[#FDC700] rounded-lg backface-hidden overflow-hidden">
                    {/* Global Image Layer - each block sees its slice of the full composition */}
                    {images && images.length > 0 && (
                        <div
                            className="absolute pointer-events-none"
                            style={{
                                width: `${cols * 100}%`,
                                height: `${rows * 100}%`,
                                left: `-${col * 100}%`,
                                top: `-${row * 100}%`,
                                zIndex: 1,
                            }}
                        >
                            {images.map((img, idx) => (
                                frontImageSources[img.name] && (
                                    <img
                                        key={idx}
                                        src={frontImageSources[img.name]}
                                        alt={img.name}
                                        className="absolute object-contain"
                                        style={{
                                            top: img.top,
                                            left: img.left,
                                            width: img.width,
                                            height: img.height || 'auto',
                                            transform: `rotate(${img.rotation || '0deg'})`,
                                        }}
                                    />
                                )
                            ))}
                        </div>
                    )}

                    {/* Text Container: Always visible, spans the entire grid */}
                    <div
                        className="absolute flex items-center justify-center pointer-events-none"
                        style={{
                            width: `${cols * 100}%`,
                            height: `${rows * 100}%`,
                            left: `-${col * 100}%`,
                            top: `-${row * 100}%`,
                            zIndex: 2,
                        }}
                    >
                        <h1 className="font-pixel text-[15vw] leading-none font-bold text-[#0A0A0A] whitespace-nowrap">
                            {text}
                            <span className="animate-cursor-blink text-[#0A0A0A]">|</span>
                        </h1>
                    </div>
                </div>

                {/* Back Face - Image Puzzle (Centered & Cover) */}
                <div
                    className={`absolute bg-[#0A0A0A] backface-hidden overflow-hidden flex items-center justify-center ${disabled ? 'rounded-none border-0' : 'rounded-lg border border-white/5'
                        }`}
                    style={{
                        transform: 'rotateX(180deg)',
                        zIndex: disabled ? 10 : 0,
                        // Slightly larger than container to cover sub-pixel gaps
                        inset: disabled ? '-1px' : '0'
                    }}
                >
                    <img
                        src={reckonHeroImage}
                        alt="Reckon Hero"
                        className="absolute max-w-none pointer-events-none"
                        style={{
                            width: `${cols * 100}%`, // Full Grid Width
                            height: `${rows * 100}%`, // Full Grid Height
                            left: `-${col * 100}%`, // Offset to this block's position
                            top: `-${row * 100}%`, // Offset to this block's position
                            objectFit: "cover", // Ensure no stretching
                            objectPosition: "center", // Center the image
                        }}
                    />
                </div>
            </div>
        </div>
    )
})

export default FlipBlock
