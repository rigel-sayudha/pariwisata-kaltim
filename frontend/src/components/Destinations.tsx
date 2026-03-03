"use client";

import { motion } from "framer-motion";
import { ArrowRight, Waves, Trees, Sun } from "lucide-react";
import Image from "next/image";

interface DestinationItem {
    id: number;
    name: string;
    location: string;
    category: string;
    short_description: string;
    image: string;
    rating: number;
}

const getImageUrl = (imagePath: string) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    return `http://127.0.0.1:8000/storage/${imagePath}`;
};

const defaultColors = [
    "from-blue-400 to-cyan-500",
    "from-emerald-400 to-teal-500",
    "from-amber-400 to-orange-500",
    "from-indigo-400 to-violet-500",
    "from-rose-400 to-pink-500",
    "from-fuchsia-400 to-purple-500"
];

const defaultIcons = [
    <Waves className="w-5 h-5" key="waves" />,
    <Sun className="w-5 h-5" key="sun" />,
    <Trees className="w-5 h-5" key="trees" />
];

const defaultDestinations: DestinationItem[] = [
    {
        id: 1,
        name: "Pulau Kakaban",
        location: "Kepulauan Derawan",
        short_description: "Berenang bersama ubur-ubur langka tanpa sengat di danau purba.",
        image: "https://images.unsplash.com/photo-1544480843-0e42a96b7978?q=80&w=800&auto=format&fit=crop",
        category: "Pulau",
        rating: 4.8
    },
    {
        id: 2,
        name: "Labuan Cermin",
        location: "Biduk-Biduk",
        short_description: "Pesona danau dua rasa, air tawar di permukaan dan air asin di dasar, sebening kaca.",
        image: "https://images.unsplash.com/photo-1518331822268-6d24de3bc5dd?q=80&w=800&auto=format&fit=crop",
        category: "Danau",
        rating: 4.9
    },
    {
        id: 3,
        name: "Desa Budaya Pampang",
        location: "Samarinda",
        short_description: "Menyaksikan langsung kehidupan dan kebudayaan eksotis Suku Dayak Kenyah.",
        image: "https://images.unsplash.com/photo-1589133464871-2edb95fbb06e?q=80&w=800&auto=format&fit=crop",
        category: "Budaya",
        rating: 4.7
    }
];

export default function Destinations({ items }: { items: any }) {
    const getArrayItems = () => {
        if (!items) return [];
        if (Array.isArray(items)) return items;
        if (items.value && Array.isArray(items.value)) return items.value;
        if (items.data && Array.isArray(items.data)) return items.data;
        return [];
    };

    const arrayItems = getArrayItems();
    const displayItems = arrayItems.length > 0 ? arrayItems : defaultDestinations;

    return (
        <section id="destinasi" className="py-24 bg-slate-50 dark:bg-slate-900">
            <div className="container px-4 mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white"
                        >
                            Destinasi <span className="text-emerald-600 dark:text-emerald-400">Favorit</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-slate-600 dark:text-slate-400 text-lg"
                        >
                            Temukan surga tersembunyi di Kalimantan Timur untuk Anda jelajahi.
                        </motion.p>
                    </div>

                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="group flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                    >
                        Lihat Semua Destinasi
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayItems.map((dest: DestinationItem, i: number) => {
                        const iconIndex = i % defaultIcons.length;
                        const colorIndex = i % defaultColors.length;

                        return (
                            <motion.div
                                key={dest.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ delay: i * 0.15 }}
                                whileHover={{ y: -10 }}
                                className="group relative rounded-3xl overflow-hidden bg-white dark:bg-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none"
                            >
                                <div className="relative h-72 overflow-hidden">
                                    <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors z-10" />
                                    <Image
                                        src={getImageUrl(dest.image)}
                                        alt={dest.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className={`absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center text-white bg-gradient-to-br ${defaultColors[colorIndex]} shadow-lg`}>
                                        {defaultIcons[iconIndex]}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8 relative">
                                    <div className="absolute top-0 right-10 -translate-y-1/2 w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl rotate-45 z-10" />
                                    <div className="relative z-20">
                                        <div className="flex justify-between items-start mb-2">
                                            <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                                                {dest.location}
                                            </p>
                                            {dest.rating > 0 && (
                                                <div className="flex items-center gap-1 bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 px-2 py-0.5 rounded text-xs font-bold">
                                                    ★ {dest.rating}
                                                </div>
                                            )}
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                                            {dest.name}
                                        </h3>
                                        <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-2">
                                            {dest.short_description || dest.description || 'Destinasi wisata unggulan Kalimantan Timur.'}
                                        </p>
                                        <div className="flex items-center text-sm font-medium text-slate-900 dark:text-white group/btn cursor-pointer">
                                            Pelajari selengkapnya
                                            <ArrowRight className="w-4 h-4 ml-2 text-emerald-500 group-hover/btn:translate-x-2 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
