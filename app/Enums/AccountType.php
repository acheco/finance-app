<?php

namespace App\Enums;

enum AccountType: string
{
  case CASH = 'cash';
  case CHECKING = 'checking';
  case SAVINGS = 'savings';
  case CREDIT_CARD = 'credit_card';
  case INVESTMENT = 'investment';
  case LOAN = 'loan';

  public function label(): string
  {
    return match ($this) {
      self::CASH => 'Cash',
      self::CHECKING => 'Checking',
      self::SAVINGS => 'Savings',
      self::CREDIT_CARD => 'Credit Card',
      self::INVESTMENT => 'Investment',
      self::LOAN => 'Loan',
    };
  }

  public function isLiability(): bool
  {
    return in_array($this, [self::LOAN, self::CREDIT_CARD]);
  }

  public function icon(): string
  {
    return match ($this) {
      self::CASH => 'MoneyIcon',
      self::CHECKING => 'BankIcon',
      self::CREDIT_CARD, self::LOAN => 'CreditCardIcon',
      self::SAVINGS => 'PiggyBankIcon',
      self::INVESTMENT => 'ChartLineIcon',
    };
  }

  public function color(): string
  {
    return match ($this) {
      self::CASH => '#277C78',
      self::CHECKING => '#82C9D7',
      self::SAVINGS => '#F2CDAC',
      self::CREDIT_CARD => '#C94736',
      self::INVESTMENT => '#826CB0',
      self::LOAN => '#626070',
    };
  }

}
