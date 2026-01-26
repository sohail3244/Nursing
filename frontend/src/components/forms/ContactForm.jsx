import React from 'react';
import Button from '../common/Button';

const ContactForm = () => {
    // Brand Theme Color constant
    const brandColor = "#6739b7";
    const brandDark = "#1a237e";

    return (
        <section className="bg-transparent py-10">
            <div className="max-w-3xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-2" style={{ color: brandDark }}>
                        Contact
                    </h2>
                    <p className="text-gray-500 font-medium italic">
                        Fill the contact form & submit.
                    </p>
                </div>

                {/* Form Container */}
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>

                    {/* Full Name Field */}
                    <div className="space-y-2">
                        <label className="font-bold text-sm block" style={{ color: brandDark }}>
                            Full Name *
                        </label>
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 transition-all placeholder:text-gray-300"
                            style={{ focusRingColor: brandColor }}
                        />
                    </div>

                    {/* Contact Number Field */}
                    <div className="space-y-2">
                        <label className="font-bold text-sm block" style={{ color: brandDark }}>
                            Contact Number *
                        </label>
                        <input
                            type="tel"
                            placeholder="Your Contact Number"
                            className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 transition-all placeholder:text-gray-300"
                            style={{ focusRingColor: brandColor }}
                        />
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                        <label className="font-bold text-sm block" style={{ color: brandDark }}>
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 transition-all placeholder:text-gray-300"
                            style={{ focusRingColor: brandColor }}
                        />
                    </div>

                    {/* Message Field */}
                    <div className="space-y-2">
                        <label className="font-bold text-sm block" style={{ color: brandDark }}>
                            Message *
                        </label>
                        <textarea
                            rows="5"
                            placeholder="Enter Your Message"
                            className="w-full px-5 py-4 bg-white border border-gray-100 rounded-xl focus:outline-none focus:ring-2 transition-all placeholder:text-gray-300 resize-none"
                            style={{ focusRingColor: brandColor }}
                        ></textarea>
                    </div>

                    {/* Submit Button: Teal changed to Brand Purple */}
                    <Button
                        type="submit"
                        className="w-full text-white py-4 rounded-xl font-bold text-lg shadow-lg transition-all active:scale-[0.98] mt-4 hover:brightness-110"

                    >
                        Submit
                    </Button>
                </form>
            </div>
        </section>
    );
};

export default ContactForm;