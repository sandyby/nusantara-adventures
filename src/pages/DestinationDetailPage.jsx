import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { allDestinations } from '../data/destinations';
import { getCachedWeather } from '../api/weatherAPI';
import { formatToIDR } from '../utils/formatCurrency';

const DestinationDetailPage = () => {
    const { destinationId } = useParams();
    const navigate = useNavigate();
    const [destination, setDestination] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [guests, setGuests] = useState(1);

    useEffect(() => {
        const fetchDestination = async () => {
            setLoading(true);
            setError(false);

            try {
                const found = allDestinations.find(
                    d => d.name.toLowerCase().replace(/\s+/g, '-') === destinationId
                );

                if (!found) {
                    setError(true);
                    navigate('/not-found', { replace: true });
                    return;
                }

                const weather = await getCachedWeather(
                    found.coordinates.lat,
                    found.coordinates.lon
                );

                setDestination({
                    ...found,
                    weather: weather ? {
                        temp: Math.round(weather.main.temp),
                        condition: weather.weather[0].main,
                        icon: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
                    } : null
                });
            } catch (error) {
                setError(true);
                console.error(error);
                navigate('/not-found', { replace: true });
            } finally {
                setLoading(false);
            }
        };

        fetchDestination();
    }, [destinationId, navigate]);

    const handleBooking = (e) => {
        e.preventDefault();
        setShowSuccess(true);
        setSelectedDate('');
        setGuests(1);

        setTimeout(() => {
            setShowSuccess(false);
        }, 3000);
    };

    if (error) return null;
    if (loading) return <LoadingState />;
    if (!destination) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-slate-50 pt-20"
        >
            <div className="relative h-[60vh] overflow-hidden">
                <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="container mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            {destination.name}
                        </h1>
                        {destination.weather && (
                            <div className="flex items-center gap-2 text-white">
                                <img
                                    src={destination.weather.icon}
                                    alt={destination.weather.condition}
                                    className="w-8 h-8"
                                />
                                <span className="text-xl">
                                    {destination.weather.temp}°C
                                </span>
                                <span className="text-white/80">
                                    {destination.weather.condition}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">
                                About this destination
                            </h2>
                            <p className="text-slate-600 mb-6">
                                {destination.description}
                            </p>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-medium text-slate-700 mb-2">
                                        Difficulty
                                    </h3>
                                    <span className="inline-block px-3 py-1 rounded-full text-sm
                                                   bg-slate-100 text-slate-700">
                                        {destination.difficulty}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="font-medium text-slate-700 mb-2">
                                        Duration
                                    </h3>
                                    <span className="text-slate-600">
                                        {destination.duration}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="font-medium text-slate-700 mb-2">
                                        Best Time to Visit
                                    </h3>
                                    <span className="text-slate-600">
                                        {destination.bestTime}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="font-medium text-slate-700 mb-2">
                                        Activities
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {destination.activities.map((activity, index) => (
                                            <span
                                                key={index}
                                                className="px-2 py-1 rounded-full text-sm
                                                         bg-emerald-100 text-emerald-700"
                                            >
                                                {activity}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                            <h2 className="text-2xl font-bold text-slate-800 mb-6">
                                Book Your Trip
                            </h2>

                            <AnimatePresence>
                                {showSuccess && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="bg-emerald-100 text-emerald-700 px-4 py-3 rounded-lg mb-4"
                                    >
                                        <div className="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor">
                                                <path fillRule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                    clipRule="evenodd" />
                                            </svg>
                                            Booking request submitted successfully!
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <form onSubmit={handleBooking} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Travel Date
                                    </label>
                                    <input
                                        type="date"
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                        min={new Date().toISOString().split('T')[0]}
                                        required
                                        className="w-full rounded-lg border-slate-200 focus:ring-2 
                                                 focus:ring-emerald-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Number of Guests
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setGuests(prev => Math.max(1, prev - 1))}
                                            className="p-2 rounded-lg border border-slate-200 
                                                     hover:bg-slate-50 transition-colors"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-slate-600"
                                                viewBox="0 0 20 20"
                                                fill="currentColor">
                                                <path fillRule="evenodd"
                                                    d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                                    clipRule="evenodd" />
                                            </svg>
                                        </button>
                                        <input
                                            type="number"
                                            min="1"
                                            max="10"
                                            value={guests}
                                            onChange={(e) => setGuests(parseInt(e.target.value))}
                                            required
                                            className="w-20 text-center rounded-lg border-slate-200 
                                                     focus:ring-2 focus:ring-emerald-500 
                                                     focus:border-transparent"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setGuests(prev => Math.min(10, prev + 1))}
                                            className="p-2 rounded-lg border border-slate-200 
                                                     hover:bg-slate-50 transition-colors"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-slate-600"
                                                viewBox="0 0 20 20"
                                                fill="currentColor">
                                                <path fillRule="evenodd"
                                                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                                    clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="border-t border-slate-200 pt-4">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-slate-600">Price per person</span>
                                        <span className="font-medium">
                                            {formatToIDR(destination.price)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between mb-4">
                                        <span className="text-slate-600">Total</span>
                                        <span className="text-xl font-bold text-emerald-600">
                                            {formatToIDR(destination.price * guests)}
                                        </span>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        className="w-full bg-emerald-500 text-white py-3 rounded-lg
                                                 font-medium hover:bg-emerald-600 transition-colors
                                                 shadow-lg shadow-emerald-500/30"
                                    >
                                        Book Now
                                    </motion.button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const LoadingState = () => (
    <div className="min-h-screen bg-slate-50 pt-20">
        <div className="container mx-auto px-4">
            <div className="animate-pulse">
                <div className="h-96 bg-slate-200 rounded-xl mb-8" />
                <div className="h-8 bg-slate-200 w-1/3 mb-4" />
                <div className="h-4 bg-slate-200 w-2/3 mb-2" />
                <div className="h-4 bg-slate-200 w-1/2" />
            </div>
        </div>
    </div>
);

export default DestinationDetailPage; 