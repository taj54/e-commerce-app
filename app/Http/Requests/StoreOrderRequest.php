<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
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
            'customer.fullName' => 'required|string',
            'customer.email' => 'required|email',
            'customer.phone' => 'required|string',
            'customer.address' => 'required|string',
            'customer.city' => 'required|string',
            'customer.state' => 'required|string',
            'customer.zip' => 'required|string',
            'items' => 'required|array',
            'items.*.id' => 'required|integer|exists:products,id',
            'items.*.name' => 'required|string',
            'items.*.variant' => 'required|string',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric',
            'total' => 'required|numeric',
        ];
    }
}
