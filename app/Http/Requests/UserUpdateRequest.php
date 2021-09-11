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
            // este metodo valida si se el campo no cambia es decir si se entrega
            // el mismo correo permite que pase pero si se cambia el correo no puede 
            // repetirce con otro correo.
            'email' => 'required|unique:users,email,'.$this->route('user')->id,
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
