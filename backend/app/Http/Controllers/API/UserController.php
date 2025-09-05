<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController;
use App\Http\Resources\UserResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $user = User::all();
        return $this->sendResponse(UserResource::collection($user), 'Usuário encontrado com sucesso.');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, User $user): JsonResponse
    {
        $input = $request->all();

        $validator = Validator::make(
            $input,
            [
                'name' => 'required',
                'email' => 'required|email|unique:users,email',
                'password' => 'same:confirm_password',
            ]
        );

        if ($validator->fails()) {
            return $this->sendError('Erro de validação', $validator->errors());
        }

        $input['name'] = $input['name'];
        $input['email'] = $input['email'];
        $input['password'] = bcrypt($input['password']);

        $user = User::create($input);

        return $this->sendResponse(new UserResource($user), 'Usuário criada com sucesso.');
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $user = User::findOrFail($id);

        if (is_null($user)) {
            return $this->sendError('Usuário não encontrado.');
        }

        return $this->sendResponse(new UserResource($user), 'Usuário encontrado com sucesso.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id): JsonResponse
    {
        $input = $request->all();

        $validator = Validator::make(
            $input,
            [
                'name' => 'required',
                'email' => 'required|email|unique:users,email,' . $id,
                'password' => 'same:confirm_password',
            ]
        );

        if ($validator->fails()) {
            return $this->sendError('Erro de validação', $validator->errors());
        }

        if (!empty($input['password'])) {
            $input['password'] = bcrypt($input['password']);
        } else {
            $input = Arr::except($input, array('password'));
        }

        $input['name'] = $input['name'];
        $input['email'] = $input['email'];
        User::findOrFail($id)->update($input);

        $user = User::findOrFail($id);

        return $this->sendResponse(new UserResource($user), 'Usuário atualizada com sucesso!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
        User::findOrFail($id)->delete();

        return $this->sendResponse([], 'Usuário excluído com sucesso!');
    }
}
