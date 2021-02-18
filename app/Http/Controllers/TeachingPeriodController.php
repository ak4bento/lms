<?php

namespace App\Http\Controllers;

use App\TeachingPeriod;
use Illuminate\Http\Request;

class TeachingPeriodController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {   
        if ($request->context == 'semester') {
            if (auth()->user()->detail) {
                $detail = json_decode(auth()->user()->detail);
                if (!isset($detail->teachingPeriod)) return [ "data" => []];

                $teachingPeriod = TeachingPeriod::where('name', $detail->teachingPeriod)->firstOrFail();
                return [ 
                    "data" => TeachingPeriod::where('id', '>=', $teachingPeriod->id)->get()
                ];
            } 
            
            return [ "data" => []];
        } else {
            $model = TeachingPeriod::orderBy('created_at','DESC');
            if (isset($_GET['all'])) {
                return $model->get();
            } else {
                if ($request->q) { $model->where('name', 'like', '%' . $request->q . '%'); }
                return $model->paginate(10);
            }
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $teachingPeriod = new TeachingPeriod;

        $teachingPeriod->name = $request->name;
        $teachingPeriod->starts_at = $request->startDate;
        $teachingPeriod->ends_at = $request->endDate;
        $teachingPeriod->created_by = auth()->user()->id;

        if($teachingPeriod->save()) {
            return [
                "teachingPeriod" => $teachingPeriod
            ];
        } else {
            return [
                "teachingPeriod" => []
            ];
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\TeachingPeriod  $teachingPeriod
     * @return \Illuminate\Http\Response
     */
    public function show(TeachingPeriod $teachingPeriod)
    {
        return [
            "data" => $teachingPeriod
        ];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\TeachingPeriod  $teachingPeriod
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, TeachingPeriod $teachingPeriod)
    {
        $teachingPeriod->name = $request->name;
        $teachingPeriod->starts_at = $request->startDate;
        $teachingPeriod->ends_at = $request->endDate;

        return [
            "data" => $teachingPeriod->save() ? $teachingPeriod : null
        ];
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\TeachingPeriod  $teachingPeriod
     * @return \Illuminate\Http\Response
     */
    public function destroy(TeachingPeriod $teachingPeriod)
    {
        //
    }
}
