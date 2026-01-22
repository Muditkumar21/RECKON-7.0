import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// 5x5 Grid Font definitions
const LETTERS = {
    R: [
        [1, 1, 1, 1, 0],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 0],
        [1, 0, 1, 0, 0],
        [1, 0, 0, 1, 0]
    ],
    E: [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0],
        [1, 1, 1, 1, 0],
        [1, 0, 0, 0, 0],
        [1, 1, 1, 1, 1]
    ],
    C: [
        [0, 1, 1, 1, 1],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [0, 1, 1, 1, 1]
    ],
    K: [
        [1, 0, 0, 0, 1],
        [1, 0, 0, 1, 0],
        [1, 1, 1, 0, 0],
        [1, 0, 0, 1, 0],
        [1, 0, 0, 0, 1]
    ],
    O: [
        [0, 1, 1, 1, 0],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [0, 1, 1, 1, 0]
    ],
    N: [
        [1, 0, 0, 0, 1],
        [1, 1, 0, 0, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 0, 1, 1],
        [1, 0, 0, 0, 1]
    ],
    '6': [
        [0, 1, 1, 1, 0],
        [1, 0, 0, 0, 0],
        [1, 1, 1, 1, 0],
        [1, 0, 0, 0, 1],
        [0, 1, 1, 1, 0]
    ],
    '7': [
        [1, 1, 1, 1, 1],
        [0, 0, 0, 0, 1],
        [0, 0, 0, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 0, 0, 0]
    ],
    '0': [
        [0, 1, 1, 1, 0],
        [1, 0, 0, 1, 1],
        [1, 0, 1, 0, 1],
        [1, 1, 0, 0, 1],
        [0, 1, 1, 1, 0]
    ],
    '.': [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0]
    ]
};

export default function Loader({ onComplete }) {
    const [bgBlocks, setBgBlocks] = useState([]);
    const [mainTextBlocks, setMainTextBlocks] = useState([]);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [blockSizes, setBlockSizes] = useState({ bg: 50, main: 25 });
    const [showOverlay, setShowOverlay] = useState(true);
    const containerRef = useRef(null);
    const hasAnimated = useRef(false);

    // Hide black overlay after 2 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowOverlay(false);
        }, 250);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // Disable scrolling
        document.body.style.overflow = 'hidden';

        // --- Responsive Settings ---
        const isMobile = window.innerWidth < 600;

        const BG_SIZE = isMobile ? 30 : 50;
        const MAIN_SIZE = isMobile ? 15 : 25;
        const GAP = isMobile ? 30 : 50;

        setBlockSizes({ bg: BG_SIZE, main: MAIN_SIZE });

        // --- Background Setup ---
        const cols = Math.ceil(window.innerWidth / BG_SIZE) + 1;
        const rows = Math.ceil(window.innerHeight / BG_SIZE) + 1;

        // Create BG blocks with pre-calculated random exit delays
        const bgArray = Array.from({ length: cols * rows }).map((_, i) => ({
            id: i,
            exitDelay: Math.random() * 0.5 // 0 to 0.5s stagger
        }));
        setBgBlocks(bgArray);

        // --- Text Setup ---
        const mainBlocks = [];
        const letterWidthVals = 5;
        const letterSpacingCols = 1;

        // Helper to Generate Text Blocks
        const generateText = (word, startX, startY, blockSize, targetArray) => {
            let curX = startX;
            word.split("").forEach((char) => {
                const pattern = LETTERS[char];
                if (pattern) {
                    pattern.forEach((row, r) => {
                        row.forEach((active, c) => {
                            if (active) {
                                targetArray.push({
                                    x: curX + c * blockSize,
                                    y: startY + r * blockSize,
                                    id: `t-${char}-${r}-${c}-${blockSize}-${startX}-${startY}`,
                                    enterDelay: Math.random() * 1, // 0 to 1s stagger for enter
                                    exitDelay: Math.random() * 0.5 // 0 to 0.5s stagger for exit
                                });
                            }
                        });
                    });
                    curX += (letterWidthVals + letterSpacingCols) * blockSize;
                }
            });
        };

        // Layout Calculations
        const lineHeight = 5 * MAIN_SIZE;

        generateText("REC", 0, 0, MAIN_SIZE, mainBlocks);
        generateText("KON", 0, lineHeight + GAP, MAIN_SIZE, mainBlocks);

        setMainTextBlocks(mainBlocks);

        // Store precise dimensions for centering
        const textWidth = (3 * 5 + 2 * 1) * MAIN_SIZE; // 17 cols
        const textHeight = (lineHeight * 2) + GAP;
        setDimensions({ width: textWidth, height: textHeight });

        return () => {
            // Re-enable scrolling on cleanup
            document.body.style.overflow = '';
        };
    }, []);

    // GSAP Animation Effect
    useEffect(() => {
        if (mainTextBlocks.length === 0 || bgBlocks.length === 0 || hasAnimated.current) return;
        hasAnimated.current = true;

        const textElements = containerRef.current?.querySelectorAll('.text-block-main');
        const bgElements = containerRef.current?.querySelectorAll('.bg-block');

        if (!textElements || !bgElements) return;

        // Create master timeline
        const masterTl = gsap.timeline({
            onComplete: () => {
                document.body.style.overflow = '';
                onComplete();
            }
        });

        // Calculate timing constants
        const ENTER_PHASE_DURATION = 1; // Max enter delay is 1s
        const PAUSE_DURATION = 1; // 1 second pause
        const EXIT_START_TIME = ENTER_PHASE_DURATION + PAUSE_DURATION; // 2s mark
        const BG_EXIT_START_TIME = EXIT_START_TIME + 0.5; // BG starts exiting 0.5s after text

        // Enter animation - animate each text block with its own delay
        textElements.forEach((el, i) => {
            const block = mainTextBlocks[i];
            if (block) {
                gsap.set(el, { opacity: 0, scale: 0 });
                masterTl.to(el, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.05,
                    ease: "none"
                }, block.enterDelay);
            }
        });

        // Exit animation for text blocks (starts at EXIT_START_TIME)
        textElements.forEach((el, i) => {
            const block = mainTextBlocks[i];
            if (block) {
                masterTl.to(el, {
                    opacity: 0,
                    scale: 0,
                    duration: 0.05,
                    ease: "none"
                }, EXIT_START_TIME + block.exitDelay);
            }
        });

        // Exit animation for background blocks (starts 0.5s after text starts disappearing)
        bgElements.forEach((el, i) => {
            const block = bgBlocks[i];
            if (block) {
                masterTl.to(el, {
                    opacity: 0,
                    duration: 0.1,
                    ease: "none"
                }, BG_EXIT_START_TIME + block.exitDelay);
            }
        });

    }, [mainTextBlocks, bgBlocks, onComplete]);

    return (
        <div ref={containerRef} className="fixed inset-0 z-50 pointer-events-none overflow-hidden">

            {/* Immediate black overlay to prevent flash of content - shows for 2 seconds */}
            {showOverlay && (
                <div
                    className="absolute inset-0 bg-[#0A0A0A] immediate-overlay"
                    style={{ zIndex: 100 }}
                />
            )}

            {/* Background Grid */}
            <div
                className="absolute top-0 left-0 flex flex-wrap content-start items-start"
                style={{
                    width: bgBlocks.length > 0 ? (Math.ceil(window.innerWidth / blockSizes.bg) * blockSizes.bg) : '100%',
                    height: bgBlocks.length > 0 ? (Math.ceil(window.innerHeight / blockSizes.bg) * blockSizes.bg) : '100%'
                }}
            >
                {bgBlocks.map((b) => (
                    <div
                        key={b.id}
                        className="bg-block bg-[#0A0A0A] box-border"
                        style={{
                            width: blockSizes.bg,
                            height: blockSizes.bg,
                        }}
                    />
                ))}
            </div>

            {/* Centered Logo Container */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="relative" style={{ width: dimensions.width, height: dimensions.height }}>

                    {/* Main Text (REC KON) */}
                    {mainTextBlocks.map((b) => (
                        <div
                            key={b.id}
                            className="text-block-main bg-white absolute"
                            style={{
                                width: blockSizes.main,
                                height: blockSizes.main,
                                top: b.y,
                                left: b.x,
                                opacity: 0,
                                transform: 'scale(0)'
                            }}
                        />
                    ))}

                </div>
            </div>
        </div>
    );
}
