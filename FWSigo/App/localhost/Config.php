<?php namespace FWSigo\App\localhost;

final class Config {
	
	private static $pdo;
	
	private static $connectionParamns = array(
			'DNS' => 'mysql:host=127.0.0.1;',
			'USER' => 'root',
			'PWD' => '',
			'CHARSET' => 'UTF8;');
	
	public static function pdo() {
		
		if(!$pdo) {
			
			$dns = self::$connectionParamns['DNS'];
			$user = self::$connectionParamns['USER'];
			$pwd = self::$connectionParamns['PWD'];
			$charset = self::$connectionParamns['CHARSET'];
				
			self::$pdo = new \PDO($dns . $charset, $user, $pwd);
			self::$pdo->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
			
		}
		
		return self::$pdo;
		
	}
	
}