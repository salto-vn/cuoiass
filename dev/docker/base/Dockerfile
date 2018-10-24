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
    && apt-get install -y wget curl

RUN wget -qO- https://deb.nodesource.com/setup_8.x | bash -

RUN apt-get install -y nodejs build-essential

# confirm installation
RUN node -v
RUN npm -v

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update && apt-get install yarn