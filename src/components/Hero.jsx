import { motion } from "framer-motion";
import { useNavbar } from '../contexts/NavbarContext';

const BASE_URL = import.meta.env.VITE_BASE_URL || '/';

const Hero = () => {
    const { setIsOpen } = useNavbar();

    const scrollToDestinations = () => {
        const destinationsSection = document.getElementById('destinations');
        if (destinationsSection) {
            window.scrollTo({
                top: destinationsSection.offsetTop - 75,
                behavior: 'smooth'
            });
            setIsOpen(false);
        }
    };

    return (
        <section className="hero-section relative min-h-screen">
            <div className="hero-background absolute inset-0">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
                    style={{ backgroundImage: `url(${BASE_URL}images/hero.jpg)` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/70 to-slate-900/70" />
                </div>
            </div>

            <div className="hero-content relative h-full min-h-screen flex items-center justify-center px-4">
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-center text-white max-w-4xl mx-auto"
                >
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="mb-6"
                    >
                        <span className="text-emerald-400 text-xl font-light">Welcome to</span>
                        <h1 className="title-gradient text-5xl md:text-7xl font-bold mt-2">
                            Nusantara Adventures
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="hero-description text-lg md:text-xl mb-8 max-w-2xl mx-auto text-gray-200"
                    >
                        Discover the enchanting archipelago of Indonesia, where every island
                        tells a story and every journey becomes an unforgettable memory.
                    </motion.p>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={scrollToDestinations}
                        className="cta-button bg-emerald-500 text-white px-8 py-4 rounded-lg 
                                 font-medium hover:bg-emerald-600 transition-colors text-lg 
                                 shadow-lg hover:shadow-emerald-500/30"
                    >
                        Start Your Journey
                    </motion.button>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
                >
                    <motion.div className="w-1 h-2 bg-white rounded-full mt-2" />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
