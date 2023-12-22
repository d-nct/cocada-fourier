// Sessão de Configurações
// -----------------------
let tempo = 0;
let curva = [];              // vetor para armazenar a curva aproximada
let entradaX = [];           // vetor para armazenar os pontos de entrada
let entradaY = [];
let entradaProcessadaX = []; // vetor para armazenar os pontos da transformada
let entradaProcessadaY = [];

const CANVAS_X = 1000;        // largura do canvas
const CANVAS_Y = 1000;        // altura do canvas

// para o desenho
const USER = 0;
const FOURIER = 1;
let state = -1;
let drawing = [];
function mousePressed() { // zera tudo
  state = USER;
  drawing = [];
  entradaX = [];
  entradaY = [];
  tempo = 0;
  curva = [];
}
function mouseReleased() {
  state = FOURIER;
  const skip = 1;
  for (let i = 0; i < drawing.length; i += skip) {
    entradaX.push(drawing[i].x);
    entradaY.push(drawing[i].y);
  }
  entradaProcessadaX = transformadaDiscretaFourier(entradaX);
  entradaProcessadaY = transformadaDiscretaFourier(entradaY);

  // ordena os epiciclos por amplitude
  entradaProcessadaX.sort((a, b) => b.amp - a.amp);
  entradaProcessadaY.sort((a, b) => b.amp - a.amp);
}

function setup() {
  createCanvas(CANVAS_X, CANVAS_Y);
  createP("Desenhe algo para ser aproximado com a transformada de Fourier!");

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
    stroke(255, 0, 0); //vermelho
    noFill();
    beginShape();
    for (let v of drawing) {
      vertex(v.x + CANVAS_X / 2, v.y + CANVAS_Y / 2); // desenha o traço do mouse
    }
    endShape();
  } 

  // momento do fourier brilhar
  else if (state == FOURIER) {
    let cabX = desenhaEpiciclo(CANVAS_X/2 + 100, 100, entradaProcessadaX); // desenha os epiciclos
    let cabY = desenhaEpiciclo(100, CANVAS_Y/2 + 100, entradaProcessadaY, rotacao=PI/2); 
    let ponto = createVector(cabX.x, cabY.y);

    // Desenha a curva
    curva.unshift(ponto); // adiciona o ponto no início do array
    stroke(255, 0, 0); // vermelho
    beginShape();
    noFill();
    for(let i = 0; i < curva.length; i++) {
      vertex(curva[i].x, curva[i].y);
    }
    endShape();
    
    // desenha uma linha que conecta a cabeça de cada fourier com a curva
    stroke(0, 255, 0); // magenta
    line(cabX.x, cabX.y, ponto.x, ponto.y);
    line(cabY.x, cabY.y, ponto.x, ponto.y);
    
    //desenha a cabeça na curva
    stroke(255, 100);
    fill(255, 100);
    ellipse(ponto.x, ponto.y, 8);

    
    // acabou o fourier, agora é só animação
    tempo += 2*PI / entradaProcessadaY.length; // velocidade

    // economia de memória
    if (tempo > 2*PI) {
      tempo = 0;
      curva = [];
    }
  }
}