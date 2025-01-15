import { motion } from 'framer-motion';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [status, setStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setStatus('sending');

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
            toast.success('Message sent successfully!');

            setTimeout(() => setStatus(null), 3000);
        } catch (error) {
            setStatus(null);
            console.error(error);
            toast.error('Failed to send message. Please try again.', {
                icon: '❌',
            });
        }
    };

    const handleTextareaWheel = (e) => {
        const textarea = e.target;
        const isScrollable = textarea.scrollHeight > textarea.clientHeight;

        if (isScrollable) {
            e.stopPropagation();

            const maxScroll = textarea.scrollHeight - textarea.clientHeight;
            const currentScroll = textarea.scrollTop;

            if (e.deltaY > 0 && currentScroll < maxScroll) {
                e.preventDefault();
                textarea.scrollTop += e.deltaY;
            }
            else if (e.deltaY < 0 && currentScroll > 0) {
                e.preventDefault();
                textarea.scrollTop += e.deltaY;
            }
        }
    };

    const contactInfo = [
        {
            title: 'Email',
            value: 'hello@nusantaraadventures.com',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            title: 'Phone',
            value: '+62 21 1234 5678',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
            )
        },
        {
            title: 'Location',
            value: 'Jakarta, Indonesia',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
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
                        variants={fadeInUp}
                        className="text-4xl md:text-5xl font-bold mb-4"
                    >
                        Contact Us
                    </motion.h1>
                    <motion.p
                        variants={fadeInUp}
                        className="text-lg md:text-xl text-emerald-50 max-w-2xl"
                    >
                        Get in touch with us for any questions about our travel experiences
                    </motion.p>
                </div>
            </motion.div>

            <div className="container mx-auto px-4 py-16">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <motion.div
                            variants={fadeInUp}
                            initial="initial"
                            whileInView="whileInView"
                            exit="exit"
                            viewport={{ once: false, amount: 0.3 }}
                            className="bg-white rounded-xl shadow-lg p-8"
                        >
                            <h2 className="text-2xl font-bold text-slate-800 mb-6">Send us a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 
                                                 focus:ring-emerald-500 focus:border-emerald-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 
                                                 focus:ring-emerald-500 focus:border-emerald-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 
                                                 focus:ring-emerald-500 focus:border-emerald-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        required
                                        rows={4}
                                        value={formData.message}
                                        onWheel={handleTextareaWheel}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 resize-none`}
                                        style={{
                                            minHeight: '120px',
                                            maxHeight: '240px',
                                            lineHeight: '1.5'
                                        }}
                                    />
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="submit"
                                    disabled={status === 'sending'}
                                    className="w-full bg-emerald-500 text-white py-3 px-6 rounded-lg
                                             font-medium hover:bg-emerald-600 transition-colors
                                             disabled:bg-emerald-300"
                                >
                                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                                </motion.button>
                            </form>
                        </motion.div>

                        <motion.div
                            variants={stagger}
                            initial="initial"
                            whileInView="whileInView"
                            exit="exit"
                            viewport={{ once: false, amount: 0.3 }}
                            className="space-y-8"
                        >
                            <div>
                                <h2 className="text-2xl font-bold text-slate-800 mb-6">Contact Information</h2>
                                <div className="space-y-6">
                                    {contactInfo.map((info) => (
                                        <motion.div
                                            key={info.title}
                                            variants={fadeInUp}
                                            className="flex items-start space-x-4"
                                        >
                                            <div className="text-emerald-500">
                                                {info.icon}
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-slate-800">{info.title}</h3>
                                                <p className="text-slate-600">{info.value}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-slate-800 mb-6">Follow Us</h2>
                                <div className="flex space-x-4">
                                    <motion.a
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        href={'https://instagram.com/sandyb________'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-slate-600 hover:text-emerald-500"
                                    >
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                        </svg>
                                    </motion.a>
                                    <motion.a
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        href="#"
                                        // target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-slate-600 hover:text-emerald-500"
                                    >
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                        </svg>
                                    </motion.a>
                                    <motion.a
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        href="#"
                                        // target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-slate-600 hover:text-emerald-500"
                                        aria-label="Follow us on X (Twitter)"
                                    >
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                        </svg>
                                    </motion.a>
                                    <motion.a
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        href="#"
                                        // target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-slate-600 hover:text-emerald-500"
                                        aria-label="Subscribe to our YouTube channel"
                                    >
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                        </svg>
                                    </motion.a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Contact;