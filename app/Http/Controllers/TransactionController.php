<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTransactionsRequest;
use App\Http\Requests\UpdateTransactionsRequest;
use App\Models\Category;
use App\Models\Transaction;
use Gate;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(Request $request)
  {
    $filters = [
      'search' => trim($request->input('search', '')),
      'category_id' => $request->input('category_id', ''),
      'order_direction' => $request->input('order_direction', 'desc'),
    ];

    $transactions = Transaction::query()
      ->where('user_id', $request->user()->id)
      ->with(['account', 'transactionType', 'category', 'supplier'])
      ->when($filters['search'], function ($query, $search) {
        $query->where(function ($q) use ($search) {
          $q->where('description', 'ilike', "%{$search}%")
            ->orWhere('amount', 'ilike', "%{$search}%")
            ->orWhereHas('category', function ($query) use ($search) {
              $query->where('name', 'ilike', "%{$search}%");
            })
            ->orWhereHas('supplier', function ($query) use ($search) {
              $query->where('name', 'ilike', "%{$search}%");
            });
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
        'transaction_type' => $transaction->transactionType->name,
        'category_id' => $transaction->category_id,
        'category' => $transaction->category->name,
        'supplier_id' => $transaction->supplier_id,
        'supplier' => $transaction->supplier->name,
        'amount' => $transaction->amount,
        'description' => $transaction->description,
        'icon' => $transaction->category->icon,
        'color' => $transaction->category->color,
        'transaction_date' => $transaction->transaction_date,
        'created_at' => $transaction->created_at->format('d-m-Y'),
      ]);

    $categories = Category::has('transactions')
      ->select('id', 'name')
      ->get();

    return Inertia::render('transactions', [
      'transactions' => $transactions,
      'categories' => $categories,
      'filters' => $filters,
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
  public function store(StoreTransactionsRequest $request)
  {
    //
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
  public function destroy(Transaction $transactions)
  {
    Gate::authorize('delete', $transactions);
  }
}
