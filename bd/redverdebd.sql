-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 16, 2024 at 02:51 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `redverdebd`
--

-- --------------------------------------------------------

--
-- Table structure for table `categoria`
--

CREATE TABLE `categoria` (
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categoria`
--

INSERT INTO `categoria` (`nombre`) VALUES
('Árboles'),
('Arbustos'),
('Aromáticos'),
('Florales'),
('Inciensos'),
('Macetas'),
('Perfumados'),
('Tierra'),
('Velas');

-- --------------------------------------------------------

--
-- Table structure for table `comentario`
--

CREATE TABLE `comentario` (
  `id` int(11) NOT NULL,
  `texto` text NOT NULL,
  `idProducto` int(11) NOT NULL,
  `emailUsuario` varchar(255) NOT NULL,
  `fecha` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `compra`
--

CREATE TABLE `compra` (
  `id` int(11) NOT NULL,
  `estado` varchar(255) NOT NULL,
  `emailUsuario` varchar(255) NOT NULL,
  `fecha` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `compraproducto`
--

CREATE TABLE `compraproducto` (
  `idCompra` int(11) NOT NULL,
  `idProducto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `factura`
--

CREATE TABLE `factura` (
  `idFactura` int(50) NOT NULL,
  `precio` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `imagen`
--

CREATE TABLE `imagen` (
  `id` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `extension` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oferta`
--

CREATE TABLE `oferta` (
  `id` int(11) NOT NULL,
  `descuento` int(11) NOT NULL,
  `idProducto` int(11) NOT NULL,
  `fechaInicio` datetime NOT NULL,
  `fechaFin` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `producto`
--

CREATE TABLE `producto` (
  `id` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  `precio` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `nombreCategoria` varchar(45) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `extension` varchar(4) NOT NULL,
  `oferta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `producto`
--

INSERT INTO `producto` (`id`, `fecha`, `precio`, `stock`, `descripcion`, `nombreCategoria`, `nombre`, `extension`, `oferta`) VALUES
(26, '0000-00-00 00:00:00', 18990, 25, 'Descripcion de Arbol 1', 'Árboles', 'Arbol 1', 'webp', 0),
(27, '0000-00-00 00:00:00', 18990, 30, 'Descripcion de Arbol 2', 'Árboles', 'Arbol 2', 'webp', 20),
(28, '0000-00-00 00:00:00', 18990, 35, 'Descripcion de Arbol 3', 'Árboles', 'Arbol 3', 'png', 40),
(29, '0000-00-00 00:00:00', 18990, 40, 'Descripcion de Arbol 4', 'Árboles', 'Arbol 4', 'png', 60),
(32, '0000-00-00 00:00:00', 18990, 45, 'Descripcion de Arbol 5', 'Árboles', 'Arbol 5', 'png', 70),
(33, '0000-00-00 00:00:00', 18990, 50, 'Descripcion de Arbol 6', 'Árboles', 'Arbol 6', 'webp', 80),
(34, '0000-00-00 00:00:00', 18990, 55, 'Descripcion de Arbol 7', 'Árboles', 'Arbol 7', 'webp', 90),
(35, '0000-00-00 00:00:00', 18990, 25, 'Descripcion de Arbol 8', 'Árboles', 'Arbol 8', 'webp', 25),
(36, '0000-00-00 00:00:00', 18990, 35, 'Descripcion de Arbol 9', 'Árboles', 'Arbol 9', 'webp', 30),
(37, '0000-00-00 00:00:00', 18990, 35, 'Descripcion de Arbol 10', 'Árboles', 'Arbol 10', 'png', 45),
(38, '0000-00-00 00:00:00', 18990, 40, 'Descripcion de Arbol 11', 'Árboles', 'Arbol 11', 'webp', 55),
(39, '0000-00-00 00:00:00', 4275, 100, 'Descripcion de Planta 1', 'Florales', 'Planta 1', 'png', 0),
(40, '0000-00-00 00:00:00', 4275, 105, 'Descripcion de Planta 2', 'Florales', 'Planta 2', 'png', 20),
(41, '0000-00-00 00:00:00', 4275, 110, 'Descripcion de Planta 3', 'Florales', 'Planta 3', 'png', 30),
(42, '0000-00-00 00:00:00', 4275, 115, 'Descripcion de Planta 4', 'Macetas', 'Planta 4', 'png', 40),
(43, '0000-00-00 00:00:00', 4275, 120, 'Descripcion de Planta 5', 'Florales', 'Planta 5', 'png', 50),
(44, '0000-00-00 00:00:00', 4275, 125, 'Descripcion de Planta 6', 'Florales', 'Planta 6', 'png', 60),
(45, '0000-00-00 00:00:00', 4275, 130, 'Descripcion de Planta 7', 'Macetas', 'Planta 7', 'png', 70),
(46, '0000-00-00 00:00:00', 4275, 135, 'Descripcion de Planta 8', 'Florales', 'Planta 8', 'png', 85),
(47, '0000-00-00 00:00:00', 4275, 140, 'Descripcion de Planta 9', 'Florales', 'Planta 9', 'png', 75),
(49, '0000-00-00 00:00:00', 4275, 145, 'Descripcion de planta 10', 'Florales', 'Planta 10', 'png', 90),
(50, '0000-00-00 00:00:00', 3060, 200, 'Descripcion de Arbusto 1', 'Arbustos', 'Arbusto 1', 'png', 0),
(51, '0000-00-00 00:00:00', 3060, 205, 'Descripcion de Arbusto 2', 'Arbustos', 'Arbusto 2', 'png', 10),
(52, '0000-00-00 00:00:00', 3060, 210, 'Descripcion de Arbusto 3', 'Arbustos', 'Arbusto 3', 'png', 20),
(53, '0000-00-00 00:00:00', 3060, 215, 'Descripcion de Arbusto 4', 'Arbustos', 'Arbusto 4', 'png', 10),
(54, '0000-00-00 00:00:00', 3060, 220, 'Descripcion de Arbusto 5', 'Arbustos', 'Arbusto 5', 'webp', 30);

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

CREATE TABLE `usuario` (
  `email` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `telefono` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`email`, `nombre`, `apellido`, `telefono`, `password`, `isAdmin`) VALUES
('djiodjdjjsf', 'dosifjsldjflksj', 'fshhdfjkdkljd', '384573877', 'kcjvxhkv', 0),
('RAID_SHADOW_LEGEND@gmail.com', 'RAID', 'SHADOW_LEGEND', '098765432', 'RAID69L', 1);

-- --------------------------------------------------------

--
-- Table structure for table `usuariocomentariousuario`
--

CREATE TABLE `usuariocomentariousuario` (
  `id` int(11) NOT NULL,
  `idComentario` int(11) NOT NULL,
  `emailUsuario` varchar(255) NOT NULL,
  `fecha` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`nombre`);

--
-- Indexes for table `comentario`
--
ALTER TABLE `comentario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idProducto` (`idProducto`),
  ADD KEY `emailUsuario` (`emailUsuario`);

--
-- Indexes for table `compra`
--
ALTER TABLE `compra`
  ADD PRIMARY KEY (`id`),
  ADD KEY `emailUsuario` (`emailUsuario`);

--
-- Indexes for table `compraproducto`
--
ALTER TABLE `compraproducto`
  ADD PRIMARY KEY (`idCompra`,`idProducto`);

--
-- Indexes for table `factura`
--
ALTER TABLE `factura`
  ADD PRIMARY KEY (`idFactura`);

--
-- Indexes for table `imagen`
--
ALTER TABLE `imagen`
  ADD PRIMARY KEY (`id`),
  ADD KEY `url` (`url`);

--
-- Indexes for table `oferta`
--
ALTER TABLE `oferta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idProducto` (`idProducto`);

--
-- Indexes for table `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nombreCategoria` (`nombreCategoria`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `usuariocomentariousuario`
--
ALTER TABLE `usuariocomentariousuario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idComentario` (`idComentario`),
  ADD KEY `emailUsuario` (`emailUsuario`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comentario`
--
ALTER TABLE `comentario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `compra`
--
ALTER TABLE `compra`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `imagen`
--
ALTER TABLE `imagen`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `oferta`
--
ALTER TABLE `oferta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `producto`
--
ALTER TABLE `producto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`nombreCategoria`) REFERENCES `categoria` (`nombre`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
