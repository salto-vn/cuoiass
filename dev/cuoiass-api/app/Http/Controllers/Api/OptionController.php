<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Option\ShowRequest;
use App\Repositories\OptionRepo;
use Illuminate\Http\Request;

class OptionController extends Controller
{
    /**
     * @var OptionRepo
     */
    private $optionRepo;

    /**
     * StaffController constructor.
     * @param OptionRepo $optionRepo
     */
    public function __construct(OptionRepo $optionRepo)
    {
        $this->optionRepo = $optionRepo;
    }

    /**
     * @param ShowRequest $request(vendor_id, search)
     * @return \Illuminate\Database\Eloquent\Builder[]|\Illuminate\Database\Eloquent\Collection
     */
    public function index(ShowRequest $request)
    {

        $vendor_id = $request->get('vendor_id');
        $prd_id = $request->get('prd_id');
        $search = $request->get('search');
        $options = $this->optionRepo->getOptionsByPrdID($vendor_id,$prd_id,$search);
        return response()->success($options);
    }

    /**
     * Display the specified resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function show(Option $option){

        return $option;
    }

    /**
     * Create Account and return model
     *
     * @return Option
     */
    public function store(Request $request)
    {
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Option $option
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Option $option)
    {
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Option $option
     * @return \Illuminate\Http\Response
     */
    public function destroy(Option $option)
    {
    }
}
