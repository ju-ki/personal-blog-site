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

    /**
     * タグを編集する
     *
     * @param Tag $tag
     * @return \Illuminate\Database\Eloquent\Collection<int, \App\Models\Tag>
     */
    public function update(Tag $tag): Collection
    {
        Tag::where('id', $tag->id)->update([
            'name' => $tag->name
        ]);

        $tags = $this->get_all_tags();

        return $tags;
    }

    /**
     * タグを削除する
     *
     * @param integer $id
     * @return Collection
     */
    public function delete(int $id): Collection
    {
        Tag::destroy($id);

        $tags = $this->get_all_tags();
        return $tags;
    }
}
