<?php
/**
 * Created by PhpStorm.
 * Email: 'hongduyphp@gmail.com'
 * Date: 03-11-2018
 * Time: 12:01 PM
 */

namespace App\Repositories;


use App\Models\Account;

class AccountRepo extends Repository
{
    /**
     * Specify Model class name
     * @return string
     */
    public function getModel()
    {
        return Account::class;
    }

    /**
     * @param $search
     * @param $offset
     * @param $limit
     * @param $orderBy
     * @param $sortBy
     * @param $columns
     * @return mixed
     */
    public function getList($search, $offset, $limit, $orderBy , $sortBy, $columns)
    {
        return $this->list($search, $offset, $limit, $orderBy, $sortBy, $columns);
    }
}