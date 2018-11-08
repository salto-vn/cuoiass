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
     * @return StaffCollection
     */
    public function index(Request $request)
    {
        $offset = (int)$request->get('offset', \Constant::MIN_OFFSET);
        $limit = (int)$request->get('limit', \Constant::MIN_LIMiT);
        $orderBy = $request->get('orderBy', null);
        $sortBy = $request->get('orderBy', \Constant::ORDER_BY_DESC);
        $search = $request->get('search');

        $model = $this->staffRepo->getList($search, $offset, $limit, $orderBy, $sortBy);

        return (new StaffCollection($model));
    }

    /**
     * Create Account and return model
     *
     * @param StoreStaff $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function store(StoreStaff $request)
    {
        $input = $request->validated();

        $input['password'] = bcrypt($input['password']);
        $input['created_by'] = 'test@gmail.com';
        $this->staffRepo->create($input);

        return response()->json(['status' => 'OK']);
    }

    public function edit(Staff $staff)
    {
        return response()->json(['data' => $staff], 200);
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

        $input['update_user'] = auth()->user()->email;

        if (isset($input['password'])) {
            $input['password'] = bcrypt($input['password']);
        }

        $staff->update($input);

        return response()->json(['data' => $staff], 200);
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
