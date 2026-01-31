<?php

namespace App\Observers;

use App\Models\Budget;
use App\Models\Transaction;

class TransactionObserver
{
  /**
   * Handle the Transaction "created" event.
   */
  public function created(Transaction $transaction): void
  {
    $this->updateBudgetSpentAmount(
      $transaction->user_id,
      $transaction->category_id,
      $transaction->transaction_date,
      $transaction->amount,
      'add'
    );
  }

  private function updateBudgetSpentAmount($userId, $categoryId, $date, $amount, $operation): void
  {
    if (!$categoryId) {
      return;
    }

    $budget = Budget::where('user_id', $userId)
      ->where('category_id', $categoryId)
      ->where('is_active', true)
      ->where('start_date', '<=', $date)
      ->where('end_date', '>=', $date)
      ->first();

    if ($budget) {
      if ($operation === 'add') {
        $budget->spent_amount += $amount;
      } else {
        $budget->spent_amount -= $amount;
      }

      $budget->saveQuietly();
    }
  }

  /**
   * Handle the Transaction "updated" event.
   */
  public function updated(Transaction $transaction): void
  {
    $this->updateBudgetSpentAmount(
      $transaction->getOriginal('user_id'),
      $transaction->getOriginal('category_id'),
      $transaction->getOriginal('transaction_date'),
      $transaction->getOriginal('amount'),
      'subtract'
    );

    $this->updateBudgetSpentAmount(
      $transaction->user_id,
      $transaction->category_id,
      $transaction->transaction_date,
      $transaction->amount,
      'add'
    );

  }

  /**
   * Handle the Transaction "deleted" event.
   */
  public function deleted(Transaction $transaction): void
  {
    $this->updateBudgetSpentAmount(
      $transaction->user_id,
      $transaction->category_id,
      $transaction->transaction_date,
      $transaction->amount,
      'subtract'
    );

  }

}
