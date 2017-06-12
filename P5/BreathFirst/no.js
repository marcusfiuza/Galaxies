function No(valor) {
  this.valor = valor;
  this.bordas = [];
  this.procurado = false;
  this.pai = null;
}
No.prototype.addBorda = function (vizinho) {
  //bidirecional
  this.bordas.push(vizinho);
  vizinho.bordas.push(this);
}
