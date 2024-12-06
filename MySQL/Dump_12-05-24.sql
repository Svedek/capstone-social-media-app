CREATE DATABASE  IF NOT EXISTS `uwmsoc` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `uwmsoc`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: uwmsoc
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `event_info`
--

DROP TABLE IF EXISTS `event_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_info` (
  `event_info_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(64) NOT NULL,
  `location` varchar(128) DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  PRIMARY KEY (`event_info_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `event_rsvp`
--

DROP TABLE IF EXISTS `event_rsvp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_rsvp` (
  `event_rsvp_id` int NOT NULL AUTO_INCREMENT,
  `event_rsvp_user_id` int NOT NULL,
  `event_rsvp_event_info_id` int NOT NULL,
  PRIMARY KEY (`event_rsvp_id`),
  UNIQUE KEY `id_UNIQUE` (`event_rsvp_id`),
  KEY `user_idx` (`event_rsvp_user_id`),
  KEY `event_rsvp_event_info__id_idx` (`event_rsvp_event_info_id`),
  CONSTRAINT `event_rsvp_event_info__id` FOREIGN KEY (`event_rsvp_event_info_id`) REFERENCES `event_info` (`event_info_id`),
  CONSTRAINT `event_rsvp_user_id` FOREIGN KEY (`event_rsvp_user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `login_info`
--

DROP TABLE IF EXISTS `login_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login_info` (
  `login_info_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(128) NOT NULL,
  `hash` varchar(128) NOT NULL,
  `salt` varchar(64) NOT NULL,
  PRIMARY KEY (`login_info_id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `post_owner_user_id` int DEFAULT NULL,
  `post_parent_post_id` int DEFAULT NULL,
  `post_event_info_id` int DEFAULT NULL,
  `text` varchar(200) NOT NULL,
  `time_posted` datetime NOT NULL,
  PRIMARY KEY (`post_id`),
  UNIQUE KEY `idnew_table_UNIQUE` (`post_id`),
  KEY `owner_idx` (`post_owner_user_id`),
  KEY `parent_post_idx` (`post_parent_post_id`),
  KEY `post_event_info_id_idx` (`post_event_info_id`),
  CONSTRAINT `post_event_info_id` FOREIGN KEY (`post_event_info_id`) REFERENCES `event_info` (`event_info_id`),
  CONSTRAINT `post_owner_user_id` FOREIGN KEY (`post_owner_user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `post_parent_post_id` FOREIGN KEY (`post_parent_post_id`) REFERENCES `post` (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `post_like`
--

DROP TABLE IF EXISTS `post_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_like` (
  `post_like_id` int NOT NULL AUTO_INCREMENT,
  `post_like_user_id` int NOT NULL,
  `post_like_post_id` int NOT NULL,
  PRIMARY KEY (`post_like_id`),
  UNIQUE KEY `id_UNIQUE` (`post_like_id`),
  KEY `user_idx` (`post_like_user_id`),
  KEY `post_idx` (`post_like_post_id`),
  CONSTRAINT `post_like_post_id` FOREIGN KEY (`post_like_post_id`) REFERENCES `post` (`post_id`),
  CONSTRAINT `post_like_user_id` FOREIGN KEY (`post_like_user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_login_info_id` int NOT NULL,
  `major` varchar(64) DEFAULT NULL,
  `bio` varchar(200) DEFAULT '',
  `first_name` varchar(32) NOT NULL,
  `last_name` varchar(32) NOT NULL,
  `join_date` date NOT NULL,
  PRIMARY KEY (`user_id`),
  KEY `_idx` (`user_login_info_id`) /*!80000 INVISIBLE */,
  CONSTRAINT `user_login_info_id` FOREIGN KEY (`user_login_info_id`) REFERENCES `login_info` (`login_info_id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-25 21:20:51
