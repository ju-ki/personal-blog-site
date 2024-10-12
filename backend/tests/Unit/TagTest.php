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
     * タグ新規作成のテスト
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

    /**
     * タグを更新するテスト
     *
     * @return void
     */
    public function test_update_tag(): void
    {
        $this->tagService = app()->make(TagService::class);
        $this->tag = new Tag();
        $this->tag->name = 'new tag';

        $response = $this->tagService->create($this->tag);

        $this->assertEquals('new tag', $response[0]->name);
        $this->assertEquals(4, $response[0]->id);

        $this->tag->name = 'updated tag';
        $this->tag->id = $response[0]->id;

        $response = $this->tagService->update($this->tag);

        $this->assertEquals('updated tag', $response[0]->name);
        $this->assertEquals(4, $response[0]->id);
    }


    /**
     * タグを削除するテスト
     *
     * @return void
     */
    public function test_delete_tag(): void
    {
        $this->tagService = app()->make(TagService::class);
        $this->tag = new Tag();
        $this->tag->name = 'delete tag';

        $response = $this->tagService->create($this->tag);

        $this->assertEquals('delete tag', $response[0]->name);
        $this->assertEquals(5, $response[0]->id);

        $this->tagService->delete($response[0]->id);

        $this->assertDatabaseMissing('tags', [
            'id' => 5
        ]);
    }
}
