<?php

namespace App\Http\Controllers\AppSettings;

use App\Http\Controllers\Controller;
use App\Models\Currency;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CurrencyController extends Controller
{
  /**
   * Display a listing of the resource.
   */

  public function index()
  {

    $currencies = Currency::paginate(10);

    return Inertia::render('app-settings/currency', ['currencies' => $currencies]);
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
  public function store(Request $request)
  {
    //
  }

  /**
   * Display the specified resource.
   */
  public function show(Currency $currency)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Currency $currency)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Currency $currency)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Currency $currency)
  {
    //
  }
}
