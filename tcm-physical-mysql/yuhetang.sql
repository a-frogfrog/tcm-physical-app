/*
 Navicat Premium Data Transfer

 Source Server         : YuhetangDB
 Source Server Type    : MySQL
 Source Server Version : 80041 (8.0.41)
 Source Host           : localhost:3306
 Source Schema         : yuhetang

 Target Server Type    : MySQL
 Target Server Version : 80041 (8.0.41)
 File Encoding         : 65001

 Date: 15/09/2025 11:41:10
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for appointment
-- ----------------------------
DROP TABLE IF EXISTS `appointment`;
CREATE TABLE `appointment`  (
  `A_ID` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '预约ID',
  `A_CustomerID` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '客户ID',
  `A_DoctorID` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '医师ID',
  `A_ItemType` int NOT NULL COMMENT '项目类型：1-服务项目，2-产品套餐',
  `A_ItemID` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '项目ID（服务ID或套餐ID）',
  `A_AppointDate` date NOT NULL COMMENT '预约日期',
  `A_StartTime` time NOT NULL COMMENT '开始时间',
  `A_EndTime` time NOT NULL COMMENT '结束时间',
  `A_Duration` int NOT NULL COMMENT '预约时长（分钟）',
  `A_Status` int NOT NULL DEFAULT 0 COMMENT '状态：0-待确认，1-已确认，2-已完成，3-已取消，4-客户失约',
  `A_Remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '备注',
  `A_Source` int NULL DEFAULT 1 COMMENT '预约来源：1-前台预约，2-微信预约，3-电话预约，4-医师推荐',
  `A_CreateTime` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `A_UpdateTime` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后更新时间',
  PRIMARY KEY (`A_ID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '预约表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of appointment
-- ----------------------------
INSERT INTO `appointment` VALUES ('A20231001001', 'C001', 'S001', 1, 'P0102', '2023-10-05', '09:00:00', '10:00:00', 60, 1, '客户要求重点按摩肩颈部位，最近加班较多', 1, '2023-10-01 14:20:00', '2025-09-11 08:55:50');
INSERT INTO `appointment` VALUES ('A20231002001', 'C002', 'S002', 2, 'PP001', '2023-10-06', '14:00:00', '15:30:00', 90, 0, '初次体验套餐，希望了解具体流程', 2, '2023-10-02 10:15:00', '2025-09-11 08:55:50');
INSERT INTO `appointment` VALUES ('A20231003001', 'C003', 'S001', 1, 'P0103', '2023-10-07', '10:30:00', '11:15:00', 45, 2, '针灸治疗后腰痛明显缓解，建议继续治疗', 1, '2023-10-03 09:30:00', '2025-09-11 08:55:50');
INSERT INTO `appointment` VALUES ('A20231004001', 'C001', 'S003', 2, 'PP003', '2023-10-08', '15:00:00', '17:00:00', 120, 3, '客户临时出差，需要重新预约', 3, '2023-10-04 16:45:00', '2025-09-11 08:55:50');
INSERT INTO `appointment` VALUES ('A20231005001', 'C004', 'S002', 1, 'P0101', '2023-10-09', '11:00:00', '11:30:00', 30, 4, '多次联系未接听电话，标记为失约', 1, '2023-10-05 10:00:00', '2025-09-11 08:55:50');
INSERT INTO `appointment` VALUES ('A20231006001', 'C002', 'S001', 2, 'PP002', '2023-10-10', '09:30:00', '11:00:00', 90, 1, '客户希望使用薰衣草精油，对花香不过敏', 4, '2023-10-06 13:20:00', '2025-09-11 08:55:50');
INSERT INTO `appointment` VALUES ('A20231007001', 'C005', NULL, 1, 'P0104', '2023-10-11', '16:00:00', '16:20:00', 20, 0, '新客户咨询拔罐服务，暂未指定医师', 2, '2023-10-07 15:30:00', '2025-09-11 08:55:50');
INSERT INTO `appointment` VALUES ('A20231008001', 'C003', 'S002', 1, 'P0105', '2023-10-12', '13:00:00', '13:30:00', 30, 1, '客户睡眠质量差，希望改善睡眠', 1, '2023-10-08 11:45:00', '2025-09-11 08:55:50');
INSERT INTO `appointment` VALUES ('A20231009001', 'C006', 'S001', 1, 'P0102', '2023-10-13', '10:00:00', '11:00:00', 60, 2, '常规保健推拿，客户感觉很舒服', 1, '2023-10-09 09:00:00', '2025-09-11 08:55:50');
INSERT INTO `appointment` VALUES ('A20231010001', 'C001', 'S003', 1, 'P0103', '2023-10-14', '14:30:00', '15:15:00', 45, 1, '治疗颈椎问题，需要针灸调理', 4, '2023-10-10 16:20:00', '2025-09-11 08:55:50');
INSERT INTO `appointment` VALUES ('A20231011001', 'C007', 'S002', 2, 'PP001', '2023-10-15', '09:00:00', '10:30:00', 90, 0, '朋友推荐来的新客户', 4, '2023-10-11 14:00:00', '2025-09-11 08:55:50');
INSERT INTO `appointment` VALUES ('A20231012001', 'C002', 'S001', 1, 'P0101', '2023-10-16', '11:00:00', '11:30:00', 30, 3, '客户临时有事取消', 2, '2023-10-12 10:30:00', '2025-09-11 08:55:50');

-- ----------------------------
-- Table structure for custom_follow
-- ----------------------------
DROP TABLE IF EXISTS `custom_follow`;
CREATE TABLE `custom_follow`  (
  `CF_ID` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '跟进记录ID',
  `CF_CustomerID` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '客户ID',
  `CF_Content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '跟进内容',
  `CF_Type` int NULL DEFAULT NULL COMMENT '跟进类型：1-电话，2-微信，3-面谈',
  `CF_NextTime` datetime NULL DEFAULT NULL COMMENT '下次跟进时间',
  `CF_Operator` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '跟进人',
  `CF_CreateTime` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`CF_ID`) USING BTREE,
  INDEX `CF_CustomerID`(`CF_CustomerID` ASC) USING BTREE,
  CONSTRAINT `custom_follow_ibfk_1` FOREIGN KEY (`CF_CustomerID`) REFERENCES `customs` (`C_ID`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '客户跟进记录表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of custom_follow
-- ----------------------------

-- ----------------------------
-- Table structure for customer_vip_cps_commission
-- ----------------------------
DROP TABLE IF EXISTS `customer_vip_cps_commission`;
CREATE TABLE `customer_vip_cps_commission`  (
  `CVCC_ID` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '佣金记录ID',
  `CVCC_CPSID` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '推广链接ID',
  `CVCC_NewVIPID` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '新注册VIP ID',
  `CVCC_Amount` decimal(10, 2) NOT NULL COMMENT '佣金金额',
  `CVCC_Status` int NULL DEFAULT 0 COMMENT '状态：0-未结算，1-已结算',
  `CVCC_SettleTime` datetime NULL DEFAULT NULL COMMENT '结算时间',
  `CVCC_CreateTime` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`CVCC_ID`) USING BTREE,
  INDEX `CVCC_CPSID`(`CVCC_CPSID` ASC) USING BTREE,
  INDEX `CVCC_NewVIPID`(`CVCC_NewVIPID` ASC) USING BTREE,
  CONSTRAINT `customer_vip_cps_commission_ibfk_1` FOREIGN KEY (`CVCC_CPSID`) REFERENCES `customs_vip_cps` (`CVC_ID`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `customer_vip_cps_commission_ibfk_2` FOREIGN KEY (`CVCC_NewVIPID`) REFERENCES `customs_vip` (`CV_ID`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '推广佣金记录表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of customer_vip_cps_commission
-- ----------------------------

-- ----------------------------
-- Table structure for customer_vip_record
-- ----------------------------
DROP TABLE IF EXISTS `customer_vip_record`;
CREATE TABLE `customer_vip_record`  (
  `CVR_ID` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '行为记录ID',
  `CVR_VIPID` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'VIP ID',
  `CVR_Type` int NOT NULL COMMENT '行为类型：1-充值，2-消费，3-退款',
  `CVR_Amount` decimal(10, 2) NOT NULL COMMENT '金额',
  `CVR_BeforeBalance` decimal(10, 2) NOT NULL COMMENT '操作前余额',
  `CVR_AfterBalance` decimal(10, 2) NOT NULL COMMENT '操作后余额',
  `CVR_OrderID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '关联订单ID',
  `CVR_Description` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '描述',
  `CVR_Operator` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '操作人',
  `CVR_CreateTime` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`CVR_ID`) USING BTREE,
  INDEX `CVR_VIPID`(`CVR_VIPID` ASC) USING BTREE,
  CONSTRAINT `customer_vip_record_ibfk_1` FOREIGN KEY (`CVR_VIPID`) REFERENCES `customs_vip` (`CV_ID`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = 'VIP行为记录表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of customer_vip_record
-- ----------------------------

-- ----------------------------
-- Table structure for customs
-- ----------------------------
DROP TABLE IF EXISTS `customs`;
CREATE TABLE `customs`  (
  `C_ID` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '客户ID',
  `C_Name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '客户姓名',
  `C_Phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '手机号码',
  `C_Gender` int NULL DEFAULT NULL COMMENT '性别：0-女，1-男',
  `C_Age` int NULL DEFAULT NULL COMMENT '年龄',
  `C_Account` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '邮箱账号',
  `C_Address` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '地址',
  `C_Resource` int NULL DEFAULT NULL COMMENT '客户来源：1-广告，2-介绍，3-自行上门',
  `Is_Convert` int NULL DEFAULT NULL COMMENT '是否转换：0-未转换，1-已转换',
  `C_Status` int NULL DEFAULT NULL COMMENT '状态：0-无效，1-有效',
  `C_CreateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`C_ID`) USING BTREE,
  UNIQUE INDEX `C_Phone`(`C_Phone` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '客户信息表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of customs
-- ----------------------------
INSERT INTO `customs` VALUES ('04090a0d011d002feffce0bfa3b9cd4c', '堂人0q2s0g4w', NULL, 3, 0, 'fami26@qq.com', NULL, 3, 0, 1, '2025-09-10 21:17:47');

-- ----------------------------
-- Table structure for customs_vip
-- ----------------------------
DROP TABLE IF EXISTS `customs_vip`;
CREATE TABLE `customs_vip`  (
  `CV_ID` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'VIPID',
  `CV_CustomerID` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '客户ID',
  `CV_Level` int NULL DEFAULT 1 COMMENT 'VIP等级',
  `CV_Balance` decimal(10, 2) NULL DEFAULT 0.00 COMMENT '账户余额',
  `CV_TotalRecharge` decimal(10, 2) NULL DEFAULT 0.00 COMMENT '累计充值金额',
  `CV_TotalConsume` decimal(10, 2) NULL DEFAULT 0.00 COMMENT '累计消费金额',
  `CV_Status` int NULL DEFAULT 1 COMMENT '状态：0-冻结，1-正常',
  `CV_CreateTime` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `CV_UpdateTime` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后更新时间',
  PRIMARY KEY (`CV_ID`) USING BTREE,
  UNIQUE INDEX `CV_CustomerID`(`CV_CustomerID` ASC) USING BTREE,
  CONSTRAINT `customs_vip_ibfk_1` FOREIGN KEY (`CV_CustomerID`) REFERENCES `customs` (`C_ID`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = 'VIP会员信息表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of customs_vip
-- ----------------------------

-- ----------------------------
-- Table structure for customs_vip_cps
-- ----------------------------
DROP TABLE IF EXISTS `customs_vip_cps`;
CREATE TABLE `customs_vip_cps`  (
  `CVC_ID` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '推广链接ID',
  `CVC_VIPID` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'VIP ID',
  `CVC_Url` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '推广链接URL',
  `CVC_Status` int NULL DEFAULT 1 COMMENT '状态：0-停用，1-启用',
  `CVC_CreateTime` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`CVC_ID`) USING BTREE,
  INDEX `CVC_VIPID`(`CVC_VIPID` ASC) USING BTREE,
  CONSTRAINT `customs_vip_cps_ibfk_1` FOREIGN KEY (`CVC_VIPID`) REFERENCES `customs_vip` (`CV_ID`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = 'VIP推广链接表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of customs_vip_cps
-- ----------------------------

-- ----------------------------
-- Table structure for membership_card
-- ----------------------------
DROP TABLE IF EXISTS `membership_card`;
CREATE TABLE `membership_card`  (
  `Card_ID` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '会员卡ID',
  `C_ID` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '客户ID',
  `Balance` decimal(10, 2) NULL DEFAULT NULL COMMENT '余额',
  `Password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '支付密码(加密存储)',
  `Salt` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '盐值',
  `CreatedTime` datetime NULL DEFAULT NULL COMMENT '会员卡创建时间',
  `Card_Status` int NULL DEFAULT 1 COMMENT '会员卡状态: 0-无效, 1-有效',
  PRIMARY KEY (`Card_ID`) USING BTREE,
  INDEX `C_ID`(`C_ID` ASC) USING BTREE,
  CONSTRAINT `membership_card_ibfk_1` FOREIGN KEY (`C_ID`) REFERENCES `customs` (`C_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '会员卡表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of membership_card
-- ----------------------------

-- ----------------------------
-- Table structure for order_details
-- ----------------------------
DROP TABLE IF EXISTS `order_details`;
CREATE TABLE `order_details`  (
  `OD_ID` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '订单明细ID',
  `OD_OrderID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '订单ID',
  `OD_ProductID` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '产品ID',
  `OD_SpecsID` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '规格ID',
  `OD_Quantity` int NOT NULL COMMENT '数量',
  `OD_Price` decimal(10, 2) NOT NULL COMMENT '单价',
  `OD_TotalAmount` decimal(10, 2) NOT NULL COMMENT '总金额',
  `OD_CreateTime` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`OD_ID`) USING BTREE,
  INDEX `OD_OrderID`(`OD_OrderID` ASC) USING BTREE,
  INDEX `OD_ProductID`(`OD_ProductID` ASC) USING BTREE,
  INDEX `OD_SpecsID`(`OD_SpecsID` ASC) USING BTREE,
  CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`OD_OrderID`) REFERENCES `orders` (`O_ID`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `order_details_ibfk_2` FOREIGN KEY (`OD_ProductID`) REFERENCES `product` (`P_ID`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `order_details_ibfk_3` FOREIGN KEY (`OD_SpecsID`) REFERENCES `product_specs` (`PS_ID`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '订单详情表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of order_details
-- ----------------------------

-- ----------------------------
-- Table structure for order_payment
-- ----------------------------
DROP TABLE IF EXISTS `order_payment`;
CREATE TABLE `order_payment`  (
  `OP_ID` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '支付记录ID',
  `OP_OrderID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '订单ID',
  `OP_Type` int NOT NULL COMMENT '支付方式：1-现金，2-微信，3-支付宝，4-银行卡',
  `OP_Amount` decimal(10, 2) NOT NULL COMMENT '支付金额',
  `OP_Status` int NOT NULL COMMENT '支付状态：1-支付中，2-支付成功，3-支付失败',
  `OP_TransactionNo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '交易流水号',
  `OP_PayTime` datetime NULL DEFAULT NULL COMMENT '支付时间',
  `OP_CreateTime` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`OP_ID`) USING BTREE,
  INDEX `OP_OrderID`(`OP_OrderID` ASC) USING BTREE,
  CONSTRAINT `order_payment_ibfk_1` FOREIGN KEY (`OP_OrderID`) REFERENCES `orders` (`O_ID`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '支付记录表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of order_payment
-- ----------------------------

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders`  (
  `O_ID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '订单ID',
  `O_VIP` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'VIP ID',
  `O_Type` int NOT NULL COMMENT '订单类型：1-商品订单，2-服务订单',
  `O_Amount` decimal(10, 2) NOT NULL COMMENT '订单金额',
  `O_Discount` decimal(10, 2) NULL DEFAULT 0.00 COMMENT '折扣金额',
  `O_PayAmount` decimal(10, 2) NOT NULL COMMENT '实际支付金额',
  `O_Status` int NOT NULL COMMENT '状态：1-待支付，2-已支付，3-已完成，4-已取消',
  `O_Remark` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备注',
  `O_CreateTime` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `O_UpdateTime` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后更新时间',
  PRIMARY KEY (`O_ID`) USING BTREE,
  INDEX `O_VIP`(`O_VIP` ASC) USING BTREE,
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`O_VIP`) REFERENCES `customs_vip` (`CV_ID`) ON DELETE SET NULL ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '订单表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of orders
-- ----------------------------

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product`  (
  `P_ID` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '产品ID',
  `P_Name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '产品名称',
  `P_Type` int NULL DEFAULT NULL COMMENT '产品类型：1-实物，2-服务',
  `P_Category` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '产品分类ID',
  `P_Description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '产品描述',
  `P_Price` decimal(10, 2) NOT NULL COMMENT '产品价格',
  `P_CostPrice` decimal(10, 2) NULL DEFAULT NULL COMMENT '产品成本价',
  `P_Status` int NULL DEFAULT 1 COMMENT '状态：0-下架，1-上架',
  `P_CreateTime` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `P_UpdateTime` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后更新时间',
  PRIMARY KEY (`P_ID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '产品信息表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO `product` VALUES ('P0101', '艾灸服务', 2, 'CT001', '传统艾灸疗法，温经散寒，活血通络。每次30分钟。', 120.00, 30.00, 1, '2023-09-01 08:00:00', '2025-09-11 08:37:20');
INSERT INTO `product` VALUES ('P0102', '全身推拿', 2, 'CT001', '专业中医推拿，放松肌肉，缓解疲劳。每次60分钟。', 150.00, 40.00, 1, '2023-09-01 08:00:00', '2025-09-11 08:37:20');
INSERT INTO `product` VALUES ('P0103', '针灸服务', 2, 'CT001', '传统针灸治疗，调和气血，平衡阴阳。每次45分钟。', 160.00, 35.00, 1, '2023-09-01 08:00:00', '2025-09-11 08:37:20');
INSERT INTO `product` VALUES ('P0104', '拔罐服务', 2, 'CT001', '传统拔罐疗法，祛风散寒，疏通经络。每次20分钟。', 80.00, 15.00, 1, '2023-09-01 08:00:00', '2025-09-11 08:37:20');
INSERT INTO `product` VALUES ('P0105', '中药足浴', 2, 'CT001', '中药配方足浴，促进血液循环，改善睡眠。每次30分钟。', 100.00, 20.00, 1, '2023-09-01 08:00:00', '2025-09-11 08:37:20');
INSERT INTO `product` VALUES ('P0201', '黄芪', 1, 'CT002', '补气固表，利尿托毒。精选道地药材。', 88.00, 45.00, 1, '2023-09-01 08:00:00', '2025-09-11 08:37:20');
INSERT INTO `product` VALUES ('P0202', '当归', 1, 'CT002', '补血活血，调经止痛。甘肃岷县产。', 95.00, 50.00, 1, '2023-09-01 08:00:00', '2025-09-11 08:37:20');
INSERT INTO `product` VALUES ('P0203', '枸杞', 1, 'CT002', '滋补肝肾，益精明目。宁夏特级枸杞。', 68.00, 35.00, 1, '2023-09-01 08:00:00', '2025-09-11 08:37:20');
INSERT INTO `product` VALUES ('P0205', '中药热敷包', 1, 'CT003', '内含多种中药材，热敷缓解疼痛。', 128.00, 60.00, 1, '2023-09-01 08:00:00', '2025-09-11 08:37:20');
INSERT INTO `product` VALUES ('P0302', '养生茶饮', 1, 'CT005', '根据季节调配的养生茶包。10包/盒。', 38.00, 15.00, 1, '2023-09-01 08:00:00', '2025-09-11 08:37:20');

-- ----------------------------
-- Table structure for product_inventory
-- ----------------------------
DROP TABLE IF EXISTS `product_inventory`;
CREATE TABLE `product_inventory`  (
  `PI_ID` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '库存记录ID',
  `PI_ProductID` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '产品ID',
  `PI_SpecsID` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '规格ID',
  `PI_Type` int NOT NULL COMMENT '变动类型：1-入库，2-出库，3-调整',
  `PI_Quantity` int NOT NULL COMMENT '变动数量',
  `PI_BeforeStock` int NOT NULL COMMENT '变更前库存',
  `PI_AfterStock` int NOT NULL COMMENT '变更后库存',
  `PI_Reason` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '变动原因',
  `PI_Operator` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '操作人',
  `PI_CreateTime` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`PI_ID`) USING BTREE,
  INDEX `PI_ProductID`(`PI_ProductID` ASC) USING BTREE,
  INDEX `PI_SpecsID`(`PI_SpecsID` ASC) USING BTREE,
  CONSTRAINT `product_inventory_ibfk_1` FOREIGN KEY (`PI_ProductID`) REFERENCES `product` (`P_ID`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `product_inventory_ibfk_2` FOREIGN KEY (`PI_SpecsID`) REFERENCES `product_specs` (`PS_ID`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '库存记录表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of product_inventory
-- ----------------------------

-- ----------------------------
-- Table structure for product_package
-- ----------------------------
DROP TABLE IF EXISTS `product_package`;
CREATE TABLE `product_package`  (
  `PP_ID` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '套餐ID',
  `PP_Name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '套餐名称',
  `PP_Description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '套餐描述',
  `PP_Price` decimal(10, 2) NOT NULL COMMENT '套餐价格',
  `PP_Discount` decimal(5, 2) NULL DEFAULT NULL COMMENT '折扣率',
  `PP_Status` int NULL DEFAULT 1 COMMENT '状态：0-下架，1-上架',
  `PP_CreateTime` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`PP_ID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '产品套餐表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of product_package
-- ----------------------------
INSERT INTO `product_package` VALUES ('PP001', '经典理疗养生套餐', '包含艾灸、推拿和拔罐，适合日常保健和缓解疲劳。全面调理气血，祛湿散寒。', 388.00, 0.90, 1, '2023-10-01 09:00:00');
INSERT INTO `product_package` VALUES ('PP002', '肩颈调理专项套餐', '针对肩颈问题设计的深度调理套餐，含推拿、针灸和中药热敷。有效缓解肩颈酸痛、僵硬。', 588.00, NULL, 1, '2023-10-02 10:30:00');
INSERT INTO `product_package` VALUES ('PP003', '全身调理至尊套餐', '全方位养生调理，包含全身推拿、艾灸、拔罐、足浴和营养茶饮。适合长期调理身体亚健康状态。', 1288.00, 0.85, 1, '2023-10-03 14:15:00');
INSERT INTO `product_package` VALUES ('PP004', '季节性过敏缓解套餐', '春季特供套餐，通过针灸和中药调理，有效缓解花粉过敏、过敏性鼻炎等症状。', 466.00, 0.95, 0, '2023-02-15 11:20:00');
INSERT INTO `product_package` VALUES ('PP005', '产后恢复调理套餐', '专为产后妈妈设计，包含艾灸、推拿和中药调理，帮助恢复身体机能。', 888.00, 0.88, 1, '2023-11-01 13:45:00');

-- ----------------------------
-- Table structure for product_package_details
-- ----------------------------
DROP TABLE IF EXISTS `product_package_details`;
CREATE TABLE `product_package_details`  (
  `PPD_ID` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '套餐明细ID',
  `PPD_PackageID` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '套餐ID',
  `PPD_ProductID` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '产品ID',
  `PPD_Quantity` int NULL DEFAULT 1 COMMENT '产品数量',
  `PPD_Price` decimal(10, 2) NULL DEFAULT NULL COMMENT '明细价格',
  `PPD_CreateTime` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`PPD_ID`) USING BTREE,
  INDEX `PPD_PackageID`(`PPD_PackageID` ASC) USING BTREE,
  INDEX `PPD_ProductID`(`PPD_ProductID` ASC) USING BTREE,
  CONSTRAINT `product_package_details_ibfk_1` FOREIGN KEY (`PPD_PackageID`) REFERENCES `product_package` (`PP_ID`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `product_package_details_ibfk_2` FOREIGN KEY (`PPD_ProductID`) REFERENCES `product` (`P_ID`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '套餐明细表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of product_package_details
-- ----------------------------
INSERT INTO `product_package_details` VALUES ('PPD00101', 'PP001', 'P0101', 1, 120.00, '2023-10-01 09:05:00');
INSERT INTO `product_package_details` VALUES ('PPD00102', 'PP001', 'P0102', 1, 150.00, '2023-10-01 09:05:00');
INSERT INTO `product_package_details` VALUES ('PPD00103', 'PP001', 'P0104', 1, 80.00, '2023-10-01 09:05:00');
INSERT INTO `product_package_details` VALUES ('PPD00201', 'PP002', 'P0102', 2, 300.00, '2023-10-02 10:35:00');
INSERT INTO `product_package_details` VALUES ('PPD00202', 'PP002', 'P0103', 1, 160.00, '2023-10-02 10:35:00');
INSERT INTO `product_package_details` VALUES ('PPD00203', 'PP002', 'P0205', 1, 128.00, '2023-10-02 10:35:00');
INSERT INTO `product_package_details` VALUES ('PPD00301', 'PP003', 'P0102', 1, 150.00, '2023-10-03 14:20:00');
INSERT INTO `product_package_details` VALUES ('PPD00302', 'PP003', 'P0101', 1, 120.00, '2023-10-03 14:20:00');
INSERT INTO `product_package_details` VALUES ('PPD00303', 'PP003', 'P0104', 1, 80.00, '2023-10-03 14:20:00');
INSERT INTO `product_package_details` VALUES ('PPD00304', 'PP003', 'P0105', 1, 100.00, '2023-10-03 14:20:00');
INSERT INTO `product_package_details` VALUES ('PPD00305', 'PP003', 'P0302', 1, 38.00, '2023-10-03 14:20:00');
INSERT INTO `product_package_details` VALUES ('PPD00401', 'PP004', 'P0103', 3, 480.00, '2023-02-15 11:25:00');
INSERT INTO `product_package_details` VALUES ('PPD00402', 'PP004', 'P0201', 1, 88.00, '2023-02-15 11:25:00');
INSERT INTO `product_package_details` VALUES ('PPD00403', 'PP004', 'P0203', 1, 68.00, '2023-02-15 11:25:00');
INSERT INTO `product_package_details` VALUES ('PPD00501', 'PP005', 'P0101', 2, 240.00, '2023-11-01 13:50:00');
INSERT INTO `product_package_details` VALUES ('PPD00502', 'PP005', 'P0102', 2, 300.00, '2023-11-01 13:50:00');
INSERT INTO `product_package_details` VALUES ('PPD00503', 'PP005', 'P0202', 1, 95.00, '2023-11-01 13:50:00');
INSERT INTO `product_package_details` VALUES ('PPD00504', 'PP005', 'P0302', 2, 76.00, '2023-11-01 13:50:00');

-- ----------------------------
-- Table structure for product_specs
-- ----------------------------
DROP TABLE IF EXISTS `product_specs`;
CREATE TABLE `product_specs`  (
  `PS_ID` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '规格ID',
  `PS_ProductID` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '产品ID',
  `PS_Name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '规格名称',
  `PS_Value` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '规格值',
  `PS_Price` decimal(10, 2) NULL DEFAULT NULL COMMENT '规格价格',
  `PS_Stock` int NULL DEFAULT 0 COMMENT '库存数量',
  `PS_Status` int NULL DEFAULT 1 COMMENT '状态：0-停用，1-启用',
  `PS_CreateTime` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`PS_ID`) USING BTREE,
  INDEX `PS_ProductID`(`PS_ProductID` ASC) USING BTREE,
  CONSTRAINT `product_specs_ibfk_1` FOREIGN KEY (`PS_ProductID`) REFERENCES `product` (`P_ID`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '产品规格表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of product_specs
-- ----------------------------

-- ----------------------------
-- Table structure for sys_department
-- ----------------------------
DROP TABLE IF EXISTS `sys_department`;
CREATE TABLE `sys_department`  (
  `D_ID` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '部门ID',
  `D_Name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '部门名称',
  `D_Manager` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '部门经理员工ID',
  `D_ParentID` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '上级部门ID',
  `D_Status` int NULL DEFAULT 1 COMMENT '状态：0-停用，1-启用',
  `D_CreateTime` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`D_ID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '部门信息表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_department
-- ----------------------------
INSERT INTO `sys_department` VALUES ('DEPT001', '总部', NULL, NULL, 1, '2023-01-01 09:00:00');
INSERT INTO `sys_department` VALUES ('DEPT002', '行政部', 'EMP001', 'DEPT001', 1, '2023-01-01 09:00:00');
INSERT INTO `sys_department` VALUES ('DEPT003', '人事部', 'EMP002', 'DEPT001', 1, '2023-01-01 09:00:00');
INSERT INTO `sys_department` VALUES ('DEPT004', '理疗部', 'EMP003', 'DEPT001', 1, '2023-01-01 09:00:00');
INSERT INTO `sys_department` VALUES ('DEPT005', '前台服务部', 'EMP004', 'DEPT001', 1, '2023-01-01 09:00:00');
INSERT INTO `sys_department` VALUES ('DEPT006', '理疗一部', 'EMP005', 'DEPT004', 1, '2023-01-10 10:00:00');
INSERT INTO `sys_department` VALUES ('DEPT007', '理疗二部', 'EMP006', 'DEPT004', 1, '2023-01-10 10:00:00');

-- ----------------------------
-- Table structure for sys_dictionary
-- ----------------------------
DROP TABLE IF EXISTS `sys_dictionary`;
CREATE TABLE `sys_dictionary`  (
  `D_ID` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '字典ID',
  `D_Type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '字典类型',
  `D_Value` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '字典值',
  `D_Sort` int NULL DEFAULT 0 COMMENT '排序号',
  `D_Status` int NULL DEFAULT 1 COMMENT '状态：0-停用，1-启用',
  `D_Description` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '字典描述',
  `D_CreateTime` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`D_ID`) USING BTREE,
  UNIQUE INDEX `uk_type_value`(`D_Type` ASC, `D_Value` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '系统字典表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_dictionary
-- ----------------------------

-- ----------------------------
-- Table structure for sys_duty
-- ----------------------------
DROP TABLE IF EXISTS `sys_duty`;
CREATE TABLE `sys_duty`  (
  `D_ID` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '岗位ID',
  `D_Name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '岗位名称',
  `D_Description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '岗位描述',
  `D_Status` int NULL DEFAULT 1 COMMENT '状态：0-停用，1-启用',
  `D_CreateTime` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`D_ID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '岗位信息表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_duty
-- ----------------------------
INSERT INTO `sys_duty` VALUES ('C8947BE06C0F4027A0F90A0DBC77163B', '测试', '这是一条测试数据不用管', 1, '2025-09-11 21:03:57');
INSERT INTO `sys_duty` VALUES ('DUTY001', '部门经理', '负责部门全面管理工作', 1, '2023-01-01 09:00:00');
INSERT INTO `sys_duty` VALUES ('DUTY002', '行政专员', '负责行政后勤、文件管理', 1, '2023-01-01 09:00:00');
INSERT INTO `sys_duty` VALUES ('DUTY003', '人事专员', '负责招聘、考勤、员工关系', 1, '2023-01-01 09:00:00');
INSERT INTO `sys_duty` VALUES ('DUTY004', '高级理疗师', '5年以上经验，擅长多种理疗技术', 1, '2023-01-01 09:00:00');
INSERT INTO `sys_duty` VALUES ('DUTY005', '理疗师', '负责客户理疗服务', 1, '2023-01-01 09:00:00');
INSERT INTO `sys_duty` VALUES ('DUTY006', '前台接待', '负责客户登记、预约、咨询', 1, '2023-01-01 09:00:00');
INSERT INTO `sys_duty` VALUES ('DUTY007', '实习理疗师', '试用期理疗师，协助正式理疗师工作', 1, '2023-01-01 09:00:00');

-- ----------------------------
-- Table structure for sys_employee_schedule
-- ----------------------------
DROP TABLE IF EXISTS `sys_employee_schedule`;
CREATE TABLE `sys_employee_schedule`  (
  `SES_ID` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '排班记录ID',
  `SES_EmployeeID` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '关联员工ID',
  `SES_DepartmentID` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '关联部门ID',
  `SC_ID` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '规则ID',
  `SES_ScheduleDate` date NOT NULL COMMENT '排班日期',
  `SES_ShiftID` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '关联班次ID',
  `SES_Remark` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '排班备注',
  `SES_CreatorID` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '排班创建人ID',
  `SES_CreateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '排班创建时间',
  PRIMARY KEY (`SES_ID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '员工排班表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_employee_schedule
-- ----------------------------

-- ----------------------------
-- Table structure for sys_employees
-- ----------------------------
DROP TABLE IF EXISTS `sys_employees`;
CREATE TABLE `sys_employees`  (
  `E_ID` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '员工ID',
  `E_Account` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '员工登录账号',
  `E_Password` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '登录密码',
  `E_Salt` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '盐',
  `E_Name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '员工姓名',
  `E_Gender` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '性别',
  `E_Avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '头像url',
  `E_Email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '邮箱',
  `E_Phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '联系电话',
  `E_Dept` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '所属部门ID',
  `E_Duty` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '岗位ID',
  `E_IsBan` int NULL DEFAULT NULL COMMENT '0-正常,1-禁用,',
  `E_Status` int NULL DEFAULT 1 COMMENT '状态：0-离职，1-在职',
  `E_CreateTime` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`E_ID`) USING BTREE,
  UNIQUE INDEX `E_Account`(`E_Account` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '系统员工信息表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_employees
-- ----------------------------
INSERT INTO `sys_employees` VALUES ('EMP001', 'xiongyu', '7EECDB185F6A5935B37D5B1B71C55C', '4RUsKyHyA2ePFDecCBrFu6hH8vDYnwbB', '熊宇', '男', NULL, NULL, '13800138001', 'DEPT002', 'DUTY001', 0, 1, '2023-01-02 09:00:00');
INSERT INTO `sys_employees` VALUES ('EMP002', 'wawa', '7EECDB185F6A5935B37D5B1B71C55C', '4RUsKyHyA2ePFDecCBrFu6hH8vDYnwbB', '蛙蛙', '男', NULL, NULL, '13800138002', 'DEPT003', 'DUTY001', 0, 1, '2023-01-02 09:00:00');
INSERT INTO `sys_employees` VALUES ('EMP003', 'fugui', '7EECDB185F6A5935B37D5B1B71C55C', '4RUsKyHyA2ePFDecCBrFu6hH8vDYnwbB', '富贵', '女', NULL, NULL, '13800138003', 'DEPT004', 'DUTY001', 0, 1, '2023-01-02 09:00:00');

-- ----------------------------
-- Table structure for sys_login_logs
-- ----------------------------
DROP TABLE IF EXISTS `sys_login_logs`;
CREATE TABLE `sys_login_logs`  (
  `LLId` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '日志ID',
  `LL_EId` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '员工ID',
  `LL_EName` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '员工名',
  `LLLogin_Ip` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '登录IP',
  `LLCode` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '登录凭据',
  `LLLogin_Result` int NOT NULL COMMENT '登录结果: 1-成功, 0-失败',
  `LLFailure_Reason` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '失败原因',
  `LLDevice_Type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '设备类型: pc, mobile,tablet',
  `LLBrowser` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '浏览器',
  `LLLocation` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '登录地点',
  `LLCreate_Time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`LLId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '登录日志表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_login_logs
-- ----------------------------
INSERT INTO `sys_login_logs` VALUES ('04090f0303df0009fbbdd500f3252e42', 'EMP003', '富贵', '::1', '04090f0301a50007a9f5d0d1d1632e40', 1, '登录成功', 'PC端登录', 'Chrome 139.0', '未知位置（需要配置IP解析服务）', '2025-09-15 11:35:10');

-- ----------------------------
-- Table structure for sys_period_day
-- ----------------------------
DROP TABLE IF EXISTS `sys_period_day`;
CREATE TABLE `sys_period_day`  (
  `SPD_ID` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '详情ID',
  `SP_ID` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '关联周期模板ID',
  `SP_Day_NO` int NOT NULL COMMENT '周期内的第几天',
  `SPS_ID` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '关联班次ID',
  `SP_Create_Time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`SPD_ID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '周期内天数排班详情表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_period_day
-- ----------------------------
INSERT INTO `sys_period_day` VALUES ('0139E2D234654220A33E4FA5B8BDC0B4', 'FE619BE439614B04ACCCB612D7B0111A', 1, 'B15740E5B8DA4C5B880A5A8D6954031D', '2025-09-15 10:33:56');
INSERT INTO `sys_period_day` VALUES ('421960BC975C49D3A29846E881E3771B', 'FE619BE439614B04ACCCB612D7B0111A', 2, 'B15740E5B8DA4C5B880A5A8D6954031D', '2025-09-15 10:33:56');

-- ----------------------------
-- Table structure for sys_period_schedule
-- ----------------------------
DROP TABLE IF EXISTS `sys_period_schedule`;
CREATE TABLE `sys_period_schedule`  (
  `SP_ID` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '周期ID',
  `SP_Day` int NULL DEFAULT NULL COMMENT '周期天数',
  `SP_DeptID` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '适用部门ID',
  `SC_CreateTime` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`SP_ID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '周期模版表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_period_schedule
-- ----------------------------

-- ----------------------------
-- Table structure for sys_schedule_cycle
-- ----------------------------
DROP TABLE IF EXISTS `sys_schedule_cycle`;
CREATE TABLE `sys_schedule_cycle`  (
  `SC_ID` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '周期规则ID',
  `SC_Name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '规则名称',
  `SC_DeptID` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '部门ID',
  `SC_StartTime` date NULL DEFAULT NULL COMMENT '开始日期',
  `SC_EndTime` date NULL DEFAULT NULL COMMENT '结束日期',
  `SC_IsBan` int NULL DEFAULT 1 COMMENT '是否启用：0-禁用，1-启用',
  `SC_Remark` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备注',
  `SC_CreatorID` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '创建人ID',
  `SC_CreateTime` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`SC_ID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '周期规则表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_schedule_cycle
-- ----------------------------
INSERT INTO `sys_schedule_cycle` VALUES ('7B94196E446A4CEAA08CF83EA6180963', '御和堂', '', '2025-09-15', '2025-10-15', 0, NULL, '', '2025-09-15 09:40:39');
INSERT INTO `sys_schedule_cycle` VALUES ('FE619BE439614B04ACCCB612D7B0111A', '默认', '', '2025-09-11', '2025-10-11', 0, NULL, '', '2025-09-15 10:33:56');

-- ----------------------------
-- Table structure for sys_shift
-- ----------------------------
DROP TABLE IF EXISTS `sys_shift`;
CREATE TABLE `sys_shift`  (
  `S_ID` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '班次ID',
  `S_Name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '班次名称',
  `S_StartTime` time NULL DEFAULT NULL COMMENT '班次开始时间',
  `S_EndTime` time NULL DEFAULT NULL COMMENT '班次结束时间',
  `S_BreakStart` time NULL DEFAULT NULL COMMENT '午休开始时间（可选）',
  `S_BreakEnd` time NULL DEFAULT NULL COMMENT '午休结束时间（可选）',
  `S_Status` int NULL DEFAULT 1 COMMENT '状态：0-停用，1-启用',
  `S_Create_Time` datetime NULL DEFAULT '2000-00-01 00:00:00' COMMENT '创建时间',
  PRIMARY KEY (`S_ID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '班次模版表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_shift
-- ----------------------------
INSERT INTO `sys_shift` VALUES ('20632EE2546140D0AF2114E8825B3086', '午休', NULL, NULL, NULL, NULL, 1, '2025-09-12 11:21:14');
INSERT INTO `sys_shift` VALUES ('B15740E5B8DA4C5B880A5A8D6954031D', '默认排班', '09:00:00', '18:00:00', '12:00:00', '13:00:00', 0, '2025-09-12 11:21:52');

SET FOREIGN_KEY_CHECKS = 1;
