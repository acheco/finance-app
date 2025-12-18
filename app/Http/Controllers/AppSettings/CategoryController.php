<?php

namespace App\Http\Controllers\AppSettings;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

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

    return Inertia::render('app-settings/category', [
      'categories' => $categories,
      'filters' => $filters,
    ]);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(StoreCategoryRequest $request)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(UpdateCategoryRequest $request, Category $category)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Category $category)
  {
    //
  }
}
