FROM php:8.3-apache

RUN apt-get update && apt-get install -y \
    libonig-dev vim wget \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libwebp-dev \
    libxpm-dev \
    software-properties-common \
    zip unzip \
    && docker-php-ext-install pdo_mysql mysqli \
    && docker-php-ext-configure gd \
      --with-freetype \
      --with-jpeg \
      --with-webp \
      --with-xpm

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY ../apache/000-default.conf /etc/apache2/sites-available/000-default.conf

RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

RUN echo "date.timezone = Asia/Tokyo" >> /usr/local/etc/php/php.ini

RUN  a2enmod rewrite

EXPOSE 80