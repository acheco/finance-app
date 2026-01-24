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
    return [
      'id' => $this->id,
      'budget_amount' => $this->budget_amount,
      'spent_amount' => $this->spent_amount,
      'period_type' => $this->period_type,
      'start_date' => $this->start_date->format('Y-m-d'),
      'end_date' => $this->end_date->format('Y-m-d'),
      'category' => $this->whenLoaded('category'),
      'currency' => $this->whenLoaded('currency'),
      'recent_transactions' => $this->recent_transactions ?? collect([])
    ];
  }
}
