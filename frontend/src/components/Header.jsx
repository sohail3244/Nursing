import React, { useState } from 'react';
import ApplyNowModal from './modals/ApplyNowModal';
import Button from './common/Button';

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const brandColor = "#6739b7";
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <header className="bg-white shadow-md sticky top-0 z-50 font-sans w-full">
                <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16 md:h-20">

                        {/* Logo Section - Responsive scaling */}
                        <div className="flex items-center gap-1 cursor-pointer shrink-0">
                            <div className="relative flex items-center justify-center">
                                <span className="text-lg md:text-2xl font-bold text-gray-800">my</span>
                                <span className="text-lg md:text-2xl font-extrabold italic" style={{ color: brandColor }}>N</span>
                                <div className="absolute -bottom-0.5 -left-0.5 w-4 h-4 md:w-5 md:h-5 border-2 rounded-full opacity-30" style={{ borderColor: brandColor }}></div>
                            </div>
                            <div className="flex flex-col leading-none">
                                <span className="text-sm md:text-lg font-semibold text-gray-700 tracking-tight">
                                    ursing<span style={{ color: brandColor }}>Admission</span>
                                    <span className="text-[8px] md:text-[10px] text-gray-400">.com</span>
                                </span>
                            </div>
                        </div>

                        {/* Desktop Navigation Links */}
                        <nav className="hidden lg:flex items-center gap-4 xl:gap-8">
                            <a href="#" className="font-bold border-b-2 pb-1 transition-all" style={{ color: brandColor, borderColor: brandColor }}>Home</a>
                            <a href="#" className="text-gray-600 hover:text-[#6739b7] transition-colors font-medium">Colleges</a>
                            <div className="flex items-center gap-1 cursor-pointer group">
                                <span className="text-gray-600 group-hover:text-[#6739b7] font-medium">Courses</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 group-hover:text-[#6739b7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                            <a href="#" className="text-gray-600 hover:text-[#6739b7] font-medium">Blog</a>
                            <a href="#" className="text-gray-600 hover:text-[#6739b7] font-medium">About</a>
                            <a href="#" className="text-gray-600 hover:text-[#6739b7] font-medium">Contact</a>
                        </nav>

                        {/* Action Buttons & Hamburger */}
                        <div className="flex items-center gap-2 md:gap-4">
                            {/* Desktop Phone - Hidden on Small Screens */}
                            <div className="hidden xl:flex items-center gap-2 border px-3 py-1.5 rounded-full hover:bg-purple-50 transition-colors cursor-pointer" style={{ borderColor: brandColor, color: brandColor }}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                                <span className="font-bold text-sm">755 888 1111</span>
                            </div>

                            {/* Admission Button - Smaller on mobile */}
                            <div className="scale-90 md:scale-100">
                                <Button onClick={() => setIsModalOpen(true)}>
                                    <span className="whitespace-nowrap">Online Admission</span>
                                </Button>
                            </div>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="lg:hidden p-1.5 rounded-md text-gray-600 hover:text-[#6739b7] focus:outline-none"
                            >
                                <svg className="h-7 w-7 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    {isOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Overlay - Smooth Transitions */}
                <div className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96 opacity-100 border-t' : 'max-h-0 opacity-0'}`}>
                    <div className="px-4 pt-4 pb-6 space-y-1 bg-white">
                        <a href="#" className="block px-3 py-2 rounded-md text-base font-bold bg-purple-50" style={{ color: brandColor }}>Home</a>
                        <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">Colleges</a>
                        <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">Courses</a>
                        <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">Blog</a>
                        <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">About</a>
                        <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">Contact</a>

                        {/* Mobile Phone Number in Menu */}
                        <div className="mt-4 flex items-center gap-3 px-3 py-3 border-t border-gray-100" style={{ color: brandColor }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                            <span className="font-bold">755 888 1111</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Modal Component */}
            <ApplyNowModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}

export default Header;