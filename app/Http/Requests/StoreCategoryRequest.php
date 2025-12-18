<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCategoryRequest extends FormRequest
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
      'name' => 'required|string|between:2,100',
      'transaction_type_id' => 'required|exists:transaction_types,id',
      'color' => 'required|string|max:7',
      'icon' => 'required|string|max:50',
    ];
  }

  public function attributes(): array
  {
    return [
      'name' => 'category name',
      'transaction_type_id' => 'category type',
    ];
  }
}
