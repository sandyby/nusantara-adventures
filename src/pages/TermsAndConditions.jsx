import { motion } from 'framer-motion';

const TermsAndConditions = () => {
    const sections = [
        {
            title: "1. Acceptance of Terms",
            content: "By accessing and using Nusantara Adventures' services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our services."
        },
        {
            title: "2. Booking and Payments",
            content: [
                "2.1. All bookings are subject to availability and confirmation.",
                "2.2. A deposit of 30% is required to secure your booking.",
                "2.3. Full payment must be received 30 days prior to the tour date.",
                "2.4. Payments can be made via bank transfer, credit card, or other approved payment methods.",
                "2.5. All prices are quoted in USD unless otherwise specified."
            ]
        },
        {
            title: "3. Cancellation Policy",
            content: [
                "3.1. Cancellations made 30+ days before the tour: 90% refund",
                "3.2. Cancellations made 15-29 days before the tour: 50% refund",
                "3.3. Cancellations made 7-14 days before the tour: 25% refund",
                "3.4. Cancellations made less than 7 days before the tour: No refund",
                "3.5. All cancellations must be made in writing"
            ]
        },
        {
            title: "4. Travel Insurance",
            content: "We strongly recommend that all participants obtain comprehensive travel insurance covering trip cancellation, medical expenses, evacuation, and personal liability. Nusantara Adventures is not responsible for any losses or damages that could have been covered by travel insurance."
        },
        {
            title: "5. Health and Safety",
            content: [
                "5.1. Participants must disclose any medical conditions or dietary requirements.",
                "5.2. We reserve the right to refuse service to anyone we deem unfit for travel.",
                "5.3. Participants must follow all safety instructions provided by guides.",
                "5.4. COVID-19 protocols must be followed as per local regulations."
            ]
        },
        {
            title: "6. Liability",
            content: "Nusantara Adventures acts as a tour operator and is not liable for any damage, loss, accident, injury, delay, or irregularity that may be caused to person or property. We recommend appropriate insurance coverage for all activities."
        },
        {
            title: "7. Media Release",
            content: "By participating in our tours, you grant Nusantara Adventures permission to use photographs, videos, and testimonials featuring you for marketing purposes without compensation."
        },
        {
            title: "8. Modifications",
            content: "We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services constitutes acceptance of these modifications."
        }
    ];

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: false },
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
                viewport={{ once: false }}
            >
                <div className="container mx-auto px-4">
                    <motion.h1
                        className="text-4xl md:text-5xl font-bold mb-4"
                        variants={fadeInUp}
                    >
                        Terms and Conditions
                    </motion.h1>
                    <motion.p
                        className="text-lg md:text-xl text-emerald-50 max-w-2xl"
                        variants={fadeInUp}
                    >
                        Please read these terms carefully before using our services
                    </motion.p>
                </div>
            </motion.div>

            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        className="bg-white rounded-xl shadow-lg p-8"
                        variants={fadeInUp}
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: false }}
                    >
                        <div className="prose prose-slate max-w-none">
                            <p className="text-slate-600 mb-8">
                                Last updated: {new Date().toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>

                            {sections.map((section, index) => (
                                <motion.div
                                    key={section.title}
                                    variants={fadeInUp}
                                    initial="initial"
                                    whileInView="whileInView"
                                    viewport={{ once: false }}
                                    transition={{ delay: index * 0.1 }}
                                    className="mb-8"
                                >
                                    <h2 className="text-2xl font-bold text-slate-800 mb-4">
                                        {section.title}
                                    </h2>
                                    {Array.isArray(section.content) ? (
                                        <ul className="list-none space-y-2">
                                            {section.content.map((item, i) => (
                                                <motion.li
                                                    key={i}
                                                    variants={fadeInUp}
                                                    className="text-slate-600 pl-4 border-l-2 border-emerald-500"
                                                >
                                                    {item}
                                                </motion.li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-slate-600">
                                            {section.content}
                                        </p>
                                    )}
                                </motion.div>
                            ))}

                            <motion.div
                                variants={fadeInUp}
                                initial="initial"
                                whileInView="whileInView"
                                viewport={{ once: false }}
                                className="mt-12 p-6 bg-slate-50 rounded-lg border border-slate-200"
                            >
                                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                                    Questions or Concerns?
                                </h3>
                                <p className="text-slate-600">
                                    If you have any questions about these Terms and Conditions, please contact us at{' '}
                                    <a
                                        href="mailto:legal@nusantaraadventures.com"
                                        className="text-emerald-600 hover:text-emerald-700 transition-colors"
                                    >
                                        legal@nusantaraadventures.com
                                    </a>
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default TermsAndConditions;