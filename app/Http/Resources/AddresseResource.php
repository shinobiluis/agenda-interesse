<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AddresseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'alias_direccion' => $this->alias_direction,
            'direccion' => $this->direction,
            'codico_postal' => $this->postal_code,
            'creado' => $this->created_at->format('y-m-d'),
            'actualizado' => $this->updated_at->format('y-m-d'),
        ];
    }
}
