<?php

namespace Database\Factories;

use App\Enum\PostStatus;
use App\Models\PostBackups;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class PostBackupsFactory extends Factory
{
    protected $model = PostBackups::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(5),
            'content' => fake()->paragraph(10),
            'status' => PostStatus::getStatusName(PostStatus::Draft),
            'user_id' => UserFactory::new()->create()->id,
        ];
    }
}
