<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBudgetRequest;
use App\Http\Requests\UpdateBudgetRequest;
use App\Http\Resources\BudgetResource;
use App\Models\Budget;
use Inertia\Inertia;

class BudgetController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $budgets = Budget::query()
      ->where('user_id', auth()->id())
      ->with([
        'currency', 'category.transactions' => function ($query) {
          $query->where('user_id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->limit(3);
        }
      ])
      ->orderBy('created_at', 'desc')
      ->get();

    return Inertia::render('budgets/index', [
      'budgets' => BudgetResource::collection($budgets)->resolve(),
    ]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    //
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(StoreBudgetRequest $request)
  {
    //
  }

  /**
   * Display the specified resource.
   */
  public function show(Budget $budget)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Budget $budget)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(UpdateBudgetRequest $request, Budget $budget)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Budget $budget)
  {
    //
  }
}
