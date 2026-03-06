<?php

namespace App\Filament\Widgets;

use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use App\Models\Visitor;
use App\Models\News;
use App\Models\Destination;
use App\Models\ContactMessage;

class DashboardStatsWidget extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Total Pengunjung', Visitor::count())
                ->icon('heroicon-o-users')
                ->description('Total visitors')
                ->descriptionIcon('heroicon-m-arrow-trending-up')
                ->color('success')
                ->chart([7, 2, 10, 3, 15, 4, 17]),

            Stat::make('Total Berita', News::count())
                ->icon('heroicon-o-newspaper')
                ->description('Total published news')
                ->descriptionIcon('heroicon-m-document-text')
                ->color('info')
                ->chart([2, 3, 5, 2, 7, 3, 8]),

            Stat::make('Total Destinasi', Destination::count())
                ->icon('heroicon-o-map-pin')
                ->description('Total destinations')
                ->color('warning'),

            Stat::make('Total Pertanyaan', ContactMessage::count())
                ->icon('heroicon-o-envelope-open')
                ->description('Customer inquiries')
                ->color('danger'),
        ];
    }
}
