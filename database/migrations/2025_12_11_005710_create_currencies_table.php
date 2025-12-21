<?php

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
    Schema::create('currencies', function (Blueprint $table) {
      $table->id();
      $table->foreignIdFor(User::class)->nullable()->constrained()->cascadeOnDelete();
      $table->string('code', 3);
      $table->string('name', 100);
      $table->string('symbol', 10);
      $table->boolean('is_active')->default(true);
      $table->timestamps();

      $table->unique(['user_id', 'code']);
      $table->index(['user_id', 'is_active']);
      $table->index('is_active');

    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('currencies');
  }
};
