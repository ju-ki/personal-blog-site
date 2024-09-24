<?php

namespace Tests\Unit\Services;

use Tests\TestCase;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use App\Services\ImageService;

class ImageTest extends TestCase
{
    protected ImageService $imageService;

    protected function setUp(): void
    {
        parent::setUp();
        $this->imageService = app()->make(ImageService::class);
    }

    /**
     * 画像アップロードが成功するテスト
     */
    public function test_upload_image(): void
    {
        Storage::fake('local');

        $file = UploadedFile::fake()->image('test_image.jpg');


        $request = new Request();
        $request->files->set('image', $file);

        $result = $this->imageService->upload($request);
        $this->assertEquals('/storage/test_image.jpg', $result);

        Storage::disk('local')->assertExists('public/' . $file->getClientOriginalName());
    }

    /**
     * 画像アップロードが失敗するテスト
     */
    // public function test_failed_to_upload_image(): void
    // {
    //     Storage::fake('local');

    //     Storage::shouldReceive('putFileAs')
    //         ->once()
    //         ->with('images', \Mockery::type(UploadedFile::class), 'test_image.jpg', 'local')
    //         ->andReturn(false);

    //     $file = UploadedFile::fake()->image('test_image.jpg');

    //     $request = new Request();
    //     $request->files->set('image', $file);

    //     $result = $this->imageService->upload($request);

    //     $this->assertFalse($result);
    // }
}
