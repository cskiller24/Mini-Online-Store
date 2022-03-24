<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        if(!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Email or Password does not exist'
            ], 401);
        }

        //Get user to create token
        $user = User::where(['email' => $credentials['email']])->first();
        $token = $user->createToken(time())->plainTextToken;

        return response()->json(['token' => $token], 200);
    }

    public function register(RegisterRequest $request)
    {
        $credentials = $request->validated();
        $credentials['password'] = Hash::make($credentials['password']);

        User::create($credentials);

        return response(1, 201);
    }

    public function logout()
    {
        \auth('web')->logout();
        return response(auth()->user()->tokens()->delete() === 9);
    }
}
