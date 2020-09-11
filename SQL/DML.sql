/*
-- Query: SELECT * FROM base_resto.users
LIMIT 0, 1000

-- Date: 2020-07-26 16:58
*/
INSERT INTO `users` (`userId`,`UserName`,`fullName`,`email`,`phone`,`address`,`admin`) VALUES (4,'Santi','Beja P','santi@email.com',345678,NULL,0);
INSERT INTO `users` (`userId`,`UserName`,`fullName`,`email`,`phone`,`address`,`admin`) VALUES (5,'Pepita','smith','pep@email.com',345678,NULL,0);

INSERT INTO `base_resto`.`orders` (`products`, `address`, `userId`) VALUES ('yuca', 'asdfasdf asdf', '5');
INSERT INTO `base_resto`.`orders` (`products`, `address`, `userId`) VALUES ('papa', 'asdfasdf asdf', '4');
