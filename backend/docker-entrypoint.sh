#!/bin/bash
set -e

# Gera .env no host se não existir
if [ ! -f /var/www/html/.env ]; then
    echo "Criando .env a partir de .env.example"
    cp /var/www/html/.env.example /var/www/html/.env
    echo "Gerando APP_KEY"
    php /var/www/html/artisan key:generate
fi

# Executa o comando original do CMD
exec "$@"
