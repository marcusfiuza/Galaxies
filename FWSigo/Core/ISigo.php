<?php namespace FWSigo\Core;

interface ISigo {
	public function __get($property);
	public function __set($property, $value);
}