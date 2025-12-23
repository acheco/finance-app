<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaction extends Model
{

  protected $fillable = [
    'user_id',
    'account_id',
    'transaction_type_id',
    'category_id',
    'supplier_id',
    'amount',
    'description',
    'transaction_date',
    'sourceable_type',
    'sourceable_id',
    'notes',
  ];

  public function user(): BelongsTo
  {
    return $this->belongsTo(User::class);
  }

  public function account(): BelongsTo
  {
    return $this->belongsTo(Account::class);
  }

  public function transactionType(): BelongsTo
  {
    return $this->belongsTo(TransactionType::class);
  }

  public function category(): BelongsTo
  {
    return $this->belongsTo(Category::class);
  }

  public function supplier(): BelongsTo
  {
    return $this->belongsTo(Supplier::class);
  }

}
