-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- 생성 시간: 23-01-16 09:56
-- 서버 버전: 10.4.27-MariaDB
-- PHP 버전: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 데이터베이스: `dhdw6566`
--

-- --------------------------------------------------------

--
-- 테이블 구조 `spl_user`
--

CREATE TABLE `spl_user` (
  `user_idx` int(11) NOT NULL COMMENT '유저인덱스',
  `user_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '이름',
  `user_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '아이디',
  `user_email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '이메일',
  `user_pass` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '비밀번호',
  `user_lvl` int(11) NOT NULL COMMENT '사용자 레벨'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 테이블의 덤프 데이터 `spl_user`
--

INSERT INTO `spl_user` (`user_idx`, `user_name`, `user_id`, `user_email`, `user_pass`, `user_lvl`) VALUES
(8, '김도희', 'gguggu1', 'kimgukwoo@gmail.com', '$2y$10$x23o.e0J8wL0olg.x58hhOcZQbyAlcrxO38Z.H.3bRtDRdHGkYx1e', 1),
(10, 'aa', 'bb', 'abc@bb.com', '$2y$10$roWep.UviLtpYNDPqoQFfOQMs1/.tlHFAm5rPADQQj1g2HULPOcBu', 9),
(15, '김구구', 'cute11', 'gg@naver.com', '$2y$10$0ZVwXdwFN1lsyhBAcslZhecJyXJMlMdYhysldm91/gjgFwF87T0xe', 7),
(16, 'aa', 'bb', 'abc@bb.com', '$2y$10$MDBKni5zbc2ol.H/irkKE.xx2Bb7hyMqMsP1/ygNae7OFzz7cW6ym', 9);

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `spl_user`
--
ALTER TABLE `spl_user`
  ADD PRIMARY KEY (`user_idx`);

--
-- 덤프된 테이블의 AUTO_INCREMENT
--

--
-- 테이블의 AUTO_INCREMENT `spl_user`
--
ALTER TABLE `spl_user`
  MODIFY `user_idx` int(11) NOT NULL AUTO_INCREMENT COMMENT '유저인덱스', AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
