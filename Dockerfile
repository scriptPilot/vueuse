# Use Apache PHP as basis container
FROM php:8.1-apache

# Install MySQLi
RUN docker-php-ext-install mysqli
RUN docker-php-ext-install pdo
RUN docker-php-ext-install pdo_mysql