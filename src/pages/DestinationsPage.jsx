import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { allDestinations } from '../data/destinations';
import { getCachedWeather } from '../api/weatherAPI';
import { formatToIDR } from '../utils/formatCurrency';
import DestinationSkeleton from '../components/DestinationSkeleton';
import { useNavigate } from 'react-router-dom';

const ITEMS_PER_PAGE = 6;

const DestinationsPage = () => {
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [priceRange, setPriceRange] = useState([0, 30000000]);
    const [selectedActivities, setSelectedActivities] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef();
    const navigate = useNavigate();
    
    const lastDestinationRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);
    
    const filteredDestinations = destinations.filter(dest =>
        filter === 'all' || dest.difficulty.toLowerCase() === filter.toLowerCase()
    );
    
    useEffect(() => {
        setDestinations([]);
        setPage(1);
        setHasMore(true);
    }, [filter]);
    
    useEffect(() => {
        const fetchWeatherData = async () => {
            setLoading(true);
            const start = (page - 1) * ITEMS_PER_PAGE;
            const end = page * ITEMS_PER_PAGE;
            
            if (start < allDestinations.length) {
                const newDestinations = allDestinations.slice(start, end);
                const updatedNewDestinations = await Promise.all(
                    newDestinations.map(async (destination) => {
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

                setDestinations(prev => {
                    const combined = [...prev, ...updatedNewDestinations];
                    return Array.from(new Map(combined.map(item => [item.name, item])).values());
                });
                setHasMore(end < allDestinations.length);
            } else {
                setHasMore(false);
            }
            setLoading(false);
        };
        
        fetchWeatherData();
    }, [page]);
    
    useEffect(() => {
        setDestinations([]);
        setPage(1);
        setHasMore(true);
    }, [filter]);
    
    const allActivities = [...new Set(
        allDestinations.flatMap(dest => dest.activities)
    )].sort();

    console.log(allDestinations);

    const handleBookClick = (destinationName) => {
        const urlFriendlyName = destinationName.toLowerCase().replace(/\s+/g, '-');
        console.log(urlFriendlyName);
        navigate(`/destinations/${urlFriendlyName}`);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-slate-50 pt-20"
        >
            <div className="bg-emerald-600 text-white py-20">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Explore Indonesia
                    </h1>
                    <p className="text-xl text-emerald-50">
                        Discover the perfect destination for your next adventure
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Difficulty
                            </label>
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="w-full rounded-lg border-slate-200 py-2.5 px-4
                                         text-slate-700 bg-white border appearance-none
                                         focus:outline-none focus:ring-2 focus:ring-emerald-500
                                         focus:border-transparent cursor-pointer
                                         bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23475569%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')]
                                         bg-[length:1.5em_1.5em] bg-[right_0.5rem_center] bg-no-repeat"
                            >
                                <option value="all" className="py-2">All Levels</option>
                                <option value="easy" className="py-2">Easy</option>
                                <option value="moderate" className="py-2">Moderate</option>
                                <option value="challenging" className="py-2">Challenging</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Price Range
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="30000000"
                                step="500000"
                                value={priceRange[1]}
                                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                className="w-full h-2 bg-emerald-100 rounded-lg appearance-none 
                                         cursor-pointer accent-emerald-500"
                            />
                            <div className="text-sm text-slate-600 mt-2">
                                Up to {formatToIDR(priceRange[1])}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Activities
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {allActivities.map(activity => (
                                    // {['Beach', 'Culture', 'Adventure', 'Nature', 'Wildlife'].map(activity => (
                                    <button
                                        key={activity}
                                        onClick={() => setSelectedActivities(prev =>
                                            prev.includes(activity)
                                                ? prev.filter(a => a !== activity)
                                                : [...prev, activity]
                                        )}
                                        className={`px-4 py-2 rounded-full text-sm transition-all duration-200
                                                 ${selectedActivities.includes(activity)
                                                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                                    >
                                        {activity}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredDestinations.map((destination, index) => (
                        <motion.div
                            key={destination.name}
                            ref={index === filteredDestinations.length - 1 ? lastDestinationRef : null}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-xl shadow-lg overflow-hidden"
                        >
                            <div className="relative h-48">
                                <img
                                    src={destination.image}
                                    alt={destination.name}
                                    className="w-full h-full object-cover"
                                />
                                {destination.weather && (
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm 
                                                  rounded-full px-3 py-1 flex items-center gap-2">
                                        <img
                                            src={destination.weather.icon}
                                            alt={destination.weather.condition}
                                            className="w-6 h-6"
                                        />
                                        <span className="font-medium">
                                            {destination.weather.temp}°C
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold text-slate-800">
                                        {destination.name}
                                    </h3>
                                    <div className="flex items-center gap-1">
                                        <span className="text-yellow-500">★</span>
                                        <span className="font-medium">{destination.rating}</span>
                                    </div>
                                </div>
                                <p className="text-slate-600 mb-4">
                                    {destination.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {destination.activities.map((activity, index) => (
                                        <span
                                            key={index}
                                            className="bg-slate-100 text-slate-700 px-2 py-1 
                                                     rounded-full text-sm"
                                        >
                                            {activity}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <span className="text-2xl font-bold text-emerald-600">
                                            {formatToIDR(destination.price)}
                                        </span>
                                        <span className="text-slate-500 text-sm">/person</span>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleBookClick(destination.name)}
                                        className="bg-emerald-500 text-white px-4 py-2 rounded-lg
                                                 hover:bg-emerald-600 transition-colors"
                                    >
                                        Book Now
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {loading && (
                        <>
                            {[...Array(3)].map((_, i) => (
                                <DestinationSkeleton key={i} />
                            ))}
                        </>
                    )}
                </div>

                {filteredDestinations.length === 0 && !loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                    >
                        <h3 className="text-xl font-medium text-slate-600">
                            No destinations found matching your criteria
                        </h3>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default DestinationsPage;