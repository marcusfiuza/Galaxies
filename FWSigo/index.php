<?php

error_reporting(E_ALL ^ E_NOTICE);


require_once './Core/ISigoMethods.php';
require_once './Core/ISigo.php';
require_once './Core/Sigo.php';
require_once './App/localhost/Config.php';
require_once './App/localhost/Material.php';
require_once './Core/Dao.php';
require_once './Core/MySql.php';

use FWSigo\App\localhost\Material as Material;
use FWSigo\Core\DAO;

$material = new Material();

$material->codigoSapHibe = 320032;
$material->codigoSapUnbw = 620032;
$material->descricaoMaterial = 'Modem de teste';
$material->controladoPorSequencial = true;
$material->dtCadastro = new DateTime(date('Y-m-d'));

var_dump(Dao::insert($material));

// var_dump(FWSigo\Core\MySql::getConnection($material->getNameSpace('\\Config')));



?>