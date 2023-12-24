// Sessão de Configurações
// -----------------------
let tempo = 0;
let curva = [];              // vetor para armazenar a curva aproximada
let entrada = [];            // vetor para armazenar os pontos complexos de entrada
let entradaProcessada = [];  // vetor para armazenar os pontos da transformada

const CANVAS_X = 1000;       // largura do canvas
const CANVAS_Y = 1000;       // altura do canvas

// para o desenho
const USER = 0;
const FOURIER = 1;
let state = -1;
let drawing = [];
function mousePressed() { // zera tudo
  state = USER;
  drawing = [];
  entrada = [];
  tempo = 0;
  curva = [];
}
function mouseReleased() {
  state = FOURIER;

  // cria a entrada como sabemos ler
  const skip = 1;
  for (let i = 0; i < drawing.length; i += skip) {
    entrada.push(new Complexo(drawing[i].x, drawing[i].y)); 
  }
  entradaProcessada = transformadaDiscretaFourier_complexa_CT(entrada); // magia!!
  // entradaProcessada = cooleyTukey(entrada); // TODO: implementar

  entradaProcessada.sort((a, b) => b.amplitude - a.amplitude); // ordena os epiciclos por amplitude
}

function setup() {
  createP("Desenhe algo para ser aproximado com a transformada de Fourier!");
  createCanvas(CANVAS_X, CANVAS_Y);

  // desativa a rolagem para qualquer lado no mobile
  document.body.addEventListener('touchmove', function (e) {
    e.preventDefault();
  }, { passive: false });

}

function desenhaEpiciclo(x0, y0, epiciclos, rotacao=0) {
  let x = x0;
  let y = y0;
  for (let i = 0; i < epiciclos.length; i++) {
    let xAnt = x;
    let yAnt = y;

    // recupera os dados do pré processamento
    let raio       = epiciclos[i].amplitude;
    let frequencia = epiciclos[i].frequencia;
    let offset     = epiciclos[i].fase;

    x += raio * cos(frequencia * tempo + offset + rotacao); // calcula a posiçã com o offset
    y += raio * sin(frequencia * tempo + offset + rotacao);
    
    // desenha a circunferencia atual
    stroke(255, 100); // define a cor branca levemente transparente
    noFill();
    ellipse(xAnt, yAnt, raio*2);

    // desenha uma linha que vai do centro da circunf maior até o centro da menor (atual)
    stroke(255);
    line(xAnt, yAnt, x, y); // linha
  }

  return createVector(x, y); // retorna a posição da cabeça
}


function draw() {
  background(0); // fundo preto
  
  // momento do desenho
  if (state == USER) {
    let pontoMouse = createVector(mouseX - CANVAS_X / 2, mouseY - CANVAS_Y / 2); // pega a posição do mouse
    drawing.push(pontoMouse); // registra
    stroke(255, 0, 0); 
    noFill();
    beginShape();
    for (let v of drawing) {
      vertex(v.x + CANVAS_X / 2, v.y + CANVAS_Y / 2); // desenha o traço do mouse
    }
    endShape();
  } 

  // momento do fourier brilhar
  else if (state == FOURIER) {
    let ponto = desenhaEpiciclo(CANVAS_X/2, CANVAS_Y/2, entradaProcessada); // desenha os epiciclos

    // Desenha a curva
    curva.unshift(ponto); // adiciona o ponto no início do array
    stroke(255, 0, 0); // define a cor vermelha
    beginShape();
    noFill();
    for(let i = 0; i < curva.length; i++) {
      vertex(curva[i].x, curva[i].y);
    }
    endShape();
    
    // acabou o fourier, agora é só animação
    tempo += 2*PI / entradaProcessada.length; // velocidade

    // economia de memória
    if (tempo > 2*PI) {
      tempo = 0;
      curva = [];
    }
  }
}