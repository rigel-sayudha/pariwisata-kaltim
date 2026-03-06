"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Calendar, Search, User, X } from "lucide-react";

interface NewsItem {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    published_at: string;
    author: string;
    image: string;
    category: string;
}

const API = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

const getImageUrl = (imagePath: string) => {
    if (!imagePath) return "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop";
    if (imagePath.startsWith("http")) return imagePath;
    return `${API}/storage/${imagePath}`;
};

const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(dateString));
};

function NewsCard({ item }: { item: NewsItem }) {
    return (
        <Link
            href={`/berita/${item.slug}`}
            className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-slate-900/5 hover:-translate-y-1 transition-all duration-300"
        >
            {/* Thumbnail */}
            <div className="relative h-52 overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                    src={getImageUrl(item.image)}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {item.category && (
                    <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        {item.category}
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-5">
                <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug line-clamp-2 mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {item.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 mb-4 flex-1">
                    {item.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white font-bold text-xs shrink-0">
                        {item.author?.charAt(0)?.toUpperCase() || "A"}
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate">
                            {item.author || "KaltimExplore"}
                        </p>
                        <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                            <Calendar className="w-3 h-3" />
                            {formatDate(item.published_at)}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default function NewsListClient({ initialNews }: { initialNews: NewsItem[] }) {
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("Semua");

    const categories = useMemo(() => {
        const cats = Array.from(new Set(initialNews.map((n) => n.category).filter(Boolean)));
        return ["Semua", ...cats];
    }, [initialNews]);

    const filtered = useMemo(() => {
        return initialNews.filter((item) => {
            const matchesCategory = activeCategory === "Semua" || item.category === activeCategory;
            const matchesSearch =
                !search ||
                item.title.toLowerCase().includes(search.toLowerCase()) ||
                item.excerpt?.toLowerCase().includes(search.toLowerCase()) ||
                item.author?.toLowerCase().includes(search.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [initialNews, activeCategory, search]);

    return (
        <div>
            {/* Search + Category Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                {/* Search */}
                <div className="relative w-full md:max-w-sm">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cari berita..."
                        className="w-full pl-10 pr-9 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                    />
                    {search && (
                        <button
                            onClick={() => setSearch("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>

                {/* Category Tabs */}
                <div className="flex gap-2 flex-wrap">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeCategory === cat
                                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Count */}
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                <span className="font-semibold text-slate-800 dark:text-white">{filtered.length}</span> berita ditemukan
                {activeCategory !== "Semua" && (
                    <> · <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{activeCategory}</span></>
                )}
            </p>

            {/* Grid */}
            {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                    <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 text-3xl">
                        📰
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                        Berita tidak ditemukan
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-xs">
                        Coba kata kunci lain atau pilih kategori yang berbeda.
                    </p>
                    <button
                        onClick={() => { setSearch(""); setActiveCategory("Semua"); }}
                        className="px-6 py-2.5 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-500 transition-colors"
                    >
                        Reset Filter
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                    {filtered.map((item) => (
                        <NewsCard key={item.id} item={item} />
                    ))}
                </div>
            )}
        </div>
    );
}
