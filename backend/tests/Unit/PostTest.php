<?php

namespace Tests\Unit;

use App\Enum\PostStatus;
use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use App\Services\PostService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

use function PHPUnit\Framework\assertEquals;
use function PHPUnit\Framework\assertTrue;

class PostTest extends TestCase
{
    use RefreshDatabase;

    protected Post $post;
    protected PostService $service;

    protected function setUp(): void
    {
        parent::setUp();

        $category = Category::factory()->create([
            'name' => 'testCategory'
        ]);
    }

    /**
     * サービスを介してブログを作成するテスト
     *
     * @return void
     */
    public function test_create_new_post(): void
    {
        $this->service = app()->make(PostService::class);

        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);

        $this->actingAs($user);
        $this->assertAuthenticated();
        $this->assertAuthenticatedAs($user);
        $this->post = new Post;
        $this->post->title = 'Test Post';
        $this->post->content = 'Test Content';
        $this->post->user_id = $user->id;


        $response = $this->service->create($this->post, []);
        //デフォルト時は非公開状態(仮)
        assertTrue($response->title === 'Test Post');
        assertTrue($response->content === 'Test Content');
        assertTrue($response->user_id === $user->id);
        assertTrue($response->status === 'private');
    }

    /**
     * サービスを介してブログを作成するテスト(公開)
     *
     * @return void
     */
    public function test_create_new_post_with_public(): void
    {
        $this->service = app()->make(PostService::class);

        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);

        $this->actingAs($user);
        $this->assertAuthenticated();
        $this->assertAuthenticatedAs($user);
        $this->post = new Post;
        $this->post->title = 'Test Post';
        $this->post->content = 'Test Content';
        $this->post->user_id = $user->id;
        $this->post->status = 'public';


        $response = $this->service->create($this->post, []);
        assertTrue($response->title === 'Test Post');
        assertTrue($response->content === 'Test Content');
        assertTrue($response->user_id === $user->id);
        assertTrue($response->status === 'public');
    }

    /**
     * 作成した記事一覧を返すテスト(管理画面用)
     */

    public function test_get_all_posts_for_admin()
    {
        $this->service = app()->make(PostService::class);

        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);

        $this->actingAs($user);
        $this->assertAuthenticated();
        $this->assertAuthenticatedAs($user);
        $this->post = new Post;
        $this->post->title = 'Test Post';
        $this->post->content = 'Test Content';
        $this->post->user_id = $user->id;
        $this->post->status = 'public';
        $this->service->create($this->post, []);

        $this->post = new Post;
        $this->post->title = 'Test Post2';
        $this->post->content = 'Test Content2';
        $this->post->user_id = $user->id;
        $this->post->status = 'private';
        $this->service->create($this->post, []);

        $allPosts = $this->service->getAllPosts();

        //件数テスト
        assertTrue(count($allPosts) === 2);

        //中身のテスト
        $this->assertEquals('Test Post', $allPosts[0]->title);
        $this->assertEquals('Test Content', $allPosts[0]->content);
        $this->assertEquals($user->id, $allPosts[0]->user_id);
        assertTrue($allPosts[0]->status === 'public');

        $this->assertEquals('Test Post2', $allPosts[1]->title);
        $this->assertEquals('Test Content2', $allPosts[1]->content);
        $this->assertEquals($user->id, $allPosts[1]->user_id);
        assertTrue($allPosts[1]->status === 'private');
    }

    /**
     * 記事詳細を取得する
     */
    public function test_get_post_detail()
    {
        $this->service = app()->make(PostService::class);

        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);

        $this->actingAs($user);
        $this->assertAuthenticated();
        $this->assertAuthenticatedAs($user);
        $this->post = new Post;
        $this->post->title = 'Test Post';
        $this->post->content = 'Test Content';
        $this->post->user_id = $user->id;
        $this->post->status = 'public';
        $response = $this->service->create($this->post, []);

        $postDetail = $this->service->getPostDetail($response->id);

        assertEquals($response->id, $postDetail->id);
        assertEquals($response->title, $postDetail->title);
    }

    /**
     * 記事を更新する　
     */
    public function test_update_post_detail()
    {
        $this->service = app()->make(PostService::class);

        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);

        $this->actingAs($user);
        $this->assertAuthenticated();
        $this->assertAuthenticatedAs($user);
        $this->post = new Post;
        $this->post->title = 'Test Post';
        $this->post->content = 'Test Content';
        $this->post->user_id = $user->id;
        $this->post->status = 'public';
        $response = $this->service->create($this->post, []);

        $response->title = 'Test Post Updated';
        $postDetail = $this->service->updatePost($response);

        assertEquals($response->id, $postDetail->id);
        assertEquals($response->title, $postDetail->title);
    }
    /**
     * 記事を削除する
     */
    public function test_delete_post_detail()
    {
        $this->service = app()->make(PostService::class);

        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);

        $this->actingAs($user);
        $this->assertAuthenticated();
        $this->assertAuthenticatedAs($user);
        $this->post = new Post;
        $this->post->title = 'Test Post';
        $this->post->content = 'Test Content';
        $this->post->user_id = $user->id;
        $this->post->status = 'public';
        $response = $this->service->create($this->post, []);

        $this->service->delete($response->id);

        $this->assertDatabaseMissing('posts', [
            'id' => $response->id,
        ]);
    }
    /**
     * ステータスをpublicにするテスト
     *
     * @return void
     */
    public function test_update_post_status()
    {
        $this->service = app()->make(PostService::class);
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);
        $this->post = new Post;
        $this->post->title = 'Test Post';
        $this->post->content = 'Test Content';
        $this->post->user_id = $user->id;
        $this->post->status = 'private';
        $response = $this->service->create($this->post, []);

        $response = $this->service->updateStatus($response->id, 'public');

        assertTrue($response->status === 'public');
    }

    /**
     * ステータスをdraftにするテスト
     *
     * @return void
     */
    public function test_update_post_status_to_draft()
    {
        $this->service = app()->make(PostService::class);
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);
        $this->post = new Post;
        $this->post->title = 'Test Post';
        $this->post->content = 'Test Content';
        $this->post->user_id = $user->id;
        $this->post->status = 'public';
        $response = $this->service->create($this->post, []);

        $response = $this->service->updateStatus($response->id, 'draft');

        assertTrue($response->status === 'draft');
    }
}
