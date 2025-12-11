<?php

use App\Models\Currency;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('accounts', function (Blueprint $table) {
      $table->id();
      $table->foreignIdFor(User::class)->constrained()->cascadeOnDelete();
      $table->foreignIdFor(Currency::class)->constrained()->cascadeOnDelete();
      $table->string('name', 100);
      $table->string('account_type', 50);
      $table->decimal('balance', 15, 2)->default(0);
      $table->decimal('initial_balance', 15, 2)->default(0);
      $table->string('color', 7)->nullable();
      $table->string('icon', 50)->nullable();
      $table->boolean('is_active')->default(true);
      $table->timestamps();

      $table->index(['user_id', 'is_active']);
      $table->index('currency_id');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('accounts');
  }
};
