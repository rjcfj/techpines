#!/bin/bash
set -e

# Gera .env no host se não existir
if [ ! -f /var/www/html/.env ]; then
    echo "Criando .env a partir de .env.example"
    cp /var/www/html/.env.example /var/www/html/.env
    echo "Gerando APP_KEY"
    php /var/www/html/artisan key:generate
fi

# Roda migrate e seed
php artisan migrate --force
php artisan db:seed --force

# Finalmente roda o servidor
php artisan serve --host=0.0.0.0 --port=8000

# Executa o comando original do CMD
exec "$@"
