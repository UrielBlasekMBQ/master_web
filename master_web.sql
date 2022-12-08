/*
 Navicat Premium Data Transfer

 Source Server         : conect
 Source Server Type    : MySQL
 Source Server Version : 100424
 Source Host           : localhost:3306
 Source Schema         : master_web

 Target Server Type    : MySQL
 Target Server Version : 100424
 File Encoding         : 65001

 Date: 08/11/2022 22:13:09
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for acompanamiento
-- ----------------------------
DROP TABLE IF EXISTS `acompanamiento`;
CREATE TABLE `acompanamiento`  (
  `id_solicitud` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NULL DEFAULT NULL,
  `id_revisor_interno` int NULL DEFAULT NULL,
  `id_revisor_externo` int NULL DEFAULT NULL,
  `id_proceso` int NULL DEFAULT NULL,
  `solicita_nom` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `revision_interna` int NULL DEFAULT NULL,
  `revision_externa` int NULL DEFAULT NULL,
  `solicita_doc` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `fecha` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id_solicitud`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of acompanamiento
-- ----------------------------

-- ----------------------------
-- Table structure for actividad_contrato
-- ----------------------------
DROP TABLE IF EXISTS `actividad_contrato`;
CREATE TABLE `actividad_contrato`  (
  `id_actividad_contrato` int NOT NULL AUTO_INCREMENT,
  `id_etapa_contrato` int NULL DEFAULT NULL,
  `id_contrato` int NULL DEFAULT NULL,
  `nom_actividad` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `num_horas_actividad` int NULL DEFAULT NULL,
  `nom_doc` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id_actividad_contrato`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of actividad_contrato
-- ----------------------------

-- ----------------------------
-- Table structure for amef_ac
-- ----------------------------
DROP TABLE IF EXISTS `amef_ac`;
CREATE TABLE `amef_ac`  (
  `id_ac_amef` int NOT NULL AUTO_INCREMENT,
  `id_amef_amef` int NULL DEFAULT NULL,
  `id_amef_planificacion` int NULL DEFAULT NULL,
  `id_grupo_trabajo` int NULL DEFAULT NULL,
  `ac_fech_inicio` date NULL DEFAULT NULL,
  `ac_fech_final` date NULL DEFAULT NULL,
  `ac_final` date NULL DEFAULT NULL,
  `ac_programado` int NULL DEFAULT NULL,
  `ac_elaborado` int NULL DEFAULT NULL,
  `id_amef_estatus` int NULL DEFAULT NULL,
  PRIMARY KEY (`id_ac_amef`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of amef_ac
-- ----------------------------

-- ----------------------------
-- Table structure for amef_amef
-- ----------------------------
DROP TABLE IF EXISTS `amef_amef`;
CREATE TABLE `amef_amef`  (
  `id_amef_amef` int NOT NULL AUTO_INCREMENT,
  `id_amef_planificacion` int NULL DEFAULT NULL,
  `amef_modelo_fallo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `id_efecto` int NULL DEFAULT NULL,
  `id_probabilidad` int NULL DEFAULT NULL,
  `id_gravedad` int NULL DEFAULT NULL,
  `id_deteccion` int NULL DEFAULT NULL,
  `rpn_amef` int NULL DEFAULT NULL,
  `clasificacion_amef` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `planificacion_amef` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `ac` int NULL DEFAULT NULL,
  PRIMARY KEY (`id_amef_amef`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of amef_amef
-- ----------------------------

-- ----------------------------
-- Table structure for amef_planificacion
-- ----------------------------
DROP TABLE IF EXISTS `amef_planificacion`;
CREATE TABLE `amef_planificacion`  (
  `id_amef_planificacion` int NOT NULL AUTO_INCREMENT,
  `id_proceso` int NULL DEFAULT NULL,
  `id_usuario` int NULL DEFAULT NULL,
  `amef_modelo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `amef_componente_eva` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `amef_componente_func` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `amef_planifica_estatus` int NULL DEFAULT NULL,
  PRIMARY KEY (`id_amef_planificacion`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of amef_planificacion
-- ----------------------------

-- ----------------------------
-- Table structure for calidad_legal
-- ----------------------------
DROP TABLE IF EXISTS `calidad_legal`;
CREATE TABLE `calidad_legal`  (
  `id_calidad` int NOT NULL AUTO_INCREMENT,
  `id_proceso` int NULL DEFAULT NULL,
  `nom_calidad` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `dir_calidad` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `carp_calidad` int NULL DEFAULT NULL,
  `file_calidad` int NULL DEFAULT NULL,
  `id_vista` int NULL DEFAULT NULL,
  PRIMARY KEY (`id_calidad`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of calidad_legal
-- ----------------------------

-- ----------------------------
-- Table structure for capacitacion_legal
-- ----------------------------
DROP TABLE IF EXISTS `capacitacion_legal`;
CREATE TABLE `capacitacion_legal`  (
  `id_capacitacion` int NOT NULL AUTO_INCREMENT,
  `id_proceso` int NULL DEFAULT NULL,
  `nom_capacitacion` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `dir_capacitacion` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `carp_capacitacion` int NULL DEFAULT NULL,
  `file_capacitacion` int NULL DEFAULT NULL,
  `id_vista` int NULL DEFAULT NULL,
  PRIMARY KEY (`id_capacitacion`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of capacitacion_legal
-- ----------------------------

-- ----------------------------
-- Table structure for config_procesos
-- ----------------------------
DROP TABLE IF EXISTS `config_procesos`;
CREATE TABLE `config_procesos`  (
  `id_conf_proceso` int NOT NULL AUTO_INCREMENT,
  `multi_proceso` int NULL DEFAULT NULL,
  PRIMARY KEY (`id_conf_proceso`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of config_procesos
-- ----------------------------
INSERT INTO `config_procesos` VALUES (1, 1);

-- ----------------------------
-- Table structure for contrato_permiso
-- ----------------------------
DROP TABLE IF EXISTS `contrato_permiso`;
CREATE TABLE `contrato_permiso`  (
  `id_permiso_contrato` int NOT NULL AUTO_INCREMENT,
  `contrato_estatus` int NULL DEFAULT NULL,
  PRIMARY KEY (`id_permiso_contrato`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of contrato_permiso
-- ----------------------------
INSERT INTO `contrato_permiso` VALUES (1, 1);

-- ----------------------------
-- Table structure for contratos
-- ----------------------------
DROP TABLE IF EXISTS `contratos`;
CREATE TABLE `contratos`  (
  `id_contrato` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NULL DEFAULT NULL,
  `nom_compania` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `num_horas_total` int NULL DEFAULT NULL,
  `num_horas_restantes` int NULL DEFAULT NULL,
  `num_etapas` int NULL DEFAULT NULL,
  `num_actividades` int NULL DEFAULT NULL,
  PRIMARY KEY (`id_contrato`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of contratos
-- ----------------------------

-- ----------------------------
-- Table structure for document_asignado
-- ----------------------------
DROP TABLE IF EXISTS `document_asignado`;
CREATE TABLE `document_asignado`  (
  `id_documentAsig` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NULL DEFAULT NULL,
  `id_proceso` int NULL DEFAULT NULL,
  `tipoDocument` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `nom_document` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `vigencia` int NULL DEFAULT NULL,
  `fecha_creacion` date NULL DEFAULT NULL,
  `revisa_document` int NULL DEFAULT NULL,
  `aprueba_document` int NULL DEFAULT NULL,
  `documento` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `revisado` int NULL DEFAULT NULL,
  `aprobado` int NULL DEFAULT NULL,
  PRIMARY KEY (`id_documentAsig`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of document_asignado
-- ----------------------------

-- ----------------------------
-- Table structure for efecto_potencial
-- ----------------------------
DROP TABLE IF EXISTS `efecto_potencial`;
CREATE TABLE `efecto_potencial`  (
  `id_efecto` int NOT NULL AUTO_INCREMENT,
  `nom_efecto` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id_efecto`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of efecto_potencial
-- ----------------------------
INSERT INTO `efecto_potencial` VALUES (5, 'Retraso en la producción');
INSERT INTO `efecto_potencial` VALUES (6, 'Pérdida de la calidad del producto');
INSERT INTO `efecto_potencial` VALUES (7, 'Aumento de los costos');
INSERT INTO `efecto_potencial` VALUES (8, 'La máquina deja de funcionar');
INSERT INTO `efecto_potencial` VALUES (9, 'La máquina puede romper');

-- ----------------------------
-- Table structure for etapa_contrato
-- ----------------------------
DROP TABLE IF EXISTS `etapa_contrato`;
CREATE TABLE `etapa_contrato`  (
  `id_etapa_contrato` int NOT NULL AUTO_INCREMENT,
  `id_contrato` int NULL DEFAULT NULL,
  `nom_etapa` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `num_actividades` int NULL DEFAULT NULL,
  `num_horas_etapa` int NULL DEFAULT NULL,
  PRIMARY KEY (`id_etapa_contrato`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of etapa_contrato
-- ----------------------------

-- ----------------------------
-- Table structure for grupo_trabajo
-- ----------------------------
DROP TABLE IF EXISTS `grupo_trabajo`;
CREATE TABLE `grupo_trabajo`  (
  `id_grupo_trabajo` int NOT NULL AUTO_INCREMENT,
  `id_amef_planificacion` int NULL DEFAULT NULL,
  `id_usuario` int NULL DEFAULT NULL,
  PRIMARY KEY (`id_grupo_trabajo`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of grupo_trabajo
-- ----------------------------

-- ----------------------------
-- Table structure for historial
-- ----------------------------
DROP TABLE IF EXISTS `historial`;
CREATE TABLE `historial`  (
  `id_historial` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NULL DEFAULT NULL,
  `modulo_acceso` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `fecha_actual` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id_historial`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of historial
-- ----------------------------
INSERT INTO `historial` VALUES (1, 1, 'revisa_acompanamiento', '2022-11-09T04:10:07.538Z');
INSERT INTO `historial` VALUES (2, 1, 'solicita-acompanamiento', '2022-11-09T04:10:20.909Z');
INSERT INTO `historial` VALUES (3, 1, 'revisa_acompanamiento', '2022-11-09T04:10:25.678Z');

-- ----------------------------
-- Table structure for historial_capacitacion
-- ----------------------------
DROP TABLE IF EXISTS `historial_capacitacion`;
CREATE TABLE `historial_capacitacion`  (
  `id_hist_capacitacion` int NOT NULL AUTO_INCREMENT,
  `id_capacitacion` int NULL DEFAULT NULL,
  `id_usuario` int NULL DEFAULT NULL,
  `fecha_actual` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id_hist_capacitacion`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of historial_capacitacion
-- ----------------------------

-- ----------------------------
-- Table structure for logs_procesos
-- ----------------------------
DROP TABLE IF EXISTS `logs_procesos`;
CREATE TABLE `logs_procesos`  (
  `id_log_proceso` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NULL DEFAULT NULL,
  `id_proceso` int NULL DEFAULT NULL,
  PRIMARY KEY (`id_log_proceso`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of logs_procesos
-- ----------------------------

-- ----------------------------
-- Table structure for marco_legal
-- ----------------------------
DROP TABLE IF EXISTS `marco_legal`;
CREATE TABLE `marco_legal`  (
  `id_marco` int NOT NULL AUTO_INCREMENT,
  `id_proceso` int NULL DEFAULT NULL,
  `nom_marco` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `dir_marco` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `carp_marco` int NULL DEFAULT NULL,
  `file_marco` int NULL DEFAULT NULL,
  `id_vista` int NULL DEFAULT NULL,
  PRIMARY KEY (`id_marco`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of marco_legal
-- ----------------------------

-- ----------------------------
-- Table structure for normas_iso
-- ----------------------------
DROP TABLE IF EXISTS `normas_iso`;
CREATE TABLE `normas_iso`  (
  `id_norma` int NOT NULL AUTO_INCREMENT,
  `id_proceso` int NULL DEFAULT NULL,
  `nom_norma` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `dir_norma` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `carp_norma` int NULL DEFAULT NULL,
  `file_norma` int NULL DEFAULT NULL,
  `id_vista` int NULL DEFAULT NULL,
  PRIMARY KEY (`id_norma`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of normas_iso
-- ----------------------------

-- ----------------------------
-- Table structure for observaciones
-- ----------------------------
DROP TABLE IF EXISTS `observaciones`;
CREATE TABLE `observaciones`  (
  `id_observacion` int NOT NULL AUTO_INCREMENT,
  `id_solicitud` int NULL DEFAULT NULL,
  `observacion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  PRIMARY KEY (`id_observacion`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of observaciones
-- ----------------------------

-- ----------------------------
-- Table structure for ocu_deteccion
-- ----------------------------
DROP TABLE IF EXISTS `ocu_deteccion`;
CREATE TABLE `ocu_deteccion`  (
  `id_deteccion` int NOT NULL AUTO_INCREMENT,
  `val_determinacion` int NULL DEFAULT NULL,
  `nom_determinacion` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id_deteccion`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of ocu_deteccion
-- ----------------------------
INSERT INTO `ocu_deteccion` VALUES (1, 1, 'Casi improbable');
INSERT INTO `ocu_deteccion` VALUES (2, 2, 'Casi improbable');
INSERT INTO `ocu_deteccion` VALUES (3, 3, 'Baja probabilidad');
INSERT INTO `ocu_deteccion` VALUES (4, 4, 'Baja probabilidad');
INSERT INTO `ocu_deteccion` VALUES (5, 5, 'Probable');
INSERT INTO `ocu_deteccion` VALUES (6, 6, 'Probable');
INSERT INTO `ocu_deteccion` VALUES (7, 7, 'Alta probabilidad');
INSERT INTO `ocu_deteccion` VALUES (8, 8, 'Alta probabilidad');
INSERT INTO `ocu_deteccion` VALUES (9, 9, 'Con certeza');
INSERT INTO `ocu_deteccion` VALUES (10, 10, 'Con certeza');

-- ----------------------------
-- Table structure for ocu_gravedad
-- ----------------------------
DROP TABLE IF EXISTS `ocu_gravedad`;
CREATE TABLE `ocu_gravedad`  (
  `id_gravedad` int NOT NULL AUTO_INCREMENT,
  `val_gravedad` int NULL DEFAULT NULL,
  `nom_gravedad` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id_gravedad`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of ocu_gravedad
-- ----------------------------
INSERT INTO `ocu_gravedad` VALUES (1, 1, 'Muy leve(casi imperseptible)');
INSERT INTO `ocu_gravedad` VALUES (2, 2, 'Muy leve(casi imperseptible)');
INSERT INTO `ocu_gravedad` VALUES (3, 3, 'Leve');
INSERT INTO `ocu_gravedad` VALUES (4, 4, 'Leve');
INSERT INTO `ocu_gravedad` VALUES (5, 5, 'Gravedad Moderada');
INSERT INTO `ocu_gravedad` VALUES (6, 6, 'Gravedad Moderada');
INSERT INTO `ocu_gravedad` VALUES (7, 7, 'Gravedad alta');
INSERT INTO `ocu_gravedad` VALUES (8, 8, 'Gravedad alta');
INSERT INTO `ocu_gravedad` VALUES (9, 9, 'Muy grave');
INSERT INTO `ocu_gravedad` VALUES (10, 10, 'Muy grave');

-- ----------------------------
-- Table structure for ocu_probabilidad
-- ----------------------------
DROP TABLE IF EXISTS `ocu_probabilidad`;
CREATE TABLE `ocu_probabilidad`  (
  `id_probabilidad` int NOT NULL AUTO_INCREMENT,
  `val_probabilidad` int NULL DEFAULT NULL,
  `nom_probabilidad` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id_probabilidad`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of ocu_probabilidad
-- ----------------------------
INSERT INTO `ocu_probabilidad` VALUES (1, 1, 'Casi improbable no deteccion');
INSERT INTO `ocu_probabilidad` VALUES (2, 2, 'Casi improbable no deteccion');
INSERT INTO `ocu_probabilidad` VALUES (3, 3, 'Baja probabilidad no deteccion');
INSERT INTO `ocu_probabilidad` VALUES (4, 4, 'Baja probabilidad no deteccion');
INSERT INTO `ocu_probabilidad` VALUES (5, 5, 'Probabilidad media');
INSERT INTO `ocu_probabilidad` VALUES (6, 6, 'Probabilidad media');
INSERT INTO `ocu_probabilidad` VALUES (7, 7, 'Alta probabilidad no deteccion');
INSERT INTO `ocu_probabilidad` VALUES (8, 8, 'Alta probabilidad no deteccion');
INSERT INTO `ocu_probabilidad` VALUES (9, 9, 'Probabilidad muy alta no deteccion');
INSERT INTO `ocu_probabilidad` VALUES (10, 10, 'Probabilidad muy alta no deteccion');

-- ----------------------------
-- Table structure for operacion_legal
-- ----------------------------
DROP TABLE IF EXISTS `operacion_legal`;
CREATE TABLE `operacion_legal`  (
  `id_operacion` int NOT NULL AUTO_INCREMENT,
  `id_proceso` int NULL DEFAULT NULL,
  `nom_operacion` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `dir_operacion` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `carp_operacion` int NULL DEFAULT NULL,
  `file_operacion` int NULL DEFAULT NULL,
  `id_vista` int NULL DEFAULT NULL,
  PRIMARY KEY (`id_operacion`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of operacion_legal
-- ----------------------------

-- ----------------------------
-- Table structure for permisos
-- ----------------------------
DROP TABLE IF EXISTS `permisos`;
CREATE TABLE `permisos`  (
  `id_permisos` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NULL DEFAULT NULL,
  `calidad` int NULL DEFAULT NULL,
  `calidadVer` int NULL DEFAULT NULL,
  `calidadDescargar` int NULL DEFAULT NULL,
  `calidadAdd` int NULL DEFAULT NULL,
  `calidadUpdate` int NULL DEFAULT NULL,
  `calidadDelete` int NULL DEFAULT NULL,
  `operacion` int NULL DEFAULT NULL,
  `operacionVer` int NULL DEFAULT NULL,
  `operacionDescargar` int NULL DEFAULT NULL,
  `operacionAdd` int NULL DEFAULT NULL,
  `operacionUpdate` int NULL DEFAULT NULL,
  `operacionDelete` int NULL DEFAULT NULL,
  `registros` int NULL DEFAULT NULL,
  `registrosVer` int NULL DEFAULT NULL,
  `registrosDescargar` int NULL DEFAULT NULL,
  `registrosAdd` int NULL DEFAULT NULL,
  `registrosUpdate` int NULL DEFAULT NULL,
  `registrosDelete` int NULL DEFAULT NULL,
  `marcoLegal` int NULL DEFAULT NULL,
  `norma` int NULL DEFAULT NULL,
  `normaVer` int NULL DEFAULT NULL,
  `normaDescargar` int NULL DEFAULT NULL,
  `normaAdd` int NULL DEFAULT NULL,
  `normaUpdate` int NULL DEFAULT NULL,
  `normaDelete` int NULL DEFAULT NULL,
  `marco` int NULL DEFAULT NULL,
  `marcoVer` int NULL DEFAULT NULL,
  `marcoDescargar` int NULL DEFAULT NULL,
  `marcoAdd` int NULL DEFAULT NULL,
  `marcoUpdate` int NULL DEFAULT NULL,
  `marcoDelete` int NULL DEFAULT NULL,
  `diagramas` int NULL DEFAULT NULL,
  `foda` int NULL DEFAULT NULL,
  `toruga` int NULL DEFAULT NULL,
  `amef` int NULL DEFAULT NULL,
  `amef_amef` int NULL DEFAULT NULL,
  `efecto_fallo` int NULL DEFAULT NULL,
  `acompanamiento` int NULL DEFAULT NULL,
  `solicitaAcom` int NULL DEFAULT NULL,
  `revisaAcom` int NULL DEFAULT NULL,
  `controlDocumento` int NULL DEFAULT NULL,
  `asigna` int NULL DEFAULT NULL,
  `asignaVer` int NULL DEFAULT NULL,
  `asignaAdd` int NULL DEFAULT NULL,
  `revisa` int NULL DEFAULT NULL,
  `revisaVer` int NULL DEFAULT NULL,
  `revisaRevisar` int NULL DEFAULT NULL,
  `aprueba` int NULL DEFAULT NULL,
  `apruebaVer` int NULL DEFAULT NULL,
  `apruebaAprueba` int NULL DEFAULT NULL,
  `proceso` int NULL DEFAULT NULL,
  `procesoAdd` int NULL DEFAULT NULL,
  `procesoUpdate` int NULL DEFAULT NULL,
  `procesoDelete` int NULL DEFAULT NULL,
  `usuarios` int NULL DEFAULT NULL,
  `usuario` int NULL DEFAULT NULL,
  `usuarioAdd` int NULL DEFAULT NULL,
  `usuarioUpdate` int NULL DEFAULT NULL,
  `usuarioDelete` int NULL DEFAULT NULL,
  `permiso` int NULL DEFAULT NULL,
  `permisoAdd` int NULL DEFAULT NULL,
  `historial` int NULL DEFAULT NULL,
  `configuracion` int NULL DEFAULT NULL,
  `capacitacion` int NULL DEFAULT NULL,
  `capacitacionVer` int NULL DEFAULT NULL,
  `capacitacionHistorial` int NULL DEFAULT NULL,
  `capacitacionAdd` int NULL DEFAULT NULL,
  `capacitacionUpdate` int NULL DEFAULT NULL,
  `capacitacionDelete` int NULL DEFAULT NULL,
  PRIMARY KEY (`id_permisos`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of permisos
-- ----------------------------
INSERT INTO `permisos` VALUES (1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);

-- ----------------------------
-- Table structure for procesos
-- ----------------------------
DROP TABLE IF EXISTS `procesos`;
CREATE TABLE `procesos`  (
  `id_proceso` int NOT NULL AUTO_INCREMENT,
  `departamento` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `direccion` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `descripcion` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `estatus_proceso` int NOT NULL,
  PRIMARY KEY (`id_proceso`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of procesos
-- ----------------------------
INSERT INTO `procesos` VALUES (1, 'MBQ', 'MBQ', 'MBQ', 1);

-- ----------------------------
-- Table structure for registros
-- ----------------------------
DROP TABLE IF EXISTS `registros`;
CREATE TABLE `registros`  (
  `id_registro` int NOT NULL AUTO_INCREMENT,
  `nom_registro` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `dir_registro` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `carp_registro` int NULL DEFAULT NULL,
  `file_registro` int NULL DEFAULT NULL,
  `nivel_carpeta` int NULL DEFAULT NULL,
  `carp_padre` int NULL DEFAULT NULL,
  `id_vista` int NULL DEFAULT NULL,
  PRIMARY KEY (`id_registro`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of registros
-- ----------------------------

-- ----------------------------
-- Table structure for tipousuarios
-- ----------------------------
DROP TABLE IF EXISTS `tipousuarios`;
CREATE TABLE `tipousuarios`  (
  `id_cat_usuarios` int NOT NULL AUTO_INCREMENT,
  `tipoUsuario` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `descripcion` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id_cat_usuarios`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tipousuarios
-- ----------------------------
INSERT INTO `tipousuarios` VALUES (1, 'Super usuario', NULL);
INSERT INTO `tipousuarios` VALUES (2, 'Director', NULL);
INSERT INTO `tipousuarios` VALUES (3, 'Lider', NULL);
INSERT INTO `tipousuarios` VALUES (4, 'Coordinador', NULL);
INSERT INTO `tipousuarios` VALUES (5, 'Supervisor', NULL);
INSERT INTO `tipousuarios` VALUES (6, 'Operativo', NULL);

-- ----------------------------
-- Table structure for usuarios
-- ----------------------------
DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios`  (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `apellidos` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `departamento` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `tipoUsuario` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `estatus` tinyint(1) NULL DEFAULT NULL,
  `foto` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id_usuario`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of usuarios
-- ----------------------------
INSERT INTO `usuarios` VALUES (0, NULL, '-', '-', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `usuarios` VALUES (1, 'administrador', 'administrador', 'administrador', 'administrador@ejemplo', '1', '1', '2228admin', 1, NULL);

-- ----------------------------
-- Table structure for vigencias
-- ----------------------------
DROP TABLE IF EXISTS `vigencias`;
CREATE TABLE `vigencias`  (
  `id_vigencia` int NOT NULL AUTO_INCREMENT,
  `nom_vigencia` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `dias` int NULL DEFAULT NULL,
  PRIMARY KEY (`id_vigencia`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of vigencias
-- ----------------------------
INSERT INTO `vigencias` VALUES (1, '6 mese', 182);
INSERT INTO `vigencias` VALUES (2, '1 año', 365);
INSERT INTO `vigencias` VALUES (3, '2 años', 730);
INSERT INTO `vigencias` VALUES (4, '3 años', 1095);
INSERT INTO `vigencias` VALUES (5, '4 años', 1460);
INSERT INTO `vigencias` VALUES (6, '5 años', 1825);
INSERT INTO `vigencias` VALUES (7, '6 años ', 2190);

SET FOREIGN_KEY_CHECKS = 1;
