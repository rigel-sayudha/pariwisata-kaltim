<?php

namespace App\Filament\Resources;

use App\Filament\Resources\FooterSettingResource\Pages;
use App\Models\FooterSetting;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class FooterSettingResource extends Resource
{
    protected static ?string $model = FooterSetting::class;

    protected static ?string $navigationIcon = 'heroicon-o-cog-6-tooth';

    protected static ?string $navigationLabel = 'Footer';

    protected static ?string $modelLabel = 'Footer Setting';

    protected static ?string $pluralModelLabel = 'Footer Settings';

    protected static ?string $navigationGroup = 'Pengaturan';

    protected static ?int $navigationSort = 10;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Setting Footer')
                    ->description('Kelola konten footer yang tampil di halaman utama website.')
                    ->schema([
                        Forms\Components\TextInput::make('key')
                            ->label('Kunci Setting')
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->maxLength(255)
                            ->helperText('Contoh: brand_name, address, phone')
                            ->placeholder('brand_name'),

                        Forms\Components\Textarea::make('value')
                            ->label('Nilai')
                            ->maxLength(1000)
                            ->rows(3)
                            ->placeholder('Masukkan nilai setting...'),

                        Forms\Components\Select::make('group')
                            ->label('Grup')
                            ->options([
                                'brand' => 'Brand / Identitas',
                                'contact' => 'Kontak',
                                'navigation' => 'Link Navigasi',
                                'support' => 'Link Bantuan',
                                'general' => 'Umum',
                            ])
                            ->default('general')
                            ->required(),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('key')
                    ->label('Kunci')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('value')
                    ->label('Nilai')
                    ->limit(50)
                    ->searchable(),

                Tables\Columns\TextColumn::make('group')
                    ->label('Grup')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'brand' => 'success',
                        'contact' => 'info',
                        'navigation' => 'warning',
                        'support' => 'primary',
                        default => 'gray',
                    }),

                Tables\Columns\TextColumn::make('updated_at')
                    ->label('Terakhir Diubah')
                    ->dateTime('d M Y H:i'),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('group')
                    ->label('Grup')
                    ->options([
                        'brand' => 'Brand / Identitas',
                        'contact' => 'Kontak',
                        'navigation' => 'Link Navigasi',
                        'support' => 'Link Bantuan',
                        'general' => 'Umum',
                    ]),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->defaultSort('group');
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListFooterSettings::route('/'),
            'create' => Pages\CreateFooterSetting::route('/create'),
            'edit' => Pages\EditFooterSetting::route('/{record}/edit'),
        ];
    }
}
