<?php

namespace App\Http\Controllers\AppSettings;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSupplierRequest;
use App\Http\Requests\UpdateSupplierRequest;
use App\Models\Category;
use App\Models\Supplier;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Throwable;

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

    $categories = Category::select('id', 'name', 'icon')->where(function (Builder $query) {
      $query->where('user_id', request()->user()->id)
        ->where('is_active', true)
        ->orWhereNull('user_id');
    })->withCount('suppliers')->get();

    return Inertia::render('app-settings/supplier', [
      'suppliers' => $suppliers,
      'categories' => $categories,
      'filters' => $filters,
    ]);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(StoreSupplierRequest $request)
  {
    Gate::authorize('create', Supplier::class);

    try {
      $validated = $request->validated();
      $data = array_merge($validated, [
        'is_active' => true,
      ]);

      DB::transaction(function () use ($request, $data) {
        $request->user()->suppliers()->create($data);
      });

      return redirect()->back()->with('success', 'Supplier has been created.');

    } catch (Throwable $e) {
      Log::error('Error storing supplier: ' . $e->getMessage());
      return back()->withInput()->with('error', ' "Error creating supplier."');
    }
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(UpdateSupplierRequest $request, Supplier $supplier)
  {
    Gate::authorize('update', $supplier);

    try {
      $validated = $request->validated();
      $data = array_merge($validated, [
        'is_active' => true,
      ]);

      DB::transaction(function () use ($supplier, $data) {
        $supplier->update($data);
      });

      return redirect()->back()->with('success', 'Supplier has been updated.');

    } catch (Throwable $e) {
      Log::error('Error updating supplier: ' . $e->getMessage());
      return back()->withInput()->with('error', ' "Error updating supplier."');
    }
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Supplier $supplier)
  {
    Gate::authorize('delete', $supplier);
    $supplier->delete();
    return redirect()->back()->with('success', 'Supplier has been deleted.');
  }
}
