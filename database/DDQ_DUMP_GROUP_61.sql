-- MariaDB dump 10.19  Distrib 10.4.20-MariaDB, for Linux (x86_64)
--
-- Host: classmysql.engr.oregonstate.edu    Database: cs340_murphbra
-- ------------------------------------------------------
-- Server version	10.4.20-MariaDB-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `CompletedLandscapingSessions`
--

DROP TABLE IF EXISTS `CompletedLandscapingSessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CompletedLandscapingSessions` (
  `sessionID` int(11) NOT NULL AUTO_INCREMENT,
  `sessionDate` date NOT NULL,
  `propertyID` int(11) NOT NULL,
  PRIMARY KEY (`sessionID`),
  UNIQUE KEY `sess_ID` (`sessionID`),
  KEY `propertyID` (`propertyID`),
  CONSTRAINT `CompletedLandscapingSessions_ibfk_1` FOREIGN KEY (`propertyID`) REFERENCES `Properties` (`propertyID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CompletedLandscapingSessions`
--

LOCK TABLES `CompletedLandscapingSessions` WRITE;
/*!40000 ALTER TABLE `CompletedLandscapingSessions` DISABLE KEYS */;
INSERT INTO `CompletedLandscapingSessions` VALUES (1,'2021-05-21',1),(2,'2021-06-17',2);
/*!40000 ALTER TABLE `CompletedLandscapingSessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CrewLeaders`
--

DROP TABLE IF EXISTS `CrewLeaders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CrewLeaders` (
  `leaderID` int(11) NOT NULL AUTO_INCREMENT,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `phoneNumber` int(11) NOT NULL,
  `propertyID` int(11) NOT NULL,
  PRIMARY KEY (`leaderID`),
  UNIQUE KEY `lead_ID` (`leaderID`),
  KEY `propertyID` (`propertyID`),
  CONSTRAINT `CrewLeaders_ibfk_1` FOREIGN KEY (`propertyID`) REFERENCES `Properties` (`propertyID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CrewLeaders`
--

LOCK TABLES `CrewLeaders` WRITE;
/*!40000 ALTER TABLE `CrewLeaders` DISABLE KEYS */;
INSERT INTO `CrewLeaders` VALUES (3,'Brayden','Murphy',1234567891,1),(4,'Joseph','Costello',2147483647,2);
/*!40000 ALTER TABLE `CrewLeaders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Employees`
--

DROP TABLE IF EXISTS `Employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Employees` (
  `employeeID` int(11) NOT NULL AUTO_INCREMENT,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `phoneNumber` int(11) NOT NULL,
  `leaderID` int(11) NOT NULL,
  PRIMARY KEY (`employeeID`),
  UNIQUE KEY `emp_ID` (`employeeID`),
  KEY `leaderID` (`leaderID`),
  CONSTRAINT `Employees_ibfk_1` FOREIGN KEY (`leaderID`) REFERENCES `CrewLeaders` (`leaderID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Employees`
--

LOCK TABLES `Employees` WRITE;
/*!40000 ALTER TABLE `Employees` DISABLE KEYS */;
INSERT INTO `Employees` VALUES (5,'Jack','Hill',2147483647,3),(6,'Jill','Hill',2147483647,4);
/*!40000 ALTER TABLE `Employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Properties`
--

DROP TABLE IF EXISTS `Properties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Properties` (
  `propertyID` int(11) NOT NULL AUTO_INCREMENT,
  `propAddress` varchar(255) NOT NULL,
  PRIMARY KEY (`propertyID`),
  UNIQUE KEY `prop_ID` (`propertyID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Properties`
--

LOCK TABLES `Properties` WRITE;
/*!40000 ALTER TABLE `Properties` DISABLE KEYS */;
INSERT INTO `Properties` VALUES (1,'123 South Street'),(2,'456 North Main Street');
/*!40000 ALTER TABLE `Properties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PropertyOwned`
--

DROP TABLE IF EXISTS `PropertyOwned`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PropertyOwned` (
  `propertyID` int(11) NOT NULL,
  `ownerID` int(11) NOT NULL,
  PRIMARY KEY (`propertyID`,`ownerID`),
  UNIQUE KEY `prop_ID` (`propertyID`),
  KEY `fk_own` (`ownerID`),
  CONSTRAINT `fk_own` FOREIGN KEY (`ownerID`) REFERENCES `PropertyOwners` (`ownerID`),
  CONSTRAINT `fk_prop` FOREIGN KEY (`propertyID`) REFERENCES `Properties` (`propertyID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PropertyOwned`
--

LOCK TABLES `PropertyOwned` WRITE;
/*!40000 ALTER TABLE `PropertyOwned` DISABLE KEYS */;
/*!40000 ALTER TABLE `PropertyOwned` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PropertyOwners`
--

DROP TABLE IF EXISTS `PropertyOwners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PropertyOwners` (
  `ownerID` int(11) NOT NULL AUTO_INCREMENT,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`ownerID`),
  UNIQUE KEY `own_ID` (`ownerID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PropertyOwners`
--

LOCK TABLES `PropertyOwners` WRITE;
/*!40000 ALTER TABLE `PropertyOwners` DISABLE KEYS */;
INSERT INTO `PropertyOwners` VALUES (1,'John','Smith','johnsmith@gmail.com'),(2,'Jane','Doe','janedoe@yahoo.com');
/*!40000 ALTER TABLE `PropertyOwners` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-26 16:52:03
