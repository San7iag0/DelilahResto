#Users table
CREATE DATABASE IF NOT exists base_Resto;

#SELECIONAR 
USE base_Resto;

#Created tables 
#created tables without relationwsips

CREATE TABLE IF NOT EXISTS users(
	userId INT(10) NOT NULL AUTO_INCREMENT,
    UserName varchar(45) NOT NULL, 
    fullName varchar(60) NOT NULL,
    email varchar(45) NOT NULL,
    phone numeric(20) NOT NULL,
    address varchar(80),
    admin BOOLEAN DEFAULT FALSE,
    PRIMARY KEY(userId)
)ENGINE = INNODB; 

CREATE TABLE IF NOT EXISTS orders(
	orderId INT(10)NOT NULL AUTO_INCREMENT,
    products VARCHAR(60) NOT NULL,
    address VARCHAR(60) NOT NULL,
    description VARCHAR(100) NOT NULL,
    userId INT(10) NOT NULL,
    PRIMARY KEY(orderId),
	FOREIGN KEY (userId)
	REFERENCES `base_resto`.`users` (`userId`)
)ENGINE = INNODB;

CREATE TABLE IF NOT EXISTS `base_resto`.`ord vs prod` (
	orderId INT NOT NULL,
	productsId INT NOT NULL,
	CONSTRAINT `productsId`
    FOREIGN KEY (`productsId`)
    REFERENCES `base_resto`.`products` (`productsId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `orderId`
    FOREIGN KEY (`orderId`)
    REFERENCES `base_resto`.`orders` (`orderId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)ENGINE = INNODB,
COMMENT = 'This table relate Products and Orders, in a Many to Many relationshipt';

DROP TABLE IF EXISTS produtcs;
CREATE TABLE IF NOT EXISTS products(
	productsId INT(10) NOT NULL AUTO_INCREMENT,
    productName VARCHAR(60) NOT NULL,
    price numeric NOT NULL,
    PRIMARY KEY(productsId)
)ENGINE = INNODB;
