<?php

namespace App\Http\Controllers;

use App\Enums\BudgetPeriod;
use App\Http\Requests\StoreBudgetRequest;
use App\Http\Requests\UpdateBudgetRequest;
use App\Http\Resources\BudgetResource;
use App\Models\Budget;
use App\Models\Category;
use App\Models\Currency;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Throwable;

class BudgetController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $userId = Auth::id();

    $budgets = Budget::with(['category:id,name,icon,color', 'currency:id,name,symbol,code'])
      ->where('user_id', $userId)
      ->currentPeriod()
      ->active()
      ->get([
        'id', 'user_id', 'budget_amount', 'spent_amount', 'period_type', 'currency_id', 'category_id', 'start_date',
        'end_date'
      ]);

    Budget::loadRecentTransactionsForCollection($budgets);

    $categories = Category::where('user_id', $userId)
      ->orWhereNull('user_id')
      ->where('transaction_type_id', 1)
      ->get(['id', 'name', 'icon', 'color']);

    $currencies = Currency::where('is_active', true)
      ->where(function ($query) use ($userId) {
        $query->where('user_id', $userId)
          ->orWhereNull('user_id');
      })
      ->get(['id', 'name', 'symbol', 'code']);

    $budgetPeriod = collect(BudgetPeriod::cases())->map(fn($period) => [
      'value' => $period->value,
      'label' => $period->label()
    ]);

    return Inertia::render('budgets/index', [
      'budgets' => BudgetResource::collection($budgets)->resolve(),
      'categories' => $categories,
      'currencies' => $currencies,
      'budgetPeriod' => $budgetPeriod,
    ]);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(StoreBudgetRequest $request)
  {
    Gate::authorize('create', Budget::class);

    try {

      DB::transaction(function () use ($request) {
        $validated = $request->validated();
        $budget = $request->user()->budgets()->create($validated);

        $budget->recalculateSpentAmount()->save();

      });

      return redirect()->back()->with('success', 'Budget has been created.');

    } catch (Throwable $e) {
      Log::error('Error storing budget: ' . $e->getMessage());
      return back()->withInput()->with('error', "An error occurred while creating the budget, please try again.");
    }
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
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
    Gate::authorize('update', $budget);

    try {
      $validated = $request->validated();

      DB::transaction(function () use ($validated, $budget) {
        $budget->update($validated);
        $budget->recalculateSpentAmount()->save();
      });

      return redirect()->back()->with('success', 'Budget has been updated.');

    } catch (Throwable $e) {
      Log::error('Error updating budget: ' . $e->getMessage());
      return back()->withInput()->with('error', 'An error occurred while updating the budget.');
    }

  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Budget $budget)
  {
    Gate::authorize('delete', $budget);

    $budget->delete();

    return redirect()->back()->with('success', 'Budget has been deleted.');

  }
}
