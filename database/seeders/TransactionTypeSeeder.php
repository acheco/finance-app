<?php

namespace Database\Seeders;

use App\Models\transactionType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TransactionTypeSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $transactionTypes = [
      [
        'name' => 'Expense',
      ],
      [
        'name' => 'Income',
      ],
      [
        'name' => 'Transfer',
      ]
    ];

    foreach ($transactionTypes as $transactionType) {
      TransactionType::create($transactionType);
    }
  }
}
