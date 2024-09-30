<?php

namespace Tests\Unit;

use App\Models\Tag;
use App\Services\TagService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\TestCase;

class TagTest extends TestCase
{
    use RefreshDatabase;

    protected Tag $tag;
    protected TagService $tagService;
    /**
     * A basic unit test example.
     */
    public function test_tag(): void
    {
        Tag::factory()->create([
            'name' => 'タグ1'
        ]);

        $this->assertDatabaseCount('tags', 1);

        $this->assertDatabaseHas('tags', [
            'name' => 'タグ1'
        ]);
    }

    /**
     * 全てのタグを取得する
     *
     * @return void
     */
    public function test_all_tags(): void
    {
        $this->tagService = app()->make(TagService::class);
        Tag::factory()->create([
            'name' => 'タグ1'
        ]);

        $tags = $this->tagService->get_all_tags();
        $this->assertEquals(1, $tags->count());
        $this->assertEquals('タグ1', $tags[0]->name);
    }

    /**
     * カテゴリ新規作成のテスト
     *
     * @return void
     */
    public function test_create_new_category(): void
    {
        $this->tagService = app()->make(TagService::class);
        $this->tag = new Tag();
        $this->tag->name = 'タグ2';

        $response = $this->tagService->create($this->tag);
        $this->assertEquals('タグ2', $response[0]->name);
        $this->assertDatabaseCount('tags', 1);
        $this->assertDatabaseHas('tags', [
            'name' => 'タグ2'
        ]);
    }
}
