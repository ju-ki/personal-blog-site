<?php

namespace App\Models;

use App\Casts\PostStatusCast;
use App\Enum\PostStatus;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property string $title
 * @property string $content
 * @property int $user_id
 * @property PostStatus $status
 */
class Post extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'content', 'user_id', 'status'];

    protected $casts = [
        'status' => PostStatusCast::class
    ];

    public function postTag(): HasMany
    {
        return $this->hasMany(PostTag::class);
    }
}
