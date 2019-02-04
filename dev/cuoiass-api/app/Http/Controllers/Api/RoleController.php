<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Repositories\RoleRepo;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    /**
     * @var RoleRepo
     */
    private $roleRepo;

    /**
     * StaffController constructor.
     * @param RoleRepo $roleRepo
     */
    public function __construct(RoleRepo $roleRepo)
    {
        $this->roleRepo = $roleRepo;
    }

    /**
     * @param Request $request
     * @return \Illuminate\Database\Eloquent\Builder[]|\Illuminate\Database\Eloquent\Collection
     */
    public function index(Request $request)
    {

        $system_code = $request->get('system_code');
        //TODO:vendor
        $query = $this->roleRepo->model->newQuery();
        $query->select(['role_id', 'role_name'])
            ->where('system_code', $system_code);
        return $query->get();
    }

    /**
     * Display the specified resource.
     *
     * @param  Review $review
     * @return \Illuminate\Http\Response
     */
    public function show(Role $role){

        return $role;
    }

    /**
     * Create Account and return model
     *
     * @param StoreStaff $request
     * @return Staff
     */
    public function store(Request $request)
    {
    }

    /**
     * @param Role $role
     * @return void
     */
    public function edit(Role $role)
    {
        return $role;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateStaff $request
     * @param Staff $staff
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateStaff $request, Staff $staff)
    {
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Staff $staff
     * @return \Illuminate\Http\Response
     */
    public function destroy(Staff $staff)
    {
    }
}
