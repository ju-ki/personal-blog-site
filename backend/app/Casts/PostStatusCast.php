<?php

namespace App\Casts;

use App\Enum\PostStatus;
use Illuminate\Contracts\Database\Eloquent\CastsAttributes;
use Illuminate\Database\Eloquent\Model;

class PostStatusCast implements CastsAttributes
{
    /**
     * Cast the given value.
     *
     * @param  array<string, mixed>  $attributes
     */
    public function get(Model $model, string $key, mixed $value, array $attributes): mixed
    {
        return PostStatus::getStatusName($value);
    }

    /**
     * Prepare the given value for storage.
     *
     * @param  array<string, mixed>  $attributes
     */
    public function set(Model $model, string $key, mixed $value, array $attributes): mixed
    {
        return match ($value) {
            'private' => PostStatus::Private->value,
            'public' => PostStatus::Public->value,
            'draft' => PostStatus::Draft->value,
            default => throw new \InvalidArgumentException("Invalid status: $value"),
        };
    }
}
