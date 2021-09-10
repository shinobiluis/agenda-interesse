<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PhonePostRequest extends FormRequest
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
            'alias_number' => 'required',
            'number' => 'required|min:10|max:10',
            'user_id' => 'required'
        ];
    }

    public function messages(){
        return [
            // Validacion de requeridos
            'alias_number.required' => 'El :attribute es requerido',
            'number.required' => 'El :attribute es requerido',
            'user_id.required' => 'El :attribute es requerido',
            //validacion para el numbero
            'number.min' => 'El :attribute debe tener como minimo 10 carecteres',
            'number.max' => 'El :attribute debe tener como maximo 10 carecteres',
            // validacion para alias minimo 5 carecteres
        ];
    }

    public function attributes(){
        return [
            'alias_number' => 'Alias de telefono',
            'number' => 'Numero telefonico',
            'user_id' => 'Usuario',
        ];
    }
}
