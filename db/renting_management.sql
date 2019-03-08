/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 50720
 Source Host           : localhost:3306
 Source Schema         : renting_management

 Target Server Type    : MySQL
 Target Server Version : 50720
 File Encoding         : 65001

 Date: 08/03/2019 16:33:14
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `role` int(11) NOT NULL COMMENT '1: 超级管理员\r\n2: 管理员\r\n',
  `isDel` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES (1, 'admin', '111111', 1, 0);
INSERT INTO `admin` VALUES (2, 'editor', '111111', 1, 0);
INSERT INTO `admin` VALUES (3, 'test1', 'aaaaaa', 2, 0);
INSERT INTO `admin` VALUES (4, 'edit11', 'aaaaaa', 2, 1);

-- ----------------------------
-- Table structure for community
-- ----------------------------
DROP TABLE IF EXISTS `community`;
CREATE TABLE `community`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `area` int(255) NOT NULL,
  `isDel` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of community
-- ----------------------------
INSERT INTO `community` VALUES (2, '雅致里', 21, 0);
INSERT INTO `community` VALUES (3, '景致里', 21, 0);
INSERT INTO `community` VALUES (4, '格调竹境', 20, 0);
INSERT INTO `community` VALUES (5, '龙博公寓', 20, 0);

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `room_id` int(11) NOT NULL,
  `stu_id` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0 COMMENT '0：未出租  1：已出租',
  `create_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `isDel` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of order
-- ----------------------------
INSERT INTO `order` VALUES (10, 1, 1, 1, '1551181611733', 0);
INSERT INTO `order` VALUES (11, 2, 1, 0, '1551510892581', 0);

-- ----------------------------
-- Table structure for room
-- ----------------------------
DROP TABLE IF EXISTS `room`;
CREATE TABLE `room`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `community_id` int(11) NOT NULL,
  `tel` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `desp` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `price` int(255) NOT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `longitude` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `latitude` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `isDel` int(11) NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of room
-- ----------------------------
INSERT INTO `room` VALUES (1, '品牌好房 免费宽带', 3, '13555555555', '简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介', 9901, '1号楼1门101', '117.287233', '39.072142', 0);
INSERT INTO `room` VALUES (2, '双林林城佳苑酒店式公寓 近地铁', 5, '13533333333', '简介简介', 5000, '1号楼3门503', '116.286371', '39.069145', 0);

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student`  (
  `id` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `sex` int(11) NOT NULL COMMENT '1：男 2：女',
  `tel` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `university_id` int(11) NOT NULL,
  `isDel` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO `student` VALUES (1, 'test', 'aaaaaa', 1, '13555555554', 1, 0);

-- ----------------------------
-- Table structure for university
-- ----------------------------
DROP TABLE IF EXISTS `university`;
CREATE TABLE `university`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `isDel` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of university
-- ----------------------------
INSERT INTO `university` VALUES (1, '天津财经大学', 0);
INSERT INTO `university` VALUES (2, '天津科技大学', 0);
INSERT INTO `university` VALUES (3, '天津理工大学', 0);
INSERT INTO `university` VALUES (4, '天津外国语大学', 0);
INSERT INTO `university` VALUES (5, '天津大学', 0);
INSERT INTO `university` VALUES (6, '南开大学', 0);
INSERT INTO `university` VALUES (7, '天津农业大学', 0);
INSERT INTO `university` VALUES (8, '天津商业大学', 0);
INSERT INTO `university` VALUES (10, '天津师范大学', 0);
INSERT INTO `university` VALUES (11, '天津职业技术师范大学', 0);
INSERT INTO `university` VALUES (12, '北京大学', 0);

SET FOREIGN_KEY_CHECKS = 1;
