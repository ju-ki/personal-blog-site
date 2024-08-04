<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property string $title
 * @property string $content
 * @property int $user_id
 */
class Post extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'content'];
}
