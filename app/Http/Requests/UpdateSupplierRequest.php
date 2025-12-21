<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateSupplierRequest extends FormRequest
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
      'category_id' => 'required|exists:categories,id',
      'email' => [
        'nullable',
        'string',
        'email',
        'max:255',
        Rule::unique('suppliers', 'email')
          ->where('user_id', $this->user()->id)
          ->ignore($this->supplier)
      ],
      'phone' => 'nullable|string|max:15',
      'address' => 'nullable|string|max:255',
      'logo' => 'nullable|string|max:255',
    ];
  }

  public function attributes(): array
  {
    return [
      'category_id' => 'category'
    ];
  }
}
