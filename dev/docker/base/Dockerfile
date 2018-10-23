FROM php:7.1.16-apache-jessie

# Install mysql, gd support
RUN apt-get update \
    && apt-get install -y libpq-dev libpng-dev \
    && docker-php-ext-install pdo_mysql pdo_pgsql gd

# Install Composer
RUN apt-get update && apt-get install -y zip unzip
COPY bin/composer /usr/local/bin/composer
RUN chmod a+x /usr/local/bin/composer

# Install Yarn & node
RUN apt-get update \
    && apt-get install -y wget

RUN wget -qO- https://deb.nodesource.com/setup_8.x | bash -

RUN apt-get install -y nodejs build-essential

# confirm installation
RUN node -v
RUN npm -v
