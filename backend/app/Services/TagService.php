<?php

namespace App\Services;

use App\Models\Tag;
use Illuminate\Database\Eloquent\Collection;

class TagService
{
    /**
     * タグ一覧を取得する
     * @return \Illuminate\Database\Eloquent\Collection<int, \App\Models\Tag>
     */
    public function get_all_tags(): Collection
    {
        $categories = Tag::all();
        return $categories;
    }

    /**
     * タグの新規作成
     *
     * @param Tag $tag
     * @return \Illuminate\Database\Eloquent\Collection<int, \App\Models\Tag>
     */
    public function create(Tag $tag): Collection
    {
        Tag::create([
            'name' => $tag->name
        ]);

        $tags = $this->get_all_tags();
        return $tags;
    }
}
