import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { experiences } from "../data/experiences";

const BASE_URL = import.meta.env.VITE_BASE_URL || '/';

const Footer = () => {
    const navigate = useNavigate();
    const uniqueCategories = [...new Set(experiences.map(exp => exp.category))]
        .map(category => ({
            name: category.charAt(0).toUpperCase() + category.slice(1),
            path: `/experiences?category=${category}`
        }))
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);

    const footerSections = {
        company: {
            title: "Nusantara Adventures",
            links: [
                { name: "About Us", path: "/about" },
                { name: "Contact", path: "/contact" },
                { name: "Blogs", path: "/blogs" },
                { name: "Terms & Conditions", path: "/terms" }
            ]
        },
        destinations: {
            title: "Popular Destinations",
            links: [
                { name: "Bali", path: "/destinations/bali" },
                { name: "Raja Ampat", path: "/destinations/raja-ampat" },
                { name: "Borobudur", path: "/destinations/borobudur" },
            ]
        },
        experiences: {
            title: "Experiences",
            links: uniqueCategories
        }
    };

    const socialLinks = [
        { name: "Instagram", icon: "instagram-icon-normal.png", url: "https://www.instagram.com/sandyb________/" },
        { name: "Facebook", icon: "facebook-icon-normal.png", url: "#" },
        { name: "X", icon: "x-icon-normal.png", url: "#" },
        { name: "YouTube", icon: "youtube-icon-normal.png", url: "#" }
    ];

    const officeLocation = {
        address: "Menara SCBD, Jl. Jend. Sudirman No.Kav 52-53, RT.5/RW.3, Senayan, Jakarta Selatan",
        phone: "+62 21 1234 5678",
        email: "hello@nusantaraadventures.com"
    };

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 }
    };

    const handleViewAllClick = (e) => {
        e.preventDefault();
        navigate('/experiences', { replace: true });
    };

    return (
        <footer className="bg-gradient-to-b from-slate-900 to-slate-800 text-white pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-7 gap-8 mb-12">
                    <motion.div
                        {...fadeInUp}
                        className="lg:col-span-2"
                    >
                        <Link
                            to="/"
                            className="flex items-center gap-3 mb-6 group"
                        >
                            <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.5 }}
                                className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center"
                            >
                                <img
                                    src={`${BASE_URL}images/logo.png`}
                                    alt="Nusantara Adventures"
                                    className="w-8 h-8 object-contain"
                                />
                            </motion.div>
                            <div>
                                <h3 className="text-xl font-bold group-hover:text-emerald-400 transition-colors">
                                    Nusantara
                                </h3>
                                <span className="text-emerald-400 text-sm">Adventures</span>
                            </div>
                        </Link>
                        <p className="text-slate-400 mb-6 max-w-md">
                            Discover the enchanting archipelago of Indonesia with Nusantara Adventures.
                            We create unforgettable journeys through the heart of Southeast Asia&apos;s most
                            beautiful destinations.
                        </p>
                        <div className="flex gap-4 mb-6">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center
                                             hover:bg-emerald-500 transition-colors duration-300"
                                >
                                    <img
                                        src={`/images/socials/${social.icon}`}
                                        alt={social.name}
                                        className="w-5 h-5"
                                    />
                                </motion.a>
                            ))}
                        </div>
                        <div className="text-slate-400 space-y-2">
                            <motion.p
                                whileHover={{ x: 2 }}
                                className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
                            >
                                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                {officeLocation.phone}
                            </motion.p>
                            <motion.p
                                whileHover={{ x: 2 }}
                                className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
                            >
                                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                {officeLocation.email}
                            </motion.p>
                        </div>
                    </motion.div>

                    <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
                        {Object.entries(footerSections).map(([key, section], index) => (
                            <motion.div
                                key={key}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
                                <ul className="space-y-3">
                                    {section.links.map((link) => (
                                        <motion.li
                                            key={link.name}
                                            whileHover={{ x: 5 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <Link
                                                to={link.path}
                                                className="text-slate-400 hover:text-emerald-400 transition-colors
                                                         duration-300 flex items-center gap-1 group"
                                            >
                                                <span className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    ›
                                                </span>
                                                <span>{link.name}</span>
                                                {key === 'experiences' && (
                                                    <span className="text-xs text-emerald-500/70 ml-1">
                                                        ({experiences.filter(exp =>
                                                            exp.category === link.name.toLowerCase()
                                                        ).length})
                                                    </span>
                                                )}
                                            </Link>
                                        </motion.li>
                                    ))}
                                    {key === 'experiences' && (
                                        <motion.li
                                            whileHover={{ x: 5 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <a
                                                href="/experiences"
                                                onClick={handleViewAllClick}
                                                className="text-emerald-400 hover:text-emerald-300 transition-colors
                                                         duration-300 flex items-center gap-1 text-sm mt-2"
                                            >
                                                View All Categories →
                                            </a>
                                        </motion.li>
                                    )}
                                </ul>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        {...fadeInUp}
                        className="lg:col-span-2"
                    >
                        <h4 className="text-lg font-semibold mb-4">Visit Our Office</h4>
                        <div className="rounded-lg overflow-hidden shadow-lg mb-4 h-[300px] hover:shadow-emerald-500/10 transition-shadow duration-300">
                            <iframe
                                title="Nusantara Adventures Office Location"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2954797431654!2d106.80742797475876!3d-6.224165193755757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f1505c76d775%3A0xe8503eecf84be674!2sMenara%20SCBD!5e0!3m2!1sen!2sid!4v1709825037197!5m2!1sen!2sid"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                        <motion.p
                            whileHover={{ x: 2 }}
                            className="text-slate-400 text-sm hover:text-emerald-400 transition-colors cursor-default"
                        >
                            {officeLocation.address}
                        </motion.p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400"
                >
                    <p className="text-sm">
                        &copy; {new Date().getFullYear()} Nusantara Adventures. All rights reserved.
                    </p>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
