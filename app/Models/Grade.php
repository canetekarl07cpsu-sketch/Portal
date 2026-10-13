<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Grade extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'subject_code',
        'subject_name',
        'units',
        'grade',
        'semester',
        'school_year',
        'remarks',
    ];

    protected function casts(): array
    {
        return [
            'units' => 'integer',
            'grade' => 'decimal:2',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
