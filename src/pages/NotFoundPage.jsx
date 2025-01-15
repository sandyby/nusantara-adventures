import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-xl"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                    className="text-9xl font-bold text-emerald-500 mb-8"
                >
                    404
                </motion.div>
                <h1 className="text-4xl font-bold text-slate-800 mb-4">
                    Oops! Lost in Paradise?
                </h1>
                <p className="text-slate-600 mb-8">
                    The page you&apos;re looking for seems to have drifted away with the tide.
                    Let&apos;s get you back to exploring Indonesia&apos;s beautiful destinations!
                </p>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Link
                        to="/"
                        className="inline-block bg-emerald-500 text-white px-8 py-3 rounded-lg
                                 hover:bg-emerald-600 transition-colors shadow-lg"
                    >
                        Back to Homepage
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default NotFoundPage; 