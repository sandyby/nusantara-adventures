import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { experiences } from '../data/experiences';
import { formatToIDR } from '../utils/formatCurrency';

const categories = [
    { id: 'all', name: 'All Experiences' }
];

const allCategories = [...new Set(
    experiences.flatMap(experience => experience.category)
)].map(category => ({
    id: category,
    name: category.charAt(0).toUpperCase() + category.slice(1)
}));

const combinedCategories = [...categories, ...allCategories];

const ExperiencesPage = () => {
    const [searchParams] = useSearchParams();
    const categoryFilter = searchParams.get('category');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        setSearchQuery('');
        if (!categoryFilter) {
            setSelectedCategory('all');
        } else {
            setSelectedCategory(categoryFilter);
        }
    }, [categoryFilter]);

    const handleCategoryClick = (categoryId) => {
        if (categoryId === 'all') {
            setSelectedCategory('all');
        } else if (selectedCategory === categoryId) {
            setSelectedCategory('all');
        } else {
            setSelectedCategory(categoryId);
        }
    };

    const filteredExperiences = experiences.filter(experience => {
        const matchesCategory = selectedCategory === 'all' || experience.category === selectedCategory;
        const matchesSearch = experience.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            experience.location.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-slate-50 pt-20"
        >
            <div className="bg-emerald-600 text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Unforgettable Experiences
                    </h1>
                    <p className="text-lg md:text-xl text-emerald-50 max-w-2xl">
                        Discover unique activities and immerse yourself in local culture
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col gap-4 mb-8">
                    <div className="w-full">
                        <input
                            type="text"
                            placeholder="Search experiences..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 
                                     focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                    </div>

                    <div className="relative">
                        <div className="md:hidden relative">
                            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r 
                                          from-slate-50 to-transparent z-10 pointer-events-none" />
                            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l 
                                          from-slate-50 to-transparent z-10 pointer-events-none" />
                            <div className="flex gap-2 overflow-x-auto pb-2 
                                          scrollbar-hide scroll-smooth px-2"
                                style={{
                                    msOverflowStyle: 'none',
                                    scrollbarWidth: 'none',
                                    WebkitOverflowScrolling: 'touch'
                                }}>
                                {combinedCategories.map(category => (
                                    <button
                                        key={category.id}
                                        onClick={() => handleCategoryClick(category.id)}
                                        className={`px-4 py-2 rounded-full whitespace-nowrap
                                                 transition-all duration-200 flex-shrink-0 ${selectedCategory === category.id
                                                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                                                : 'bg-white text-slate-700 hover:bg-slate-100'
                                            }`}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="hidden md:flex flex-wrap gap-2">
                            {combinedCategories.map(category => (
                                <button
                                    key={category.id}
                                    onClick={() => handleCategoryClick(category.id)}
                                    className={`px-4 py-2 rounded-full whitespace-nowrap
                                             transition-all duration-200 ${selectedCategory === category.id
                                            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                                            : 'bg-white text-slate-700 hover:bg-slate-100'
                                        }`}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-12">
                    {filteredExperiences.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredExperiences.map(experience => (
                                <motion.div
                                    key={experience.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="bg-white rounded-xl shadow-lg overflow-hidden 
                                     hover:shadow-xl transition-shadow duration-300"
                                >
                                    <div className="relative h-48">
                                        <img
                                            src={experience.image}
                                            alt={experience.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm 
                                              px-2 py-1 rounded-lg text-sm font-medium text-slate-700">
                                            {experience.duration}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="px-2 py-1 rounded-full text-xs font-medium 
                                                   bg-emerald-100 text-emerald-700">
                                                {combinedCategories.find(c => c.id === experience.category)?.name}
                                            </span>
                                            <span className="text-sm text-slate-500">
                                                {experience.location}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-800 mb-2">
                                            {experience.title}
                                        </h3>
                                        <p className="text-slate-600 mb-4 line-clamp-2">
                                            {experience.description}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-1">
                                                <span className="text-yellow-400">★</span>
                                                <span className="font-medium">{experience.rating}</span>
                                                <span className="text-slate-500">
                                                    ({experience.reviews} reviews)
                                                </span>
                                            </div>
                                            <span className="text-lg font-bold text-emerald-600">
                                                {formatToIDR(experience.price)}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-12"
                        >
                            <div className="mb-6">
                                <svg
                                    className="w-16 h-16 mx-auto text-slate-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-slate-700 mb-2">
                                No experiences found
                            </h3>
                            <p className="text-slate-500 mb-6 max-w-md mx-auto">
                                {selectedCategory !== 'all'
                                    ? `No experiences found in the "${combinedCategories.find(c => c.id === selectedCategory)?.name}" category.`
                                    : 'No experiences match your search criteria.'
                                }
                            </p>
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedCategory('all');
                                }}
                                className="text-emerald-600 hover:text-emerald-700 font-medium 
                                     inline-flex items-center gap-2"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                    />
                                </svg>
                                Reset filters
                            </button>
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ExperiencesPage;