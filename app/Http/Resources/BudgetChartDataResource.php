<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BudgetChartDataResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */
  public function toArray(Request $request): array
  {
    $transactions = $this->category && $this->category->relationLoaded('transactions')
      ? $this->category->transactions
      : collect();

    return [
      'id' => $this->id,
      'name' => $this->category->name,
      'color' => $this->category->color,
      'budget_amount' => (float) $this->budget_amount,
      'spent_amount' => (float) $transactions->sum('amount'),
    ];

  }
}
