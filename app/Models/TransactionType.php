<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TransactionType extends Model
{


  public function category(): hasMany
  {
    return $this->hasMany(Category::class);
  }
  
}
