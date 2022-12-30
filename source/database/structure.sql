CREATE DATABASE IF NOT EXISTS `development`
DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

USE `development`;

CREATE TABLE `collection` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `title` varchar(256) NOT NULL DEFAULT '',
  `badge` int(8) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

CREATE TABLE `syncCollection` (
  `$key` varchar(36) NOT NULL,
  `$updated` bigint(14) NOT NULL,
  `$synchronized` bigint(14) NOT NULL,
  `$deleted` tinyint(1) NOT NULL DEFAULT 0,
  `title` varchar(256) NOT NULL DEFAULT '',
  `badge` int(8) NOT NULL DEFAULT 0,
  PRIMARY KEY (`$key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;