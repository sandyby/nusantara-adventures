import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero.jsx";
import { popularDestinations } from "../data/destinations";
import { testimonials } from "../data/testimonials";
// import { blogPosts } from "../data/blogPosts";
import { getCachedWeather } from '../api/weatherAPI';
import { shuffleArray } from '../utils/blogsUtils.js';

const stats = [
    { number: "10k+", label: "Happy Travelers" },
    { number: "50+", label: "Destinations" },
    { number: "100+", label: "Local Guides" },
    { number: "15+", label: "Years Experience" }
];

const CustomArrow = ({ direction, onClick }) => (
    <button
        onClick={onClick}
        className={`absolute top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm p-3 
                   rounded-full shadow-lg hover:bg-white transition-all duration-300
                   ${direction === 'left' ? '-left-4 md:-left-6' : '-right-4 md:-right-6'}`}
    >
        {direction === 'left' ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
        ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
        )}
    </button>
);

const Home = () => {
    const navigate = useNavigate();
    const [hoveredCard, setHoveredCard] = useState(null);
    const [destinationsWithWeather, setDestinationsWithWeather] = useState([]);
    const [loading, setLoading] = useState(true);
    const [featuredPosts, setFeaturedPosts] = useState([]);
    const [error, setError] = useState(null);
    const [apiInfo, setApiInfo] = useState(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
    }, []);

    useEffect(() => {
        const fetchWeatherData = async () => {
            setLoading(true);
            const updatedDestinations = await Promise.all(
                popularDestinations.map(async (destination) => {
                    const weather = await getCachedWeather(
                        destination.coordinates.lat,
                        destination.coordinates.lon
                    );

                    return {
                        ...destination,
                        weather: weather ? {
                            temp: Math.round(weather.main.temp),
                            condition: weather.weather[0].main,
                            icon: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
                        } : null
                    };
                })
            );

            setDestinationsWithWeather(updatedDestinations);
            setLoading(false);
        };

        fetchWeatherData();

        const interval = setInterval(fetchWeatherData, 60 * 60 * 1000); // ubah aja kalo mau lebih cepet
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const fetchFeaturedPosts = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `https://api.mediastack.com/v1/news?` +
                    `access_key=${import.meta.env.VITE_MEDIASTACK_API_KEY}` +
                    `&countries=id` +
                    `&category=entertainment` +
                    `&languages=en` +
                    `&limit=6`
                );

                if (!response.ok) {
                    const errorData = await response.json();
                    if (errorData.error && errorData.error.code === 104) {
                        setApiInfo({
                            status: 'limit_reached',
                            message: 'Monthly API request limit reached'
                        });
                        console.warn('API limit reached');
                        return;
                    }
                    throw new Error('Failed to fetch posts');
                }

                const data = await response.json();
                const postsWithImages = data.data.filter(post => post.image);
                const shuffledPosts = shuffleArray(postsWithImages);
                setFeaturedPosts(shuffledPosts.slice(0, 2));
            } catch (err) {
                console.error('Error fetching featured posts:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchFeaturedPosts();
    }, []);

    const testimonialSettings = {
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        prevArrow: <CustomArrow direction="left" />,
        nextArrow: <CustomArrow direction="right" />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    speed: 250,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 200,
                }
            }
        ],
        // cssEase: "cubic-bezier(0.87, 0.03, 0.41, 0.9)",
        cssEase: "cubic-bezier(0.45, 0, 0.55, 1)",
        waitForAnimate: false,
        swipeToSlide: true,
        touchThreshold: 10,
        useCSS: true,
        useTransform: true,
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="overflow-x-hidden bg-slate-50"
        >
            <Hero />
            <section id="destinations" className="py-24 px-4 md:px-8 bg-white">
                {loading ? (
                    <div className="flex justify-center items-center h-screen">
                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-emerald-500"></div>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.5 }}
                        className="container mx-auto max-w-7xl"
                    >
                        <div className="text-center mb-16">
                            <motion.span
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: false }}
                                className="text-emerald-600 font-medium"
                            >
                                DISCOVER PARADISE
                            </motion.span>
                            <motion.h2
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: false }}
                                className="text-3xl md:text-4xl font-bold mt-2 text-slate-800"
                            >
                                Popular Destinations
                            </motion.h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {destinationsWithWeather.map((destination, index) => (
                                <motion.div
                                    key={destination.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: false, amount: 0.3 }}
                                    transition={{
                                        delay: index * 0.2,
                                        duration: 0.5,
                                        type: "spring",
                                        stiffness: 50
                                    }}
                                    className="relative group h-[400px] rounded-2xl overflow-hidden shadow-lg"
                                    onHoverStart={() => setHoveredCard(destination.name)}
                                    onHoverEnd={() => setHoveredCard(null)}
                                >
                                    <div className="absolute inset-0">
                                        <img
                                            src={destination.image}
                                            alt={destination.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-60" />
                                    </div>

                                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                        <h3 className="text-3xl font-bold text-white mb-2">
                                            {destination.name}
                                        </h3>
                                        {destination.weather && (
                                            <div className="flex items-center gap-2 mb-2">
                                                <img
                                                    src={destination.weather.icon}
                                                    alt={destination.weather.condition}
                                                    className="w-8 h-8"
                                                />
                                                <span className="text-white text-lg">
                                                    {destination.weather.temp}°C
                                                </span>
                                                <span className="text-white/80 text-sm">
                                                    {destination.weather.condition}
                                                </span>
                                            </div>
                                        )}
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{
                                                height: hoveredCard === destination.name ? 'auto' : 0,
                                                opacity: hoveredCard === destination.name ? 1 : 0
                                            }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 mt-2">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-white">{destination.temp}</span>
                                                    <span className="text-white">{destination.time}</span>
                                                </div>
                                                <p className="text-gray-200 text-sm mb-4">
                                                    {destination.description}
                                                </p>
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => navigate(`/destinations/${destination.name.toLowerCase().replace(/\s+/g, '-')}`)}
                                                    className="w-full bg-emerald-500 text-white py-2 px-4 rounded-lg
                                                         hover:bg-emerald-600 transition-all duration-300
                                                         shadow-lg hover:shadow-emerald-500/30"
                                                >
                                                    Explore {destination.name}
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-center mt-12"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/destinations')}
                                className="bg-emerald-500 text-white px-8 py-3 rounded-lg font-medium 
                                 hover:bg-emerald-600 transition-colors shadow-lg inline-flex 
                                 items-center gap-2"
                            >
                                Explore More Destinations
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </section>

            <section id="why-choose-us" className="py-20 px-4 md:px-8 bg-slate-50">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="container mx-auto max-w-7xl"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-slate-800">
                        Why Choose Nusantara Adventures?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {[
                            {
                                title: 'Expert Guides',
                                icon: '🎯',
                                description: 'Our certified guides bring deep local knowledge and expertise to every adventure.'
                            },
                            {
                                title: 'Authentic Experiences',
                                icon: '✨',
                                description: 'Immerse yourself in genuine Indonesian culture and traditions.'
                            },
                            {
                                title: 'Local Insights',
                                icon: '🌟',
                                description: 'Access hidden gems and local secrets that most tourists never see.'
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="text-center p-8 rounded-xl bg-white shadow-lg hover:shadow-xl 
                                         transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="text-5xl mb-6">{feature.icon}</div>
                                <h3 className="text-2xl font-semibold mb-4 text-slate-800">{feature.title}</h3>
                                <p className="text-slate-600 text-lg">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            <section id="statistics" className="py-20 bg-emerald-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10" />
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="container mx-auto max-w-7xl px-4"
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <h3 className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</h3>
                                <p className="text-emerald-100">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            <section id="testimonials" className="py-20 bg-white overflow-hidden">
                <div className="container mx-auto max-w-7xl px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-16"
                    >
                        <span className="text-emerald-600 font-medium">TESTIMONIALS</span>
                        <h2 className="text-3xl md:text-4xl font-bold mt-2 text-slate-800">
                            What Our Travelers Say
                        </h2>
                    </motion.div>

                    <div className="relative px-8">
                        <Slider {...testimonialSettings} className="testimonial-slider -mx-4">
                            {testimonials.map((testimonial, index) => (
                                <div key={testimonial.name} className="px-4 py-4">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: false, amount: 0.3 }}
                                        transition={{
                                            delay: index * 0.1,
                                            duration: 0.5,
                                            type: "spring",
                                            stiffness: 50
                                        }}
                                        className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl 
                                                 transition-all duration-300 mx-2 h-full"
                                    >
                                        <div className="flex items-center gap-4 mb-4">
                                            <img
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                                className="w-16 h-16 rounded-full object-cover"
                                            />
                                            <div>
                                                <h3 className="font-semibold text-slate-800">{testimonial.name}</h3>
                                                <p className="text-emerald-600 text-sm">{testimonial.role}</p>
                                                <p className="text-slate-500 text-sm">{testimonial.location}</p>
                                            </div>
                                        </div>
                                        <p className="text-slate-600 mb-4">{testimonial.quote}</p>
                                        <div className="flex gap-1">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <span key={i} className="text-yellow-400">★</span>
                                            ))}
                                        </div>
                                    </motion.div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </section>

            <section className="py-20 px-4 bg-slate-50">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Latest Travel Stories
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Discover the latest updates and stories from our travel community
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                                {featuredPosts.map((post, index) => (
                                    <motion.article
                                        key={`${post.url}-${post.published_at}-${index}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        className="bg-white rounded-xl shadow-lg overflow-hidden"
                                    >
                                        {post.image && (
                                            <div className="relative h-64">
                                                <img
                                                    src={post.image}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.target.src = 'https://placehold.co/610x260';
                                                    }}
                                                />
                                            </div>
                                        )}
                                        <div className="p-6">
                                            <div className="flex items-center gap-2 mb-4">
                                                <span className="text-sm text-slate-500">
                                                    {new Date(post.published_at).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </span>
                                                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                                <span className="text-sm text-emerald-600 font-medium">
                                                    {post.source}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold text-slate-800 mb-3 line-clamp-2">
                                                {post.title}
                                            </h3>
                                            <p className="text-slate-600 mb-4 line-clamp-3">
                                                {post.description}
                                            </p>
                                            <a
                                                href={post.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center text-emerald-600 
                                                     hover:text-emerald-700 font-medium"
                                            >
                                                Read More
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 ml-1"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor">
                                                    <path fillRule="evenodd"
                                                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                                        clipRule="evenodd" />
                                                </svg>
                                            </a>
                                        </div>
                                    </motion.article>
                                ))}
                            </div>
                            <div className="text-center">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigate('/blog')}
                                    className="bg-emerald-500 text-white px-8 py-3 rounded-lg
                                         font-medium hover:bg-emerald-600 transition-colors
                                         shadow-lg shadow-emerald-500/30"
                                >
                                    View More Stories
                                </motion.button>
                            </div>
                        </>
                    )}
                </div>
            </section>

            <section id="call-to-action" className="py-20 px-4 md:px-8 bg-emerald-600">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="container mx-auto max-w-4xl text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
                        Ready to Start Your Adventure?
                    </h2>
                    <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-emerald-50">
                        Join us for an unforgettable journey through Indonesia&apos;s most beautiful destinations
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/destinations')}
                        className="bg-white text-emerald-600 px-10 py-4 rounded-lg font-semibold 
                                 hover:bg-emerald-50 transition-colors text-lg shadow-lg"
                    >
                        Travel Now
                    </motion.button>
                </motion.div>
            </section>

            <section id="newsletter" className="py-20 px-4 md:px-8 bg-white">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="container mx-auto max-w-4xl text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-slate-800">
                        Stay Updated
                    </h2>
                    <p className="text-lg text-slate-600 mb-8">
                        Subscribe to our newsletter for exclusive travel tips and special offers
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-6 py-4 rounded-lg border border-slate-200 
                                     focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-emerald-500 text-white px-8 py-4 rounded-lg font-medium 
                                     hover:bg-emerald-600 transition-colors shadow-lg"
                        >
                            Subscribe
                        </motion.button>
                    </div>
                </motion.div>
            </section>
        </motion.div>
    );
};

export default Home;
