<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Destination extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'location',
        'rating',
        'review_count',
        'image',
        'category',
        'short_description',
        'is_featured',
        'price',
        'duration',
        'group_size',
        'languages',
        'description',
        'includes',
        'excludes',
        'what_to_expect',
        'itinerary',
    ];

    protected $casts = [
        'includes' => 'array',
        'excludes' => 'array',
        'what_to_expect' => 'array',
        'itinerary' => 'array',
    ];
}
