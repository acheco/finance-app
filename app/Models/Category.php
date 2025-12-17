<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Category extends Model
{

  protected $fillable = [
    'name',
    'user_id',
    'transaction_type_id',
    'color',
    'icon',
    'is_active',
  ];

  public function transactionType(): BelongsTo
  {
    return $this->belongsTo(TransactionType::class);
  }

  public function user(): BelongsTo
  {
    return $this->belongsTo(User::class);
  }

}
