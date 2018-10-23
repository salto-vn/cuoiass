#FROM php:7.1.16-apache-jessie
FROM rockerbom/cuoiass-base

ARG SRC_DIR=./web-vendor
ARG CONF_DIR=./docker/vendor/conf

# Setup Apache
COPY ${CONF_DIR}/apache/ports.conf /etc/apache2/ports.conf
COPY ${CONF_DIR}/apache/001-laravel.conf /etc/apache2/sites-available/001-web-vendor.conf
RUN ln /etc/apache2/sites-available/001-web-vendor.conf /etc/apache2/sites-enabled/001-web-vendor.conf \
  && rm /etc/apache2/sites-enabled/000-default.conf \
  && a2enmod rewrite headers

# Run Composer
COPY ${SRC_DIR}/composer.json /tmp
COPY ${SRC_DIR}/composer.lock /tmp

RUN cd /tmp \
    && COMPOSER_ALLOW_SUPERUSER=1 composer install --no-autoloader

# Setup laravel project
COPY ${SRC_DIR} /var/www/web-vendor
RUN mv /tmp/vendor /var/www/web-vendor/vendor \
    && rm /tmp/composer.*
RUN cd /var/www/web-vendor \
    && COMPOSER_ALLOW_SUPERUSER=1 composer dump-autoload

# Setup healthcheck
#COPY ${CONF_DIR}/apache/healthcheck /var/www/laravel/public

# Setup Permission
RUN mkdir /var/www/storage \
    && mkdir -p /var/www/storage/logs \
    && ln -s /var/www/storage/logs /var/www/web-vendor/storage/logs \
    && chown -R www-data:www-data /var/www/web-vendor \
    && chmod 775 -R /var/www/web-vendor/storage


# Instal package
RUN cd /var/www/web-vendor \
    && npm install