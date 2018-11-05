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

        return new AccountCollection($model);
    }


    public function store(StoreAccount $request)
    {
        $input = [
            'role_id' => 1,
            'name' => 'duy',
            'email' => 'abc@gmail.com',
            'staff_id' => 1,
            'vendor_id' => 1,
            'created_user' => '123123',
            'password' => '23234234'
        ];
        $model = $this->accountRepo->create($input);
        dd($model);
        //$input = $request->all();
        ////$input['password'] = bcrypt($input['password']);
        //$input['created_user'] = 'test@gmail.com';
        //
        ////dd($input);
        //$model = new Account($input);
        //$model->save();
        //
        return response()->json(['type' => $model]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Account  $account
     * @return \Illuminate\Http\Response
     */
    public function edit(Account $account)
    {
        //
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
        //
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
