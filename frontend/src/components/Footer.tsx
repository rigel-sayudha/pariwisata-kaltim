import { Instagram, Twitter, Facebook, Youtube, MapPin, Mail, Phone } from "lucide-react";

export interface SocialMediaItem {
    id: number;
    platform: string;
    url: string;
    icon: string;
}

async function getSocialMedia() {
    try {
        const res = await fetch("http://127.0.0.1:8000/api/social-media", { next: { revalidate: 3600 } });
        if (!res.ok) return [];
        return res.json() as Promise<SocialMediaItem[]>;
    } catch (e) {
        return [];
    }
}

export default async function Footer() {
    const socialMedia = await getSocialMedia();

    const IconMap: Record<string, any> = {
        'instagram': Instagram,
        'twitter': Twitter,
        'facebook': Facebook,
        'youtube': Youtube,
    };

    return (
        <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-black text-white tracking-tighter">
                            Kaltim<span className="text-emerald-500">Explore</span>
                        </h3>
                        <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
                            Membangun koneksi antara pelancong dengan pesona autentik alam dan budaya Kalimantan Timur, Indonesia.
                        </p>
                        <div className="flex gap-4 pt-4">
                            {socialMedia.map((social) => {
                                const IconComponent = IconMap[social.icon?.toLowerCase()] || MapPin;
                                return (
                                    <a
                                        key={social.id}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all"
                                        title={social.platform}
                                    >
                                        <IconComponent className="w-4 h-4" />
                                    </a>
                                );
                            })}

                            {/* Fallback dummy if DB empty */}
                            {socialMedia.length === 0 && (
                                <>
                                    <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all">
                                        <Instagram className="w-4 h-4" />
                                    </a>
                                    <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all">
                                        <Twitter className="w-4 h-4" />
                                    </a>
                                    <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all">
                                        <Facebook className="w-4 h-4" />
                                    </a>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Links */}
                    <div className="space-y-4">
                        <h4 className="text-white font-bold mb-6">Navigasi</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">Tentang Kami</a></li>
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">Destinasi Populer</a></li>
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">Paket Wisata</a></li>
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">Blog & Artikel</a></li>
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">Galeri Kaltim</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="space-y-4">
                        <h4 className="text-white font-bold mb-6">Pusat Bantuan</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">FAQ</a></li>
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">Syarat & Ketentuan</a></li>
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">Kebijakan Privasi</a></li>
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">Panduan Wisatawan</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h4 className="text-white font-bold mb-6">Hubungi Kami</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-emerald-500 shrink-0" />
                                <span className="text-slate-400">Jl. APT Pranoto No.88, Samarinda, Kalimantan Timur 75116</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-emerald-500 shrink-0" />
                                <span className="text-slate-400">+62 811 555 1234</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-emerald-500 shrink-0" />
                                <span className="text-slate-400">halo@kaltimexplore.id</span>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                    <p>&copy; {new Date().getFullYear()} Kaltim Explore Tour & Travel. All rights reserved.</p>
                    <p className="flex items-center gap-1">
                        Dibuat dengan <span className="text-red-500">♥</span> di Borneo
                    </p>
                </div>
            </div>
        </footer>
    );
}
