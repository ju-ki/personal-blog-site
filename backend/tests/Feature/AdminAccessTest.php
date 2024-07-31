<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminAccessTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     */
    public function test_unauthenticated_user_redirected_from_admin(): void
    {
        $response = $this->getJson('/api/admin');
        $response->assertStatus(401);
    }


    public function test_authenticated_user_can_access_admin(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user, 'sanctum');

        $response = $this->getJson('/api/admin');

        $response->assertStatus(200);
    }
}
