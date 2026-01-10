<?php

use App\Models\Category;
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
    Schema::create('budgets', function (Blueprint $table) {
      $table->id();
      $table->foreignIdFor(User::class)->constrained()->cascadeOnDelete();
      $table->foreignIdFor(Category::class)->constrained()->cascadeOnDelete();
      $table->foreignIdFor(Currency::class)->constrained()->nullOnDelete();
      $table->string('name', 100);
      $table->decimal('budget_amount', 15, 2)->default(0);
      $table->decimal('spent_amount', 15, 2)->default(0);
      $table->enum('period_type', ['monthly', 'yearly', 'custom'])->default('monthly');
      $table->date('start_date')->default(now());
      $table->date('end_date');
      $table->boolean('is_active')->default(true);
      $table->timestamps();

      $table->index(['user_id', 'is_active', 'start_date']);
      $table->index('category_id');
      $table->index(['user_id', 'category_id', 'start_date']);

    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('budgets');
  }
};
