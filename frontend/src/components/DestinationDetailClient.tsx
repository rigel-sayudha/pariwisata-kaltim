"use client";

import { useState } from "react";
import Link from "next/link";
import {
    MapPin,
    Star,
    Clock,
    Users,
    Globe,
    CheckCircle2,
    XCircle,
    ChevronDown,
    ChevronUp,
    Check,
} from "lucide-react";

interface DestinationDetail {
    id: number;
    name: string;
    slug: string;
    location: string;
    rating: number;
    review_count: number;
    image: string;
    category: string;
    short_description: string;
    price?: string;
    duration?: string;
    group_size?: string;
    languages?: string;
    description?: string;
    includes?: string[];
    excludes?: string[];
    what_to_expect?: string[];
    itinerary?: { day: string; content: string }[];
}

const getImageUrl = (imagePath: string) => {
    if (!imagePath)
        return "https://images.unsplash.com/photo-1544480843-0e42a96b7978?q=80&w=800&auto=format&fit=crop";
    if (imagePath.startsWith("http")) return imagePath;
    return `${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"}/storage/${imagePath}`;
};


export default function DestinationDetailClient({
    destination,
    related,
}: {
    destination: DestinationDetail;
    related: DestinationDetail[];
}) {
    const [openItinerary, setOpenItinerary] = useState<number | null>(0);

    return (
        <div className="bg-slate-50 dark:bg-slate-950 pb-20">
            {/* Header Area */}
            <div className="container mx-auto px-4 pt-32 pb-10">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
                    <div>
                        <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-3">
                            <span>{destination.category || "Destinasi"}</span>
                            {destination.duration && (
                                <>
                                    <span>•</span>
                                    <span>{destination.duration}</span>
                                </>
                            )}
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                            {destination.name}
                        </h1>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                            {destination.rating > 0 && (
                                <div className="flex items-center gap-1 font-bold text-amber-500">
                                    <Star className="w-5 h-5 fill-current" />
                                    <span>{destination.rating}</span>
                                    <span className="text-slate-500 font-normal">
                                        ({destination.review_count} ulasan)
                                    </span>
                                </div>
                            )}
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span>{destination.location}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
                    {/* Left Column (Main) */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Hero Image */}
                        <div className="rounded-3xl overflow-hidden aspect-[16/9] relative shadow-2xl shadow-slate-200/50 dark:shadow-none">
                            <img
                                src={getImageUrl(destination.image)}
                                alt={destination.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Overview */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                Overview
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg" dangerouslySetInnerHTML={{ __html: destination.description || destination.short_description || '' }} />
                            {!destination.short_description && (
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg mt-4">
                                    Pemandu kami siap memberikan Anda pelayanan terbaik selama berada di jantung Kalimantan. Jadikan liburan Anda lebih bermakna dan seru.
                                </p>
                            )}
                        </section>

                        {((destination.includes && destination.includes.length > 0) || (destination.excludes && destination.excludes.length > 0)) && (
                            <>
                                <hr className="border-slate-200 dark:border-slate-800" />
                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                                        Fasilitas & Layanan
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                                        <div className="space-y-4">
                                            {destination.includes?.map((item: any, idx: number) => (
                                                <div key={idx} className="flex items-start gap-3">
                                                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                                    <span className="text-slate-700 dark:text-slate-300">
                                                        {item.item || item}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="space-y-4">
                                            {destination.excludes?.map((item: any, idx: number) => (
                                                <div key={idx} className="flex items-start gap-3 opacity-60">
                                                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                                    <span className="text-slate-700 dark:text-slate-300 line-through">
                                                        {item.item || item}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </section>
                            </>
                        )}

                        {destination.what_to_expect && destination.what_to_expect.length > 0 && (
                            <>
                                <hr className="border-slate-200 dark:border-slate-800" />
                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                                        What to Expect
                                    </h2>
                                    <ul className="space-y-3">
                                        {destination.what_to_expect.map((item: any, idx: number) => (
                                            <li key={idx} className="flex items-start gap-3">
                                                <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0 mt-2.5" />
                                                <span className="text-slate-700 dark:text-slate-300 leading-relaxed">
                                                    {item.item || item}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-8 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/50 rounded-2xl p-6">
                                        <h4 className="font-bold text-emerald-800 dark:text-emerald-400 mb-2">
                                            Catatan Penting:
                                        </h4>
                                        <p className="text-emerald-700 dark:text-emerald-300/80 text-sm leading-relaxed">
                                            Jadwal dan itinerary dapat berubah sewaktu-waktu menyesuaikan dengan kondisi cuaca dan keadaan alam di lokasi. Prioritas kami adalah keselamatan dan kenyamanan Anda.
                                        </p>
                                    </div>
                                </section>
                            </>
                        )}

                        {destination.itinerary && destination.itinerary.length > 0 && (
                            <>
                                <hr className="border-slate-200 dark:border-slate-800" />
                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                                        Itinerary Perjalanan
                                    </h2>
                                    <div className="space-y-4">
                                        {destination.itinerary.map((item, idx) => (
                                            <div
                                                key={idx}
                                                className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900"
                                            >
                                                <button
                                                    onClick={() => setOpenItinerary(openItinerary === idx ? null : idx)}
                                                    className="w-full flex items-center justify-between p-5 text-left bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                                >
                                                    <span className="font-bold text-slate-900 dark:text-white">
                                                        {item.day}
                                                    </span>
                                                    {openItinerary === idx ? (
                                                        <ChevronUp className="w-5 h-5 text-slate-500" />
                                                    ) : (
                                                        <ChevronDown className="w-5 h-5 text-slate-500" />
                                                    )}
                                                </button>
                                                <div
                                                    className={`px-5 overflow-hidden transition-all duration-300 ease-in-out ${openItinerary === idx ? "max-h-40 py-5 opacity-100" : "max-h-0 py-0 opacity-0"
                                                        }`}
                                                >
                                                    <p className="text-slate-600 dark:text-slate-400 whitespace-pre-line">
                                                        {item.content}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </>
                        )}
                    </div>

                    {/* Right Column (Sidebar) */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28 space-y-6">
                            {/* Pricing Box */}
                            <div className="bg-slate-900 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
                                {/* Decorative circle */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

                                <div className="flex items-end gap-2 mb-6 relative z-10">
                                    <h3 className="text-3xl font-bold text-white">
                                        {destination.price ? `Rp ${new Intl.NumberFormat('id-ID').format(Number(destination.price))}` : 'Harga Menyesuaikan'}
                                    </h3>
                                    {destination.price && <span className="text-slate-400 mb-1">/ orang</span>}
                                </div>

                                <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-6 rounded-xl transition-colors relative z-10">
                                    Book Package
                                </button>

                                <p className="text-center text-slate-400 text-xs mt-4 relative z-10">
                                    Tidak ada biaya tersembunyi.
                                </p>
                            </div>

                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-none">
                                <ul className="space-y-4">
                                    {destination.duration && (
                                        <li className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                                                <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Durasi</p>
                                                <p className="text-sm font-semibold text-slate-900 dark:text-white">{destination.duration}</p>
                                            </div>
                                        </li>
                                    )}
                                    {destination.group_size && (
                                        <li className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                                                <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Grup Size</p>
                                                <p className="text-sm font-semibold text-slate-900 dark:text-white">{destination.group_size}</p>
                                            </div>
                                        </li>
                                    )}
                                    {destination.languages && (
                                        <li className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                                                <Globe className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Bahasa</p>
                                                <p className="text-sm font-semibold text-slate-900 dark:text-white">{destination.languages}</p>
                                            </div>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Tours */}
                {related && related.length > 0 && (
                    <div className="mt-24 pt-16 border-t border-slate-200 dark:border-slate-800">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Related Tours</h2>
                            <p className="text-slate-600 dark:text-slate-400">Pilihan destinasi lain yang mungkin Anda sukai</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {related.map((item) => (
                                <Link
                                    key={item.id}
                                    href={`/destinasi/${item.id}`}
                                    className="group rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:-translate-y-2 transition-transform duration-300"
                                >
                                    <div className="aspect-[4/3] relative overflow-hidden">
                                        <img
                                            src={getImageUrl(item.image)}
                                            alt={item.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute top-4 right-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                            Tersedia
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1 group-hover:text-emerald-500 transition-colors">
                                            {item.name}
                                        </h3>
                                        <p className="text-slate-500 text-sm flex items-center gap-1">
                                            <MapPin className="w-3.5 h-3.5" />
                                            {item.location}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
