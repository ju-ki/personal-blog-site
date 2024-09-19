<?php

namespace App\Services;

use Exception;
use Illuminate\Http\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageService
{
    /**
     * 画像をアップロードする処理
     *
     * @param Request $request
     * @return boolean
     */
    public function upload(Request $request): bool
    {
        try {
            $selected_photo = $request->file('image');
            $upload_path = 'images';
            $file_name = $request->file('image')->getClientOriginalName();

            $uploaded = Storage::putFileAs($upload_path, $selected_photo, $file_name, 'public');
            return (bool) $uploaded;
        } catch (Exception $err) {
            \Log::error($err->getMessage());
            return false;
        }
    }
}
