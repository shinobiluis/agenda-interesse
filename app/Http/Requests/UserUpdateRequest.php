<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required',
            'email' => 'required|unique:users',
        ];
    }


    public function messages(){
        return [
            // Validacion de requeridos
            'name.required' => 'El :attribute es requerido',
            'email.required' => 'El :attribute es requerido',
            // validacion de unico
            'email.unique' => 'El :attribute ya esta ocupado',
        ];
    }

    public function attributes(){
        return [
            'name' => 'Nombre',
            'email' => 'Correo',
        ];
    }
}
