<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTransactionsRequest;
use App\Http\Requests\UpdateTransactionsRequest;
use App\Models\Account;
use App\Models\Category;
use App\Models\Supplier;
use App\Models\Transaction;
use App\Models\TransactionType;
use Gate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Throwable;

class TransactionController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(Request $request)
  {
    $user = $request->user();

    $filters = [
      'search' => trim($request->input('search', '')),
      'category_id' => $request->input('category_id', ''),
      'order_direction' => in_array($request->input('order_direction'),
        ['asc', 'desc']) ? $request->input('order_direction') : 'desc',
    ];

    $transactions = Transaction::query()
      ->where('user_id', $request->user()->id)
      ->with(['account', 'transactionType', 'category', 'supplier'])
      ->when($filters['search'], function ($query, $search) {
        $query->where(function ($q) use ($search) {
          $q->where('description', 'ilike', "%{$search}%")
            ->orWhereHas('category', function ($query) use ($search) {
              $query->where('name', 'ilike', "%{$search}%");
            })
            ->orWhereHas('supplier', function ($query) use ($search) {
              $query->where('name', 'ilike', "%{$search}%");
            });

          if (is_numeric($search)) {
            $q->orWhere('amount', '=', $search);
          }

        });
      })
      ->when($filters['category_id'], function ($query, $categoryId) {
        $query->where('category_id', $categoryId);
      })
      ->orderBy('created_at', $filters['order_direction'])
      ->paginate(10)
      ->withQueryString()
      ->through(fn($transaction) => [
        'id' => $transaction->id,
        'account_id' => $transaction->account_id,
        'transaction_type_id' => $transaction->transaction_type_id,
        'transaction_type' => $transaction->transactionType?->name,
        'category_id' => $transaction->category_id,
        'category' => $transaction->category?->name,
        'supplier_id' => $transaction->supplier_id,
        'supplier' => $transaction->supplier?->name,
        'amount' => $transaction->amount,
        'description' => $transaction->description,
        'icon' => $transaction->category?->icon,
        'color' => $transaction->category?->color,
        'transaction_date' => $transaction->transaction_date,
        'created_at' => $transaction->created_at->format('d-m-Y'),
        'can' => [
          'delete' => request()->user()->can('delete', $transaction),
          'update' => request()->user()->can('update', $transaction),
        ],
      ]);

    $usedCategories = Category::whereHas('transactions', function ($query) use ($user) {
      $query->where('user_id', $user->id);
    })->select(['id', 'name'])
      ->get();

    return Inertia::render('transactions/index', [
      'transactions' => $transactions,
      'usedCategories' => $usedCategories,

      'filters' => $filters,

    ]);
  }

  /**
   * Store a newly created resource in storage.
   * @throws Throwable
   */
  public function store(StoreTransactionsRequest $request)
  {
    Gate::authorize('create', Transaction::class);

    try {

      DB::transaction(function () use ($request) {

        $validated = $request->validated();
        $request->user()->transactions()->create($validated);

        $account = Account::find($validated['account_id']);
        $account->adjustBalance($validated['amount'], $validated['transaction_type_id']);

      });

      return redirect()->back()->with('success', 'Transaction has been created.');

    } catch (Throwable $e) {
      Log::error("Error storing transaction: " . $e->getMessage());
      return back()->withInput()->with('error',
        "An error occurred while creating the transaction, please try again.");
    }

  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    Gate::authorize('create', Transaction::class);

    $user = request()->user();

    $transactionTypes = TransactionType::select(['id', 'name'])->get();

    $categories = fn() => Category::where(function ($query) use ($user) {
      $query->where('user_id', $user->id)
        ->orWhereNull('user_id');
    })->where('is_active', true)
      ->select(['id', 'name', 'transaction_type_id'])->get();

    $suppliers = Supplier::whereHas('category', function ($query) use ($user) {
      $query->where(function ($q) use ($user) {
        $q->where('user_id', $user->id)
          ->orWhereNull('user_id');
      });
    })->select(['id', 'name', 'category_id'])->get();

    $accounts = Account::where('user_id', $user->id)
      ->where('is_active', true)
      ->select(['id', 'name', 'balance'])->get();

    return Inertia::render('transactions/create', [
      'transactionTypes' => $transactionTypes,
      'categories' => $categories,
      'suppliers' => $suppliers,
      'accounts' => $accounts,
    ]);
  }

  /**
   * Display the specified resource.
   */
  public function show(Transaction $transactions)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Transaction $transactions)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(UpdateTransactionsRequest $request, Transaction $transactions)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Transaction $transaction)
  {
    Gate::authorize('delete', $transaction);

    try {

      DB::transaction(function () use ($transaction) {
        $account = Account::find($transaction->account_id);

        if ($transaction->transaction_type_id == 1) {
          $account->increment('balance', $transaction->amount);
        } elseif ($transaction->transaction_type_id == 2) {
          $account->decrement('balance', $transaction->amount);
        }
        $transaction->delete();
      });

      return redirect()->back()->with('success', 'Transaction has been deleted.');

    } catch (Throwable $e) {
      Log::error("Error deleting transaction: " . $e->getMessage());
      return redirect()->back()->with('error', 'An error occurred while deleting the transaction.');
    }

  }
}
