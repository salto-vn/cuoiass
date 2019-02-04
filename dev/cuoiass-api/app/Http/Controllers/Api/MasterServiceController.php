<?php

namespace App\Http\Controllers\api;

use App\Models\MasterService;
use App\Repositories\ServiceRepo;
use App\Utils\TableName;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class MasterServiceController extends Controller
{

    /**
     * @var RoleRepo
     */
    private $serviceRepo;

    /**
     * StaffController constructor.
     * @param RoleRepo $roleRepo
     */
    public function __construct(ServiceRepo $serviceRepo)
    {
        $this->serviceRepo = $serviceRepo;
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        $tblVendorSrvs = TableName::TBL_VENDOR_SERVICES;
        $tblMasterSrvs = TableName::TBL_MASTER_SERVICES;
        $vendor_id = $request->get('vendor_id');
        $query = $this->serviceRepo->model->newQuery()
            ->select("$tblMasterSrvs.service_code","$tblMasterSrvs.service_name");
        if(isset($vendor_id)){
            $query->join($tblVendorSrvs,"$tblMasterSrvs.service_code","=","$tblVendorSrvs.service_code")
            ->where("$tblVendorSrvs.vendor_id","=",$vendor_id)
            ->groupBy(["$tblMasterSrvs.service_code"]);
        }
        return response()->success($query->get());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
