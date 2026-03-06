<?php

namespace App\Filament\Widgets;

use Saade\FilamentFullCalendar\Widgets\FullCalendarWidget;
use App\Models\TourBooking;

class TourBookingCalendarWidget extends FullCalendarWidget
{
    protected static ?int $sort = 3;
    protected int | string | array $columnSpan = 1;

    public function fetchEvents(array $fetchInfo): array
    {
        return TourBooking::query()
            ->where('date', '>=', $fetchInfo['start'])
            ->where('date', '<=', $fetchInfo['end'])
            ->get()
            ->map(function (TourBooking $booking) {
                return [
                    'id'    => $booking->id,
                    'title' => $booking->name . ' (' . $booking->participants . ' pax)',
                    'start' => $booking->date->format('Y-m-d'),
                    'end'   => $booking->date->format('Y-m-d'),
                    'url'   => \App\Filament\Resources\TourBookingResource::getUrl('edit', ['record' => $booking]),
                    'shouldOpenUrlInNewTab' => false,
                    'color' => $booking->status === 'confirmed' ? '#10b981' : ($booking->status === 'cancelled' ? '#ef4444' : '#f59e0b'), // success, danger, warning
                ];
            })
            ->all();
    }
}
