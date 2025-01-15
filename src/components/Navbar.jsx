import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
    { name: "Home", path: "/" },
    { name: "Destinations", path: "/destinations" },
    { name: "Experiences", path: "/experiences" },
    { name: "Blogs", path: "/blogs" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" }
];

const Navbar = () => {
    const navigate = useNavigate()
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const isHomePage = location.pathname === "/";
    const menuRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        const handleClickOutside = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                !event.target.closest('button[aria-label="Toggle menu"]')
            ) {
                setIsOpen(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    const menuVariants = {
        closed: {
            opacity: 0,
            x: "100%",
            transition: {
                duration: 0.2,
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        },
        open: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.3,
                staggerChildren: 0.07,
                staggerDirection: 1,
                when: "beforeChildren"
            }
        }
    };

    const itemVariants = {
        closed: { x: 20, opacity: 0 },
        open: { x: 0, opacity: 1 }
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed w-full z-50 transition-all duration-300 ${scrolled
                ? "bg-white/80 backdrop-blur-lg shadow-lg"
                : "bg-slate-900/90 backdrop-blur-lg"
                }`}
        >
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3 z-50 group">
                        <div className="relative">
                            <motion.div
                                className={`w-12 h-12 rounded-lg shadow-lg
                                         flex items-center justify-center overflow-hidden
                                         transition-colors ${isOpen
                                        ? "bg-emerald-600"
                                        : "bg-emerald-500 group-hover:bg-emerald-600"
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <motion.img
                                    src="/images/logo.png"
                                    alt="Nusantara Adventures"
                                    className="w-8 h-8 object-contain"
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.5 }}
                                />
                            </motion.div>
                        </div>
                        <div className="flex flex-col">
                            <motion.span
                                className={`text-xl font-bold leading-tight ${scrolled || isOpen
                                    ? "text-slate-800"
                                    : isHomePage
                                        ? "text-white"
                                        : "text-white"
                                    }`}
                            >
                                Nusantara
                            </motion.span>
                            <motion.span
                                className={`text-sm font-medium ${scrolled || isOpen
                                    ? "text-emerald-600"
                                    : "text-emerald-400"
                                    }`}
                            >
                                Adventures
                            </motion.span>
                        </div>
                    </Link>

                    <div className="hidden lg:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`relative group ${scrolled
                                    ? "text-slate-600"
                                    : "text-white"
                                    }`}
                            >
                                <span className="text-sm font-medium hover:text-emerald-500 transition-colors">
                                    {item.name}
                                </span>
                                <motion.span
                                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-emerald-500 origin-left"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: location.pathname === item.path ? 1 : 0 }}
                                    transition={{ duration: 0.2 }}
                                />
                            </Link>
                        ))}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/destinations')}
                            className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors
                                      ${scrolled
                                    ? "bg-emerald-500 text-white hover:bg-emerald-600"
                                    : "bg-white text-emerald-600 hover:bg-emerald-50"
                                }`}
                        >
                            Book Now
                        </motion.button>
                    </div>

                    <motion.button
                        initial={false}
                        animate={isOpen ? "open" : "closed"}
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden z-50 w-10 h-10 flex items-center justify-center"
                        aria-label="Toggle menu"
                    >
                        <motion.div
                            className={`w-6 h-0.5 rounded-full ${scrolled || isOpen ? "bg-slate-800" : "bg-white"
                                } relative`}
                            variants={{
                                closed: { rotate: 0, y: 0 },
                                open: { rotate: 45, y: 2 }
                            }}
                            transition={{ duration: 0.2 }}
                        >
                            <motion.div
                                className={`absolute w-6 h-0.5 rounded-full ${scrolled || isOpen ? "bg-slate-800" : "bg-white"
                                    } top-0 -translate-y-2`}
                                variants={{
                                    closed: { rotate: 0, opacity: 1, y: 4 },
                                    open: { rotate: 0, opacity: 0, y: 2 }
                                }}
                                transition={{ duration: 0.2 }}
                            />
                            <motion.div
                                className={`absolute w-6 h-0.5 rounded-full ${scrolled || isOpen ? "bg-slate-800" : "bg-white"
                                    } bottom-0 translate-y-2`}
                                variants={{
                                    closed: { rotate: 0, y: 8 },
                                    open: { rotate: -90, y: -2 }
                                }}
                                transition={{ duration: 0.2 }}
                            />
                        </motion.div>
                    </motion.button>

                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                ref={menuRef}
                                variants={menuVariants}
                                initial="closed"
                                animate="open"
                                exit="closed"
                                className="fixed inset-0 bg-white lg:hidden"
                                style={{
                                    minHeight: '100vh',
                                    top: 0,
                                    position: 'fixed',
                                    height: '100%',
                                    width: '100%',
                                    overflowY: 'auto'
                                }}
                            >
                                <div
                                    className="container mx-auto px-4"
                                    style={{ paddingTop: scrolled ? '80px' : '96px' }} // Adjust based on navbar height
                                >
                                    <div className="flex flex-col items-center justify-start h-full gap-6">
                                        {navItems.map((item) => (
                                            <motion.div
                                                key={item.path}
                                                variants={itemVariants}
                                                className="relative w-full text-center"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                <Link
                                                    to={item.path}
                                                    className="text-xl font-medium text-slate-800 hover:text-emerald-500 
                                                             transition-colors block py-2"
                                                >
                                                    {item.name}
                                                </Link>
                                                {location.pathname === item.path && (
                                                    <motion.div
                                                        layoutId="activeTabMobile"
                                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-emerald-500"
                                                    />
                                                )}
                                            </motion.div>
                                        ))}
                                        <motion.button
                                            variants={itemVariants}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="bg-emerald-500 text-white px-8 py-3 rounded-lg 
                                                     font-medium hover:bg-emerald-600 transition-colors mt-4"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Book Now
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
