<?php

namespace App\Http\Controllers\AppSettings;

use App\Http\Controllers\Controller;
use App\Http\Requests\CurrencyStoreRequest;
use App\Http\Requests\CurrencyUpdateRequest;
use App\Models\Currency;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class CurrencyController extends Controller
{
  /**
   * Display a listing of the resource.
   */

  public function index()
  {

    $currencies = Currency::orderBy('code', 'asc')->paginate(10)->through(fn($currency) => [
      'id' => $currency->id,
      'name' => $currency->name,
      'code' => $currency->code,
      'symbol' => $currency->symbol,
      'is_active' => $currency->is_active,
      'user_id' => $currency->user_id,
      'can' => [
        'delete' => request()->user()->can('delete', $currency),
        'update' => request()->user()->can('update', $currency),
      ]
    ]);

    return Inertia::render('app-settings/currency', ['currencies' => $currencies]);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(CurrencyStoreRequest $request)
  {
    Gate::authorize('create', Currency::class);
    $validated = $request->validated();

    try {
      DB::transaction(function () use ($validated, $request) {
        Currency::create([
          'name' => $validated['name'],
          'code' => $validated['code'],
          'symbol' => $validated['symbol'],
          'is_active' => true,
          'user_id' => $request->user()->id,
        ]);

      });

      return redirect('app-settings/currencies')->with('success', 'Currency has been created.');

    } catch (Exception $exception) {

      Log::error("Error storing currency: " . $exception->getMessage());

      return back()->withInput()->with('error', "Error creating currency.");
    }
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(CurrencyUpdateRequest $request, Currency $currency)
  {
    Gate::authorize('update', $currency);

    try {
      DB::transaction(function () use ($request, $currency) {
        $currency->update([
          'name' => $request->name,
          'code' => $request->code,
          'symbol' => $request->symbol,
        ]);
      });

      return to_route('currencies.index')->with('success', 'Currency has been updated.');

    } catch (\Throwable $e) {
      Log::error("Error updating currency: " . $e->getMessage());

      return back()
        ->withInput()
        ->with('error', "An error occurred while updating currency.");
    }
  }


  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Currency $currency)
  {

    Gate::authorize('delete', $currency);

    try {
      $currency->delete();

      return to_route('currencies.index')
        ->with('success', 'Currency has been deleted.');

    } catch (\Throwable $e) {
      Log::error("Error deleting currency: " . $e->getMessage());

      return back()
        ->with('error', 'An error occurred while deleting the currency.');
    }
  }
}
