<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
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
            'alias_number' => 'required',
            'number' => 'required|min:10|max:10',
            'alias_direction' => 'required|min:5',
            'direction' => 'required|min:10',
            'postal_code' => 'required'
        ];
    }


    public function messages(){
        return [
            // Validacion de requeridos
            'name.required' => 'El :attribute es requerido',
            'email.required' => 'El :attribute es requerido',
            'alias_number.required' => 'El :attribute es requerido',
            'number.required' => 'El :attribute es requerido',
            'alias_direction.required' => 'El :attribute es requerido',
            'direction.required' => 'El :attribute es requerido',
            'postal_code.required' => 'El :attribute es requerido',
            // validacion de unico
            'email.unique' => 'El :attribute ya esta ocupado',
            //validacion para el numbero
            'number.min' => 'El :attribute debe tener como minimo 10 carecteres',
            'number.max' => 'El :attribute debe tener como maximo 10 carecteres',
            // validacion para alias minimo 5 carecteres
            'alias_number.min' => 'El :attribute debe tener como minimo 5 carecteres',
            'alias_direction.min' => 'El :attribute debe tener como minimo 10 carecteres',
            'direction.min' => 'La :attribute debe tener como minimo 10 carecteres',
        ];
    }

    public function attributes(){
        return [
            'name' => 'Nombre',
            'email' => 'Correo',
            'alias_number' => 'Alias de telefono',
            'number' => 'Numero telefonico',
            'alias_direction' => 'Alias de la dirección',
            'direction' => 'Direeción',
            'postal_code' => 'Codigo postal',
        ];
    }
}
