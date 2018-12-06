--- Schema
DROP DATABASE IF EXISTS automentor_db;

CREATE DATABASE automentor_db;
USE automentor_db;


-- note: you should let sequelize to generate the tables instead

CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `role` (`role`)
);

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `permissionId` int(11) DEFAULT NULL,
  `departmentId` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `permissionId` (`permissionId`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`permissionId`) REFERENCES `roles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
);


CREATE TABLE `quizzes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `categoryId` int(11) DEFAULT NULL,
  `typeId` int(11) DEFAULT NULL,
  `question` varchar(255) DEFAULT NULL,
  `choices` varchar(255) DEFAULT NULL,
  `answer` varchar(255) DEFAULT NULL,
  `nextId` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
);


CREATE TABLE `results` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `quizId` int(11) NOT NULL,
  `userAnswer` varchar(255) DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `userId` (`userId`),
  KEY `quizId` (`quizId`),
  CONSTRAINT `results_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `results_ibfk_2` FOREIGN KEY (`quizId`) REFERENCES `quizzes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE INDEX idx_users_username ON users (username);
CREATE INDEX idx_users_name ON users (firstName, lastName); 
CREATE INDEX idx_users_email ON users (email);
CREATE INDEX idx_quizzes_category_id ON quizzes (categoryId);
CREATE INDEX idx_quizzes_type_id ON quizzes (typeId); 
CREATE INDEX idx_quizzes_question ON quizzes (question);
CREATE INDEX idx_quizzes_choices ON quizzes (choices);
CREATE INDEX idx_quizzes_answer ON quizzes (answer);
CREATE INDEX idx_quizzes_next ON quizzes (nextId);
CREATE INDEX idx_results_user_answer ON results (userAnswer);
CREATE INDEX idx_results_score ON results (score);
