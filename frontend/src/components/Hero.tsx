"use client";

import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";

export default function Hero() {
    return (
        <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-900">
            {/* Background Video/Image (Using placeholder gradient for now) */}
            <div
                className="absolute inset-0 z-0 opacity-60"
                style={{
                    background: 'radial-gradient(circle at center, #059669 0%, #0f172a 100%)',
                }}
            >
                <div className="absolute inset-0 bg-black/30" />
            </div>

            <div className="container relative z-10 px-4 mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full glass">
                        <MapPin className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm font-medium tracking-wider text-emerald-50 uppercase">
                            East Kalimantan, Indonesia
                        </span>
                    </div>

                    <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-white md:text-7xl lg:text-8xl">
                        Pesona <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Borneo</span>
                    </h1>

                    <p className="mb-10 text-lg text-slate-300 md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Jelajahi keajaiban alam, satwa liar, dan kekayaan budaya Kalimantan Timur. Dari birunya Labuan Cermin hingga eksotisnya Kepulauan Derawan.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 font-semibold text-white transition-all bg-emerald-600 rounded-full hover:bg-emerald-500 flex items-center gap-2 group"
                        >
                            Mulai Petualangan
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 font-semibold text-white transition-all rounded-full glass hover:bg-white/10"
                        >
                            Lihat Destinasi
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
            >
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
                    <div className="w-1.5 h-3 bg-white/50 rounded-full" />
                </div>
            </motion.div>
        </div>
    );
}
