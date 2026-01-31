<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Number;

class BudgetResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */
  public function toArray(Request $request): array
  {

    $currency = $this->whenLoaded('currency');

    return [
      'id' => $this->id,
      'budget_amount' => (int) $this->budget_amount,
      'formatedBudgetAmount' => Number::currency($this->budget_amount, $currency->code),
      'spent_amount' => (int) $this->spent_amount,
      'formatedSpentAmount' => Number::currency($this->spent_amount, $currency->code),
      'remaining_amount' => Number::currency($this->budget_amount - $this->spent_amount, $currency->code),
      'period_type' => $this->period_type,
      'start_date' => $this->start_date->format('Y-m-d'),
      'end_date' => $this->end_date->format('Y-m-d'),
      'category' => $this->whenLoaded('category'),
      'currency' => $this->whenLoaded('currency'),
      'recent_transactions' => $this->recent_transactions ?? collect([])
    ];
  }
}
