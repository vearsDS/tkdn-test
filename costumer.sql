CREATE DATABASE tkdn_costumer;

-- ALTER DATABASE tkdn_costumer OWNER TO dev;


CREATE TYPE gender as ENUM ('MALE', 'FEMALE`')

CREATE TABLE Costumers (
    id serial PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(50) NOT NULL,
    password VARCHAR(500),
    gender gender,
    is_married BOOLEAN default false,
    address VARCHAR(500),
    createdAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updatedAt TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

