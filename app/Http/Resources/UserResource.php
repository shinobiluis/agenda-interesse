<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        // return parent::toArray($request);
        return [
            'id' => $this->id,
            'nombre' => $this->name,
            'email' => $this->email,
            'creado' => $this->created_at->format('y-m-d'),
            'actualizado' => $this->updated_at->format('y-m-d'),
        ];
    }
    
    public function with( $request ){
        return [
            'status' => true
        ];
    }

}
