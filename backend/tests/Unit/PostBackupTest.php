<?php

namespace Tests\Unit;

use App\Enum\PostStatus;
use App\Models\Category;
use App\Models\PostBackups;
use App\Models\User;
use App\Services\PostBackupService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

use function PHPUnit\Framework\assertEquals;
use function PHPUnit\Framework\assertTrue;

class PostBackupTest extends TestCase
{
    use RefreshDatabase;

    protected PostBackups $post;
    protected PostBackupService $service;

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
        $this->service = app()->make(PostBackupService::class);

        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);

        $this->actingAs($user);
        $this->assertAuthenticated();
        $this->assertAuthenticatedAs($user);
        $this->post = new PostBackups;
        $this->post->title = 'Test PostBackups';
        $this->post->content = 'Test Content';
        $this->post->user_id = $user->id;


        $response = $this->service->create($this->post, []);
        //デフォルト時は非公開状態(仮)
        assertTrue($response->title === 'Test PostBackups');
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
        $this->service = app()->make(PostBackupService::class);

        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);

        $this->actingAs($user);
        $this->assertAuthenticated();
        $this->assertAuthenticatedAs($user);
        $this->post = new PostBackups;
        $this->post->title = 'Test PostBackups';
        $this->post->content = 'Test Content';
        $this->post->user_id = $user->id;
        $this->post->status = 'public';


        $response = $this->service->create($this->post, []);
        assertTrue($response->title === 'Test PostBackups');
        assertTrue($response->content === 'Test Content');
        assertTrue($response->user_id === $user->id);
        assertTrue($response->status === 'public');
    }

    /**
     * 作成した記事一覧を返すテスト(管理画面用)
     */

    public function test_get_all_posts_for_admin()
    {
        $this->service = app()->make(PostBackupService::class);

        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);

        $this->actingAs($user);
        $this->assertAuthenticated();
        $this->assertAuthenticatedAs($user);
        $this->post = new PostBackups;
        $this->post->title = 'Test PostBackups';
        $this->post->content = 'Test Content';
        $this->post->user_id = $user->id;
        $this->post->status = 'public';
        $this->service->create($this->post, []);

        $this->post = new PostBackups;
        $this->post->title = 'Test Post2';
        $this->post->content = 'Test Content2';
        $this->post->user_id = $user->id;
        $this->post->status = 'private';
        $this->service->create($this->post, []);

        $allPosts = $this->service->getAllPosts();

        //件数テスト
        assertTrue(count($allPosts) === 2);

        //中身のテスト
        $this->assertEquals('Test PostBackups', $allPosts[0]->title);
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
        $this->service = app()->make(PostBackupService::class);

        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);

        $this->actingAs($user);
        $this->assertAuthenticated();
        $this->assertAuthenticatedAs($user);
        $this->post = new PostBackups;
        $this->post->title = 'Test PostBackups';
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
        $this->service = app()->make(PostBackupService::class);

        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);

        $this->actingAs($user);
        $this->assertAuthenticated();
        $this->assertAuthenticatedAs($user);
        $this->post = new PostBackups;
        $this->post->title = 'Test PostBackups';
        $this->post->content = 'Test Content';
        $this->post->user_id = $user->id;
        $this->post->status = 'public';
        $response = $this->service->create($this->post, []);

        $response->title = 'Test PostBackups Updated';
        $postDetail = $this->service->updatePost($response);

        assertEquals($response->id, $postDetail->id);
        assertEquals($response->title, $postDetail->title);
    }
    /**
     * 記事を削除する
     */
    public function test_delete_post_detail()
    {
        $this->service = app()->make(PostBackupService::class);

        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);

        $this->actingAs($user);
        $this->assertAuthenticated();
        $this->assertAuthenticatedAs($user);
        $this->post = new PostBackups;
        $this->post->title = 'Test PostBackups';
        $this->post->content = 'Test Content';
        $this->post->user_id = $user->id;
        $this->post->status = 'public';
        $response = $this->service->create($this->post, []);

        $this->service->delete($response->id);

        $this->assertDatabaseMissing('post_backups', [
            'id' => $response->id,
        ]);
    }
}
