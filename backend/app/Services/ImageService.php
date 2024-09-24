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
     * @return string
     */
    public function upload(Request $request): string
    {
        try {
            $selected_photo = $request->file('image');
            if (is_null($selected_photo)) {
                return '';
            }
            $upload_path = 'public';
            $file_name = $selected_photo->getClientOriginalName();

            $uploaded_path = Storage::putFileAs($upload_path, $selected_photo, $file_name);
            $url = Storage::url($uploaded_path);
            return $url;
        } catch (Exception $err) {
            \Log::error($err->getMessage());
            return '';
        }
    }
}
