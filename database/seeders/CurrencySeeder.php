<?php

namespace Database\Seeders;

use App\Models\Currency;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CurrencySeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $systemCurrencies = [
      [
        'user_id' => null,
        'code' => 'USD',
        'name' => 'US Dollar',
        'symbol' => '$',
        'is_active' => true,
      ],
      [
        'user_id' => null,
        'code' => 'EUR',
        'name' => 'Euro',
        'symbol' => '€',
        'is_active' => true,
      ],
      [
        'user_id' => null,
        'code' => 'GBP',
        'name' => 'British Pound',
        'symbol' => '£',
        'is_active' => true,
      ],
      [
        'user_id' => null,
        'code' => 'JPY',
        'name' => 'Japanese Yen',
        'symbol' => '¥',
        'is_active' => true,
      ],
      [
        'user_id' => null,
        'code' => 'DOP',
        'name' => 'Dominican Peso',
        'symbol' => 'RD$',
        'is_active' => true,
      ],
      [
        'user_id' => null,
        'code' => 'MXN',
        'name' => 'Mexican Peso',
        'symbol' => 'MX$',
        'is_active' => true,
      ],
      [
        'user_id' => null,
        'code' => 'CAD',
        'name' => 'Canadian Dollar',
        'symbol' => 'C$',
        'is_active' => true,
      ],
      [
        'user_id' => null,
        'code' => 'AUD',
        'name' => 'Australian Dollar',
        'symbol' => 'A$',
        'is_active' => true,
      ],
      [
        'user_id' => null,
        'code' => 'CHF',
        'name' => 'Swiss Franc',
        'symbol' => 'CHF',
        'is_active' => true,
      ],
      [
        'user_id' => null,
        'code' => 'CNY',
        'name' => 'Chinese Yuan',
        'symbol' => '¥',
        'is_active' => true,
      ],
      [
        'user_id' => null,
        'code' => 'BRL',
        'name' => 'Brazilian Real',
        'symbol' => 'R$',
        'is_active' => true,
      ],
      [
        'user_id' => null,
        'code' => 'INR',
        'name' => 'Indian Rupee',
        'symbol' => '₹',
        'is_active' => true,
      ],
      [
        'user_id' => null,
        'code' => 'KRW',
        'name' => 'South Korean Won',
        'symbol' => '₩',
        'is_active' => true,
      ],
      [
        'user_id' => null,
        'code' => 'RUB',
        'name' => 'Russian Ruble',
        'symbol' => '₽',
        'is_active' => true,
      ],
      [
        'user_id' => null,
        'code' => 'ARS',
        'name' => 'Argentine Peso',
        'symbol' => '$',
        'is_active' => true,
      ],
      [
        'user_id' => null,
        'code' => 'COP',
        'name' => 'Colombian Peso',
        'symbol' => '$',
        'is_active' => true,
      ],
      [
        'user_id' => null,
        'code' => 'CLP',
        'name' => 'Chilean Peso',
        'symbol' => '$',
        'is_active' => true,
      ],
      [
        'user_id' => null,
        'code' => 'PEN',
        'name' => 'Peruvian Sol',
        'symbol' => 'S/',
        'is_active' => true,
      ],
      [
        'user_id' => null,
        'code' => 'SEK',
        'name' => 'Swedish Krona',
        'symbol' => 'kr',
        'is_active' => true,
      ],
      [
        'user_id' => null,
        'code' => 'NOK',
        'name' => 'Norwegian Krone',
        'symbol' => 'kr',
        'is_active' => true,
      ],
    ];

    foreach ($systemCurrencies as $currency) {
      Currency::updateOrCreate(
        [
          'user_id' => $currency['user_id'],
          'code' => $currency['code']
        ],
        $currency
      );
    }
  }
}
