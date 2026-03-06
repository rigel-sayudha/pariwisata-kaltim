"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import TourBookingModal from "./TourBookingModal";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

    const navLinks = [
        { name: "Beranda", href: "/#" },
        { name: "Destinasi", href: "/#destinasi" },
        { name: "Berita Terbaru", href: "/#berita" },
        { name: "Kontak", href: "/#kontak" },
    ];

    return (
        <>
            <nav className="fixed w-full z-40 top-0 transition-all duration-300 glass dark:bg-slate-900/80">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <Link href="/" className="text-2xl font-black tracking-tighter text-emerald-600 dark:text-emerald-400">
                            Kaltim<span className="text-slate-900 dark:text-white">Explore</span>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <button
                                onClick={() => setIsBookingModalOpen(true)}
                                className="px-6 py-2.5 text-sm font-semibold text-white bg-slate-900 dark:bg-emerald-600 rounded-full hover:bg-slate-800 dark:hover:bg-emerald-500 transition-colors"
                            >
                                Pesan Tour
                            </button>
                        </div>

                        {/* Mobile Toggle */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="text-slate-700 dark:text-slate-300 focus:outline-none"
                            >
                                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800"
                        >
                            <div className="px-4 pt-2 pb-6 space-y-1 shadow-xl">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="block px-3 py-4 text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                <div className="pt-4 pb-2 px-3">
                                    <button
                                        onClick={() => {
                                            setIsOpen(false);
                                            setIsBookingModalOpen(true);
                                        }}
                                        className="w-full px-6 py-3 text-sm font-semibold text-white bg-emerald-600 rounded-xl hover:bg-emerald-500 transition-colors"
                                    >
                                        Pesan Tour
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Injeksi Portal Booking Modal */}
            <TourBookingModal
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
            />
        </>
    );
}
