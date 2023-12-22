// Sessão de Configurações
// -----------------------
let tempo = 0;
let curva = [];              // vetor para armazenar a curva aproximada
let entradaX = [];           // vetor para armazenar os pontos de entrada
let entradaY = [];
let entradaProcessadaX = []; // vetor para armazenar os pontos da transformada
let entradaProcessadaY = [];
let velocidade = 0;

// let checkErro; Desativado por enquanto, a feature não ficou boa

const CANVAS_X = 600;        // largura do canvas
const CANVAS_Y = 600;        // altura do canvas

function setup() {
  createCanvas(CANVAS_X, CANVAS_Y);

  // define as entradas
  entradaX = getCossenoide(amplitude=100);
  entradaY = getSenoide(amplitude=100);

  // pré processamento as entradas
  entradaProcessadaX = transformadaDiscretaFourier(entradaX);
  entradaProcessadaY = transformadaDiscretaFourier(entradaY);

  // ordena as entradas por amplitude
  entradaProcessadaX.sort((a, b) => b.amp - a.amp);
  entradaProcessadaY.sort((a, b) => b.amp - a.amp);

  // calcula a velocidade
  velocidade = 2*PI / entradaProcessadaY.length;

  // checkbox
  // checkErro = createCheckbox('Mostrar acúmulo do erro aritimético?', false);
  // checkErro.position(10, CANVAS_Y + 10);
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
  
  // momento do fourier brilhar
  let cabY = desenhaEpiciclo(CANVAS_X/2 + 100, 100, entradaProcessadaX); // desenha os epiciclos
  let cabX = desenhaEpiciclo(100, CANVAS_Y/2 + 100, entradaProcessadaY, rotacao=PI/2); 
  let ponto = createVector(cabY.x, cabX.y);

  // Desenha a curva
  curva.unshift(ponto); // adiciona o ponto no início do array
  beginShape();
  noFill();
  for(let i = 0; i < curva.length; i++) {
    vertex(curva[i].x, curva[i].y);
  }
  endShape();
  
  // desenha uma linha que conecta a cabeça de cada fourier com a curva
  line(cabX.x, cabX.y, ponto.x, ponto.y);
  line(cabY.x, cabY.y, ponto.x, ponto.y);

  // desenha as cabeças
  stroke(0, 255, 0) // verde
  fill(0, 255, 0);
  ellipse(cabX.x, cabX.y, 5);
  stroke(255, 0, 0); // vermelho
  fill(255, 0, 0);
  ellipse(cabY.x, cabY.y, 5);

  stroke(255, 255, 0); // amarelo
  fill(255, 255, 0);
  ellipse(ponto.x, ponto.y, 5);

  // acabou o fourier, agora é só animação
  tempo += velocidade;

  // economia de memória
  if (curva.length > 200) {
    // if (!checkErro.checked()) { 
      curva.pop(); // remove o último elemento do array
    // }
  }
}