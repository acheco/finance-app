<?php

namespace App\Http\Requests;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;

class StoreBudgetRequest extends FormRequest
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

  public function messages(): array
  {
    return [
      'currency_id.required' => 'The currency field is required.',
      'currency_id.exists' => 'The selected currency is invalid.',
      'category_id.required' => 'The category field is required.',
      'category_id.exists' => 'The selected category is invalid.',
    ];
  }

  protected function prepareForValidation(): void
  {
    // Calcular end_dte según period_type
    if ($this->period_type && $this->start_date) {
      $startDate = Carbon::parse($this->start_date);

      switch ($this->period_date) {
        case 'monthly':
          $this->merge(['end_date' => $startDate->copy()->endOfMonth()->format('Y-m-d')]);
          break;

        case 'yearly':
          $this->merge(['end_date' => $startDate->copy()->endOfYear()->format('Y-m-d')]);
          break;
      }

    }
  }
}
