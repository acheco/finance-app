<?php

namespace Database\Factories;

use App\Models\Currency;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Account>
 */
class AccountFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition(): array
  {
    $initialBalance = $this->faker->randomFloat(2, 0, 10000);

    return [
      'user_id' => 1,
      'currency_id' => Currency::inRandomOrder()->first()?->id ?? 1,
      'name' => $this->faker->words(2, true),
      'account_type' => $this->faker->randomElement(['checking', 'savings', 'credit_card', 'cash', 'investment']),
      'balance' => $initialBalance,
      'initial_balance' => $initialBalance,
      'color' => $this->faker->hexColor(),
      'icon' => $this->faker->randomElement(['wallet', 'credit-card', 'piggy-bank', 'briefcase']),
      'is_active' => true,
    ];
  }
}
