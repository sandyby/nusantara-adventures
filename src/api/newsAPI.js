import { shuffleArray } from '../utils/blogsUtils';

const API_KEY = import.meta.env.VITE_MEDIASTACK_API_KEY;
const CACHE_DURATION = 30 * 60 * 1000;

const newsCache = new Map();

export const getCachedNews = async (limit = 6, page = 1) => {
    const cacheKey = `news-${limit}`;
    const cachedData = newsCache.get(cacheKey);
    
    if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
        const shuffledData = shuffleArray(cachedData.data);
        return {
            data: shuffledData,
            fromCache: true
        };
    }

    try {
        const response = await fetch(
            `https://api.mediastack.com/v1/news?` +
            `access_key=${API_KEY}` +
            `&countries=id` +
            `&category=entertainment` +
            `&languages=en` +
            `&limit=${limit}`
        );

        if (!response.ok) {
            if (response.status === 429) {
                throw new Error('API_LIMIT_REACHED');
            }
            throw new Error('Failed to fetch news');
        }

        const data = await response.json();
        const newsWithImages = data.data.filter(post => post.image);

        newsCache.set(cacheKey, {
            data: newsWithImages,
            timestamp: Date.now()
        });

        const shuffledData = shuffleArray(newsWithImages);
        return {
            data: shuffledData,
            fromCache: false
        };
    } catch (error) {
        console.error('Error fetching news:', error);
        if (cachedData) {
            const shuffledData = shuffleArray(cachedData.data);
            return {
                data: shuffledData,
                fromCache: true,
                error: error.message
            };
        }
        throw error;
    }
}; 