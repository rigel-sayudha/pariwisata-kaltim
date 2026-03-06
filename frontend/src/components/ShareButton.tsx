"use client";

import { Share2 } from "lucide-react";

export default function ShareButton({ title }: { title: string }) {
    const handleShare = () => {
        if (navigator?.share) {
            navigator.share({ title, url: window.location.href });
        } else {
            navigator.clipboard?.writeText(window.location.href);
            alert("Link berhasil disalin!");
        }
    };

    return (
        <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
            <Share2 className="w-4 h-4" />
            Bagikan
        </button>
    );
}
