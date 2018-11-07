<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Account\StoreAccount;
use App\Http\Resources\StaffCollection;
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
     * @return AccountCollection test
     */
    public function index(Request $request)
    {
        $offset = (int)$request->get('offset', \Constant::MIN_OFFSET);
        $limit = (int)$request->get('limit', \Constant::MIN_LIMiT);
        $orderBy = $request->get('orderBy', null);
        $sortBy = $request->get('orderBy', \Constant::ORDER_BY_DESC);
        $search = $request->get('search');

        $model = $this->staffRepo->getList($search, $offset, $limit, $orderBy, $sortBy, ['account_id', 'name']);

        return (new StaffCollection($model));
    }

    /**
     * Create Account and return model
     *
     * @param StoreAccount $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StoreAccount $request)
    {
        $input = $request->validated();
        $input['password'] = bcrypt($input['password']);
        $input['created_by'] = 'test@gmail.com';

        $model = $this->accountRepo->create($input);

        return response()->json(['data' => $model], 200);
    }

    public function edit(Account $account)
    {
        return response()->json(['data' => $account], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param Account $account
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Account $account)
    {
        $input = array_filter($request->validated());

        $input['update_user'] = auth()->user()->email;

        if (isset($input['password'])) {
            $input['password'] = bcrypt($input['password']);
        }

        $account->update($input);

        return response()->json(['data' => $account], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Account $account
     * @return \Illuminate\Http\Response
     */
    public function destroy(Account $account)
    {
        $account->delete();

        return response()->json(null, 200);
    }
}
