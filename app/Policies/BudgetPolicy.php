<?php

namespace App\Policies;

use App\Models\Budget;
use App\Models\User;

class BudgetPolicy
{
  /**
   * Determine whether the user can create models.
   */
  public function create(User $user): bool
  {
    return true;
  }

  /**
   * Determine whether the user can update the model.
   */
  public function update(User $user, Budget $budget): bool
  {
    return $user->is($budget->user);
  }

  /**
   * Determine whether the user can delete the model.
   */
  public function delete(User $user, Budget $budget): bool
  {
    return $user->is($budget->user);
  }
}
