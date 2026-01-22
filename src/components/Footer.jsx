import { FaInstagram, FaLinkedinIn, FaTwitter, FaGithub, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    const quickLinks = [
        { name: 'Roadmap', href: '#roadmap' },
        { name: 'Problem Statement', href: '#problem-statement' },
        { name: 'Register Now', href: 'https://reckon-7.devfolio.co/overview', target: '_blank' },
    ]

    const socialLinks = [
        { icon: FaInstagram, href: 'https://www.instagram.com/jiet_universe/', label: 'Instagram' },
        { icon: FaLinkedinIn, href: '#', label: 'LinkedIn' },
        { icon: FaTwitter, href: '#', label: 'Twitter' },
        { icon: FaGithub, href: '#', label: 'GitHub' },
    ]

    return (
        <footer className="bg-[#0A0A0A] text-white py-16 px-8 md:px-16" style={{ fontFamily: 'var(--font-pixel)' }}>
            <div className="max-w-7xl mx-auto">
                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <h2 className="text-4xl md:text-5xl font-bold">
                            <span className="text-[#dcbd02]">RECKON</span>
                            <span className="text-white"> 7.0</span>
                        </h2>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            Pushing the boundaries of innovation, one event at a time. Join us in shaping the future of technology.
                        </p>
                        {/* Social Links */}
                        <div className="flex gap-4">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="w-10 h-10 border border-gray-700 flex items-center justify-center 
                                               hover:border-[#dcbd02] hover:text-[#dcbd02] transition-all duration-300
                                               hover:scale-110"
                                >
                                    <social.icon className="text-lg" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-bold uppercase tracking-widest text-gray-300">Quick Links</h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        target={link.target || '_self'}
                                        rel={link.target === '_blank' ? 'noopener noreferrer' : ''}
                                        onClick={(e) => {
                                            if (link.href.startsWith('#')) {
                                                e.preventDefault();
                                                const element = document.querySelector(link.href);
                                                if (element) {
                                                    element.scrollIntoView({ behavior: 'smooth' });
                                                }
                                            }
                                        }}
                                        className="text-gray-400 hover:text-[#dcbd02] transition-all duration-300 
                                                   text-sm uppercase tracking-wider flex items-center gap-2
                                                   hover:translate-x-2 transform"
                                    >
                                        <span className="w-2 h-px bg-gray-600 group-hover:bg-[#dcbd02]"></span>
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-bold uppercase tracking-widest text-gray-300">Get In Touch</h3>
                        <div className="space-y-4">
                            <a
                                href="mailto:dsc@jietjodhpur.ac.in"
                                className="flex items-center gap-3 text-gray-400 hover:text-[#dcbd02] transition-colors duration-300"
                            >
                                <FaEnvelope className="text-lg" />
                                <span className="text-sm">dsc@jietjodhpur.ac.in</span>
                            </a>
                            <div className="flex items-start gap-3 text-gray-400">
                                <FaMapMarkerAlt className="text-lg mt-1" />
                                <span className="text-sm">
                                    Near NH 62, New Pali Road,<br />
                                    Mogra, Rajasthan 342802, India
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-linear-to-r from-transparent via-gray-700 to-transparent mb-8"></div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-xs uppercase tracking-wider">
                        © {currentYear} RECKON 7.0. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="text-gray-500 hover:text-[#dcbd02] text-xs uppercase tracking-wider transition-colors duration-300">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-gray-500 hover:text-[#dcbd02] text-xs uppercase tracking-wider transition-colors duration-300">
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
