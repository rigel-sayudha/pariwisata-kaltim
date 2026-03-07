"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronDown, Filter, MapPin, Search, Star } from "lucide-react";

interface DestinationItem {
    id: number;
    name: string;
    slug: string;
    location: string;
    category: string;
    short_description: string;
    image: string;
    rating: number;
    review_count: number;
    price: string | null;
    duration: string | null;
}

const getImageUrl = (imagePath: string | undefined | null) => {
    if (!imagePath) return 'https://images.unsplash.com/photo-1544480843-0e42a96b7978?q=80&w=800&auto=format&fit=crop';
    if (imagePath.startsWith('http')) return imagePath;
    return `${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'}/storage/${imagePath}`;
};

export default function AllDestinationsClient({
    initialDestinations,
}: {
    initialDestinations: DestinationItem[];
}) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState("terbaru");
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    const locations = useMemo(() => {
        const unique = Array.from(new Set(initialDestinations.map(d => d.location))).filter(Boolean);
        return unique.sort();
    }, [initialDestinations]);

    const categories = useMemo(() => {
        const unique = Array.from(new Set(initialDestinations.map(d => d.category))).filter(Boolean);
        return unique.sort();
    }, [initialDestinations]);

    const toggleLocation = (loc: string) => {
        setSelectedLocations(prev =>
            prev.includes(loc) ? prev.filter(l => l !== loc) : [...prev, loc]
        );
    };

    const toggleCategory = (cat: string) => {
        setSelectedCategories(prev =>
            prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
        );
    };

    const filteredAndSortedDestinations = useMemo(() => {
        let result = [...initialDestinations];

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(d =>
                d.name.toLowerCase().includes(query) ||
                d.location.toLowerCase().includes(query)
            );
        }

        // Location
        if (selectedLocations.length > 0) {
            result = result.filter(d => selectedLocations.includes(d.location));
        }

        // Category
        if (selectedCategories.length > 0) {
            result = result.filter(d => selectedCategories.includes(d.category));
        }

        // Sorting
        switch (sortBy) {
            case "nama-asc":
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "nama-desc":
                result.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case "rating":
                result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                break;
            case "terbaru":
            default:
                break;
        }

        return result;
    }, [initialDestinations, searchQuery, selectedLocations, selectedCategories, sortBy]);

    const formatPrice = (priceStr: string | null) => {
        if (!priceStr) return null;
        if (/^\d+$/.test(priceStr)) {
            return `Rp ${new Intl.NumberFormat("id-ID").format(parseInt(priceStr))}`;
        }
        return priceStr;
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-24 pb-12">

            {/* Header / Hero Section */}
            <div className="bg-emerald-50 dark:bg-emerald-900/20 py-16 mb-12 border-y border-emerald-100 dark:border-emerald-800/30">
                <div className="container px-4 mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                        Destinasi Wisata di Kalimantan Timur
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                        Temukan berbagai pilihan wisata menarik di Kalimantan Timur.
                    </p>
                </div>
            </div>

            <div className="container px-4 mx-auto">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Mobile Filter Toggle */}
                    <div className="lg:hidden flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Filter</h2>
                        <button
                            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                            className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                        >
                            <Filter className="w-4 h-4" />
                            {isMobileFilterOpen ? "Tutup Filter" : "Lihat Filter"}
                        </button>
                    </div>

                    {/* Sidebar Filters */}
                    <div className={`lg:w-1/4 flex-shrink-0 space-y-8 ${isMobileFilterOpen ? 'block' : 'hidden lg:block'}`}>

                        {/* Search */}
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Cari Tour</h3>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Nama destinasi / lokasi..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white"
                                />
                            </div>
                        </div>

                        {/* Booking Locations */}
                        {locations.length > 0 && (
                            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Lokasi</h3>
                                <div className="space-y-3">
                                    {locations.map((loc) => (
                                        <label key={loc} onClick={() => toggleLocation(loc)} className="flex items-center gap-3 cursor-pointer group">
                                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedLocations.includes(loc)
                                                ? 'bg-emerald-600 border-emerald-600'
                                                : 'border-slate-300 dark:border-slate-600 group-hover:border-emerald-500'
                                                }`}>
                                                {selectedLocations.includes(loc) && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                            </div>
                                            <span className="text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{loc}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Categories */}
                        {categories.length > 0 && (
                            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Kategori</h3>
                                <div className="space-y-3">
                                    {categories.map((cat) => (
                                        <label key={cat} onClick={() => toggleCategory(cat)} className="flex items-center gap-3 cursor-pointer group">
                                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedCategories.includes(cat)
                                                ? 'bg-emerald-600 border-emerald-600'
                                                : 'border-slate-300 dark:border-slate-600 group-hover:border-emerald-500'
                                                }`}>
                                                {selectedCategories.includes(cat) && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                            </div>
                                            <span className="text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{cat}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1">

                        {/* Top Bar (Results count & Sort) */}
                        <div className="flex flex-col sm:flex-row justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50 shadow-sm mb-8 gap-4">
                            <p className="text-slate-600 dark:text-slate-400">
                                <span className="font-bold text-slate-900 dark:text-white">{filteredAndSortedDestinations.length}</span> Destinasi Ditemukan
                            </p>

                            <div className="flex items-center gap-3">
                                <span className="text-sm text-slate-500 dark:text-slate-400">Urutkan:</span>
                                <div className="relative">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="appearance-none bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 py-2 pl-4 pr-10 rounded-lg text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium cursor-pointer"
                                    >
                                        <option value="terbaru">Terbaru</option>
                                        <option value="nama-asc">Nama (A-Z)</option>
                                        <option value="nama-desc">Nama (Z-A)</option>
                                        <option value="rating">Rating Tertinggi</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Grid */}
                        {filteredAndSortedDestinations.length === 0 ? (
                            <div className="bg-white dark:bg-slate-800 rounded-2xl p-12 text-center border border-slate-100 dark:border-slate-700/50">
                                <MapPin className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Tidak ditemukan</h3>
                                <p className="text-slate-500 dark:text-slate-400">Coba ubah filter atau kata kunci pencarian Anda.</p>
                                <button
                                    onClick={() => {
                                        setSearchQuery("");
                                        setSelectedLocations([]);
                                        setSelectedCategories([]);
                                    }}
                                    className="mt-6 px-6 py-2 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 rounded-lg font-medium hover:bg-emerald-200 dark:hover:bg-emerald-900/60 transition-colors"
                                >
                                    Reset Filter
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {filteredAndSortedDestinations.map((dest) => {
                                    const displayPrice = formatPrice(dest.price);

                                    return (
                                        <Link href={`/destinasi/${dest.slug}`} key={dest.id} className="group flex flex-col bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700/50 shadow-sm hover:shadow-xl hover:border-emerald-100 dark:hover:border-emerald-800/50 transition-all duration-300 h-full">
                                            {/* Top Image Section */}
                                            <div className="relative h-64 overflow-hidden">
                                                <img
                                                    src={getImageUrl(dest.image)}
                                                    alt={dest.name}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/20" />

                                                {/* Float Badges */}
                                                {dest.duration && (
                                                    <div className="absolute top-4 left-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-200 shadow-lg border border-white/20">
                                                        {dest.duration}
                                                    </div>
                                                )}

                                                {displayPrice && (
                                                    <div className="absolute top-4 right-4 bg-emerald-600 px-3 py-1.5 rounded-lg text-xs font-bold text-white shadow-lg shadow-emerald-600/30">
                                                        {displayPrice}
                                                    </div>
                                                )}

                                            </div>

                                            {/* Content Section */}
                                            <div className="p-5 flex-1 flex flex-col">
                                                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                                                    <MapPin className="w-3 h-3" />
                                                    {dest.location}
                                                </p>

                                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                                    {dest.name}
                                                </h3>

                                                {/* Meta Info Bottom */}
                                                <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-700/50">
                                                    <div className="flex items-center gap-1 text-sm font-medium">
                                                        <span className="text-slate-500 dark:text-slate-400">Excellent</span>
                                                        <div className="flex items-center text-amber-500 ml-1">
                                                            <Star className="w-3.5 h-3.5 fill-current" />
                                                            <Star className="w-3.5 h-3.5 fill-current" />
                                                            <Star className="w-3.5 h-3.5 fill-current" />
                                                            <Star className="w-3.5 h-3.5 fill-current" />
                                                            <Star className="w-3.5 h-3.5 fill-current opacity-40" />
                                                        </div>
                                                        <span className="text-slate-400 dark:text-slate-500 text-xs shadow-none">
                                                            ({dest.rating > 0 ? dest.rating : '4.5'})
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
