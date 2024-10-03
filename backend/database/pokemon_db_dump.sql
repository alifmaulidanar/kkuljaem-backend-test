-- MySQL dump 10.13  Distrib 8.0.39, for Win64 (x86_64)
--
-- Host: localhost    Database: pokemon_db
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `pokemon`
--

DROP TABLE IF EXISTS `pokemon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pokemon` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `pokemon_id` int NOT NULL,
  `originalName` varchar(50) DEFAULT NULL,
  `initialName` varchar(50) DEFAULT NULL,
  `nickname` varchar(50) DEFAULT NULL,
  `rename_count` int DEFAULT '0',
  `is_released` tinyint(1) DEFAULT '0',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `caught_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `released_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `pokemon_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pokemon`
--

LOCK TABLES `pokemon` WRITE;
/*!40000 ALTER TABLE `pokemon` DISABLE KEYS */;
INSERT INTO `pokemon` VALUES (1,1,106,'Charmander','Mighty Charmander-0','Mighty Charmander-0',0,0,'2024-10-03 01:34:28','2024-10-03 01:34:28',NULL),(2,1,40,'Charmander','Mighty Charmander-0','Mighty Charmander-2',3,0,'2024-10-03 01:34:28','2024-10-03 01:34:28',NULL),(3,1,140,'Bulbasaur','Mighty Bulbasaur-0','Mighty Bulbasaur-1',1,0,'2024-10-03 01:34:28','2024-10-03 01:34:28',NULL),(4,1,147,'Charmander','Mighty Charmander-0','Mighty Charmander-1',2,0,'2024-10-03 01:34:28','2024-10-03 01:34:28',NULL),(5,2,107,'Eevee','Mighty Eevee-0','Mighty Eevee-2',3,0,'2024-10-03 01:34:28','2024-10-03 01:34:28',NULL),(6,3,119,'Eevee','Mighty Eevee-0','Mighty Eevee-0',0,0,'2024-10-03 01:34:28','2024-10-03 01:34:28',NULL),(7,3,88,'Bulbasaur','Mighty Bulbasaur-0','Mighty Bulbasaur-1',1,0,'2024-10-03 01:34:28','2024-10-03 01:34:28',NULL);
/*!40000 ALTER TABLE `pokemon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'trainer_ash','ash@poke.com','$2b$10$XltClWgUgFhEPaRKXFvMtOciXmNQBiFM8BKd64vE4H1js0SX66BWG','2024-10-03 01:33:38','2024-10-03 01:33:38'),(2,'trainer_misty','misty@poke.com','$2b$10$ZEu0n8kwMTbk7ct2g1hOzuz9aeBudjV.23CwnJaUiqottj1lSV2qO','2024-10-03 01:33:56','2024-10-03 01:33:56'),(3,'trainer_brock','brock@poke.com','$2b$10$4gceg9KKgvd8yst6eVlXtOt6MviffFaMc/T3YOrFzwNNFopluLd32','2024-10-03 01:34:17','2024-10-03 01:34:17');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-03  8:38:21
