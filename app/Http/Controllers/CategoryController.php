<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Category;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        if ($request->context == 'child') {
           return Category::where('parent_id', $request->parent_id)->get()->toJson();
        } elseif($request->context == 'parent') {
            return Category::whereNull('parent_id')->get()->toJson();
        } else {
            return Category::get()->toJson();
        }
    }
}
