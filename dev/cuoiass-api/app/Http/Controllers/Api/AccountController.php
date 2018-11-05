<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Account\StoreAccount;
use App\Http\Resources\AccountCollection;
use App\Models\Account;
use App\Repositories\AccountRepo;
use Illuminate\Http\Request;

class AccountController extends Controller
{
    /**
     * @var AccountRepo
     */
    private $accountRepo;

    /**
     * AccountController constructor.
     * @param AccountRepo $accountRepo
     */
    public function __construct(AccountRepo $accountRepo)
    {
        $this->accountRepo = $accountRepo;
    }

    /**
     * @param Request $request
     * @return AccountCollection
     */
    public function index(Request $request)
    {
        $offset = (int)$request->get('offset', \Constant::MIN_OFFSET);
        $limit = (int)$request->get('limit', \Constant::MIN_LIMiT);
        $orderBy = $request->get('orderBy', null);
        $sortBy = $request->get('orderBy', \Constant::ORDER_BY_DESC);
        $search = $request->get('search');
        $model = $this->accountRepo->getList($search, $offset, $limit, $orderBy, $sortBy, ['account_id', 'name']);

        return (new AccountCollection($model));
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
        $input['created_user'] = 'test@gmail.com';

        $model = $this->accountRepo->create($input);

        return response()->json([
            'message' => 'create success',
            'data' => $model
        ]);
    }

    /**
     * @param Account $account
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit(Request $request)
    {
        dd($request->get('id'));
        return response()->json(['data' => $account], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Account  $account
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Account $account)
    {
        dd($account);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Account  $account
     * @return \Illuminate\Http\Response
     */
    public function destroy(Account $account)
    {
        //
    }
}
