<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Like extends Model
{
    use HasFactory;
    protected $table = 'likes';

    public function post(): HasOne
    {
        return $this->hasOne(Post::class);
    }
}
