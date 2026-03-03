import { Calendar, ArrowRight, User } from "lucide-react";
import Image from "next/image";

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

const getImageUrl = (imagePath: string) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    return `http://127.0.0.1:8000/storage/${imagePath}`;
};

const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
};

const defaultNewsItems: NewsItem[] = [
    {
        id: 1,
        title: "Festival Derawan 2026 Segera Digelar, Hadirkan Budaya Pesisir",
        excerpt: "Pemerintah Provinsi Kalimantan Timur bersiap menyelenggarakan Festival Derawan tahunan dengan menampilkan parade perahu hias dan tarian pesisir.",
        published_at: "2026-03-12T00:00:00Z",
        author: "Dinas Pariwisata Kaltim",
        image: "https://images.unsplash.com/photo-1544480843-0e42a96b7978?q=80&w=600&auto=format&fit=crop",
        category: "Festival",
        slug: "festival-derawan-2026-segera-digelar",
    },
    {
        id: 2,
        title: "Penetapan Kuota Kunjungan Harian Labuan Cermin Demi Konservasi",
        excerpt: "Untuk menjaga kelestarian ekosistem danau dua rasa, mulai bulan depan akan diberlakukan pembatasan jumlah pengunjung harian.",
        published_at: "2026-03-10T00:00:00Z",
        author: "Humas Pemprov",
        image: "https://images.unsplash.com/photo-1518331822268-6d24de3bc5dd?q=80&w=600&auto=format&fit=crop",
        category: "Konservasi",
        slug: "penetapan-kuota-kunjungan-harian-labuan-cermin",
    },
    {
        id: 3,
        title: "Rute Baru Penerbangan Langsung ke Berau Dibuka April Mendatang",
        excerpt: "Akses wisatawan menuju Kepulauan Derawan semakin mudah dengan dibukanya rute penerbangan langsung dari Jakarta ke Bandara Kalimarau Berau.",
        published_at: "2026-03-08T00:00:00Z",
        author: "Info Transportasi",
        image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=600&auto=format&fit=crop",
        category: "Transportasi",
        slug: "rute-baru-penerbangan-langsung-ke-berau",
    }
];

export default function LatestNews({ items }: { items: any }) {
    const getArrayItems = () => {
        if (!items) return [];
        if (Array.isArray(items)) return items;
        if (items.value && Array.isArray(items.value)) return items.value;
        if (items.data && Array.isArray(items.data)) return items.data;
        return [];
    };

    const arrayItems = getArrayItems();
    const displayItems = arrayItems.length > 0 ? arrayItems : defaultNewsItems;

    return (
        <section id="berita" className="py-24 bg-white dark:bg-slate-950">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div className="max-w-2xl">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold tracking-wider uppercase text-sm mb-2 block">
                            Info Terkini
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight">
                            Berita & Pengumuman <br className="hidden md:block" /> Pariwisata Kalimantan Timur
                        </h2>
                    </div>
                    <button className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-medium hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors group">
                        Lihat Semua Berita
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayItems.map((news: NewsItem) => (
                        <article
                            key={news.id}
                            className="group bg-slate-50 dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300 border border-slate-100 dark:border-slate-800"
                        >
                            <div className="relative h-56 overflow-hidden">
                                <Image
                                    src={getImageUrl(news.image)}
                                    alt={news.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                {news.category && (
                                    <div className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                                        {news.category}
                                    </div>
                                )}
                            </div>

                            <div className="p-6">
                                <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mb-4">
                                    <span className="flex items-center gap-1.5">
                                        <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                                        {formatDate(news.published_at)}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <User className="w-3.5 h-3.5 text-emerald-500" />
                                        {news.author}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                    {news.title}
                                </h3>

                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                                    {news.excerpt}
                                </p>

                                <button className="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 group/btn">
                                    Baca Selengkapnya
                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
