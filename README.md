# crud-app-backend

replace the development details in the knex file with your connection details for the postgres db

then setup docker:

1) docker pull postgres
2) mkdir -p $HOME/docker/volumes/postgres
3) docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres
4) docker exec -t container-id bash
5) psql -U postgres
6) CREATE DATABASE users
7) \c users

