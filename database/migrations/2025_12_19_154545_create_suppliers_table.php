<?php

use App\Models\Category;
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
    Schema::create('suppliers', function (Blueprint $table) {
      $table->id();
      $table->foreignIdFor(User::class)->nullable()->constrained()->cascadeOnDelete();
      $table->foreignIdFor(Category::class)->constrained()->cascadeOnDelete();
      $table->string('name', 255);
      $table->string('logo', 255)->nullable();
      $table->string('phone', 20)->nullable();
      $table->string('email', 100)->nullable();
      $table->text('address')->nullable();
      $table->boolean('is_active')->default(true);
      $table->timestamps();

      $table->unique(['user_id', 'name']);
      $table->index('name');
      $table->index('category_id');

    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('suppliers');
  }
};
