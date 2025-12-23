<?php

use App\Models\Account;
use App\Models\Category;
use App\Models\Supplier;
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
    Schema::create('transactions', function (Blueprint $table) {
      $table->id();
      $table->foreignIdFor(User::class)->constrained()->cascadeOnDelete();
      $table->foreignIdFor(Account::class)->constrained()->cascadeOnDelete();
      $table->foreignIdFor(TransactionType::class)->constrained()->cascadeOnDelete();
      $table->foreignIdFor(Category::class)->nullable()->constrained()->cascadeOnDelete();
      $table->foreignIdFor(Supplier::class)->nullable()->constrained()->cascadeOnDelete();
      $table->decimal('amount', 15, 2);
      $table->string('description', 255)->nullable();
      $table->date('transaction_date');
      $table->string('sourceable_type', 255)->nullable();
      $table->unsignedBigInteger('sourceable_id')->nullable();
      $table->text('notes')->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('transactions');
  }
};
