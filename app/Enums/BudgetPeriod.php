<?php

namespace App\Enums;

enum BudgetPeriod: string
{
  case MONTHLY = 'monthly';
  case YEARLY = 'yearly';
  case CUSTOM = 'custom';

  public function label(): string
  {
    return match ($this) {
      self::MONTHLY => 'Monthly',
      self::YEARLY => 'Yearly',
      self::CUSTOM => 'Custom',
    };
  }

}


