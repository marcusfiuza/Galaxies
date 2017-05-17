<?php namespace FWSigo\Core;

final class Dao {
	
	private $instance;
	private $connection;
	
	private function __construct(){}
	private function __clone(){}
	
	private static $primitives = array(
			"tinyint" => "integer",
			"smallint"=>"integer",
			"mediumint"=>"integer",
			"int"=>"integer",
			"bigint"=>"integer",
			"float"=>"float",
			"double"=>"float",
			"decimal"=>"float",
			"bit"=>"boolean",
			"char"=>"string",
			"varchar"=>"string",
			"tinytext"=>"string",
			"text"=>"string",
			"mediumtext"=>"string",
			"longtext"=>"string",
			"binary"=>"integer",
			"varbinary"=>"integer");
	
	private static $objects = array(
			"date"=>"datetime",
			"datetime"=>"datetime",
			"time"=>"time",
			"timestamp"=>"time",
			"year"=>"time"
	);
	
	private static function dataValidation(ISigo $data) {
		
		$properties = $data->getProperties();
		
		foreach($properties['properties'] as $field => $type) {
			
			if(is_null($data->$field)) continue;
			
			$debugBacktrace = debug_backtrace();
			
			if(array_key_exists($type, self::$primitives)) {
				
				if(gettype($data->$field) !== self::$primitives[$type]) {
					return 'Erro na validação do objeto ' . get_class($data) . ' do campo ' .  $field . '. Era esperado tipo ' . self::$primitives[$type] . ' e recebeu o tipo ' . gettype($data->$field) . '. Função: ' . $debugBacktrace[1]['function'] . ' na linha ' . $debugBacktrace[1]['line'] . ' do arquivo ' . $debugBacktrace[1]['file'];
				}
				
			}else {
				
				if(is_object($data->$field)) {
					$msg = get_class($data->$field);
				}else {
					$msg = gettype($data->$field);
				}
				
				if(!($data->$field instanceof self::$objects[$type])) {
					return 'Erro na validação do objeto ' . get_class($data) . ' do campo ' . $field . '. Era esperado o tipo ' . self::$objects[$type] . ' e recebeu o tipo ' . $msg . '. Função: ' . $debugBacktrace[1]['function'] . ' na linha ' . $debugBacktrace[1]['line'] . ' do arquivo ' . $debugBacktrace[1]['file'];
				}
				
			}
			
		}
		
	}
	
	public static function insert(ISigo $data) {
		
		$resultValidation = self::dataValidation($data);
		
		if($resultValidation) {
			return new \Exception($resultValidation, 0);
		}
		
		$dataProperties = $data->getProperties();
		$arrayData = $data->getArray();
		$arrayParamns = $data->getArray(':');
		
		$fields = implode(", ", array_keys($arrayData));
		$parms = implode(", :", array_keys($arrayData));
		
		$sql = "insert into {$dataProperties['tableName']} ({$fields}) values (:{$parms})";
		$pdo = MYSql::getConnection($data->getNameSpace('\\Config'));
		
		if(!($pdo instanceof \PDO)) {
			return $pdo;
		}
		
		try {
			
			$stmt = $pdo->prepare($sql);
			
			if($stmt->execute($arrayParamns)) {
					
				if($dataProperties['autoIncrement']) {
					return $pdo->lastInsertId();
				}else {
					return true;
				}
					
			}
			
		} catch (\Exception $e) {
			return $e;
		}
		
	}
	
	public static function insertIgnore(ISigo $data) {
	
		$resultValidation = self::dataValidation($data);
	
		if($resultValidation) {
			return new \Exception($resultValidation, 0);
		}
	
		$dataProperties = $data->getProperties();
		$arrayData = $data->getArray();
		$arrayParamns = $data->getArray(':');
	
		$fields = implode(", ", array_keys($arrayData));
		$parms = implode(", :", array_keys($arrayData));
	
		$sql = "insert ignore into {$dataProperties['tableName']} ({$fields}) values (:{$parms})";
		$pdo = MYSql::getConnection($data->getNameSpace('\\Config'));
	
		if(!($pdo instanceof \PDO)) {
			return $pdo;
		}
	
		try {
				
			$stmt = $pdo->prepare($sql);
				
			if($stmt->execute($arrayParamns)) {
					
				if($dataProperties['autoIncrement']) {
					return $pdo->lastInsertId();
				}else {
					return true;
				}
					
			}
				
		} catch (\Exception $e) {
			return $e;
		}
	
	}
	
	public static function replace(ISigo $data) {
	
		$resultValidation = self::dataValidation($data);
	
		if($resultValidation) {
			return new \Exception($resultValidation, 0);
		}
	
		$dataProperties = $data->getProperties();
		$arrayData = $data->getArray();
		$arrayParamns = $data->getArray(':');
	
		$fields = implode(", ", array_keys($arrayData));
		$parms = implode(", :", array_keys($arrayData));
	
		$sql = "replace into {$dataProperties['tableName']} ({$fields}) values (:{$parms})";
		$pdo = MYSql::getConnection($data->getNameSpace('\\Config'));
	
		if(!($pdo instanceof \PDO)) {
			return $pdo;
		}
	
		try {
	
			$stmt = $pdo->prepare($sql);
	
			if($stmt->execute($arrayParamns)) {
					
				if($dataProperties['autoIncrement']) {
					return $pdo->lastInsertId();
				}else {
					return true;
				}
					
			}
	
		} catch (\Exception $e) {
			return $e;
		}
	
	}
	
}