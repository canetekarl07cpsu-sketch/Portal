<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClassActivity extends Model
{
    protected $fillable = [
        'user_id',
        'subject_code',
        'subject_name',
        'title',
        'description',
        'activity_date',
        'due_date',
    ];
}
