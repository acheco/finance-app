<?php

namespace App\Http\Controllers\AppSettings;

use App\Enums\AccountType;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAccountRequest;
use App\Http\Requests\UpdateAccountRequest;
use App\Models\Account;
use App\Models\Currency;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Throwable;

class AccountController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(Request $request)
  {

    $filters = [
      'search' => trim($request->input('search', ''))
    ];

    $orderDirection = $request->input('orderDirection', 'asc');

    $accountTypes = collect(AccountType::cases())->map(fn($type) => [
      'value' => $type->value,
      'label' => $type->label(),
      'icon' => $type->icon(),
      'color' => $type->color()
    ]);

    $currencies = Currency::select('id', 'name', 'code', 'symbol')->where('is_active', true)->get();

    $accounts = Account::query()
      ->where('user_id', request()->user()->id)
      ->when(!empty($filters['search']), function ($query) use ($filters) {
        $query->where('name', 'ILIKE', '%' . $filters['search'] . '%');
      })
      ->orderBy('name', $orderDirection)
      ->with('currency')
      ->paginate(10)->withQueryString()
      ->through(fn($account) => [
        'id' => $account->id,
        'currency_id' => $account->currency_id,
        'currency' => $account->currency->name,
        'name' => $account->name,
        'account_type' => $account->account_type,
        'initial_balance' => $account->initial_balance,
        'balance' => $account->balance,
        'icon' => $account->icon,
        'color' => $account->color,
        'is_active' => $account->is_active,
        'can' => [
          'delete' => request()->user()->can('delete', $account),
          'update' => request()->user()->can('update', $account),
        ]
      ]);

    return Inertia::render('app-settings/account',
      [
        'accounts' => $accounts,
        'accountTypes' => $accountTypes,
        'currencies' => $currencies,
        'filters' => $filters,
        'orderDirection' => $orderDirection
      ]);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(StoreAccountRequest $request)
  {
    Gate::authorize('create', Account::class);

    try {

      $validated = $request->validated();
      $data = array_merge($validated, [
        'balance' => $validated['initial_balance'],
        'is_active' => true,
      ]);

      DB::transaction(function () use ($request, $data) {
        $request->user()->accounts()->create($data);
      });

      return redirect()->back()->with('success', 'Account has been created.');

    } catch (Throwable $e) {

      Log::error('Error storing account: ' . $e->getMessage());
      return back()->withInput()->with('error', ' "Error creating account."');
    }
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(UpdateAccountRequest $request, Account $account)
  {
    Gate::authorize('update', $account);

    try {
      $validated = $request->validated();

      DB::transaction(function () use ($validated, $account) {
        $account->update($validated);
      });

      return redirect()->back()->with('success', 'Account has been updated.');

    } catch (Throwable $e) {
      Log::error('Error updating account: ' . $e->getMessage());
      return back()->withInput()->with('error', ' "Error updating account."');
    }
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Account $account)
  {
    Gate::authorize('delete', $account);

    $account->delete();

    return redirect()->back()->with('success', 'Account has been deleted.');

  }
}
