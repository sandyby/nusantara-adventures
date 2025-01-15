import { motion } from 'framer-motion';

const WeatherWidget = ({ weather }) => {
    if (!weather || !weather.temp || !weather.condition) {
        return (
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm 
                         rounded-full px-3 py-1 flex items-center gap-2
                         hover:bg-white/100 transition-all duration-300"
            >
                <span className="w-6 h-6 flex items-center justify-center text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zm0 16a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                    </svg>
                </span>
                <span className="font-medium text-slate-500">--°C</span>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm 
                     rounded-full px-3 py-1 flex items-center gap-2
                     hover:bg-white/100 transition-all duration-300"
        >
            <img
                src={weather.icon}
                alt={weather.condition}
                className="w-6 h-6"
                loading="lazy"
                onError={(e) => {
                    e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-slate-400" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zm0 16a3 3 0 01-3-3h6a3 3 0 01-3 3z" /></svg>';
                }}
            />
            <span className="font-medium">
                {weather.temp}°C
            </span>
        </motion.div>
    );
};

export default WeatherWidget; 