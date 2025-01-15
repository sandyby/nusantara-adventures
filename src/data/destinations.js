const BASE_URL = import.meta.env.VITE_BASE_URL || '/';
const FALLBACK_IMG = 'https://placehold.co/400';

export const popularDestinations = [
    {
        name: "Bali",
        // image: `${BASE_URL}images/destinations/bali.jpg`,
        // image: 'public/images/destinations/bali.jpg',
        // image: "https://placehold.co/400",
        image: `${BASE_URL}images/destinations/bali.jpg`.includes('undefined') ? FALLBACK_IMG : `${BASE_URL}images/destinations/bali.jpg`,
        description: "Experience the magic of Bali's beaches, temples, and culture.",
        coordinates: {
            lat: -8.4095,
            lon: 115.1889
        },
        rating: 4.8,
        price: 14637518,
        duration: "5-7 days",
        activities: ["Beach", "Culture", "Temples", "Surfing", "Spa"],
        bestTime: "April to October",
        difficulty: "Easy"
    },
    {
        name: "Raja Ampat",
        // image: "/images/destinations/raja-ampat.jpg",
        image: `${BASE_URL}images/destinations/raja-ampa.jpg`.includes('undefined') ? FALLBACK_IMG : `${BASE_URL}images/destinations/raja-ampa.jpg`,
        description: "Dive into the crystal-clear waters of Indonesia's paradise.",
        coordinates: {
            lat: -0.5000,
            lon: 130.5000
        },
        rating: 4.9,
        price: 26034918,
        duration: "7-10 days",
        activities: ["Diving", "Snorkeling", "Island Hopping", "Photography"],
        bestTime: "October to April",
        difficulty: "Moderate"
    },
    {
        name: "Borobudur",
        // image: "/images/destinations/borobudur.jpg",
        image: "https://placehold.co/400",
        description: "Explore the world's largest Buddhist temple amidst misty mountains.",
        coordinates: {
            lat: -7.6079,
            lon: 110.2038
        },
        rating: 4.7,
        price: 8124718,
        duration: "1-2 days",
        activities: ["Culture", "Photography", "Historical Sites"],
        bestTime: "May to September",
        difficulty: "Easy"
    }
];

export const allDestinations = [
    ...popularDestinations,
    {
        name: "Komodo Island",
        image: "/images/destinations/komodo-island.jpg",
        description: "Meet the legendary Komodo dragons in their natural habitat.",
        coordinates: {
            lat: -8.5662,
            lon: 119.4880
        },
        rating: 4.7,
        price: 21150318,
        duration: "3-4 days",
        activities: ["Wildlife", "Hiking", "Snorkeling", "Photography"],
        bestTime: "April to December",
        difficulty: "Moderate"
    },
    {
        name: "Lake Toba",
        image: "/images/destinations/lake-toba.jpg",
        description: "Relax by the largest volcanic lake in the world.",
        coordinates: {
            lat: 2.7079,
            lon: 98.8318
        },
        rating: 4.6,
        price: 13009318,
        duration: "3-5 days",
        activities: ["Boating", "Relaxation", "Cultural Tours"],
        bestTime: "May to September",
        difficulty: "Easy"
    },
    {
        name: "Mount Bromo",
        image: "/images/destinations/mount-bromo.jpg",
        description: "Witness the breathtaking sunrise over an active volcano.",
        coordinates: {
            lat: -7.9425,
            lon: 112.9530
        },
        rating: 4.8,
        price: 8124718,
        duration: "1-2 days",
        activities: ["Hiking", "Photography", "Sightseeing"],
        bestTime: "May to August",
        difficulty: "Challenging"
    },
    {
        name: "Tana Toraja",
        image: "/images/destinations/tana-toraja.jpg",
        description: "Discover the unique funeral rituals and culture of Toraja.",
        coordinates: {
            lat: -3.0601,
            lon: 119.8302
        },
        rating: 4.5,
        price: 11381118,
        duration: "3-5 days",
        activities: ["Culture", "Trekking", "Photography"],
        bestTime: "June to October",
        difficulty: "Moderate"
    },
    {
        name: "Gili Islands",
        image: "/images/destinations/gili.jpg",
        description: "Unwind on these car-free islands with stunning beaches.",
        coordinates: {
            lat: -8.3483,
            lon: 116.0460
        },
        rating: 4.7,
        price: 14637518,
        duration: "3-5 days",
        activities: ["Beach", "Snorkeling", "Relaxation", "Diving"],
        bestTime: "May to September",
        difficulty: "Easy"
    },
    {
        name: "Yogyakarta",
        image: "/images/destinations/yogyakarta.jpg",
        description: "Explore the cultural heart of Java with ancient temples and art.",
        coordinates: {
            lat: -7.7956,
            lon: 110.3695
        },
        rating: 4.6,
        price: 8124718,
        duration: "2-4 days",
        activities: ["Culture", "Art", "Historical Sites"],
        bestTime: "May to September",
        difficulty: "Easy"
    },
    {
        name: "Bunaken",
        image: "/images/destinations/bunaken.jpg",
        description: "Snorkel or dive into one of Indonesia's best marine parks.",
        coordinates: {
            lat: 1.6222,
            lon: 124.7578
        },
        rating: 4.7,
        price: 16265718,
        duration: "3-5 days",
        activities: ["Diving", "Snorkeling", "Marine Exploration"],
        bestTime: "May to October",
        difficulty: "Moderate"
    },
    {
        name: "Wakatobi",
        image: "/images/destinations/wakatobi.jpg",
        description: "Dive into vibrant coral reefs in this remote paradise.",
        coordinates: {
            lat: -5.3421,
            lon: 123.8985
        },
        rating: 4.8,
        price: 21150318,
        duration: "5-7 days",
        activities: ["Diving", "Snorkeling", "Marine Exploration"],
        bestTime: "April to November",
        difficulty: "Moderate"
    },
    {
        name: "Belitung",
        image: "/images/destinations/belitung.jpg",
        description: "Relax on white sandy beaches and visit unique granite rock formations.",
        coordinates: {
            lat: -2.8676,
            lon: 107.9056
        },
        rating: 4.5,
        price: 11381118,
        duration: "2-3 days",
        activities: ["Beach", "Relaxation", "Photography"],
        bestTime: "May to September",
        difficulty: "Easy"
    },
    {
        name: "Banda Islands",
        image: "/images/destinations/banda-islands.jpg",
        description: "Step back in time to Indonesia's historic spice trade center.",
        coordinates: {
            lat: -4.5259,
            lon: 129.8921
        },
        rating: 4.6,
        price: 16265718,
        duration: "4-6 days",
        activities: ["Culture", "History", "Diving"],
        bestTime: "September to November",
        difficulty: "Moderate"
    },
    {
        name: "Derawan Islands",
        image: "/images/destinations/derawan-islands.jpg",
        description: "Swim with turtles and manta rays in this hidden gem.",
        coordinates: {
            lat: 2.2833,
            lon: 118.5833
        },
        rating: 4.7,
        price: 19522118,
        duration: "5-7 days",
        activities: ["Diving", "Snorkeling", "Marine Life"],
        bestTime: "April to November",
        difficulty: "Moderate"
    },
    {
        name: "Weh Island",
        image: "/images/destinations/weh-island.jpg",
        description: "Discover unspoiled beaches at the northernmost tip of Indonesia.",
        coordinates: {
            lat: 5.8764,
            lon: 95.3280
        },
        rating: 4.5,
        price: 13009318,
        duration: "3-4 days",
        activities: ["Beach", "Snorkeling", "Relaxation"],
        bestTime: "May to October",
        difficulty: "Easy"
    }
];
