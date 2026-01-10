<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Currency extends Model
{

  protected $fillable = [
    'name',
    'code',
    'symbol',
    'is_active',
    'user_id',
  ];

  protected $casts = [
    'is_active' => 'boolean',
  ];

  public function user(): BelongsTo
  {
    return $this->belongsTo(User::class);
  }

  public function accounts(): hasMany
  {
    return $this->hasMany(Account::class);
  }

  public function transactions(): hasMany
  {
    return $this->hasMany(Transaction::class);
  }

  public function budgets(): hasMany
  {
    return $this->hasMany(Budget::class);
  }

}
