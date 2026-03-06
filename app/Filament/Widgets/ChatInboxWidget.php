<?php

namespace App\Filament\Widgets;

use App\Models\ContactMessage;
use Filament\Widgets\Widget;
use Illuminate\Support\Facades\DB;

class ChatInboxWidget extends Widget
{
    protected static string $view = 'filament.widgets.chat-inbox-widget';

    protected static ?int $sort = 10;

    protected int | string | array $columnSpan = 'full';

    public ?int $selectedId = null;
    public string $replyText = '';
    public bool $sendingReply = false;
    public string $successMsg = '';

    // Refresh messages every 10 seconds
    protected static ?string $pollingInterval = '10s';

    public function getMessages(): \Illuminate\Database\Eloquent\Collection
    {
        return ContactMessage::orderByDesc('created_at')
            ->limit(30)
            ->get();
    }

    public function selectMessage(int $id): void
    {
        $this->selectedId = $id;
        $this->replyText = '';
        $this->successMsg = '';

        // Mark as read
        ContactMessage::where('id', $id)->update(['is_read' => true]);
    }

    public function sendReply(): void
    {
        if (!$this->selectedId || !trim($this->replyText)) return;

        ContactMessage::where('id', $this->selectedId)->update([
            'reply' => trim($this->replyText),
            'replied_at' => now(),
        ]);

        $this->successMsg = 'Balasan berhasil dikirim!';
        $this->replyText = '';
    }

    public function getSelectedMessage(): ?ContactMessage
    {
        if (!$this->selectedId) return null;
        return ContactMessage::find($this->selectedId);
    }

    public static function canView(): bool
    {
        return true;
    }
}
