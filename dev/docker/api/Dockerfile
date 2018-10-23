#FROM php:7.1.16-apache-jessie
FROM rockerbom/cuoiass-base
ARG SRC_DIR=./cuoiass-api
ARG CONF_DIR=./docker/api/conf

# Setup Apache
COPY ${CONF_DIR}/apache/ports.conf /etc/apache2/ports.conf
COPY ${CONF_DIR}/apache/001-laravel.conf /etc/apache2/sites-available/001-laravel.conf
#RUN mkdir /etc/apache2/sites-enabled/
RUN ln /etc/apache2/sites-available/001-laravel.conf /etc/apache2/sites-enabled/001-laravel.conf \
  && rm /etc/apache2/sites-enabled/000-default.conf \
  && a2enmod rewrite headers

# Run Composer
COPY ${SRC_DIR}/composer.json /tmp
COPY ${SRC_DIR}/composer.lock /tmp

RUN cd /tmp \
    && COMPOSER_ALLOW_SUPERUSER=1 composer install --no-autoloader

# Setup laravel
COPY ${SRC_DIR} /var/www/laravel
RUN mv /tmp/vendor /var/www/laravel/vendor \
    && rm /tmp/composer.*
RUN cd /var/www/laravel \
    && COMPOSER_ALLOW_SUPERUSER=1 composer dump-autoload

# Setup healthcheck
#COPY ${CONF_DIR}/apache/healthcheck /var/www/laravel/public

# Setup Permission
RUN mkdir /var/www/storage \
    && mkdir -p /var/www/storage/logs \
    && ln -s /var/www/storage/logs /var/www/laravel/storage/logs \
    && chown -R www-data:www-data /var/www/laravel \
    && chmod 775 -R /var/www/laravel/storage
