var data;
var grafo;
var dropdown;
/*função p5*/
function preload() {
  /*função p5*/
  data = loadJSON('bacon.json');
}

/*função p5*/
function setup() {
  grafo  = new Grafo();
  dropdown = createSelect();
  dropdown.changed(bfs);
  /*remove canvas criado por default*/
  noCanvas();

  var filmes = data.movies;

  for (var i = 0;i<filmes.length;i++){
    var filme = filmes[i].title;
    var elenco = filmes[i].cast;
    var noFilme = new No(filme);
    grafo.addNo(noFilme);

    for(var j =0;j<elenco.length;j++){
      var ator = elenco[j];
      var noAtor = grafo.getNo(ator);

      if(noAtor == undefined){
        noAtor = new No(ator);
        dropdown.option(ator);
      }

      grafo.addNo(noAtor);
      noFilme.addBorda(noAtor);
    }
  }
}

function bfs() {
  grafo.reset();

  //var inicio = grafo.setInicio("Kevin Bacon");
  var inicio = grafo.setInicio(dropdown.value());
  var fim = grafo.setFim("Kevin Bacon");

  var fila = [];

  inicio.procurado = true;
  fila.push(inicio);

  while(fila.length > 0){
    //pega o primeiro
    var atual = fila.shift();
    //valida se é oque procura
    if(atual == fim){
      console.log("Achei "+  atual.valor);
      break;
    }

    var bordas = atual.bordas;
    for(var i =0;i<bordas.length;i++){
      var vizinho = bordas[i];
      if(!vizinho.procurado){
        vizinho.procurado = true;
        vizinho.pai  = atual;
        fila.push(vizinho);
      }
    }
  }
  var caminho = [];
  caminho.push(fim);
  var prox = fim.pai;
  while (prox != null){
    caminho.push(prox);
    prox = prox.pai;
  }
  var txt = '';
  for(var i=caminho.length-1;i>=0;i--){
    var n = caminho[i];
    txt += n.valor;
    if(i!=0){txt+= '---->'};
  }
  //função p5 de criação de paragrafro
  createP(txt);
}
