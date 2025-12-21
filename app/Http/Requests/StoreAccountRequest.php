<?php

namespace App\Http\Requests;

use App\AccountType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class StoreAccountRequest extends FormRequest
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
      'currency_id' => 'required|exists:currencies,id',
      'name' => 'required|string|max:100',
      'account_type' => [
        'required', new Enum(AccountType::class)
      ],
      'initial_balance' => 'required|numeric',
      'color' => 'nullable|string|max:7',
      'icon' => 'nullable|string|max:50',
    ];
  }

  public function attributes(): array
  {
    return [
      'currency_id' => 'currency',
      'initial_balance' => 'initial balance',
    ];
  }
}
