<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBudgetRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    return [
      'category_id' => 'required|exists:categories,id',
      'name' => 'nullable|string|max:100',
      'budget_amount' => 'required|numeric|min:0.1',
      'currency_id' => 'required|exists:currencies,id',
      'period_type' => 'required|in:monthly,yearly,custom',
      'start_date' => 'required|date|before:end_date',
      'end_date' => 'required|date|after:start_date',
    ];
  }
}
