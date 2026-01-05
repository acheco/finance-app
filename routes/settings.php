<?php

use App\Http\Controllers\AppSettings\AccountController;
use App\Http\Controllers\AppSettings\CategoryController;
use App\Http\Controllers\AppSettings\CurrencyController;
use App\Http\Controllers\AppSettings\SupplierController;
use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\TwoFactorAuthenticationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
  Route::redirect('settings', '/settings/profile');

  Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
  Route::patch('settings/profile', [ProfileController::class, 'update'])->name('profile.update');
  Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

  Route::get('settings/password', [PasswordController::class, 'edit'])->name('user-password.edit');

  Route::put('settings/password', [PasswordController::class, 'update'])
    ->middleware('throttle:6,1')
    ->name('user-password.update');

  Route::get('settings/appearance', function () {
    return Inertia::render('settings/appearance');
  })->name('appearance.edit');

  Route::get('settings/two-factor', [TwoFactorAuthenticationController::class, 'show'])
    ->name('two-factor.show');

  Route::redirect('app-settings', '/app-settings/accounts');
  Route::resource('app-settings/currencies', CurrencyController::class)->only(['index', 'update', 'store', 'destroy']);
  Route::resource('app-settings/accounts', AccountController::class)->only(['index', 'update', 'store', 'destroy']);
  Route::resource('app-settings/categories', CategoryController::class)->only(['index', 'update', 'store', 'destroy']);
  Route::resource('app-settings/suppliers', SupplierController::class)->only(['index', 'update', 'store', 'destroy']);
});
