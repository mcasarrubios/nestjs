CREATE TABLE product(id SERIAL PRIMARY KEY, name TEXT NOT NULL, description TEXT NOT NULL);

CREATE TABLE "user"(id SERIAL PRIMARY KEY, email TEXT, "firstName" TEXT, "lastName" TEXT, roles TEXT);
