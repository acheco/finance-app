<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

class User extends Authenticatable
{
  /** @use HasFactory<\Database\Factories\UserFactory> */
  use HasFactory, Notifiable, TwoFactorAuthenticatable;

  /**
   * The attributes that are mass assignable.
   *
   * @var list<string>
   */
  protected $fillable = [
    'name',
    'email',
    'password',
  ];

  /**
   * The attributes that should be hidden for serialization.
   *
   * @var list<string>
   */
  protected $hidden = [
    'password',
    'two_factor_secret',
    'two_factor_recovery_codes',
    'remember_token',
  ];

  /**
   * Relationships
   **/

  public function currencies(): hasMany
  {
    return $this->hasMany(Currency::class);
  }

  public function accounts(): hasMany
  {
    return $this->hasMany(Account::class);
  }

  public function categories(): hasMany
  {
    return $this->hasMany(Category::class);
  }

  public function suppliers(): hasMany
  {
    return $this->hasMany(Supplier::class);
  }

  public function transactions(): hasMany
  {
    return $this->hasMany(Transaction::class);
  }

  public function budgets(): hasMany
  {
    return $this->hasMany(Budget::class);
  }

  /**
   * Get the attributes that should be cast.
   *
   * @return array<string, string>
   */
  protected function casts(): array
  {
    return [
      'email_verified_at' => 'datetime',
      'password' => 'hashed',
      'two_factor_confirmed_at' => 'datetime',
    ];
  }

}
