<?php namespace FWSigo\App\localhost;

use FWSigo\Core\ISigoMethods;
use FWSigo\Core\Sigo;

/**
 * @property integer $codigoSapHibe
 * @property integer $codigoSapUnbw
 * @property string $descricaoMaterial
 * @property boolean $controladoPorSequencial
 * @property DateTime $dtCadastro
 */
class Material extends Sigo implements ISigoMethods {
	
	protected $codigoSapHibe;
	protected $codigoSapUnbw;
	protected $descricaoMaterial;
	protected $controladoPorSequencial;
	protected $dtCadastro;
	
	public function getArray($param = '') {
		return array(
				"{$param}codigoSapHibe" => $this->codigoSapHibe,
				"{$param}codigoSapUnbw" => $this->codigoSapUnbw,
				"{$param}descricaoMaterial" => $this->descricaoMaterial,
				"{$param}controladoPorSequencial" => $this->controladoPorSequencial,
				"{$param}dtCadastro" => $this->dtCadastro->format('Y-m-d')
		);
	}
	
	public function getProperties() {
		
		$properties = array(
				'codigoSapHibe' => 'int',
				'codigoSapUnbw' => 'int',
				'descricaoMaterial' => 'varchar',
				'controladoPorSequencial' => 'bit',
				'dtCadastro' => 'date'
		);
		
		return array(
				'primary' => array('codigoSapHibe'),
				'tableName' => 'db_almoxarifado_dados.tb_material',
				'autoIncrement' => false,
				'properties' => $properties
		);
		
	}
	
	public function getNameSpace($complement = '') {
		
		$class = get_class($this);
		return substr($class, 0, strrpos($class, '\\')) . $complement;
		
	}
	
}