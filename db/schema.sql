DROP DATABASE IF EXISTS lil_url;

CREATE DATABASE lil_url;

USE lil_url;

CREATE TABLE encoded (
    id INT AUTO_INCREMENT,
    pathname VARCHAR(20),
    PRIMARY KEY(id)
);

