<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Services\ImageService;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    protected ImageService $imageService;

    public function __construct(ImageService $imageService)
    {
        $this->imageService = $imageService;
    }
    //
    public function upload(Request $request)
    {
        $uploaded = $this->imageService->upload($request);

        if (!empty($uploaded)) {
            return response()->json($uploaded, 200);
        } else {
            return response()->json('error', 500);
        }
    }
}
