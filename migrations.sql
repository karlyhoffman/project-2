create database cameraless_concerts;
use cameraless_concerts;

CREATE USER 'ccdba'@'localhost' IDENTIFIED BY 'cameraless_concerts';
GRANT ALL PRIVILEGES ON cameraless_concerts.* TO 'ccdba'@'localhost';

create table user_accounts (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(61) NOT NULL,
    PRIMARY KEY (id)
);

create table photos (
    id INT NOT NULL AUTO_INCREMENT,
    location INT NOT NULL VARCHAR(60),
    artist INT NOT NULL VARCHAR(60),
    user_account_id INT NOT NULL REFERENCES user_accounts(id),
    image_as_base64 LONGTEXT,
    PRIMARY KEY (id)
);