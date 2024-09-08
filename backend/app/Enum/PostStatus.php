<?php

namespace App\Enum;

enum PostStatus: int
{
    case Private = 0;
    case Public = 1;
    case Draft = 2;

    public static function getStatusName($value): string
    {
        return match ($value) {
            self::Private->value => 'private',
            self::Public->value => 'public',
            self::Draft->value => 'draft',
            default => 'private',
        };
    }


    public static function getStatus($value): int
    {
        return match ($value) {
            self::Private->value => 0,
            self::Public->value => 1,
            self::Draft->value => 2,
            default => 999,
        };
    }
}
