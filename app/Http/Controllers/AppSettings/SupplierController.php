<?php

namespace App\Http\Controllers\AppSettings;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSupplierRequest;
use App\Http\Requests\UpdateSupplierRequest;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SupplierController extends Controller
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

    $suppliers = Supplier::query()
      ->where(function ($query) {
        $query->where('user_id', request()->user()->id)
          ->orWhereNull('user_id');
      })
      ->with('category')
      ->when(!empty($filters['search']), function ($query) use ($filters) {
        $query->where('name', 'ILIKE', '%' . $filters['search'] . '%');
      })->orderBy('name', $orderDirection)
      ->paginate(10)->onEachSide(1)
      ->withQueryString()
      ->through(fn($supplier) => [
        'id' => $supplier->id,
        'user_id' => $supplier->user_id,
        'category_id' => $supplier->category_id,
        'name' => $supplier->name,
        'logo' => $supplier->logo ?? '',
        'phone' => $supplier->phone ?? '',
        'email' => $supplier->email ?? '',
        'category' => $supplier->category->name ?? '',
        'is_active' => $supplier->is_active,
        'can' => [
          'delete' => request()->user()->can('delete', $supplier),
          'update' => request()->user()->can('update', $supplier),
        ]
      ]);

    return Inertia::render('app-settings/supplier', [
      'suppliers' => $suppliers,
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
  public function store(StoreSupplierRequest $request)
  {
    //
  }

  /**
   * Display the specified resource.
   */
  public function show(Supplier $supplier)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Supplier $supplier)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(UpdateSupplierRequest $request, Supplier $supplier)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Supplier $supplier)
  {
    //
  }
}
