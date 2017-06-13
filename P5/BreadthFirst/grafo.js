function Grafo() {
  this.nos = [];
  this.grafo ={};
  this.fim = null;
  this.inicio = null;
}

Grafo.prototype.reset = function () {
  for(var i = 0;i< this.nos.length;i++){
    this.nos[i].procurado = false;
    this.nos[i].pai = null;
  }
}
Grafo.prototype.setInicio = function (ator) {
  this.inicio = this.grafo[ator];
  return this.inicio;
}

Grafo.prototype.setFim = function (ator) {
  this.fim = this.grafo[ator];
  return this.fim;
}

Grafo.prototype.addNo = function(n){
  this.nos.push(n);
  var titulo = n.valor;
  //no em [chave-valor]
  this.grafo[titulo] = n;
}

Grafo.prototype.getNo = function (ator) {
  var n = this.grafo[ator];
  return n;

}
