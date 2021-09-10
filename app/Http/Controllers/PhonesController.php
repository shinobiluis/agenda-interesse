<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
// importacion de Modelos
use App\Models\Phone;
// importamos las validaciones del request
use App\Http\Requests\PhonePostRequest;
use App\Http\Requests\PhoneUpdateRequest;
// importamos las apiResource
use App\Http\Resources\PhoneResource; 
class PhonesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PhonePostRequest $request)
    {
       return new PhoneResource( Phone::create( $request->all() ) );
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show( Phone $phone )
    {
        return new PhoneResource( $phone );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update( PhoneUpdateRequest $request, Phone $phone)
    {
        $phone->update( $request->all() );
        return (new PhoneResource( $phone ));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy( Phone $phone )
    {
        $phone->delete();
        return ( new PhoneResource( $phone ) );
    }
}
