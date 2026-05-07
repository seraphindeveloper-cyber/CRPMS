-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 04, 2026 at 05:27 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crpms`
--

-- --------------------------------------------------------

--
-- Table structure for table `car`
--

CREATE TABLE `car` (
  `plateNumber` varchar(50) NOT NULL,
  `type` varchar(20) DEFAULT NULL,
  `model` varchar(20) DEFAULT NULL,
  `driver_phone` int(15) DEFAULT NULL,
  `manufactured_year` date DEFAULT NULL,
  `mechanic_name` varchar(30) DEFAULT NULL,
  `user_id` int(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `car`
--

INSERT INTO `car` (`plateNumber`, `type`, `model`, `driver_phone`, `manufactured_year`, `mechanic_name`, `user_id`) VALUES
('RW01R', 'toyota', 'corolla', 794954648, '2026-05-03', 'OIL change', 4),
('RW02R', 'BMW', 'BMW', 794954648, '2026-05-03', 'OIL change', 5);

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `paymentNumber` int(50) NOT NULL,
  `amountPaid` float DEFAULT NULL,
  `paymentDate` date DEFAULT NULL,
  `recordNumber` int(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `serviceCode` varchar(50) NOT NULL,
  `serviceName` varchar(20) DEFAULT NULL,
  `servicePrice` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`serviceCode`, `serviceName`, `servicePrice`) VALUES
('001', 'Brake Repair and Ins', 20),
('002', 'Oil Change and Filte', 20);

-- --------------------------------------------------------

--
-- Table structure for table `servicesrecord`
--

CREATE TABLE `servicesrecord` (
  `recordNumber` int(50) NOT NULL,
  `serviceDate` date DEFAULT NULL,
  `serviceCode` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(50) NOT NULL,
  `user_name` varchar(30) NOT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `password`) VALUES
(4, 'seraphin', '$2b$10$gHqIX/WHqyF4KL4ZEC63.OxpjMzOjYkip58RWYmiiixCcPhDvArHm'),
(5, 'emme', '$2b$10$CRwuyN8uMIv.3RTdtAVno.hRUXJ/dqAv5xkfmp0wjbLENqCP.Hywa'),
(6, 'kenny', '$2b$10$joO1w7a70taIaFWHnMEhFOx3XG8rSCc07YPyZSMHm9VR8b.I791hq');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `car`
--
ALTER TABLE `car`
  ADD PRIMARY KEY (`plateNumber`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`paymentNumber`),
  ADD UNIQUE KEY `recordNumber` (`recordNumber`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`serviceCode`);

--
-- Indexes for table `servicesrecord`
--
ALTER TABLE `servicesrecord`
  ADD PRIMARY KEY (`recordNumber`),
  ADD KEY `serviceCode` (`serviceCode`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `paymentNumber` int(50) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `servicesrecord`
--
ALTER TABLE `servicesrecord`
  MODIFY `recordNumber` int(50) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `car`
--
ALTER TABLE `car`
  ADD CONSTRAINT `car_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`recordNumber`) REFERENCES `servicesrecord` (`recordNumber`);

--
-- Constraints for table `servicesrecord`
--
ALTER TABLE `servicesrecord`
  ADD CONSTRAINT `servicesrecord_ibfk_1` FOREIGN KEY (`serviceCode`) REFERENCES `services` (`serviceCode`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
