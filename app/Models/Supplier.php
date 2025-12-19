<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Supplier extends Model
{
  /** @use HasFactory<\Database\Factories\SupplierFactory> */
  use HasFactory;

  protected $fillable = [
    'name',
    'category_id',
    'user_id',
    'is_active',
    'logo',
    'phone',
    'email',
    'address',
  ];

  public function category(): BelongsTo
  {
    return $this->belongsTo(Category::class);
  }
}
