-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 06, 2026 at 07:11 PM
-- Server version: 10.11.18-MariaDB-cll-lve
-- PHP Version: 8.4.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rashaiix_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `id` int(11) NOT NULL,
  `sub_city` varchar(100) DEFAULT NULL,
  `woreda` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `coach`
--

CREATE TABLE `coach` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `b_date` date DEFAULT NULL,
  `address_id` int(11) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `ras_id` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `coach_schedules`
--

CREATE TABLE `coach_schedules` (
  `coach_id` int(11) NOT NULL,
  `schedule_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `coach_training_types`
--

CREATE TABLE `coach_training_types` (
  `coach_id` int(11) NOT NULL,
  `training_type_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `health`
--

CREATE TABLE `health` (
  `id` int(11) NOT NULL,
  `member_id` int(11) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `weight` int(11) DEFAULT NULL,
  `issue` varchar(255) DEFAULT NULL,
  `injury` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `b_date` date DEFAULT NULL,
  `address_id` int(11) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `ras_id` varchar(25) DEFAULT NULL,
  `payment_status` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `member_coaches`
--

CREATE TABLE `member_coaches` (
  `member_id` int(11) NOT NULL,
  `coach_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `member_emergency_contacts`
--

CREATE TABLE `member_emergency_contacts` (
  `id` int(11) NOT NULL,
  `member_id` int(11) NOT NULL,
  `contact_name` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `relationship` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `member_schedules`
--

CREATE TABLE `member_schedules` (
  `member_id` int(11) NOT NULL,
  `schedule_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `member_training_types`
--

CREATE TABLE `member_training_types` (
  `member_id` int(11) NOT NULL,
  `training_type_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `member_ras_id` varchar(25) NOT NULL,
  `provider` varchar(30) NOT NULL,
  `transaction_reference` varchar(100) NOT NULL,
  `payer_name` varchar(255) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payment_date` datetime NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `refresh_tokens`
--

CREATE TABLE `refresh_tokens` (
  `id` int(11) NOT NULL,
  `user_id` varchar(25) NOT NULL,
  `token` text NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `expires_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `id` int(11) NOT NULL,
  `date` varchar(100) DEFAULT NULL,
  `time` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `training_type`
--

CREATE TABLE `training_type` (
  `id` int(11) NOT NULL,
  `t_type` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(25) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('admin','coach','member') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coach`
--
ALTER TABLE `coach`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ras_id` (`ras_id`),
  ADD UNIQUE KEY `ras_id_2` (`ras_id`),
  ADD KEY `address_id` (`address_id`);

--
-- Indexes for table `coach_schedules`
--
ALTER TABLE `coach_schedules`
  ADD PRIMARY KEY (`coach_id`,`schedule_id`),
  ADD KEY `schedule_id` (`schedule_id`);

--
-- Indexes for table `coach_training_types`
--
ALTER TABLE `coach_training_types`
  ADD PRIMARY KEY (`coach_id`,`training_type_id`),
  ADD KEY `training_type_id` (`training_type_id`);

--
-- Indexes for table `health`
--
ALTER TABLE `health`
  ADD PRIMARY KEY (`id`),
  ADD KEY `member_id` (`member_id`);

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ras_id` (`ras_id`),
  ADD UNIQUE KEY `ras_id_2` (`ras_id`),
  ADD KEY `address_id` (`address_id`);

--
-- Indexes for table `member_coaches`
--
ALTER TABLE `member_coaches`
  ADD PRIMARY KEY (`member_id`,`coach_id`),
  ADD KEY `coach_id` (`coach_id`);

--
-- Indexes for table `member_emergency_contacts`
--
ALTER TABLE `member_emergency_contacts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `member_id` (`member_id`);

--
-- Indexes for table `member_schedules`
--
ALTER TABLE `member_schedules`
  ADD PRIMARY KEY (`member_id`,`schedule_id`),
  ADD KEY `schedule_id` (`schedule_id`);

--
-- Indexes for table `member_training_types`
--
ALTER TABLE `member_training_types`
  ADD PRIMARY KEY (`member_id`,`training_type_id`),
  ADD KEY `training_type_id` (`training_type_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `transaction_reference` (`transaction_reference`),
  ADD KEY `member_ras_id` (`member_ras_id`);

--
-- Indexes for table `refresh_tokens`
--
ALTER TABLE `refresh_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `training_type`
--
ALTER TABLE `training_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `id_2` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `address`
--
ALTER TABLE `address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `coach`
--
ALTER TABLE `coach`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `health`
--
ALTER TABLE `health`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `members`
--
ALTER TABLE `members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `member_emergency_contacts`
--
ALTER TABLE `member_emergency_contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `refresh_tokens`
--
ALTER TABLE `refresh_tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `training_type`
--
ALTER TABLE `training_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `coach`
--
ALTER TABLE `coach`
  ADD CONSTRAINT `coach_ibfk_1` FOREIGN KEY (`address_id`) REFERENCES `address` (`id`);

--
-- Constraints for table `coach_schedules`
--
ALTER TABLE `coach_schedules`
  ADD CONSTRAINT `coach_schedules_ibfk_1` FOREIGN KEY (`coach_id`) REFERENCES `coach` (`id`),
  ADD CONSTRAINT `coach_schedules_ibfk_2` FOREIGN KEY (`schedule_id`) REFERENCES `schedule` (`id`);

--
-- Constraints for table `coach_training_types`
--
ALTER TABLE `coach_training_types`
  ADD CONSTRAINT `coach_training_types_ibfk_1` FOREIGN KEY (`coach_id`) REFERENCES `coach` (`id`),
  ADD CONSTRAINT `coach_training_types_ibfk_2` FOREIGN KEY (`training_type_id`) REFERENCES `training_type` (`id`);

--
-- Constraints for table `health`
--
ALTER TABLE `health`
  ADD CONSTRAINT `health_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`);

--
-- Constraints for table `members`
--
ALTER TABLE `members`
  ADD CONSTRAINT `members_ibfk_1` FOREIGN KEY (`address_id`) REFERENCES `address` (`id`);

--
-- Constraints for table `member_coaches`
--
ALTER TABLE `member_coaches`
  ADD CONSTRAINT `member_coaches_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`),
  ADD CONSTRAINT `member_coaches_ibfk_2` FOREIGN KEY (`coach_id`) REFERENCES `coach` (`id`);

--
-- Constraints for table `member_emergency_contacts`
--
ALTER TABLE `member_emergency_contacts`
  ADD CONSTRAINT `member_emergency_contacts_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `member_schedules`
--
ALTER TABLE `member_schedules`
  ADD CONSTRAINT `member_schedules_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`),
  ADD CONSTRAINT `member_schedules_ibfk_2` FOREIGN KEY (`schedule_id`) REFERENCES `schedule` (`id`);

--
-- Constraints for table `member_training_types`
--
ALTER TABLE `member_training_types`
  ADD CONSTRAINT `member_training_types_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`),
  ADD CONSTRAINT `member_training_types_ibfk_2` FOREIGN KEY (`training_type_id`) REFERENCES `training_type` (`id`);

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`member_ras_id`) REFERENCES `members` (`ras_id`);

--
-- Constraints for table `refresh_tokens`
--
ALTER TABLE `refresh_tokens`
  ADD CONSTRAINT `refresh_tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
