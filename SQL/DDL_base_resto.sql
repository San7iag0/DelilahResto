CREATE DATABASE `base_resto`;

USE `base_resto`;

CREATE TABLE `products` (
  `productsId` int(10) NOT NULL AUTO_INCREMENT,
  `productName` varchar(60) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  PRIMARY KEY (`productsId`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `orders` (
  `orderId` int(11) NOT NULL AUTO_INCREMENT,
  `products` varchar(45) NOT NULL,
  `address` varchar(60) NOT NULL,
  `userId` int(10) NOT NULL,
  PRIMARY KEY (`orderId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `users` (
  `userId` int(10) NOT NULL AUTO_INCREMENT,
  `UserName` varchar(45) NOT NULL,
  `fullName` varchar(60) NOT NULL,
  `email` varchar(45) NOT NULL,
  `phone` decimal(20,0) NOT NULL,
  `address` varchar(80) DEFAULT NULL,
  `admin` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `ord_vs_prod` (
  `orderId` int(11) NOT NULL,
  `productsId` int(11) NOT NULL,
  KEY `productsId` (`productsId`),
  KEY `orderId` (`orderId`),
  CONSTRAINT `orderId` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `productsId` FOREIGN KEY (`productsId`) REFERENCES `products` (`productsId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='This table relate Products and Orders, in a Many to Many relationshipt';

GRANT INSERT, SELECT ON `base_resto`.`orders` to 'santi'@`localhost`;
GRANT INSERT, UPDATE, DELETE, SELECT ON `base_resto`.`products` to 'santi'@`localhost`;
GRANT INSERT, UPDATE, DELETE, SELECT ON `base_resto`.`users` to 'santi'@`localhost`;
GRANT INSERT, UPDATE, DELETE, SELECT ON `base_resto`.`orders` to 'santi'@`localhost`;
GRANT INSERT, UPDATE, DELETE, SELECT ON `base_resto`.`ord_vs_prod` to 'santi'@`localhost`;

##CREATE USER 'santi'@'localhost' IDENTIFIED BY 'password';