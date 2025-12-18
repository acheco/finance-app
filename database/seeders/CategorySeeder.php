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
        'color' => '#277C78',
        'icon' => 'BriefcaseIcon',
        'transaction_type_id' => $incomeTypeId,
      ],
      [
        'name' => 'Freelance',
        'color' => '#82C9D7',
        'icon' => 'LaptopIcon',
        'transaction_type_id' => $incomeTypeId,
      ],
      [
        'name' => 'Bonuses',
        'color' => '#826CB0',
        'icon' => 'GiftIcon',
        'transaction_type_id' => $incomeTypeId,
      ],
      [
        'name' => 'Investments',
        'color' => '#F2994A',
        'icon' => 'TrendUpIcon',
        'transaction_type_id' => $incomeTypeId,
      ],
      [
        'name' => 'Rental Income',
        'color' => '#597C7C',
        'icon' => 'HouseIcon',
        'transaction_type_id' => $incomeTypeId,
      ],
      [
        'name' => 'Sales',
        'color' => '#93C961',
        'icon' => 'ShoppingBagIcon',
        'transaction_type_id' => $incomeTypeId,
      ],
      [
        'name' => 'Refunds',
        'color' => '#6193C9',
        'icon' => 'ArrowCounterClockwiseIcon',
        'transaction_type_id' => $incomeTypeId,
      ],
      [
        'name' => 'Gifts Received',
        'color' => '#AF81BA',
        'icon' => 'GiftIcon',
        'transaction_type_id' => $incomeTypeId,
      ],
      [
        'name' => 'Other Income',
        'color' => '#616161',
        'icon' => 'PlusCircleIcon',
        'transaction_type_id' => $incomeTypeId,
      ],

      // Essential Expenses
      [
        'name' => 'Housing',
        'color' => '#C94736',
        'icon' => 'HouseIcon',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Utilities',
        'color' => '#F2994A',
        'icon' => 'LightningIcon',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Internet & Phone',
        'color' => '#457B9D',
        'icon' => 'WifiHighIcon',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Groceries',
        'color' => '#7F9161',
        'icon' => 'ShoppingCartIcon',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Public Transport',
        'color' => '#4ECDC4',
        'icon' => 'BusIcon',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Gas & Fuel',
        'color' => '#E63946',
        'icon' => 'GasPumpIcon',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Vehicle Maintenance',
        'color' => '#6A4C93',
        'icon' => 'WrenchIcon',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Insurance',
        'color' => '#2A9D8F',
        'icon' => 'ShieldIcon',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Healthcare',
        'color' => '#FF6B6B',
        'icon' => 'HeartIcon',
        'transaction_type_id' => $expenseTypeId,
      ],

      // Personal Expenses
      [
        'name' => 'Restaurants',
        'color' => '#F4A261',
        'icon' => 'ForkKnifeIcon',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Coffee & Snacks',
        'color' => '#93674F',
        'icon' => 'CoffeeIcon',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Entertainment',
        'color' => '#C96193',
        'icon' => 'FilmSlateIcon',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Subscriptions',
        'color' => '#936F93',
        'icon' => 'RepeatIcon',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Clothing',
        'color' => '#AA96DA',
        'icon' => 'TShirtIcon',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Personal Care',
        'color' => '#FCBAD3',
        'icon' => 'ScissorsIcon',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Gym & Sports',
        'color' => '#E76F51',
        'icon' => 'BarbellIcon',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Hobbies',
        'color' => '#E9C46A',
        'icon' => 'PaletteIcon',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Pets',
        'color' => '#FFD3B6',
        'icon' => 'PawPrintIcon',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Gifts',
        'color' => '#F38181',
        'icon' => 'GiftIcon',
        'transaction_type_id' => $expenseTypeId,
      ],

      // Education
      [
        'name' => 'Education',
        'color' => '#626070',
        'icon' => 'GraduationCapIcon',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Books',
        'color' => '#936193',
        'icon' => 'BookIcon',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Courses',
        'color' => '#826CB0',
        'icon' => 'BookOpenIcon',
        'transaction_type_id' => $expenseTypeId,
      ],

      // Family
      [
        'name' => 'Childcare',
        'color' => '#F2C94C',
        'icon' => 'BabyIcon',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Children Activities',
        'color' => '#A8E6CF',
        'icon' => 'SmileyIcon',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Family Support',
        'color' => '#A8DADC',
        'icon' => 'UsersIcon',
        'transaction_type_id' => $expenseTypeId,
      ],

      // Financial
      [
        'name' => 'Loan Payments',
        'color' => '#C94736',
        'icon' => 'CreditCardIcon',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Credit Card',
        'color' => '#934F6F',
        'icon' => 'CreditCardIcon',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Bank Fees',
        'color' => '#264653',
        'icon' => 'CurrencyDollarIcon',
        'transaction_type_id' => $expenseTypeId,
      ],

      // Savings & Investments
      [
        'name' => 'Emergency Fund',
        'color' => '#277C78',
        'icon' => 'ShieldIcon',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Savings',
        'color' => '#93C993',
        'icon' => 'PiggyBankIcon',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Investments',
        'color' => '#619393',
        'icon' => 'TrendUpIcon',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Retirement',
        'color' => '#61C9C9',
        'icon' => 'UmbrellaIcon',
        'transaction_type_id' => $expenseTypeId,
      ],

      // Other
      [
        'name' => 'Taxes',
        'color' => '#8B5A3C',
        'icon' => 'FileTextIcon',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Donations',
        'color' => '#FF8B94',
        'icon' => 'HeartIcon',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Home Repairs',
        'color' => '#C99361',
        'icon' => 'HammerIcon',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Travel',
        'color' => '#82C9D7',
        'icon' => 'AirplaneIcon',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Shopping',
        'color' => '#C961C9',
        'icon' => 'ShoppingBagIcon',
        'transaction_type_id' => $expenseTypeId,
      ],
      [
        'name' => 'Other Expenses',
        'color' => '#C9C9C9',
        'icon' => 'DotsThreeIcon',
        'transaction_type_id' => $expenseTypeId,
      ],
    ];

    foreach ($categories as $category) {
      DB::table('categories')->insert($category);
    }

  }
}
