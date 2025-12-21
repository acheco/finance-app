<?php

use App\Models\TransactionType;
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
    Schema::create('categories', function (Blueprint $table) {
      $table->id();
      $table->foreignIdFor(User::class)->nullable()->constrained()->cascadeOnDelete();
      $table->foreignIdFor(TransactionType::class)->nullable()->constrained()->cascadeOnDelete();
      $table->string('name', 100);
      $table->string('color', 7)->nullable();
      $table->string('icon', 50)->nullable();
      $table->boolean('is_active')->default(true);
      $table->timestamps();

      $table->unique(['user_id', 'name']);
      $table->index(['user_id', 'is_active']);

    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('categories');
  }
};
