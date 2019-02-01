<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Menu\ShowRequest;
use App\Models\Menu;
use App\Repositories\MenuRepo;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    /**
     * @var MenuRepo
     */
    private $menuRepo;

    /**
     * StaffController constructor.
     * @param MenuRepo $menuRepo
     */
    public function __construct(MenuRepo $menuRepo)
    {
        $this->menuRepo = $menuRepo;
    }

    /**
     * @param ShowRequest $request(service_code, vendor_id, search)
     * @return \Illuminate\Database\Eloquent\Builder[]|\Illuminate\Database\Eloquent\Collection
     */
    public function index(ShowRequest $request)
    {

        $vendor_id = $request->get('vendor_id');
        $menu_type = $request->get('menu_type');
        $search = $request->get('search');
        $menus = $this->menuRepo->getMenuWithFoods($vendor_id,$menu_type,$search);
        return response()->success($menus);
    }

    /**
     * Display the specified resource.
     *
     * @param  Menu $menu
     * @return \Illuminate\Http\Response
     */
    public function show(Menu $menu){

        return $menu;
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
     * @param Menu $menu
     * @return void
     */
    public function edit(Menu $menu)
    {
        return $menu;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Menu $staff
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Menu $menu)
    {
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Staff $staff
     * @return \Illuminate\Http\Response
     */
    public function destroy(Menu $menu)
    {
    }
}
