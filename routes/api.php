<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

use App\Http\Controllers\Api\FrontendController;

Route::get('/carousels', [FrontendController::class, 'carousels']);
Route::get('/destinations', [FrontendController::class, 'destinations']);
Route::get('/destinations/{slug}', [FrontendController::class, 'destinationDetail']);
Route::get('/news', [FrontendController::class, 'news']);
Route::get('/news/{slug}', [FrontendController::class, 'newsDetail']);
Route::get('/social-media', [FrontendController::class, 'socialMedia']);
Route::get('/footer-settings', [FrontendController::class, 'footerSettings']);

Route::post('/tour-bookings', [FrontendController::class, 'storeBooking']);
Route::post('/contact-messages', [FrontendController::class, 'storeContact']);
Route::get('/chat-reply/{sessionToken}', [FrontendController::class, 'getChatReply']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
