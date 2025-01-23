# Use the official PHP image from the Docker Hub
FROM php:8.1-apache

# Install necessary PHP extensions for databases not needed here
# RUN docker-php-ext-install mysqli pdo pdo_mysql

# Enable mod_rewrite for Apache. The mod_rewrite module allows for URL rewriting, which is often used for creating clean URLs and handling routing in web applications.
RUN a2enmod rewrite

# Copy the application code to the Apache document root
COPY . /var/www/html/

# Set the working directory
WORKDIR /var/www/html/

# Expose port 80
EXPOSE 80

# Start Apache in the foreground
CMD ["apache2-foreground"]