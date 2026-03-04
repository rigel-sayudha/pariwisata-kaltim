<?php

namespace Database\Seeders;

use App\Models\FooterSetting;
use Illuminate\Database\Seeder;

class FooterSettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            // Brand
            ['key' => 'brand_name', 'value' => 'KaltimExplore', 'group' => 'brand'],
            ['key' => 'brand_highlight', 'value' => 'Explore', 'group' => 'brand'],
            ['key' => 'brand_tagline', 'value' => 'Membangun koneksi antara pelancong dengan pesona autentik alam dan budaya Kalimantan Timur, Indonesia.', 'group' => 'brand'],

            // Contact
            ['key' => 'address', 'value' => 'Jl. APT Pranoto No.88, Samarinda, Kalimantan Timur 75116', 'group' => 'contact'],
            ['key' => 'phone', 'value' => '+62 811 555 1234', 'group' => 'contact'],
            ['key' => 'email', 'value' => 'halo@kaltimexplore.id', 'group' => 'contact'],

            // Navigation Links
            ['key' => 'nav_link_1', 'value' => 'Tentang Kami|#', 'group' => 'navigation'],
            ['key' => 'nav_link_2', 'value' => 'Destinasi Populer|#destinasi', 'group' => 'navigation'],
            ['key' => 'nav_link_3', 'value' => 'Paket Wisata|#', 'group' => 'navigation'],
            ['key' => 'nav_link_4', 'value' => 'Blog & Artikel|#berita', 'group' => 'navigation'],
            ['key' => 'nav_link_5', 'value' => 'Galeri Kaltim|#', 'group' => 'navigation'],

            // Support Links
            ['key' => 'support_link_1', 'value' => 'FAQ|#', 'group' => 'support'],
            ['key' => 'support_link_2', 'value' => 'Syarat & Ketentuan|#', 'group' => 'support'],
            ['key' => 'support_link_3', 'value' => 'Kebijakan Privasi|#', 'group' => 'support'],
            ['key' => 'support_link_4', 'value' => 'Panduan Wisatawan|#', 'group' => 'support'],

            // Copyright
            ['key' => 'copyright_text', 'value' => 'Kaltim Explore Tour & Travel. All rights reserved.', 'group' => 'general'],
            ['key' => 'copyright_tagline', 'value' => 'Dibuat dengan ♥ di Borneo', 'group' => 'general'],
        ];

        foreach ($settings as $setting) {
            FooterSetting::updateOrCreate(
                ['key' => $setting['key']],
                $setting
            );
        }
    }
}
