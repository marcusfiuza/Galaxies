<?php namespace FWSigo\Core;

class Sigo implements ISigo {
	
	public function __get($property) {
		$class = get_class($this);
		
		if(property_exists($class, $property)) {
			return $this->$property;
		}
	}
	
	public function __set($property, $value) {
		$class = get_class($this);
		
		if(property_exists($class, $property)) {
			$this->$property = $value;
		}
	}
	
}