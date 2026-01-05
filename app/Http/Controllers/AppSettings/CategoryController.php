<?php

namespace App\Http\Controllers\AppSettings;

use App\Enums\Color;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Throwable;

class CategoryController extends Controller
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

    $categories = Category::query()
      ->where(function ($query) {
        $query->where('user_id', request()->user()->id)
          ->orWhereNull('user_id');
      })
      ->when(!empty($filters['search']), function ($query) use ($filters) {
        $query->where('name', 'ILIKE', '%' . $filters['search'] . '%');
      })
      ->orderBy('name', $orderDirection)
      ->with('transactionType')
      ->paginate(10)
      ->withQueryString()
      ->through(fn($category) => [
        'id' => $category->id,
        'user_id' => $category->user_id,
        'transaction_type_id' => $category->transaction_type_id,
        'transaction_type' => $category->transactionType->name,
        'name' => $category->name,
        'color' => $category->color,
        'icon' => $category->icon,
        'is_active' => $category->is_active,
        'can' => [
          'delete' => request()->user()->can('delete', $category),
          'update' => request()->user()->can('update', $category),
        ]
      ]);

    $colors = collect(Color::cases())->map(fn($color) => [
      'value' => $color->value,
      'label' => $color->label(),
    ]);

    return Inertia::render('app-settings/category', [
      'categories' => $categories,
      'filters' => $filters,
      'colors' => $colors,
    ]);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(StoreCategoryRequest $request)
  {

    Gate::authorize('create', Category::class);

    try {
      $validated = $request->validated();

      $data = array_merge($validated, [
        'is_active' => true,
      ]);

      DB::transaction(function () use ($request, $data) {
        $request->user()->categories()->create($data);
      });

      return redirect()->back()->with('success', 'Category has been created.');

    } catch (Throwable $e) {
      Log::error('Error storing category: ' . $e->getMessage());
      return back()->withInput()->with('error', ' "Error creating category."');
    }
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(UpdateCategoryRequest $request, Category $category)
  {
    Gate::authorize('update', $category);

    $validated = $request->validated();
    $validated['is_active'] = true;

    try {
      DB::transaction(function () use ($validated, $category) {
        $category->update($validated);
      });

      return redirect()->back()->with('success', 'Category has been updated.');
    } catch (Throwable $e) {
      Log::error('Error updating category: ' . $e->getMessage());
      return back()->withInput()->with('error', ' "Error updating category."');
    }

  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Category $category)
  {

    Gate::authorize('delete', $category);

    $category->delete();

    return redirect()->back()->with('success', 'Category has been deleted.');

  }
}
