<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Budget extends Model
{

  protected $fillable = [
    'name',
    'category_id',
    'currency_id',
    'budget_amount',
    'spent_amount',
    'period_type',
    'start_date',
    'end_date',
    'is_active',
  ];

  protected $casts = [
    'budget_amount' => 'decimal:2',
    'spent_amount' => 'decimal:2',
    'start_date' => 'date',
    'end_date' => 'date',
    'is_active' => 'boolean',
  ];

  /**
   * @param $budgets
   * @return void
   */
  public static function loadRecentTransactionsForCollection($budgets): void
  {
    if ($budgets->isEmpty()) {
      return;
    }

    $userId = $budgets->first()->user_id;
    $categoryIds = $budgets->pluck('category_id')->unique();
    $minDate = $budgets->min('start_date');
    $maxDate = $budgets->max('end_date');

    $transactions = Transaction::query()
      ->with(['supplier:id,name,logo'])
      ->where('user_id', $userId)
      ->where('transaction_type_id', 1) // Expense
      ->whereIn('category_id', $categoryIds)
      ->whereBetween('transaction_date', [$minDate, $maxDate])
      ->latest('transaction_date')
      ->latest('id')
      ->get(['id', 'amount', 'transaction_date', 'supplier_id', 'category_id'])
      ->groupBy('category_id');

    $budgets->each(function ($budget) use ($transactions) {
      $period = $budget->getCurrentPeriodDate();

      if (!$period) {
        $budget->recent_transactions = collect();
        return;
      }

      $categoryTransactions = $transactions->get($budget->category_id, collect());

      $budget->recent_transactions = $categoryTransactions
        ->filter(function ($transaction) use ($period) {
          $transactionDate = Carbon::parse($transaction->transaction_date);
          return $transactionDate->between($period['start'], $period['end']);
        })
        ->take(3)
        ->values();
    });
  }

  public function getCurrentPeriodDate(): ?array
  {
    $now = Carbon::now();

    if ($now->lt($this->start_date) || $now->gt($this->end_date)) {
      return null;
    }

    return match ($this->period_type) {
      'monthly' => [
        'start' => $now->copy()->startOfMonth(),
        'end' => $now->copy()->endOfMonth(),
      ],
      'yearly' => [
        'start' => $now->copy()->startOfYear(),
        'end' => $now->copy()->endOfYear(),
      ],
      'custom' => [
        'start' => $this->start_date,
        'end' => $this->end_date
      ],
      default => null,
    };

  }

  public function category(): BelongsTo
  {
    return $this->belongsTo(Category::class);
  }

  public function currency(): BelongsTo
  {
    return $this->belongsTo(Currency::class);
  }

  public function transactions(): hasMany
  {
    return $this->hasMany(Transaction::class);
  }

  public function user(): BelongsTo
  {
    return $this->belongsTo(User::class);
  }

  public function recalculateSpentAmount(): static
  {
    $period = $this->getCurrentPeriodDate();

    if (!$period) {
      $this->spent_amount = 0;
      return $this;
    }

    $this->spent_amount = Transaction::where('user_id', $this->user_id)
      ->where('category_id', $this->category_id)
      ->whereHas('transactionType', function ($query) {
        $query->where('id', 1); // Expense
      })
      ->whereBetween('transaction_date', [
        $period['start']->format('Y-m-d'),
        $period['end']->format('Y-m-d')
      ])
      ->sum('amount');

    return $this;

  }

  public function scopeActive($query)
  {
    return $query->where('is_active', true);
  }

  public function scopeCurrentPeriod($query)
  {
    $now = Carbon::now();
    return $query->where('start_date', '<=', $now)->where('end_date', '>=', $now);
  }

  public function scopeWithRecentTransactions(Builder $query): Builder
  {
    return $query->with(['category', 'currency']);
  }

  /**
   * @return $this
   */
  public function loadRecentTransactions(): self
  {
    $period = $this->getCurrentPeriodDate();

    if (!$period) {
      $this->recent_transactions = collect([]);
      return $this;
    }

    $this->recent_transactions = Transaction::query()
      ->where('user_id', $this->user_id)
      ->where('category_id', $this->category_id)
      ->where('transaction_type_id', 1) // Expense
      ->whereBetween('transaction_date', [
        $period['start']->format('Y-m-d'),
        $period['end']->format('Y-m-d')
      ])
      ->latest('transaction_date')
      ->latest('id')
      ->take(3)
      ->get(['id', 'amount', 'transaction_date', 'supplier_id', 'category_id']);

    return $this;
  }


}
