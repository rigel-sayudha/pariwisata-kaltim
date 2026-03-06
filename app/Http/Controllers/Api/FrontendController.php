<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Carousel;
use App\Models\Destination;
use App\Models\News;
use App\Models\SocialMedia;
use App\Models\TourBooking;
use App\Models\ContactMessage;
use App\Models\FooterSetting;
use App\Models\User;
use Filament\Notifications\Notification;

class FrontendController extends Controller
{
    public function carousels()
    {
        $carousels = Carousel::where('is_active', true)->get();
        return response()->json($carousels);
    }

    public function destinations()
    {
        $destinations = Destination::orderBy('is_featured', 'desc')->get();
        return response()->json($destinations);
    }

    public function destinationDetail($slug)
    {
        $destination = Destination::where('slug', $slug)->firstOrFail();
        return response()->json($destination);
    }

    public function news()
    {
        $news = News::where('is_published', true)->orderBy('published_at', 'desc')->get();
        return response()->json($news);
    }

    public function newsDetail($slug)
    {
        $news = News::where('slug', $slug)->where('is_published', true)->firstOrFail();
        return response()->json($news);
    }

    public function socialMedia()
    {
        $socials = SocialMedia::where('is_active', true)->get();
        return response()->json($socials);
    }

    public function storeBooking(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:255',
            'participants' => 'required|integer|min:1',
            'date' => 'required|date',
            'message' => 'nullable|string',
        ]);

        $booking = TourBooking::create($validated);

        Notification::make()
            ->title('Pesanan Tour Baru')
            ->body("{$booking->name} telah memesan tour untuk {$booking->participants} orang.")
            ->success()
            ->sendToDatabase(User::all());

        return response()->json(['message' => 'Pesanan berhasil dikirim', 'data' => $booking], 201);
    }

    public function footerSettings()
    {
        $settings = FooterSetting::getAllAsArray();
        return response()->json($settings);
    }

    public function storeContact(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
            'session_token' => 'nullable|string|max:100',
        ]);

        $contact = ContactMessage::create($validated);

        Notification::make()
            ->title('Pesan Chat Baru')
            ->body("Pesan baru dari {$contact->name}: {$contact->message}")
            ->info()
            ->sendToDatabase(User::all());

        return response()->json(['message' => 'Pesan berhasil dikirim', 'data' => $contact], 201);
    }

    public function getChatReply(string $sessionToken)
    {
        $message = ContactMessage::where('session_token', $sessionToken)
            ->whereNotNull('reply')
            ->latest('replied_at')
            ->first();

        if (!$message) {
            return response()->json(['reply' => null]);
        }

        return response()->json([
            'reply' => $message->reply,
            'replied_at' => $message->replied_at,
        ]);
    }
}
