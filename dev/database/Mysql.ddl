## project name : cuoiass
## date/time    : 2018/11/07 15:04:33
## author       : anh
## rdbms type   : mysql
## application  : a5:sql mk-2

/*
  backuptotemptable, restorefromtemptable疑似命令が付加されています。
  これにより、drop table, create table 後もデータが残ります。
  この機能は一時的に $$tablename のような一時テーブルを作成します。
*/

##* backuptotemptable
drop table if exists `admins` cascade;

##* restorefromtemptable
create table `admins` (
    `id` int not null auto_increment comment 'id'
  , `email` char(255) not null comment 'email'
  , `password` char(255) not null comment 'password'
  , `name` varchar(255) comment 'name'
  , `role_id` int not null comment 'role id'
  , `created_by` varchar(255) not null comment 'create user'
  , `created_at` datetime comment 'create at date time'
  , `updated_by` varchar(255) comment 'update user'
  , `updated_at` datetime comment 'update at time'
  , constraint `admins_pkc` primary key (`id`)
) comment 'admin' ;

create unique index `index_1`
  on `admins`(`email`);

##* backuptotemptable
drop table if exists `weekly_reports` cascade;

##* restorefromtemptable
create table `weekly_reports` (
    `report_year` int not null comment 'report_year'
  , `report_week` int not null comment 'report_week:0~52'
  , `report_type` char(10) comment 'report type:prd: report by product
vnd: report by vendor
vnd_svr: report by service of vendor'
  , `report_id` int comment 'report id:report_type la prd, thi la product_id
la vnd thi la vendor_id
la vnd_svrs thi la vendor_service_id'
  , `total_view` int comment 'total view'
  , `total_booking` int comment 'total booking'
  , `total_booking_finshed` int comment 'total finshed booking'
  , `total_booking_cancelled` int comment 'total cancelled booking'
  , `total_price` float comment 'total price:finshed, paid'
  , `total_price_canceled` float comment 'total price cancel, denied:cancelled , denied'
  , `created_by` varchar(255) not null comment 'create user'
  , `created_at` datetime comment 'create at date time'
  , `updated_by` varchar(255) comment 'update user'
  , `updated_at` datetime comment 'update at time'
  , constraint `weekly_reports_pkc` primary key (`report_year`,`report_week`)
) comment 'weekly report' ;

##* backuptotemptable
drop table if exists `monthly_reports` cascade;

##* restorefromtemptable
create table `monthly_reports` (
    `report_year` int not null comment 'report year'
  , `report_month` int not null comment 'report month'
  , `report_type` char(10) comment 'report type:prd: report by product
vnd: report by vendor
vnd_svr: report by service of vendor'
  , `report_id` int comment 'report id:report_type la prd, thi la product_id
la vnd thi la vendor_id
la vnd_svrs thi la vendor_service_id'
  , `total_view` int comment 'total view'
  , `total_booking` int comment 'total booking'
  , `total_booking_finshed` int comment 'total finshed booking'
  , `total_booking_cancelled` int comment 'total cancelled booking'
  , `total_price` float comment 'total price:finshed, paid'
  , `total_price_canceled` float comment 'total price cancel, denied:cancelled , denied'
  , `created_by` varchar(255) not null comment 'create user'
  , `created_at` datetime comment 'create at date time'
  , `updated_by` varchar(255) comment 'update user'
  , `updated_at` datetime comment 'update at time'
  , constraint `monthly_reports_pkc` primary key (`report_year`,`report_month`)
) comment 'monthly report' ;

##* backuptotemptable
drop table if exists `daily_reports` cascade;

##* restorefromtemptable
create table `daily_reports` (
    `report_date` date not null comment 'report date'
  , `report_type` char(10) comment 'report type:prd: report by product
vnd: report by vendor
vnd_svr: report by service of vendor'
  , `report_id` int comment 'report id:report_type la prd, thi la product_id
la vnd thi la vendor_id
la vnd_svrs thi la vendor_service_id'
  , `total_view` int comment 'total view'
  , `total_booking` int comment 'total booking'
  , `total_booking_finshed` int comment 'total finshed booking'
  , `total_booking_cancelled` int comment 'total cancelled booking'
  , `total_price` float comment 'total price:finshed, paid'
  , `total_price_canceled` float comment 'total price cancel, denied:cancelled , denied'
  , `created_by` varchar(255) not null comment 'create user'
  , `created_at` datetime comment 'create at date time'
  , `updated_by` varchar(255) comment 'update user'
  , `updated_at` datetime comment 'update at time'
  , constraint `daily_reports_pkc` primary key (`report_date`)
) comment 'daily report' ;

##* backuptotemptable
drop table if exists `fees` cascade;

##* restorefromtemptable
create table `fees` (
    `fee_id` int not null auto_increment comment 'fee id'
  , `fee_title` char(20) not null comment 'fee title:used_publish_pro: su dung credit de publish
used_new_book: co user dat lich
used_confirmed_book: co user dat lich va da xac dinh'
  , `fee_amount` int not null comment 'fee amount:default nhu ben duoi, co the edit lai sau
used_publish_pro =  20k(20 credit)
used_new_book = 50k(50 credit)
used_confirmed_book: 500k(500 credit)'
  , `memo` varchar(255) comment 'memo'
  , `vendor_id` int not null comment 'vendor id'
  , `created_by` varchar(255) not null comment 'create user'
  , `created_at` datetime comment 'create at date time'
  , `updated_by` varchar(255) comment 'update user'
  , `updated_at` datetime comment 'update at time'
  , constraint `fees_pkc` primary key (`fee_id`)
) comment 'fee:mac dinh thi vendor nao tao ra cung co 3 records va gia tri la default, co the update lai sau khi thao luan voi vendor' ;

##* backuptotemptable
drop table if exists `credits` cascade;

##* restorefromtemptable
create table `credits` (
    `credit_id` int not null auto_increment comment 'credit'
  , `action_date` datetime comment 'date'
  , `action_type` char(10) not null comment 'action type:charge: charge credit
use: use credit'
  , `method` char(12) comment 'method:charge_free: free charge
charge_by_cash: charge by cash(tien mat)
charge_by_bank: charge by intenet banking
charge_by_cc: charge credit card
charge_by_refund: tra credit khi user cancel booking
used_publish_pro: su dung credit de publish
used_new_book: co user dat lich
used_confirmed_book: co user dat lich va da xac dinh'
  , `credit` int not null comment 'credit:convert tien sang credit cho user, 1000vnd = 1credit'
  , `money` float not null comment 'money'
  , `invoice_url` varchar(255) comment 'invoice'
  , `vendor_id` int not null comment 'vendor id'
  , `prd_id` int comment 'product id'
  , `booked_id` int comment 'booked id'
  , `created_by` varchar(255) not null comment 'create user'
  , `created_at` datetime comment 'create at date time'
  , `updated_by` varchar(255) comment 'update user'
  , `updated_at` datetime comment 'update at time'
  , constraint `credits_pkc` primary key (`credit_id`)
) comment 'credit history' ;

##* backuptotemptable
drop table if exists `analysis` cascade;

##* restorefromtemptable
create table `analysis` (
    `id` int not null auto_increment comment 'id'
  , `date` date not null comment 'date'
  , `screen_url` varchar(255) not null comment 'url'
  , `action` varchar(255) not null comment 'action'
  , `user_ip` varchar(255) not null comment 'ip'
  , `user_facebook` varchar(255) comment 'fb'
  , `customer_id` int not null comment 'customer id'
  , `created_by` varchar(255) not null comment 'create user'
  , `created_at` datetime comment 'create at date time'
  , `updated_by` varchar(255) comment 'update user'
  , `updated_at` datetime comment 'update at time'
  , constraint `analysis_pkc` primary key (`id`)
) comment 'analysis' ;

##* backuptotemptable
drop table if exists `promotion_products` cascade;

##* restorefromtemptable
create table `promotion_products` (
    `promotion_product_id` int auto_increment not null comment 'promotion_product'
  , `promotion_id` int not null comment 'promotion id'
  , `prd_id` int not null comment 'product id'
  , `vendor_service_id` int not null comment 'vendor services id'
  , `created_by` varchar(255) not null comment 'create user'
  , `created_at` datetime comment 'create at date time'
  , `updated_by` varchar(255) comment 'update user'
  , `updated_at` datetime comment 'update at time'
  , constraint `promotion_products_pkc` primary key (`promotion_product_id`,`promotion_id`,`prd_id`,`vendor_service_id`)
) comment 'promotion product' ;

##* backuptotemptable
drop table if exists `promotions` cascade;

##* restorefromtemptable
create table `promotions` (
    `promotion_id` int not null auto_increment comment 'promotion id'
  , `promotion_title` varchar(255) comment 'promotion title'
  , `promotion_code` char(20) comment 'promotion code'
  , `start_date` date comment 'start date'
  , `end_date` date comment 'end date'
  , `promotion_type` char(15) not null comment 'type:coupon: giam gia theo coupon code
drirect: giam gia truc tiep %'
  , `promotion_amount` int not null comment 'promotion amount'
  , `created_by` varchar(255) not null comment 'create user'
  , `created_at` datetime comment 'create at date time'
  , `updated_by` varchar(255) comment 'update user'
  , `updated_at` datetime comment 'update at time'
  , constraint `promotions_pkc` primary key (`promotion_id`)
) comment 'promotion' ;

##* backuptotemptable
drop table if exists `reviews` cascade;

##* restorefromtemptable
create table `reviews` (
    `review_id` int not null auto_increment comment 'review id'
  , `review_content` longtext not null comment 'review content'
  , `review_date` date not null comment 'review date'
  , `review_rate` float not null comment 'review rate'
  , `review_imgs` varchar(255) not null comment 'review image'
  , `prd_id` int not null comment 'product id'
  , `booked_id` int not null comment 'booked id'
  , `customer_id` int not null comment 'customer id'
  , `created_by` varchar(255) not null comment 'create user'
  , `created_at` datetime comment 'create at date time'
  , `updated_by` varchar(255) comment 'update user'
  , `updated_at` datetime comment 'update at time'
  , constraint `reviews_pkc` primary key (`review_id`)
) comment 'review' ;

##* backuptotemptable
drop table if exists `drinks` cascade;

##* restorefromtemptable
create table `drinks` (
    `drink_id` int not null auto_increment comment 'drink id'
  , `drink_name` varchar(255) not null comment 'drink name'
  , `image_ids` varchar(255) not null comment 'images id'
  , `menu_id` int not null comment 'menu id'
  , `created_by` varchar(255) not null comment 'create user'
  , `created_at` datetime comment 'create at date time'
  , `updated_by` varchar(255) comment 'update user'
  , `updated_at` datetime comment 'update at time'
  , constraint `drinks_pkc` primary key (`drink_id`)
) comment 'drink' ;

##* backuptotemptable
drop table if exists `booked_customize_fields` cascade;

##* restorefromtemptable
create table `booked_customize_fields` (
    `booked_cus_field_id` int not null auto_increment comment 'booked customize field id'
  , `booked_id` int not null comment 'booked id'
  , `customize_field_answer` varchar(255) comment 'customize field answer'
  , `customize_field_id` int not null comment 'customize field id'
  , `pro_id` int not null comment 'product id'
  , `created_by` varchar(255) not null comment 'create user'
  , `created_at` datetime comment 'create at date time'
  , `updated_by` varchar(255) comment 'update user'
  , `updated_at` datetime comment 'update at time'
  , constraint `booked_customize_fields_pkc` primary key (`booked_cus_field_id`,`booked_id`)
) comment 'booked customize field' ;

##* backuptotemptable
drop table if exists `booked_options` cascade;

##* restorefromtemptable
create table `booked_options` (
    `booked_opt_id` int not null auto_increment comment 'booked option'
  , `booked_id` int not null comment 'booked id'
  , `option_name` varchar(255) not null comment 'option name'
  , `option_quality` int not null comment 'quality'
  , `option_price` float not null comment 'option price'
  , `option_id` int not null comment 'option id'
  , `prd_id` int not null comment 'product id'
  , `vendor_service_id` int not null comment 'vendor services id'
  , `created_by` varchar(255) not null comment 'create user'
  , `created_at` datetime comment 'create at date time'
  , `updated_by` varchar(255) comment 'update user'
  , `updated_at` datetime comment 'update at time'
  , constraint `booked_options_pkc` primary key (`booked_opt_id`,`booked_id`)
) comment 'booked option' ;

##* backuptotemptable
drop table if exists `booked_honey_moons` cascade;

##* restorefromtemptable
create table `booked_honey_moons` (
    `honey_id` int not null auto_increment comment 'honeymoon id'
  , `honey_tile` varchar(255) not null comment 'honey moon title'
  , `hotel_name` varchar(255) comment 'hotel name'
  , `hotel_address` varchar(255) comment 'hotel address'
  , `flight_no` char(20) comment 'flight no'
  , `airline_brand` varchar(255) comment 'airline brand'
  , `departure_date` datetime comment 'departure date'
  , `arrial_date` datetime comment 'arrial date'
  , `booked_date` datetime comment 'booked date'
  , `status` char(12) not null comment 'status:inprogress: vua moi book, dang cho xac nhan cua vendor
accepted: vendor da xac nhan, dang cho den try_date
cancelled: khach hang cancel
denied: vendor tu choi
finished: da hoan thanh, to chuc.'
  , `memo` varchar(255) comment 'memo:memo cua viec chuyen doi status'
  , `booked_id` int not null comment 'booked id'
  , `created_by` varchar(255) not null comment 'create user'
  , `created_at` datetime comment 'create at date time'
  , `updated_by` varchar(255) comment 'update user'
  , `updated_at` datetime comment 'update at time'
  , constraint `booked_honey_moons_pkc` primary key (`honey_id`)
) comment 'honey moon' ;

##* backuptotemptable
drop table if exists `booked_foods` cascade;

##* restorefromtemptable
create table `booked_foods` (
    `booked_food_id` int not null auto_increment comment 'booked menu id'
  , `booked_menu` varchar(255) not null comment 'menu name'
  , `service_code` char(12) not null comment 'service code:quc:qua cuoi, rst: restaurant,'
  , `booked_total` int not null comment 'total:so nguoi'
  , `unit_price` float not null comment 'unit price:don gia'
  , `booked_drink` varchar(255) comment 'drink'
  , `drink_unit_price` float comment 'drink unit price'
  , `booked_id` int not null comment 'booked id'
  , `menu_id` int not null comment 'menu id'
  , `created_by` varchar(255) not null comment 'create user'
  , `created_at` datetime comment 'create at date time'
  , `updated_by` varchar(255) comment 'update user'
  , `updated_at` datetime comment 'update at time'
  , constraint `booked_foods_pkc` primary key (`booked_food_id`)
) comment 'booked menu food:luu thong tin booking cua dich vu nha hang va qua cuoi' ;

##* backuptotemptable
drop table if exists `bookings` cascade;

##* restorefromtemptable
create table `bookings` (
    `booked_id` int not null auto_increment comment 'booked id'
  , `booked_cd` char(20) comment 'booked code'
  , `booked_pro_name` varchar(255) comment 'booked product name'
  , `booked_size` int comment 'booked size'
  , `booked_color` char(25) comment 'booked color'
  , `booked_material` varchar(255) comment 'booked material'
  , `booked_style` varchar(255) comment 'booked style'
  , `booked_album_page` int comment 'booked album page'
  , `booked_photo_size` varchar(255) comment 'booked party photo size'
  , `booked_size_2` int comment 'booked size 2:size nhan , quan ao cua co dau va chu re'
  , `booked_color_2` char(25) comment 'booked color 2:mau nhan , quan ao cua co dau va chu re'
  , `booked_time` time comment 'booked time:time trong ngay cua san pham cung cap'
  , `try_date` datetime comment 'try date'
  , `activate_date` datetime comment 'activate date'
  , `status` char(20) comment 'status:inprogress: vua moi book, dang cho xac nhan cua vendor
accepted: vendor da xac nhan, dang cho den try_date
paid: da dat coc hoac tra tien
cancelled: khach hang cancel
denied: vendor tu choi
finished: da hoan thanh, to chuc.'
  , `memo` varchar(255) comment 'memo'
  , `booked_date` datetime comment 'booked date:systemdate'
  , `payment_name` varchar(255) not null comment 'payment name'
  , `payment_phone` varchar(255) not null comment 'payment phone'
  , `payment_email` varchar(255) not null comment 'payment email'
  , `net_price` float not null comment 'net price'
  , `gross_price` float not null comment 'gross price'
  , `invoice_url` varchar(255) comment 'invoice'
  , `plan_id` char(20) not null comment 'plan id:cass-xxxxxx format'
  , `prd_id` int not null comment 'product id'
  , `vendor_service_id` int not null comment 'vendor services id'
  , `created_by` varchar(255) not null comment 'create user'
  , `created_at` datetime comment 'create at date time'
  , `updated_by` varchar(255) comment 'update user'
  , `updated_at` datetime comment 'update at time'
  , constraint `bookings_pkc` primary key (`booked_id`)
) comment 'booking:luu ke hoach cuoi cua user' ;

create unique index `bookings_ix1`
  on `bookings`(`booked_cd`);

##* backuptotemptable
drop table if exists `package_products` cascade;

##* restorefromtemptable
create table `package_products` (
    `id` int not null auto_increment comment 'id'
  , `prd_id` int not null comment 'product id'
  , `package_id` int not null comment 'package id'
  , `created_by` varchar(255) not null comment 'create user'
  , `created_at` datetime comment 'create at date time'
  , `updated_by` varchar(255) comment 'update user'
  , `updated_at` datetime comment 'update at time'
  , constraint `package_products_pkc` primary key (`id`)
) comment 'package product' ;

##* backuptotemptable
drop table if exists `packages` cascade;

##* restorefromtemptable
create table `packages` (
    `package_id` int not null auto_increment comment 'package id'
  , `pacage_name` varchar(255) not null comment 'package name'
  , `package_price` float not null comment 'total price'
  , `pub_user` int not null comment 'publish user'
  , `created_by` varchar(255) not null comment 'create user'
  , `created_at` datetime comment 'create at date time'
  , `updated_by` varchar(255) comment 'update user'
  , `updated_at` datetime comment 'update at time'
  , constraint `packages_pkc` primary key (`package_id`)
) comment 'package' ;

##* backuptotemptable
drop table if exists `plans` cascade;

##* restorefromtemptable
create table `plans` (
    `plan_id` char(20) not null comment 'plan id:cass-xxxxxx format'
  , `plan_date` datetime not null comment 'plan date:booked date'
  , `org_date` datetime not null comment 'organization date'
  , `gr_name` varchar(255) comment 'groom name'
  , `br_name` varchar(255) comment 'bride name'
  , `org_address` varchar(255) comment 'organization address'
  , `phone` char(14) not null comment 'phone'
  , `total_price` float not null comment 'total price'
  , `customer_id` int not null comment 'customer id'
  , `created_by` varchar(255) not null comment 'create user'
  , `created_at` datetime comment 'create at date time'
  , `updated_by` varchar(255) comment 'update user'
  , `updated_at` datetime comment 'update at time'
  , constraint `plans_pkc` primary key (`plan_id`)
) comment 'wedding plan:luu tat ca cac ke hoach cua khach hang' ;

##* backuptotemptable
drop table if exists `images` cascade;

##* restorefromtemptable
create table `images` (
    `img_id` int not null auto_increment comment 'image id'
  , `img_url` char(255) not null comment 'image url'
  , `created_by` varchar(255) not null comment 'create user'
  , `created_at` datetime comment 'create at date time'
  , `updated_by` varchar(255) comment 'update user'
  , `updated_at` datetime comment 'update at time'
  , constraint `images_pkc` primary key (`img_id`)
) comment 'images:luu tat ca image' ;

##* backuptotemptable
drop table if exists `travel_products` cascade;

##* restorefromtemptable
create table `travel_products` (
    `honey_id` int not null auto_increment comment 'honeymoon id'
  , `honey_tile` varchar(255) not null comment 'honey moon title'
  , `honey_api_provider` char(50) not null comment 'api name'
  , `honey_api_client` varchar(255) comment 'api client id'
  , `honey_api_key` varchar(255) comment 'api client key'
  , `honey_api_acc` varchar(255) comment 'account'
  , `created_by` varchar(255) not null comment 'create user'
  , `created_at` datetime comment 'create at date time'
  , `updated_by` varchar(255) comment 'update user'
  , `updated_at` datetime comment 'update at time'
  , constraint `travel_products_pkc` primary key (`honey_id`)
) comment 'honey moon' ;

##* backuptotemptable
drop table if exists `options` cascade;

##* restorefromtemptable
create table `options` (
    `option_id` int not null auto_increment comment 'option id'
  , `prd_id` int not null comment 'product id'
  , `vendor_service_id` int not null comment 'vendor services id'
  , `option_name` varchar(255) not null comment 'option name'
  , `image_ids` varchar(255) comment 'images'
  , `option_price` float not null comment 'option price'
  , `created_by` varchar(255) not null comment 'create user'
  , `created_at` datetime comment 'create at date time'
  , `updated_by` varchar(255) comment 'update user'
  , `updated_at` datetime comment 'update at time'
  , constraint `options_pkc` primary key (`option_id`,`prd_id`,`vendor_service_id`)
) comment 'option' ;

##* backuptotemptable
drop table if exists `customize_fields` cascade;

##* restorefromtemptable
create table `customize_fields` (
    `customize_field_id` int auto_increment not null comment 'customize field id'
  , `prd_id` int not null comment 'product id'
  , `vendor_service_id` int not null comment 'vendor services id'
  , `customize_field_name` char(20) not null comment 'customize field name'
  , `customize_field_type` enum('textbox','combobox','textarea','file','radio','checkbox') not null comment 'customize field type:textbox, combobox, textarea, file, radio, checkbox'
  , `customize_field_value` varchar(255) comment 'customize field value'
  , `created_by` varchar(255) not null comment 'create user'
  , `created_at` datetime comment 'create at date time'
  , `updated_by` varchar(255) comment 'update user'
  , `updated_at` datetime comment 'update at time'
  , constraint `customize_fields_pkc` primary key (`customize_field_id`,`prd_id`,`vendor_service_id`)
) comment 'customize field' ;

##* backuptotemptable
drop table if exists `foods` cascade;

##* restorefromtemptable
create table `foods` (
    `food_id` int not null auto_increment comment 'food id'
  , `food_name` varchar(255) not null comment 'food name'
  , `image_ids` varchar(255) not null comment 'images id'
  , `menu_id` int not null comment 'menu id'
  , `created_by` varchar(255) not null comment 'create user'
  , `created_at` datetime comment 'create at date time'
  , `updated_by` varchar(255) comment 'update user'
  , `updated_at` datetime comment 'update at time'
  , constraint `foods_pkc` primary key (`food_id`)
) comment 'food' ;

##* backuptotemptable
drop table if exists `menus` cascade;

##* restorefromtemptable
create table `menus` (
    `menu_id` int not null auto_increment comment 'menu id'
  , `menu_name` varchar(255) not null comment 'menu name'
  , `unit_price` float not null comment 'unit price:price/per'
  , `prd_id` int not null comment 'product id'
  , `created_by` varchar(255) not null comment 'create user'
  , `created_at` datetime comment 'create at date time'
  , `updated_by` varchar(255) comment 'update user'
  , `updated_at` datetime comment 'update at time'
  , constraint `menus_pkc` primary key (`menu_id`)
) comment 'menu:restaurant menu, khi service code la nha hang cuoi,' ;

##* backuptotemptable
drop table if exists `schedule_photos` cascade;

##* restorefromtemptable
create table `schedule_photos` (
    `sche_id` int not null auto_increment comment 'schedule photo'
  , `sche_start_time` datetime not null comment 'schedule time'
  , `sche_end_time` datetime not null comment 'schedule end time'
  , `sche_title` varchar(255) not null comment 'schedule title'
  , `sche_desc` varchar(255) comment 'schedule desciption'
  , `image_ids` varchar(255) not null comment 'images'
  , `prd_id` int not null comment 'product id'
  , `created_by` varchar(255) not null comment 'create user'
  , `created_at` datetime comment 'create at date time'
  , `updated_by` varchar(255) comment 'update user'
  , `updated_at` datetime comment 'update at time'
  , constraint `schedule_photos_pkc` primary key (`sche_id`)
) comment 'schedule photo:lich trinh chup hinh, khi service code la photo thi bang nay co du lieu' ;

##* backuptotemptable
drop table if exists `products` cascade;

##* restorefromtemptable
create table `products` (
    `prd_id` int not null auto_increment comment 'product id'
  , `prd_cd` char(20) not null comment 'product code'
  , `prd_name` varchar(255) not null comment 'product name'
  , `prd_desc` varchar(255) not null comment 'description'
  , `price` float comment 'price'
  , `publish_flag` int default 0 not null comment 'publish flag:0: unpublish, 1: published'
  , `publish_date` datetime comment 'publish date'
  , `prd_colors` varchar(255) comment 'product color:list'
  , `prd_sizes` varchar(255) comment 'product size:list'
  , `prd_materials` varchar(255) comment 'product material:list'
  , `prd_style` varchar(255) comment 'product style:list'
  , `prd_page` int comment 'product album page:su dung cho so to trong album cuoi'
  , `prd_party_photo_size` varchar(255) comment 'product party photo:su dung dung cho dich vu la album , kich thuoc hinh tiec'
  , `prd_times` varchar(255) comment 'timely:luu mang thoi gian cung cap cua san pham'
  , `prd_images` varchar(255) comment 'images:list'
  , `vendor_service_id` int not null comment 'vendor services id'
  , `service_code` char(10) not null comment 'service code:pht: photographer,
drss: dress,
std:studio,
nc: nhan cuoi
quc:qua cuoi,
tc: thiep cuoi,
trtr:trang tri,
rst: restaurant,
hnm: honey moon(travel),
xc: xe cuoi,
vn: van nghe,'
  , `created_by` varchar(255) not null comment 'create user'
  , `created_at` datetime comment 'create at date time'
  , `updated_by` varchar(255) comment 'update user'
  , `updated_at` datetime comment 'update at time'
  , constraint `products_pkc` primary key (`prd_id`,`vendor_service_id`)
) comment 'product:tat ca san pham cua vendor theo tung dich vu' ;

create unique index `products_ix1`
  on `products`(`prd_cd`);

##* backuptotemptable
drop table if exists `master_services` cascade;

##* restorefromtemptable
create table `master_services` (
    `service_code` char(20) not null comment 'service code:pht: photographer,
drss: dress,
std:studio,
nc: nhan cuoi
quc:qua cuoi,
tc: thiep cuoi,
trtr:trang tri,
rst: restaurant,
hnm: honey moon(travel),
xc: xe cuoi,
vn: van nghe,'
  , `service_name` varchar(255) comment 'service name'
  , `created_by` varchar(255) not null comment 'create user'
  , `created_at` datetime comment 'create at date time'
  , `updated_by` varchar(255) comment 'update user'
  , `updated_at` datetime comment 'update at time'
  , constraint `master_services_pkc` primary key (`service_code`)
) comment 'service master' ;

##* backuptotemptable
drop table if exists `staffs` cascade;

##* restorefromtemptable
create table `staffs` (
    `staff_id` int not null auto_increment comment 'staff'
  , `vendor_id` int not null comment 'vendor id'
  , `staff_name` varchar(255) not null comment 'staff name'
  , `phone` char(14) comment 'phone'
  , `address` varchar(255) comment 'address'
  , `created_by` varchar(255) not null comment 'create user'
  , `created_at` datetime comment 'create at date time'
  , `updated_by` varchar(255) comment 'update user'
  , `updated_at` datetime comment 'update at time'
  , constraint `staffs_pkc` primary key (`staff_id`,`vendor_id`)
) comment 'vendor staff' ;

##* backuptotemptable
drop table if exists `vendors` cascade;

##* restorefromtemptable
create table `vendors` (
    `vendor_id` int not null auto_increment comment 'vendor id'
  , `vendor_name` varchar(255) not null comment 'name'
  , `company` varchar(255) not null comment 'company'
  , `address` varchar(255) not null comment 'address'
  , `city` varchar(255) not null comment 'city'
  , `web_url` varchar(255) comment 'url'
  , `president_name` varchar(255) not null comment 'president'
  , `phone` char(14) not null comment 'phone'
  , `credit_balance` int not null comment 'balance'
  , `fax` char(25) comment 'fax'
  , `created_by` varchar(255) not null comment 'create user'
  , `created_at` datetime comment 'create at date time'
  , `updated_by` varchar(255) comment 'update user'
  , `updated_at` datetime comment 'update at time'
  , constraint `vendors_pkc` primary key (`vendor_id`)
) comment 'vendor' ;

##* backuptotemptable
drop table if exists `vendor_services` cascade;

##* restorefromtemptable
create table `vendor_services` (
    `vendor_service_id` int not null auto_increment comment 'vendor services id'
  , `vendor_id` int not null comment 'vendor id'
  , `service_code` char(20) not null comment 'service code:pht: photographer,
drss: dress,
std:studio,
nc: nhan cuoi
quc:qua cuoi,
tc: thiep cuoi,
trtr:trang tri,
rst: restaurant,
hnm: honey moon(travel),
xc: xe cuoi,
vn: van nghe,'
  , `ven_serv_name` varchar(255) not null comment 'vendor service name'
  , `add_service` varchar(255) not null comment 'address service'
  , `city` varchar(255) not null comment 'city'
  , `phone_service` char(14) not null comment 'phone'
  , `fax_service` char(25) comment 'fax'
  , `created_by` varchar(255) not null comment 'create user'
  , `created_at` datetime comment 'create at date time'
  , `updated_by` varchar(255) comment 'update user'
  , `updated_at` datetime comment 'update at time'
  , constraint `vendor_services_pkc` primary key (`vendor_service_id`)
) comment 'vendor services' ;

##* backuptotemptable
drop table if exists `customers` cascade;

##* restorefromtemptable
create table `customers` (
    `customer_id` int not null auto_increment comment 'customer id'
  , `first_name` varchar(255) comment 'first name'
  , `last_name` varchar(255) comment 'last name'
  , `address` varchar(255) comment 'address'
  , `phone` char(14) comment 'phone'
  , `fb` varchar(255) comment 'facebook'
  , `member_flag` int default 1 comment 'member flag:1: member, 0: outed member'
  , `created_by` varchar(255) not null comment 'create user'
  , `created_at` datetime comment 'create at date time'
  , `updated_by` varchar(255) comment 'update user'
  , `updated_at` datetime comment 'update at time'
  , constraint `customers_pkc` primary key (`customer_id`)
) comment 'customer' ;

##* backuptotemptable
drop table if exists `accounts` cascade;

##* restorefromtemptable
create table `accounts` (
    `account_id` int not null auto_increment comment 'account id'
  , `role_id` int not null comment 'role'
  , `email` varchar(255) not null comment 'email'
  , `password` char(50) not null comment 'password'
  , `staff_id` int not null comment 'staff'
  , `vendor_id` int not null comment 'vendor id'
  , `customer_id` int not null comment 'customer id'
  , `created_by` varchar(255) not null comment 'create user'
  , `created_at` datetime comment 'create at date time'
  , `updated_by` varchar(255) comment 'update user'
  , `updated_at` datetime comment 'update at time'
  , constraint `accounts_pkc` primary key (`account_id`)
) comment 'account' ;

create unique index `email_index`
  on `accounts`(`email`);

##* backuptotemptable
drop table if exists `roles` cascade;

##* restorefromtemptable
create table `roles` (
    `role_id` int not null auto_increment comment 'role id'
  , `role_name` varchar(255) not null comment 'role name'
  , `role_code` char(12) not null comment 'role code:adm: for adminintration of page, vdn_mng: for manager of vendor, vdn_stf:for staff of vendor,csm: for customer(user)'
  , `system_code` char(10) not null comment 'system:front: customer site
backyard: vendor site
admin: admin manager site'
  , `created_by` varchar(255) not null comment 'create user'
  , `created_at` datetime comment 'create at date time'
  , `updated_by` varchar(255) comment 'update user'
  , `updated_at` datetime comment 'update at time'
  , constraint `roles_pkc` primary key (`role_id`)
) comment 'role' ;

create unique index `role_code`
  on `roles`(`role_code`);

alter table `roles` add unique `roles_ix1` (`role_id`) ;

alter table `admins`
  add constraint `admins_fk1` foreign key (`role_id`) references `roles`(`role_id`);

alter table `bookings`
  add constraint `bookings_fk1` foreign key (`prd_id`,`vendor_service_id`) references `products`(`prd_id`,`vendor_service_id`);

alter table `customize_fields`
  add constraint `customize_fields_fk1` foreign key (`prd_id`,`vendor_service_id`) references `products`(`prd_id`,`vendor_service_id`);

alter table `promotion_products`
  add constraint `promotion_products_fk1` foreign key (`prd_id`,`vendor_service_id`) references `products`(`prd_id`,`vendor_service_id`);

alter table `booked_options`
  add constraint `booked_options_fk1` foreign key (`option_id`,`prd_id`,`vendor_service_id`) references `options`(`option_id`,`prd_id`,`vendor_service_id`);

alter table `options`
  add constraint `options_fk1` foreign key (`prd_id`,`vendor_service_id`) references `products`(`prd_id`,`vendor_service_id`);

alter table `fees`
  add constraint `fees_fk1` foreign key (`vendor_id`) references `vendors`(`vendor_id`);

alter table `credits`
  add constraint `credits_fk1` foreign key (`booked_id`) references `bookings`(`booked_id`);

alter table `credits`
  add constraint `credits_fk2` foreign key (`prd_id`) references `products`(`prd_id`);

alter table `credits`
  add constraint `credits_fk3` foreign key (`vendor_id`) references `vendors`(`vendor_id`);

alter table `accounts`
  add constraint `accounts_fk1` foreign key (`customer_id`) references `customers`(`customer_id`);

alter table `accounts`
  add constraint `accounts_fk2` foreign key (`staff_id`,`vendor_id`) references `staffs`(`staff_id`,`vendor_id`);

alter table `analysis`
  add constraint `analysis_fk1` foreign key (`customer_id`) references `customers`(`customer_id`);

alter table `promotion_products`
  add constraint `promotion_products_fk2` foreign key (`promotion_id`) references `promotions`(`promotion_id`);

alter table `reviews`
  add constraint `reviews_fk1` foreign key (`customer_id`) references `customers`(`customer_id`);

alter table `reviews`
  add constraint `reviews_fk2` foreign key (`booked_id`) references `bookings`(`booked_id`);

alter table `reviews`
  add constraint `reviews_fk3` foreign key (`prd_id`) references `products`(`prd_id`);

alter table `drinks`
  add constraint `drinks_fk1` foreign key (`menu_id`) references `menus`(`menu_id`);

alter table `booked_customize_fields`
  add constraint `booked_customize_fields_fk1` foreign key (`booked_id`) references `bookings`(`booked_id`);

alter table `booked_options`
  add constraint `booked_options_fk2` foreign key (`booked_id`) references `bookings`(`booked_id`);

alter table `booked_customize_fields`
  add constraint `booked_customize_fields_fk2` foreign key (`customize_field_id`,`pro_id`) references `customize_fields`(`customize_field_id`,`prd_id`);

alter table `menus`
  add constraint `menus_fk1` foreign key (`prd_id`) references `products`(`prd_id`);

alter table `products`
  add constraint `products_fk1` foreign key (`service_code`) references `master_services`(`service_code`);

alter table `schedule_photos`
  add constraint `schedule_photos_fk1` foreign key (`prd_id`) references `products`(`prd_id`);

alter table `booked_honey_moons`
  add constraint `booked_honey_moons_fk1` foreign key (`booked_id`) references `bookings`(`booked_id`);

alter table `booked_foods`
  add constraint `booked_foods_fk1` foreign key (`menu_id`) references `menus`(`menu_id`);

alter table `booked_foods`
  add constraint `booked_foods_fk2` foreign key (`booked_id`) references `bookings`(`booked_id`);

alter table `bookings`
  add constraint `bookings_fk2` foreign key (`plan_id`) references `plans`(`plan_id`);

alter table `plans`
  add constraint `plans_fk1` foreign key (`customer_id`) references `customers`(`customer_id`);

alter table `package_products`
  add constraint `package_products_fk1` foreign key (`package_id`) references `packages`(`package_id`);

alter table `package_products`
  add constraint `package_products_fk2` foreign key (`prd_id`) references `products`(`prd_id`);

alter table `foods`
  add constraint `foods_fk1` foreign key (`menu_id`) references `menus`(`menu_id`);

alter table `products`
  add constraint `products_fk2` foreign key (`vendor_service_id`) references `vendor_services`(`vendor_service_id`);

alter table `vendor_services`
  add constraint `vendor_services_fk1` foreign key (`service_code`) references `master_services`(`service_code`);

alter table `vendor_services`
  add constraint `vendor_services_fk2` foreign key (`vendor_id`) references `vendors`(`vendor_id`);

alter table `staffs`
  add constraint `staffs_fk1` foreign key (`vendor_id`) references `vendors`(`vendor_id`);

alter table `accounts`
  add constraint `accounts_fk3` foreign key (`role_id`) references `roles`(`role_id`);


#
# ALTER TABLE accounts MODIFY account_id int(11) NOT NULL auto_increment COMMENT 'account id';
# ALTER TABLE admins MODIFY id int(11) NOT NULL auto_increment;
# ALTER TABLE analysis MODIFY id int(11) NOT NULL auto_increment;
# ALTER TABLE bookings MODIFY booked_id int(11) NOT NULL auto_increment;
# ALTER TABLE booked_customize_fields MODIFY booked_cus_field_id int(11) NOT NULL auto_increment;
# ALTER TABLE booked_foods MODIFY booked_food_id int(11) NOT NULL auto_increment;
# ALTER TABLE booked_honey_moons MODIFY honey_id int(11) NOT NULL auto_increment;
# ALTER TABLE booked_options MODIFY booked_opt_id int(11) NOT NULL auto_increment;
# ALTER TABLE credits MODIFY credit_id int(11) NOT NULL auto_increment;
# ALTER TABLE customers MODIFY customer_id int(11) NOT NULL auto_increment;
# ALTER TABLE customize_fields MODIFY customize_field_id int(11) NOT NULL auto_increment;
# ALTER TABLE drinks MODIFY drink_id int(11) NOT NULL auto_increment;
# ALTER TABLE fees MODIFY fee_id int(11) NOT NULL auto_increment;
# ALTER TABLE foods MODIFY food_id int(11) NOT NULL auto_increment;
# ALTER TABLE images MODIFY img_id int(11) NOT NULL auto_increment;
# ALTER TABLE menus MODIFY menu_id int(11) NOT NULL auto_increment;
# ALTER TABLE options MODIFY option_id int(11) NOT NULL auto_increment;
# ALTER TABLE package_products MODIFY id int(11) NOT NULL auto_increment;
# ALTER TABLE packages MODIFY package_id int(11) NOT NULL auto_increment;
# ALTER TABLE plans MODIFY plan_id int(11) NOT NULL auto_increment;
# ALTER TABLE products MODIFY prd_id int(11) NOT NULL auto_increment;
# ALTER TABLE promotion_products MODIFY promotion_product_id int(11) NOT NULL auto_increment;
# ALTER TABLE promotions MODIFY promotion_id int(11) NOT NULL auto_increment;
# ALTER TABLE reviews MODIFY review_id int(11) NOT NULL auto_increment;
# ALTER TABLE roles MODIFY role_id int(11) NOT NULL auto_increment;
# ALTER TABLE schedule_photos MODIFY sche_id int(11) NOT NULL auto_increment;
# ALTER TABLE staffs MODIFY staff_id int(11) NOT NULL auto_increment;
# ALTER TABLE travel_products MODIFY honey_id int(11) NOT NULL auto_increment;
# ALTER TABLE vendor_services MODIFY vendor_service_id int(11) NOT NULL auto_increment;
# ALTER TABLE vendors MODIFY vendor_id int(11) NOT NULL auto_increment;
