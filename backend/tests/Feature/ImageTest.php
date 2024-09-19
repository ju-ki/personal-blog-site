<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ImageTest extends TestCase
{
    use RefreshDatabase;
    /**
     * 画像アップロードAPIテスト
     */
    public function test_image_api(): void
    {
        Storage::fake('local');
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);

        $this->actingAs($user);
        $this->assertAuthenticated();
        $this->assertAuthenticatedAs($user);
        $response = $this->post('/api/image/upload', [
            'image'  => UploadedFile::fake()->image('photo.jpg')
        ]);

        $response->assertStatus(200);
    }
}
