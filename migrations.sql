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

create tables user_faves (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL REFERENCES user_accounts(id),
    search_id INT NOT NULL REFERENCES search_pairs(id),
    PRIMARY KEY (id)
);

create table search_pairs (
    id INT NOT NULL AUTO_INCREMENT,
    location VARCHAR(30),
    artist VARCHAR(30),
    PRIMARY KEY (id)
);


insert into user_accounts (email, password_hash) VALUES ('','');
insert into search_pairs (location, artist) VALUES ('','');

select * from ;