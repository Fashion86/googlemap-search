<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use JWTFactory;
use JWTAuth;
use Symfony\Component\HttpFoundation\Exception\RequestExceptionInterface;
use Validator;
use Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


class PropertyController extends Controller
{

    public function getproperties(Request $request) {
        try {
            $properties = DB::table('residential');
            return response()->json(['success'=>true, 'data'=>'gjhfghjfghj'], 201);
        } catch(\Exception $e) {
            return response()->json(['error'=>$e], 500);
        }

    }

    public function getPostById($id) {


    }

    public function deletePost($id) {

    }
}
