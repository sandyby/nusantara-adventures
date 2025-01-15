import { motion } from 'framer-motion';

const BASE_URL = import.meta.env.VITE_BASE_URL || '/';

const AboutPage = () => {
  const teamMembers = [
    {
      name: "Sandy Bonfilio Yuvens",
      role: "Founder & Developer",
      image: `${BASE_URL}images/sandy.jpg`,
      instagram: "https://instagram.com/sandyb________"
    }
  ];

  const values = [
    {
      title: "Expert Local Guides",
      description: "Our experienced guides provide deep insights into Indonesian culture, ensuring authentic and enriching experiences for every traveler.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: "Curated Experiences",
      description: "Each destination and activity is carefully selected to provide unique, memorable, and authentic Indonesian experiences.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    },
    {
      title: "Sustainable Tourism",
      description: "We prioritize eco-friendly practices and support local communities, ensuring responsible and sustainable travel experiences.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "24/7 Support",
      description: "Our dedicated team provides round-the-clock assistance to ensure your journey is smooth and worry-free.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      )
    }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    viewport: { once: false, amount: 0.3 },
    transition: { duration: 0.5 }
  };

  const stagger = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    exit: { opacity: 0 },
    viewport: { once: false, amount: 0.3 },
    transition: { staggerChildren: 0.2 }
  };

  const cardAnimation = {
    initial: { opacity: 0, scale: 0.9, y: 20 },
    whileInView: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: -20 },
    viewport: { once: false, amount: 0.3 },
    transition: { duration: 0.5 }
  };

  const slideIn = {
    initial: { opacity: 0, x: -20 },
    whileInView: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
    viewport: { once: false, amount: 0.3 },
    transition: { duration: 0.5 }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-slate-50 pt-20"
    >
      <motion.div
        className="bg-emerald-600 text-white py-16"
        variants={fadeInUp}
        initial="initial"
        whileInView="whileInView"
        exit="exit"
        viewport={{ once: false, amount: 0.3 }}
      >
        <div className="container mx-auto px-4">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            variants={fadeInUp}
          >
            About Nusantara Travel
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-emerald-50 max-w-2xl"
            variants={fadeInUp}
          >
            Discover the story behind our passion for showcasing Indonesia&apos;s beauty to the world
          </motion.p>
        </div>
      </motion.div>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            className="text-center mb-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            exit="exit"
            viewport={{ once: false, amount: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Our Mission</h2>
            <p className="text-lg text-slate-600">
              To showcase the incredible diversity of Indonesia through authentic travel experiences,
              while promoting sustainable tourism and supporting local communities.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            exit="exit"
            viewport={{ once: false, amount: 0.3 }}
          >
            {values.map((value) => (
              <motion.div
                key={value.title}
                variants={cardAnimation}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-emerald-500 mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  {value.title}
                </h3>
                <p className="text-slate-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <motion.div
          className="container mx-auto max-w-4xl"
          variants={stagger}
          initial="initial"
          whileInView="whileInView"
          exit="exit"
          viewport={{ once: false, amount: 0.3 }}
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-bold text-slate-800 text-center mb-12"
          >
            Meet Our Team
          </motion.h2>
          <motion.div
            className="grid grid-cols-1"
            variants={stagger}
          >
            {teamMembers.map((member) => (
              <motion.div
                key={member.name}
                variants={slideIn}
                className="text-center"
              >
                <div className="mb-4 relative w-40 h-40 mx-auto">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      e.target.src = '/images/placeholder-avatar.jpg';
                    }}
                  />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-1">
                  {member.name}
                </h3>
                <p className="text-slate-600 mb-3">{member.role}</p>
                {member.instagram && (
                  <a
                    href={member.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-500 hover:text-emerald-600 inline-flex items-center gap-1"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    Follow
                  </a>
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default AboutPage;