# drop tables
DROP TABLE IF EXISTS `checkmate`.`member`;
DROP TABLE IF EXISTS `checkmate`.`auth`;
DROP TABLE IF EXISTS `checkmate`.`favorite`;
DROP TABLE IF EXISTS `checkmate`.`report`;
DROP TABLE IF EXISTS `checkmate`.`question`;
DROP TABLE IF EXISTS `checkmate`.`answer`;
DROP TABLE IF EXISTS `checkmate`.`review`;

# create tables
CREATE TABLE `member` (
  `member_id` int NOT NULL AUTO_INCREMENT,
  `member_email` varchar(255) NOT NULL,
  `member_nick_name` varchar(255) NOT NULL,
  `member_password` varchar(255) NOT NULL,
  `member_native_lang` varchar(255) NOT NULL,
  `member_profile_url` varchar(255) DEFAULT NULL,
  `member_point` int DEFAULT NULL,
  `member_type_id` varchar(45) NOT NULL DEFAULT '1',
  `member_introduce` varchar(1000) NULL,
  `member_grade` DOUBLE DEFAULT 0.0
  PRIMARY KEY (`member_id`)
);

CREATE TABLE `auth` (
  `member_id` int NOT NULL,
  `auth_university` varchar(255) NOT NULL,
  `auth_department` varchar(255) NOT NULL,
  `auth_name` varchar(255) NOT NULL,
  `auth_file_url` VARCHAR(255) NOT NULL,
  `auth_status` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`member_id`),
  CONSTRAINT `mem_foreign_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
);

CREATE TABLE `favorite` (
  `member_id` int NOT NULL,
  `tutor_id` int NOT NULL,
  KEY `mem_foreign_2` (`member_id`),
  KEY `mem_foreign_3` (`tutor_id`),
  CONSTRAINT `mem_foreign_2` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`),
  CONSTRAINT `mem_foreign_3` FOREIGN KEY (`tutor_id`) REFERENCES `member` (`member_id`)
);

CREATE TABLE `report` (
  `report_id` int NOT NULL AUTO_INCREMENT,
  `report_member_id` int NOT NULL,
  `reported_member_id` int NOT NULL,
  `report_category` int NOT NULL,
  `report_contents` varchar(255) NOT NULL,
  PRIMARY KEY (`report_id`),
  KEY `mem_foreign_4` (`report_member_id`),
  KEY `mem_foreign_5` (`reported_member_id`),
  CONSTRAINT `mem_foreign_4` FOREIGN KEY (`report_member_id`) REFERENCES `member` (`member_id`),
  CONSTRAINT `mem_foreign_5` FOREIGN KEY (`reported_member_id`) REFERENCES `member` (`member_id`)
);

CREATE TABLE `question` (
  `question_id` int NOT NULL AUTO_INCREMENT,
  `member_id` int NOT NULL,
  `question_title` varchar(255) NOT NULL,
  `question_explain` text NOT NULL,
  `question_contents` text NOT NULL,
  `question_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `question_end_date` date NOT NULL,
  `question_status` int DEFAULT '0',
  `question_point` int DEFAULT '0',
  `question_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`question_id`),
  KEY `mem_foreign_6` (`member_id`),
  CONSTRAINT `mem_foreign_6` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
);

CREATE TABLE `answer` (
  `answer_id` int NOT NULL AUTO_INCREMENT,
  `member_id` int NOT NULL,
  `question_id` int NOT NULL,
  `answer_explain` text NOT NULL,
  `answer_contents` text NOT NULL,
  `answer_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `answer_modified_date` datetime DEFAULT NULL,
  `answer_select` int DEFAULT '0',
  `answer_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`answer_id`),
  KEY `mem_foreign_7` (`member_id`),
  KEY `que_foreign_1` (`question_id`),
  CONSTRAINT `mem_foreign_7` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`),
  CONSTRAINT `que_foreign_1` FOREIGN KEY (`question_id`) REFERENCES `question` (`question_id`)
);

CREATE TABLE `review` (
  `answer_id` int NOT NULL,
  `review_category` int DEFAULT NULL,
  `review_contents` varchar(255) DEFAULT NULL,
  `review_score` int DEFAULT NULL,
  PRIMARY KEY (`answer_id`),
  KEY `ans_foreign_1` (`answer_id`),
  CONSTRAINT `ans_foreign_1` FOREIGN KEY (`answer_id`) REFERENCES `answer` (`answer_id`)
);

# truncate All tables
set FOREIGN_KEY_CHECKS = 0;
truncate member;
truncate auth;
truncate favorite;
truncate report;
truncate question;
truncate answer;
truncate review;
set FOREIGN_KEY_CHECKS = 1;
