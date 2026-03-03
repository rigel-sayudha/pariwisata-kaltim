<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CarouselResource\Pages;
use App\Filament\Resources\CarouselResource\RelationManagers;
use App\Models\Carousel;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class CarouselResource extends Resource
{
    protected static ?string $model = Carousel::class;

    protected static ?string $navigationIcon = 'heroicon-o-photo';
    protected static ?string $navigationGroup = 'Landing Page';
    protected static ?string $modelLabel = 'Carousel';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Wizard::make([
                    Forms\Components\Wizard\Step::make('Informasi Teks')
                        ->schema([
                            Forms\Components\TextInput::make('title')
                                ->label('Judul Utama')
                                ->required()
                                ->maxLength(255),
                            Forms\Components\TextInput::make('subtitle')
                                ->label('Sub Judul')
                                ->maxLength(255),
                            Forms\Components\Textarea::make('description')
                                ->label('Deskripsi Pendek')
                                ->maxLength(65535)
                                ->columnSpanFull(),
                            Forms\Components\TextInput::make('location')
                                ->label('Lokasi Disorot')
                                ->maxLength(255),
                        ])->columns(2),
                        
                    Forms\Components\Wizard\Step::make('Visual Utama')
                        ->schema([
                            Forms\Components\FileUpload::make('image')
                                ->label('Gambar Background')
                                ->image()
                                ->required()
                                ->directory('carousels')
                                ->columnSpanFull(),
                            Forms\Components\Toggle::make('is_active')
                                ->label('Aktifkan Banner Ini')
                                ->required()
                                ->default(true),
                        ])->columns(2),
                ])->columnSpanFull()
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image')
                    ->label('Thumbnail'),
                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('location')
                    ->searchable(),
                Tables\Columns\IconColumn::make('is_active')
                    ->boolean(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make()
                    ->modalSubmitAction(false)
                    ->modalCancelAction(false),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
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
            'index' => Pages\ListCarousels::route('/'),
        ];
    }
}
