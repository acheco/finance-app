<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CurrencyStoreRequest extends FormRequest
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
      'symbol' => 'required|string|max:10',
      'code' => [
        'required',
        'string',
        'max:3',
        Rule::unique('currencies')->where(function ($query) {
          return $query->whereNull('user_id')
            ->orWhere('user_id', $this->user()->id);
        })
      ],
    ];
  }

  public function messages(): array
  {
    return [
      'code.unique' => 'You already have a currency with that code.',
    ];
  }
}
