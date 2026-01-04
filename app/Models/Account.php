<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Account extends Model
{
  /** @use HasFactory<\Database\Factories\AccountFactory> */
  use HasFactory;

  protected $fillable = [
    'name',
    'currency_id',
    'user_id',
    'balance',
    'account_type',
    'initial_balance',
    'color',
    'icon',
    'is_active',
  ];

  public function currency(): BelongsTo
  {
    return $this->belongsTo(Currency::class);
  }

  public function user(): BelongsTo
  {
    return $this->belongsTo(User::class);
  }

  public function transactions(): hasMany
  {
    return $this->hasMany(Transaction::class);
  }

  /**
   * Adjust the balance of the account
   */
  public function adjustBalance($amount, $transactionTypeId): static
  {
    if ($transactionTypeId == 1) {
      $this->decrement('balance', $amount);
    } elseif ($transactionTypeId == 2) {
      $this->increment('balance', $amount);
    }

    $this->refresh();

    return $this;

  }

}
