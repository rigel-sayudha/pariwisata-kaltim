<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Carousel extends Model
{
    use HasFactory;

    protected $fillable = [
        'destination_id',
        'title',
        'subtitle',
        'description',
        'image',
        'location',
        'is_active',
    ];

    public function destination()
    {
        return $this->belongsTo(Destination::class);
    }
}
