<?php

namespace App\Models;

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


}
