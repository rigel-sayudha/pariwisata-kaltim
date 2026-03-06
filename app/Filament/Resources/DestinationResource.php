<?php

namespace App\Filament\Resources;

use App\Filament\Resources\DestinationResource\Pages;
use App\Filament\Resources\DestinationResource\RelationManagers;
use App\Models\Destination;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class DestinationResource extends Resource
{
    protected static ?string $model = Destination::class;

    protected static ?string $navigationIcon = 'heroicon-o-map-pin';
    protected static ?string $navigationGroup = 'Tujuan Wisata';
    protected static ?string $modelLabel = 'Destination';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Informasi Destinasi')
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(function (string $operation, $state, Forms\Set $set) {
                                if ($operation === 'create' || $operation === 'edit') {
                                    $set('slug', \Illuminate\Support\Str::slug($state));
                                }
                            }),
                        Forms\Components\TextInput::make('slug')
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->maxLength(255),
                        Forms\Components\TextInput::make('location')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('category')
                            ->label('Kategori')
                            ->maxLength(255),
                        Forms\Components\Textarea::make('short_description')
                            ->label('Deskripsi Singkat')
                            ->maxLength(65535)
                            ->columnSpanFull(),
                    ])->columns(2),

                Forms\Components\Section::make('Informasi Paket Tour')
                    ->schema([
                        Forms\Components\TextInput::make('price')
                            ->label('Harga Paket (Rp)')
                            ->numeric()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('duration')
                            ->label('Durasi Paket')
                            ->placeholder('Contoh: 4 Hari')
                            ->maxLength(255),
                        Forms\Components\TextInput::make('group_size')
                            ->label('Ukuran Grup')
                            ->placeholder('Contoh: Maksimal 12 orang')
                            ->maxLength(255),
                        Forms\Components\TextInput::make('languages')
                            ->label('Bahasa yang Digunakan')
                            ->placeholder('Contoh: Indonesia, English')
                            ->maxLength(255),
                        Forms\Components\RichEditor::make('description')
                            ->label('Overview / Deskripsi Lengkap')
                            ->columnSpanFull(),
                    ])->columns(2),

                Forms\Components\Section::make('Fasilitas & Ekspektasi')
                    ->collapsible()
                    ->collapsed()
                    ->schema([
                        Forms\Components\Repeater::make('includes')
                            ->label('Price Includes (Termasuk)')
                            ->simple(
                                Forms\Components\TextInput::make('item')->required(),
                            )
                            ->columnSpan(1),
                        Forms\Components\Repeater::make('excludes')
                            ->label('Price Excludes (Tidak Termasuk)')
                            ->simple(
                                Forms\Components\TextInput::make('item')->required(),
                            )
                            ->columnSpan(1),
                        Forms\Components\Repeater::make('what_to_expect')
                            ->label('What to Expect (Ekspektasi/Poin Penting)')
                            ->simple(
                                Forms\Components\TextInput::make('item')->required(),
                            )
                            ->columnSpanFull(),
                        Forms\Components\Repeater::make('itinerary')
                            ->label('Itinerary Perjalanan')
                            ->schema([
                                Forms\Components\TextInput::make('day')
                                    ->label('Judul / Hari')
                                    ->placeholder('Contoh: Hari 1 - Kedatangan')
                                    ->required(),
                                Forms\Components\Textarea::make('content')
                                    ->label('Aktivitas')
                                    ->required(),
                            ])
                            ->columnSpanFull(),
                    ])->columns(2),

                Forms\Components\Section::make('Visual & Status')
                    ->schema([
                        Forms\Components\FileUpload::make('image')
                            ->image()
                            ->required()
                            ->directory('destinations')
                            ->columnSpanFull(),
                        Forms\Components\Toggle::make('is_featured')
                            ->label('Tampilkan sebagai Unggulan')
                            ->default(false),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image')
                    ->label('Foto'),
                Tables\Columns\TextColumn::make('name')
                    ->searchable(),
                Tables\Columns\TextColumn::make('location')
                    ->searchable(),
                Tables\Columns\TextColumn::make('category')
                    ->searchable(),
                Tables\Columns\IconColumn::make('is_featured')
                    ->boolean(),
                Tables\Columns\TextColumn::make('rating')
                    ->numeric(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListDestinations::route('/'),
            'create' => Pages\CreateDestination::route('/create'),
            'edit' => Pages\EditDestination::route('/{record}/edit'),
        ];
    }
}
