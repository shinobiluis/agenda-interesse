<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
// importacion de Modelos
use App\Models\User;
// importamos las validaciones del request
use App\Http\Requests\UserRequest;
use App\Http\Requests\UserUpdateRequest;
// importamos las apiResource
use App\Http\Resources\UserResource; 
class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return UserResource::collection( User::all() );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(UserRequest $request)
    {
        // iniciamos el proceso de transacciones
        DB::beginTransaction();
        try {
            // insertamos en tablas
            $user = User::create( $request->only(['name','email']) );
            $user->direction()->create( $request->only(['alias_direction', 'direction','postal_code']) );
            $user->phone()->create( $request->only(['alias_number','number']) );
            // hacemos el commit
            DB::commit();
        } catch ( Throwable $e) {
            DB::rollback();
            return response()->json([
                'status' => 'false',
                'mensaje' => 'El registro fallo, no se inserto la información'
            ]);
        }
        // Consultamos toda la informacion del usuario para traer todos los telefonos y direccion
        $user = User::with([
            'direction',
            'phone'
        ])->find($user->id);
        // respondemos con el api resource del usuario
        return (new UserResource( $user ));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return new UserResource( $user );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UserUpdateRequest $request, User $user)
    {
        $user->update( $request->all() );
        return (new UserResource( $user ));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy( User $user )
    {
        DB::beginTransaction();
        try {
            // insertamos en tablas
            DB::table('phones')->where('user_id', '=', $user->id)->delete();
            DB::table('addresses')->where('user_id', '=', $user->id)->delete();
            DB::table('users')->where('id', '=', $user->id)->delete();
            // hacemos el commit
            DB::commit();
        } catch ( Throwable $e) {
            DB::rollback();
            return response()->json([
                'status' => 'false',
                'mensaje' => 'El registro fallo, no se inserto la información'
            ]);
        }
        return (new UserResource( $user ));
    }
}
