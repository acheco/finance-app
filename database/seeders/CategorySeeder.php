<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $incomeTypeId = DB::table('transaction_types')->where('name', 'Income')->value('id');
    $expenseTypeId = DB::table('transaction_types')->where('name', 'Expense')->value('id');

    $categories = [
      // Income Categories
      [
        'name' => 'Salary',
        'color' => '#10B981',
        'icon' => 'briefcase',
        'transaction_type_id' => $incomeTypeId,
      ],
      [
        'name' => 'Freelance',
        'color' => '#06B6D4',
        'icon' => 'laptop',
        'transaction_type_id' => $incomeTypeId,
      ],
      [
        'name' => 'Bonuses',
        'color' => '#8B5CF6',
        'icon' => 'gift',
        'transaction_type_id' => $incomeTypeId,
      ],
      [
        'name' => 'Investments',
        'color' => '#F59E0B',
        'icon' => 'trending-up',
        'transaction_type_id' => $incomeTypeId,
      ],
      [
        'name' => 'Rental Income',
        'color' => '#14B8A6',
        'icon' => 'home',
        'transaction_type_id' => $incomeTypeId,
      ],
      [
        'name' => 'Sales',
        'color' => '#22C55E',
        'icon' => 'shopping-bag',
        'transaction_type_id' => $incomeTypeId,
      ],
      [
        'name' => 'Refunds',
        'color' => '#6366F1',
        'icon' => 'rotate-ccw',
        'transaction_type_id' => $incomeTypeId,
      ],
      [
        'name' => 'Gifts Received',
        'color' => '#EC4899',
        'icon' => 'gift',
        'transaction_type_id' => $incomeTypeId,
      ],
      [
        'name' => 'Other Income',
        'color' => '#64748B',
        'icon' => 'plus-circle',
        'transaction_type_id' => $incomeTypeId,
      ],

      // Essential Expenses
      [
        'name' => 'Housing',
        'color' => '#EF4444',
        'icon' => 'home',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Utilities',
        'color' => '#F97316',
        'icon' => 'zap',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Internet & Phone',
        'color' => '#3B82F6',
        'icon' => 'wifi',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Groceries',
        'color' => '#22C55E',
        'icon' => 'shopping-cart',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Public Transport',
        'color' => '#0EA5E9',
        'icon' => 'bus',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Gas & Fuel',
        'color' => '#DC2626',
        'icon' => 'fuel',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Vehicle Maintenance',
        'color' => '#7C3AED',
        'icon' => 'wrench',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Insurance',
        'color' => '#059669',
        'icon' => 'shield',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Healthcare',
        'color' => '#DC2626',
        'icon' => 'heart',
        'transaction_type_id' => $expenseTypeId,
      ],

      // Personal Expenses
      [
        'name' => 'Restaurants',
        'color' => '#F59E0B',
        'icon' => 'utensils',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Coffee & Snacks',
        'color' => '#92400E',
        'icon' => 'coffee',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Entertainment',
        'color' => '#EC4899',
        'icon' => 'film',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Subscriptions',
        'color' => '#8B5CF6',
        'icon' => 'repeat',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Clothing',
        'color' => '#A855F7',
        'icon' => 'shirt',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Personal Care',
        'color' => '#EC4899',
        'icon' => 'scissors',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Gym & Sports',
        'color' => '#EF4444',
        'icon' => 'dumbbell',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Hobbies',
        'color' => '#F59E0B',
        'icon' => 'palette',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Pets',
        'color' => '#FB923C',
        'icon' => 'paw-print',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Gifts',
        'color' => '#F472B6',
        'icon' => 'gift',
        'transaction_type_id' => $expenseTypeId,
      ],

      // Education
      [
        'name' => 'Education',
        'color' => '#3B82F6',
        'icon' => 'graduation-cap',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Books',
        'color' => '#6366F1',
        'icon' => 'book',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Courses',
        'color' => '#8B5CF6',
        'icon' => 'book-open',
        'transaction_type_id' => $expenseTypeId,
      ],

      // Family
      [
        'name' => 'Childcare',
        'color' => '#FBBF24',
        'icon' => 'baby',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Children Activities',
        'color' => '#34D399',
        'icon' => 'smile',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Family Support',
        'color' => '#60A5FA',
        'icon' => 'users',
        'transaction_type_id' => $expenseTypeId,
      ],

      // Financial
      [
        'name' => 'Loan Payments',
        'color' => '#DC2626',
        'icon' => 'credit-card',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Credit Card',
        'color' => '#991B1B',
        'icon' => 'credit-card',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Bank Fees',
        'color' => '#64748B',
        'icon' => 'dollar-sign',
        'transaction_type_id' => $expenseTypeId,
      ],

      // Savings & Investments
      [
        'name' => 'Emergency Fund',
        'color' => '#10B981',
        'icon' => 'shield',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Savings',
        'color' => '#059669',
        'icon' => 'piggy-bank',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Investments',
        'color' => '#0D9488',
        'icon' => 'trending-up',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Retirement',
        'color' => '#14B8A6',
        'icon' => 'umbrella',
        'transaction_type_id' => $expenseTypeId,
      ],

      // Other
      [
        'name' => 'Taxes',
        'color' => '#7C2D12',
        'icon' => 'file-text',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Donations',
        'color' => '#DB2777',
        'icon' => 'heart',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Home Repairs',
        'color' => '#EA580C',
        'icon' => 'hammer',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Travel',
        'color' => '#0EA5E9',
        'icon' => 'plane',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Shopping',
        'color' => '#A855F7',
        'icon' => 'shopping-bag',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Other Expenses',
        'color' => '#64748B',
        'icon' => 'more-horizontal',
        'transaction_type_id' => $expenseTypeId,
      ],
    ];

    foreach ($categories as $category) {
      DB::table('categories')->insert($category);
    }

  }
}
