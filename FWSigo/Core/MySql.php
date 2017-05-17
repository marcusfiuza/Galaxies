<?php namespace FWSigo\Core;

final class MySql {
	
	public static function getConnection($nameSpace) {
		
		if(!class_exists($nameSpace)) {
			return new \Exception('Erro ao localizar NameSpace da classe Config. Funчуo: ' . __FUNCTION__ . ', file: ' . basename(__FILE__) . ', line ' . __LINE__);
		}
		
		return $nameSpace::pdo();
		
	}
	
	private function __clone(){}
}