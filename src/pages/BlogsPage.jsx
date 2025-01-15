import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { shuffleArray } from '../utils/blogsUtils';

const BlogsPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [apiInfo, setApiInfo] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `https://api.mediastack.com/v1/news?` +
                    `access_key=${import.meta.env.VITE_MEDIASTACK_API_KEY}` +
                    `&countries=id` +
                    `&category=entertainment` +
                    `&languages=en` +
                    `&limit=12` +
                    `&offset=${(page - 1) * 12}`
                );

                if (!response.ok) {
                    const errorData = await response.json();
                    if (errorData.error && errorData.error.code === 104) {
                        setApiInfo({
                            status: 'limit_reached',
                            message: 'Monthly API request limit reached. Please try again next month.'
                        });
                    }
                    throw new Error(errorData.error?.message || 'Failed to fetch posts');
                }

                const data = await response.json();
                const shuffledPosts = shuffleArray(data.data);

                setPosts(prevPosts =>
                    page === 1 ? shuffledPosts : [...prevPosts, ...shuffledPosts]
                );

                setApiInfo({
                    status: 'success',
                    message: `${data.pagination?.total || 'Limited'} results available`
                });
            } catch (err) {
                console.error('Error fetching posts:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [page]);

    const loadMore = () => {
        setPage(prev => prev + 1);
    };

    if (error) {
        return (
            <div className="min-h-screen bg-slate-50 pt-20">
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center text-red-600">
                        <h2 className="text-2xl font-bold mb-4">Error</h2>
                        <p>{error}</p>
                    </div>
                </div>
            </div>
        );
    }

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
                        Travel Stories & Updates
                    </h1>
                    <p className="text-lg md:text-xl text-emerald-50 max-w-2xl">
                        Stay updated with the latest travel news and entertainment from Indonesia
                    </p>
                    {apiInfo && (
                        <div className={`mt-4 text-sm inline-flex items-center gap-2 px-4 py-2 rounded-full 
                            ${apiInfo.status === 'limit_reached'
                                ? 'bg-red-500/20 text-red-100'
                                : 'bg-emerald-500/20 text-emerald-100'}`}
                        >
                            <span className={`w-2 h-2 rounded-full 
                                ${apiInfo.status === 'limit_reached'
                                    ? 'bg-red-400'
                                    : 'bg-emerald-400'}`}
                            />
                            {apiInfo.message}
                        </div>
                    )}
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <motion.article
                            key={`${post.url}-${index}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-xl shadow-lg overflow-hidden 
                                     hover:shadow-xl transition-shadow duration-300"
                        >
                            {post.image && (
                                <div className="relative h-48">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.src = '/images/placeholder.jpg';
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
                                <h2 className="text-xl font-bold text-slate-800 mb-3 line-clamp-2">
                                    {post.title}
                                </h2>
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

                {loading ? (
                    <div className="flex justify-center mt-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
                    </div>
                ) : (
                    <div className="text-center mt-12">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={loadMore}
                            className="bg-emerald-500 text-white px-8 py-3 rounded-lg
                                     font-medium hover:bg-emerald-600 transition-colors
                                     shadow-lg shadow-emerald-500/30"
                        >
                            Load More Stories
                        </motion.button>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default BlogsPage;