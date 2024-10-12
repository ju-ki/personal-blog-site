<?php

namespace Tests\Feature;

use App\Models\Tag;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class TagTest extends TestCase
{
    use RefreshDatabase;
    /**
     * タグ一覧のHTTPレスポンステスト
     */
    public function test_api_tag_test(): void
    {
        Tag::factory()->create([
            'name' => 'タグ1'
        ]);
        $response = $this->get('/api/tags');

        $response->assertStatus(200);

        $response->assertJsonStructure([
            '*' => [
                'id',
                'name'
            ]
        ]);
    }

    /**
     * タグ作成をするAPIテスト
     *
     * @return void
     */
    public function test_api_create_tag(): void
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);

        $this->actingAs($user);
        $this->assertAuthenticated();
        $this->assertAuthenticatedAs($user);

        $response = $this->postJson('/api/tags/create', [
            'name' => 'タグ2'
        ]);

        $response->assertStatus(201);
        $response->assertJsonStructure([
            '*' => [
                'id',
                'name'
            ]
        ]);
    }

    public function test_api_update_tag(): void
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);

        $this->actingAs($user);
        $this->assertAuthenticated();
        $this->assertAuthenticatedAs($user);

        $tag = Tag::factory()->create([
            'name' => 'new tag'
        ]);

        $response = $this->patchJson('/api/tags/update', [
            'id' => $tag->id,
            'name' => 'updated tag'
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            '*' => [
                'id',
                'name'
            ]
        ]);

        // 更新されたタグが返却されていることを確認
        $response->assertJson(
            fn(AssertableJson $json) =>
            $json->where('0.id', $tag->id)
                ->where('0.name', 'updated tag')
                ->etc()
        );

        // データベースのタグが更新されたことを確認
        $this->assertDatabaseHas('tags', [
            'id' => $tag->id,
            'name' => 'updated tag',
        ]);
    }

    /**
     * タグ削除のAPIテスト
     *
     * @return void
     */
    public function test_api_delete_tag(): void
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);

        $this->actingAs($user);
        $this->assertAuthenticated();
        $this->assertAuthenticatedAs($user);

        $tag = Tag::factory()->create([
            'name' => 'delete tag'
        ]);

        $response = $this->deleteJson('/api/tags/delete?id=' . $tag->id);

        $response->assertStatus(200);

        // データベースのタグが削除されたことを確認
        $this->assertDatabaseMissing('tags', [
            'id' => $tag->id,
        ]);
    }
}
