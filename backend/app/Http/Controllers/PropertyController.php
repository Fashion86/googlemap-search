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
//            SELECT *
//            FROM `residential`
//WHERE CONTAINS(
//                GEOMFROMTEXT('POLYGON((48.67864188399219 -118.2366536899816, 48.476028684176704 -117.83290613138784, 48.69677379733052 -117.72166955912222, 48.67864188399219 -118.2366536899816))'),
//                POINT(latitude, longitude));
            $users = DB::table('residential')->take(60)->get();
            return response()->json(['success'=>true, 'data'=>$users], 201);
        } catch(\Exception $e) {
            return response()->json(['error'=>$e], 500);
        }
    }

    public function getPostById($id) {


    }

    public function deletePost($id) {

    }
}
