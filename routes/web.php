<?php

use App\Http\Controllers\AppSettings\AccountController;
use App\Http\Controllers\AppSettings\CategoryController;
use App\Http\Controllers\AppSettings\CurrencyController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
  return Inertia::render('welcome', [
    'canRegister' => Features::enabled(Features::registration()),
  ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
  Route::get('dashboard', function () {
    return Inertia::render('dashboard');
  })->name('dashboard');

  Route::resource('app-settings/currencies', CurrencyController::class)->only(['index', 'update', 'store', 'destroy']);
  Route::resource('app-settings/accounts', AccountController::class)->only(['index', 'update', 'store', 'destroy']);
  Route::resource('app-settings/categories', CategoryController::class)->only(['index', 'update', 'store', 'destroy']);
});

require __DIR__ . '/settings.php';
