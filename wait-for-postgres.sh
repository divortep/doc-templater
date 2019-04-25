#!/bin/sh
# wait-for-postgres.sh

set -e

host="$1"
password="$2"
shift 2
cmd="$@"

until psql postgresql://postgres:$password@$host/postgres -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up - executing command"
exec $cmd