<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Staff\StoreStaff;
use App\Http\Requests\Staff\UpdateStaff;
use App\Http\Resources\StaffCollection;
use App\Models\Staff;
use App\Repositories\StaffRepo;
use Illuminate\Http\Request;

class StaffController extends Controller
{
    /**
     * @var StaffRepo
     */
    private $staffRepo;

    /**
     * StaffController constructor.
     * @param StaffRepo $staffRepo
     */
    public function __construct(StaffRepo $staffRepo)
    {
        $this->staffRepo = $staffRepo;
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $offset = (int)$request->get('offset', \Constant::MIN_OFFSET);
        $limit = (int)$request->get('limit', \Constant::MIN_LIMiT);
        $orderBy = $request->get('orderBy', null);
        $sortBy = $request->get('orderBy', \Constant::ORDER_BY_DESC);
        $search = $request->get('search');

        $data = $this->staffRepo->getList($search, $offset, $limit, $orderBy, $sortBy);

        return $this->toJsonPaginate($data);
    }

    /**
     * Create Account and return model
     *
     * @param StoreStaff $request
     * @return Staff
     */
    public function store(StoreStaff $request)
    {
        $input = $request->validated();

        $input['password'] = bcrypt($input['password']);
        $input['created_by'] = 'test@gmail.com';
        return $this->staffRepo->create($input);
    }

    /**
     * @param Staff $staff
     * @return Staff
     */
    public function edit(Staff $staff)
    {
        return $staff;
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
        $input = array_filter($request->validated());

        $input['updated_by'] = 'test@gmail.com';

        if (isset($input['password'])) {
            $input['password'] = bcrypt($input['password']);
        }

        return tap($staff)->update($input);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Staff $staff
     * @return \Illuminate\Http\Response
     */
    public function destroy(Staff $staff)
    {
        $staff->delete();

        return response()->json(['status' => 'OK']);
    }
}