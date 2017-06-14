// Classe Veiculo

function Veiculo(x,y) {
  this.aceleracao = createVector(0,0);
  this.velocidade = createVector(0,-2);
  this.posicao = createVector(x,y);
  this.r  =4;
  this.maxvelo = 5;
  this.maxforca = 0.5;

  this.vida = 1;

  this.dna = [];
  this.dna[0] = random(-2,2);
  this.dna[1] = random(-2,2)

  // atualiza localidade
  this.atualiza = function() {

    this.vida -= 0.005;
    // atualiza velocidade
    this.velocidade.add(this.aceleracao);
    // limite velocidade
    this.velocidade.limit(this.maxvelo);
    this.posicao.add(this.velocidade);

    // reseta aceleracao
    this.aceleracao.mult(0);
  }

  this.aplicaForca = function(forca) {
    this.aceleracao.add(forca);
  }


  this.comportamentos = function (bom,mal) {
    var direcaoB = this.come(bom,0.2);
    var direcaoM = this.come(mal,-0.5);

    direcaoB.mult(this.dna[0]);
    direcaoM.mult(this.dna[1]);

    this.aplicaForca(direcaoB);
    this.aplicaForca(direcaoM);
  }


   this.limites = function() {

    var desejado = null;

    if (this.posicao.x < d) {
      desejado = createVector(this.maxvelo, this.velocidade.y);
    }
    else if (this.posicao.x > width -d) {
      desejado = createVector(-this.maxvelo, this.velocidade.y);
    }

    if (this.posicao.y < d) {
      desejado = createVector(this.velocidade.x, this.maxvelo);
    }
    else if (this.posicao.y > height-d) {
      desejado = createVector(this.velocidade.x, -this.maxvelo);
    }

    if (desejado !== null) {
      desejado.normalize();
      desejado.mult(this.maxvelo);
      var direcao = p5.Vector.sub(desejado, this.velocidade);
      direcao.limit(this.maxforca);
      this.aplicaForca(direcao);
    }
  };




  /*busca o item mais perto e vai ate ele*/
  this.come = function (lista,nutrientes) {
    var registro = Infinity;
    var maisProximo = -1;
    for (var i = 0; i < lista.length; i++) {
      //var d = dist(this.posicao.x,this.posicao.y,lista[i].x,lista[i].y);
      var d = this.posicao.dist(lista[i]);
      if(d < registro){
        registro = d;
        maisProximo = i;
      }
    }


    //comendo
    if(registro < 5){
      lista.splice(maisProximo,1);
      this.vida += nutrientes;
    }
    else if(maisProximo > -1){
    return this.busca(lista[maisProximo]);
  }


  return createVector(0, 0);


  }
  // calcula  forca de conducao em direção ao alvo
  // conducao = desejado menos velocidade
  this.busca = function(alvo) {


    var desejado = p5.Vector.sub(alvo,this.posicao);  // um vetor apontando da localidade ate ao alvo

    // Escala velocidade maxima
    desejado.setMag(this.maxvelo);

    // conducao = desejado menos velocidade
    var conducao = p5.Vector.sub(desejado,this.velocidade);
    conducao.limit(this.maxforca);  // limita a forca de conducao
    return conducao;
    //this.aplicaForca(conducao);
  }

  this.morto = function () {
    return (this.vida < 0);
  }




  this.exibe = function() {
    // Rotaciona o veiculo
    var theta = this.velocidade.heading() + PI/2;   
    push();
    translate(this.posicao.x,this.posicao.y);
    rotate(theta);

    stroke(0,255,0);
    line(0,0,0,-this.dna[0]*25);
    stroke(255,0,0);
    line(0,0,0,-this.dna[1]*25);


    var vrd = color(0,255,0);
    var ver = color(255,0,0);
    var cor = lerpColor(ver,vrd,this.vida);

    fill(cor);
    stroke(cor);
    strokeWeight(1);
    beginShape();
    vertex(0, -this.r*2);
    vertex(-this.r, this.r*2);
    vertex(this.r, this.r*2);
    endShape(CLOSE);
    pop();
  }
}