CREATE DATABASE IF NOT EXISTS `development`
DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

USE `development`;

CREATE TABLE `collection` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `value` varchar(256) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;