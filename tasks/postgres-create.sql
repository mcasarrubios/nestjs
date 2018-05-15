CREATE TABLE product(id SERIAL PRIMARY KEY, name TEXT NOT NULL, description TEXT NOT NULL);
ALTER TABLE product OWNER TO devuser;

CREATE TABLE "user"(id SERIAL PRIMARY KEY, email TEXT, "firstName" TEXT, "lastName" TEXT, roles TEXT);
ALTER TABLE "user" OWNER TO devuser;
