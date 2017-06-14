var veiculos = [];
var comida = [];
var veneno = [];
var d = 25;

function setup() {
  createCanvas(640,360);
  for (var i = 0; i < 10; i++) {
    var x = random(width);
    var y = random(height);
    veiculos[i] = new Veiculo(x,y); 
  }
  
  for (var i = 0; i < 50; i++) {
    var x = random(width);
    var y = random(height);
    comida.push(createVector(x,y));
  }

  for (var i = 0; i < 10; i++) {
    var x = random(width);
    var y = random(height);
    veneno.push(createVector(x,y));
  }

}

function draw() {
  background(51);


  if(random(1) < 0.05){
     var x = random(width);
    var y = random(height);
    comida.push(createVector(x,y));
  }

  for (var i = 0; i < comida.length; i++) {
    fill(0,255,0);
    noStroke();
    ellipse(comida[i].x,comida[i].y,8,8);
  }

   for (var i = 0; i < veneno.length; i++) {
    fill(255,0,0);
    noStroke();
    ellipse(veneno[i].x,veneno[i].y,8,8);
  }


  for (var i = veiculos.length - 1; i >= 0; i--) {
    
    //chama os metodos de condução do agente.
    veiculos[i].comportamentos(comida,veneno);
    //veiculo.busca(alvo);
    veiculos[i].atualiza();
    veiculos[i].exibe();
    veiculos[i].limites();

    if(veiculos[i].morto()){
      veiculos.splice(i,1);
    }
  }
  

}