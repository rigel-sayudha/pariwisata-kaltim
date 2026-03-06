<x-filament-widgets::widget>
    <x-filament::section>
        <x-slot name="heading">
            <div class="flex items-center gap-2">
                <x-heroicon-o-chat-bubble-left-right class="w-5 h-5 text-primary-500" />
                <span>Chat Inbox</span>
                @php $unread = $this->getMessages()->where('is_read', false)->count(); @endphp
                @if($unread > 0)
                    <span class="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-danger-500 rounded-full">
                        {{ $unread }}
                    </span>
                @endif
            </div>
        </x-slot>

        <div class="flex gap-4" style="height: 420px;">

            {{-- Left: Message List --}}
            <div class="w-72 flex-shrink-0 border border-gray-200 dark:border-gray-700 rounded-xl overflow-y-auto">
                @forelse($this->getMessages() as $msg)
                    <button
                        wire:click="selectMessage({{ $msg->id }})"
                        class="w-full text-left px-4 py-3 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors
                            {{ $selectedId === $msg->id ? 'bg-primary-50 dark:bg-primary-900/20 border-l-2 border-l-primary-500' : '' }}
                            {{ !$msg->is_read ? 'font-semibold' : '' }}"
                    >
                        <div class="flex items-center justify-between mb-0.5">
                            <span class="text-sm text-gray-900 dark:text-white truncate max-w-[140px]">
                                {{ $msg->name }}
                            </span>
                            <span class="text-[10px] text-gray-400 flex-shrink-0">
                                {{ $msg->created_at->diffForHumans() }}
                            </span>
                        </div>
                        <p class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ $msg->message }}</p>
                        @if($msg->reply)
                            <span class="text-[10px] text-success-600 dark:text-success-400 font-medium">✓ Sudah dibalas</span>
                        @else
                            <span class="text-[10px] text-warning-600 dark:text-warning-400">Belum dibalas</span>
                        @endif
                    </button>
                @empty
                    <div class="flex items-center justify-center h-full text-gray-400 text-sm p-6 text-center">
                        Belum ada pesan masuk.
                    </div>
                @endforelse
            </div>

            {{-- Right: Conversation View --}}
            <div class="flex-1 flex flex-col border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                @if($selectedId && ($selected = $this->getSelectedMessage()))
                    {{-- Header --}}
                    <div class="px-4 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                        <p class="font-semibold text-gray-900 dark:text-white text-sm">{{ $selected->name }}</p>
                        <p class="text-xs text-gray-400">{{ $selected->email }} · {{ $selected->created_at->format('d M Y, H:i') }}</p>
                    </div>

                    {{-- Messages --}}
                    <div class="flex-1 overflow-y-auto p-4 space-y-3 bg-white dark:bg-gray-900">
                        {{-- User message bubble --}}
                        <div class="flex justify-start">
                            <div class="max-w-[75%]">
                                <div class="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300">
                                    {{ $selected->message }}
                                </div>
                                <p class="text-[10px] text-gray-400 mt-0.5 px-1">{{ $selected->created_at->format('H:i') }}</p>
                            </div>
                        </div>

                        {{-- Admin reply bubble --}}
                        @if($selected->reply)
                            <div class="flex justify-end">
                                <div class="max-w-[75%]">
                                    <div class="bg-primary-600 rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm text-white">
                                        {{ $selected->reply }}
                                    </div>
                                    <p class="text-[10px] text-gray-400 mt-0.5 px-1 text-right">
                                        Admin · {{ $selected->replied_at?->format('H:i') }}
                                    </p>
                                </div>
                            </div>
                        @endif
                    </div>

                    {{-- Success notice --}}
                    @if($successMsg)
                        <div class="px-4 py-2 bg-success-50 dark:bg-success-900/20 text-success-700 dark:text-success-400 text-xs text-center flex-shrink-0">
                            {{ $successMsg }}
                        </div>
                    @endif

                    {{-- Reply Input --}}
                    <div class="px-3 py-2.5 border-t border-gray-200 dark:border-gray-700 flex items-center gap-2 bg-white dark:bg-gray-900 flex-shrink-0">
                        <input
                            type="text"
                            wire:model="replyText"
                            wire:keydown.enter="sendReply"
                            placeholder="Tulis balasan..."
                            class="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                        />
                        <button
                            wire:click="sendReply"
                            class="px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white text-sm font-semibold rounded-xl transition-colors"
                        >
                            Kirim
                        </button>
                    </div>
                @else
                    {{-- Empty state --}}
                    <div class="flex-1 flex flex-col items-center justify-center text-gray-400 text-sm text-center p-6 bg-white dark:bg-gray-900">
                        <x-heroicon-o-chat-bubble-left-right class="w-10 h-10 mb-3 text-gray-300 dark:text-gray-600" />
                        <p class="font-medium text-gray-500 dark:text-gray-400">Pilih pesan dari daftar</p>
                        <p class="text-xs mt-1 text-gray-400">untuk melihat percakapan dan membalas</p>
                    </div>
                @endif
            </div>
        </div>
    </x-filament::section>
</x-filament-widgets::widget>
