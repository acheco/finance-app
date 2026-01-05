<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTransactionsRequest extends FormRequest
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
      'account_id' => 'required|exists:accounts,id',
      'amount' => 'required|numeric',
      'transaction_type_id' => 'required|integer|exists:transaction_types,id',
      'category_id' => [
        Rule::requiredIf(function () {
          return in_array($this->transaction_type_id, [1, 2]);
        })
      ],
      'supplier_id' => 'nullable|exists:suppliers,id',
      'transaction_date' => 'required|date',
      'notes' => 'nullable|string'
    ];
  }

  /**
   * Get the error messages for the defined validation rules.
   */
  public function attributes(): array
  {
    return [
      'account_id' => 'account',
      'amount' => 'amount',
      'transaction_type_id' => 'transaction type',
      'category_id' => 'category',
      'supplier_id' => 'supplier',
      'transaction_date' => 'transaction date',
      'notes' => 'note',
    ];
  }

  protected function prepareForValidation(): void
  {
    if (!$this->has('supplier_id')) {
      $this->merge(['supplier_id' => null]);
    }

    if ($this->supplier_id === '') {
      $this->merge(['supplier_id' => null]);
    }

  }
}
