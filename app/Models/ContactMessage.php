<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactMessage extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'subject',
        'message',
        'session_token',
        'reply',
        'replied_at',
        'is_read',
    ];

    protected $casts = [
        'replied_at' => 'datetime',
        'is_read' => 'boolean',
    ];
}
