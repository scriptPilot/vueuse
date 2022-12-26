CREATE DATABASE IF NOT EXISTS `development`
DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

USE `development`;

CREATE TABLE `collection` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `title` varchar(256) NOT NULL DEFAULT '',
  `badge` int(8) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;