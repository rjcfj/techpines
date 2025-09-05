<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\RegisterController;
use App\Http\Controllers\API\MusicaController;
use App\Http\Controllers\API\UserController;

Route::controller(RegisterController::class)->group(function () {
    Route::post('register', 'register');
    Route::post('login', 'login');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/musicas/top-5', [MusicaController::class, 'indexTop5']);
    Route::post('extrair-video-id', [MusicaController::class, 'fetchYouTubeInfo']);
    Route::resource('musica', MusicaController::class);
    Route::resource('usuario', UserController::class);
});
