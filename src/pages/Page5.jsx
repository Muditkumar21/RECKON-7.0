import { useRef, useEffect, useState } from 'react'
import mainImg from '../assets/optimized/main.jpg'

export default function Page5() {
    const container = useRef(null)
    const [isDark, setIsDark] = useState(false)

    // Listen for background switch event from Page4
    useEffect(() => {
        const handleBgSwitch = (e) => {
            if (container.current) {
                container.current.style.backgroundColor = e.detail.dark ? '#0A0A0A' : 'white'
                setIsDark(e.detail.dark)
            }
        }

        window.addEventListener('page4BgSwitch', handleBgSwitch)
        return () => window.removeEventListener('page4BgSwitch', handleBgSwitch)
    }, [])

    // Dynamic colors based on background
    const headingColor = isDark ? '#dcbd02' : '#0A0A0A'
    const borderColor = isDark ? '#dcbd02' : '#0A0A0A'
    const shadowColor = isDark ? 'rgba(220,189,2,0.5)' : 'rgba(10,10,10,1)'

    return (
        <section
            ref={container}
            className="min-h-screen md:h-[200vh] w-full bg-white overflow-visible pb-40 md:pb-0"
            style={{ transition: 'background-color 0.45s ease' }}
        >
            {/* Paragraph beneath the hero image from Page 4 */}
            <div className="pt-32 md:pt-[90vh] px-8 max-w-4xl mx-auto">
                {/* Mobile Main Image */}
                <div className="block md:hidden mb-8">
                    <img
                        src={mainImg}
                        alt="Main Event"
                        loading="lazy"
                        className="w-full max-w-sm mx-auto rounded-lg shadow-[8px_8px_0px_white] border-4 border-white"
                    />
                </div>

                <p
                    id="hero-target-paragraph"
                    className={`text-xl md:text-2xl leading-relaxed text-center transition-colors duration-450 text-white ${isDark ? 'md:text-white' : 'md:text-[#0A0A0A]'}`}
                    style={{ fontFamily: 'var(--font-pixel)' }}
                >
                    RECKON is made possible by a dedicated team of students, faculty members, and mentors who work together to bring the event to life. From planning and coordination to mentoring and evaluation, every effort is driven by passion and teamwork.
                </p>
            </div>

            {/* Prize Pool Section */}
            <div className="mt-10 md:mt-16 px-4 md:px-8 max-w-5xl mx-auto text-center" style={{ fontFamily: 'var(--font-pixel)' }}>
                <h2
                    className="text-2xl md:text-5xl font-bold mb-2 md:mb-4"
                    style={{ color: headingColor, transition: 'color 0.45s ease' }}
                >
                    PRIZE POOL
                </h2>
                <div className="text-4xl md:text-7xl font-bold text-[#dcbd02] drop-shadow-[4px_4px_0px_rgba(10,10,10,0.5)]" style={{ fontFamily: 'var(--font-minecraft)' }}>
                    <span style={{ marginRight: '6px' }}>₹</span>1,00,000
                </div>
            </div>

            {/* Cash Prizes Section */}
            <div className="mt-10 md:mt-16 px-4 md:px-8 max-w-5xl mx-auto" style={{ fontFamily: 'var(--font-pixel)' }}>
                <h3
                    className="text-xl md:text-4xl font-bold text-center mb-6 md:mb-12"
                    style={{ color: headingColor, transition: 'color 0.45s ease' }}
                >
                    CASH PRIZES
                </h3>
                <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-12">
                    {/* 1st Place - Gold/Yellow theme - Displayed first on mobile */}
                    <div
                        className="order-1 p-5 md:p-10 border-4 text-center w-[85%] md:w-72 md:order-2 transform md:-translate-y-4"
                        style={{
                            backgroundColor: isDark ? '#1a1a1a' : '#dcbd02',
                            borderColor: '#dcbd02',
                            boxShadow: '6px 6px 0px rgba(220,189,2,0.6)',
                            transition: 'all 0.45s ease'
                        }}
                    >
                        <div className="text-base md:text-xl font-bold mb-1 md:mb-2" style={{ color: isDark ? '#dcbd02' : '#0A0A0A' }}>1ST PLACE</div>
                        <div className="text-2xl md:text-5xl font-bold" style={{ color: isDark ? '#dcbd02' : '#0A0A0A', fontFamily: 'var(--font-minecraft)' }}><span style={{ marginRight: '5px' }}>₹</span>50,000</div>
                    </div>

                    {/* 2nd Place - Silver theme */}
                    <div
                        className="order-2 md:order-1 p-4 md:p-8 border-4 text-center w-[75%] md:w-64"
                        style={{
                            backgroundColor: isDark ? '#1a1a1a' : '#e5e7eb',
                            borderColor: isDark ? '#C0C0C0' : '#0A0A0A',
                            boxShadow: isDark ? '5px 5px 0px rgba(192,192,192,0.5)' : '5px 5px 0px rgba(10,10,10,1)',
                            transition: 'all 0.45s ease'
                        }}
                    >
                        <div className="text-sm md:text-lg font-bold mb-1 md:mb-2" style={{ color: isDark ? '#C0C0C0' : '#0A0A0A' }}>2ND PLACE</div>
                        <div className="text-xl md:text-4xl font-bold" style={{ color: isDark ? '#C0C0C0' : '#0A0A0A', fontFamily: 'var(--font-minecraft)' }}><span style={{ marginRight: '4px' }}>₹</span>30,000</div>
                    </div>

                    {/* 3rd Place - Bronze theme */}
                    <div
                        className="order-3 p-4 md:p-8 border-4 text-center w-[75%] md:w-64"
                        style={{
                            backgroundColor: isDark ? '#1a1a1a' : '#CD7F32',
                            borderColor: isDark ? '#CD7F32' : '#0A0A0A',
                            boxShadow: isDark ? '5px 5px 0px rgba(205,127,50,0.5)' : '5px 5px 0px rgba(10,10,10,1)',
                            transition: 'all 0.45s ease'
                        }}
                    >
                        <div className="text-sm md:text-lg font-bold mb-1 md:mb-2" style={{ color: isDark ? '#CD7F32' : '#0A0A0A' }}>3RD PLACE</div>
                        <div className="text-xl md:text-4xl font-bold" style={{ color: isDark ? '#CD7F32' : '#0A0A0A', fontFamily: 'var(--font-minecraft)' }}><span style={{ marginRight: '4px' }}>₹</span>20,000</div>
                    </div>
                </div>
            </div>
        </section>
    )
}
