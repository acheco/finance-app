<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BudgetResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */
  public function toArray(Request $request): array
  {
    $recentTransactions = $this->category && $this->category->relationLoaded('transactions')
      ? $this->category->transactions
      : collect();

    return [
      'id' => $this->id,
      'name' => $this->name,
      'category' => $this->category?->name,
      'color' => $this->category?->color,
      'currency' => $this->currency?->name,
      'budget_amount' => (float) $this->budget_amount,
      'spent_amount' => (float) $this->spent_amount,
      'period_type' => $this->period_type,
      'start_date' => $this->start_date->format('d-m-Y'),
      'end_date' => $this->end_date->format('d-m-Y'),
      'recent_transactions' => $recentTransactions->take(3)->map(fn($transaction) => [
        'id' => $transaction->id,
        'amount' => (float) $transaction->amount,
        'transaction_date' => $transaction->transaction_date->format('d-m-Y'),
        'supplier' => $transaction->supplier?->name ?? 'N/A',
        'icon' => $transaction->category?->icon ?? ''
      ]),
    ];
  }
}
