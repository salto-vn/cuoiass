# Cưới Assistant-Trợ lý đám cưới của bạn
# Dịch vụ kết nôi cặp đôi chuẩn bị đám cưới và các dịch vụ của các nhà cung cấp
## Overview
* laravel 5.7
* PHP >= 7.1.3

## Requirements
* Docker
* Docker Composer
* Google Cloud SDK //TODO:
    * Access to vds-amc-client project is needed to pull/push docker images. Please ask project admin for permission.

### Installation 
#### Local PHP & Laravel
* PHP http://php.net/manual/en/install.php
* laravel https://laravel.com/docs/5.7/installation#installing-laravel
* composer https://getcomposer.org/doc/00-intro.md

#### Docker & Docker Compose
* Windows https://docs.docker.com/docker-for-windows/install
* Mac https://docs.docker.com/docker-for-mac/install/
* Docker Compose is included with Docker for Windows/Mac

## Development
### Folder structure

```
    .
    ├── dev               // Source code and docker
    │   └── cuoiass-api   // Laravel Source API, connect to DB and provide API for other systems
    │   └── db            // Local Database Mysql
    │   └── docker        // Docker folder for all subsystems
    │   │   ├── admin     // Docker for web admin
    │   │   ├── api       // Docker for api
    │   │   ├── base      // Docker for project base packages, build image
    │   │   ├── batch     // TODO: Docker for batch
    │   │   ├── db        // Docker for DB
    │   │   ├── front     // Docker for web front
    │   │   ├── vendor    // Docker for web vendor
    │   └── web-admin     // Laravel Source web admin for Administration
    │   └── web-front     // Laravel Source web customer(Cap doi) for Cặp đôi dùng để booking dịch vụ
    │   └── web-vendor    // Laravel Source web vendor(Nha cung cap) for nhà cung cấp dùng để quản lý booking và sản phẩm
    ├── misc              // TODO: Deploy source
    
```

### LOCAL Implement environment
* Build container docker  cuoi_api,cuoi_db, cuoi_admin, cuoi_front
```
# cuoiass/dev
docker-compose build
```

* Startup docker 
```
# cuoiass/dev
docker-compose up
```

* Init PHP libs
```
# cuoiass/dev/xxxx : each project source
composer install
```

* Update PHP libs
```
# cuoiass/dev/xxxx : each project source
composer update
git add composer.lock
git commit -am "commit composer.lock"
```

* Initial DB for API with
```
docker exec -t cuoi_api php /var/www/laravel/artisan migrate
```

* Migrate DB with
```
docker exec -t cuoi_api php /var/www/laravel/artisan migrate:fresh
```

* Browse cuoi-api at http://localhost:1234
* Browse web-admin at http://localhost:1235
* Browse web-front at http://localhost:1236
* Browse web-vendor at http://localhost:1237

* Update new app.js, app.css by npm command, run on terminal , support for code
```
# cuoiass/dev/xxxx : each project source
npm run watch
```

```
Ouput like this
 DONE  Compiled successfully in 6661ms                                                                                                                                                                      3:57:14 PM
                                                                                                                                                                                                                Asset     Size  Chunks                    Chunk Names
/js/app.js  1.84 MB       0  [emitted]  [big]  /js/app
/css/app.css   198 kB       0  [emitted]         /js/app
```




#### Connect to DB
* You can connect to DB with
```
mysql -h 127.0.0.1 -P23306 -u cass_admin -p -Dcass
```

#### Running Unit Test
* TODO: use phpunit at local

### How to run this batch
* TODO:

### Server Environment
#### Deploy command
* TODO: