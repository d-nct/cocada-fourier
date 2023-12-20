// Sessão de Configurações
// -----------------------
let tempo = 0;
let senoide = [];

let R = 100;             // raio da circunferencia grande
let COMPLEX = 5;         // complexidade. # de circunferencias
let VELOCIDADE = 0.05;   // velocidade da animação
let LARGURA_PT = 5;      // largura dos pontos

let sliderR;
let sliderComplex;
let sliderVelocidade;

let CANVAS_X = 800;
let CANVAS_Y = 400;

function setup() {
  createCanvas(CANVAS_X, CANVAS_Y);

  // sliders
  sliderR = createSlider(0, 2, 1, 0.01); // de 0 a 2, começa em 1, passo de 0.01
  sliderR.position(10, CANVAS_Y + 150);
  sliderR.style('width', '160px');
  createDiv('Raio - Amplitude: ' + sliderR.value()).position(10, CANVAS_Y + 130);

  sliderComplex = createSlider(1, 100, 3); // de 1 a 15, começa em 3
  sliderComplex.position(10, CANVAS_Y + 30);
  sliderComplex.style('width', '160px');
  createDiv('Nº de circunferências: ' + sliderComplex.value()).position(10, CANVAS_Y + 10);

  sliderVelocidade = createSlider(0.01, 0.35, 0.05, 0.01); // de 0.01 a 0.35, começa em 0.05, passo de 0.01
  sliderVelocidade.position(10, CANVAS_Y + 90);
  sliderVelocidade.style('width', '160px');
  createDiv('Velocidade - Frequência: ' + sliderVelocidade.value()).position(10, CANVAS_Y + 70);

}

function draw() {
  background(0); // fundo preto
  translate(200,200); // move o ponto de origem para o centro da tela
  
  // calcula as posições dos pontos e circunferencias internas
  let x = 0;
  let y = 0;
  let raio = 0;
  let xAnt = 0;
  let yAnt = 0;
  let n = 1; // n é o índice do termo da série de Fourier
  for (let i = 0; i < sliderComplex.value(); i++) {
    xAnt = x;
    yAnt = y;

    // calcula a circunferencia
    n = 2*i + 1; // tem que ser ímpar para gerar senoide
    raio = 75 * (4 / (n * PI)); // raio da circunf diretamente from wikipedia from hell to céu
    raio = raio * sliderR.value(); // multiplica pelo valor do slider

    x += raio * cos(n * tempo);
    y += raio * sin(n * tempo);
    
    // desenha a circunferencia
    stroke(255); // define a cor branca
    noFill();
    ellipse(xAnt, yAnt, raio*2);

    // desenha uma linha que vai do centro da circunf maior até o centro da menor (atual)
    fill(255);
    line(xAnt, yAnt, x, y); // linha
    ellipse(x, y, LARGURA_PT); // cabeça da linha
  }

  // Desenha a senoide
  translate(CANVAS_X/4, 0); // joga a senoide para a direita
  senoide.unshift(y); // adiciona o valor de y no início do array
  beginShape();
  noFill();
  for(let i = 0; i < senoide.length; i++) {
    vertex(i, senoide[i]);
  }
  endShape();
  
  // desenha uma linha que conecta a cabeça com a senoide
  line(x - (CANVAS_X/4), y, 0, y); // o - raio é por causa do translate
  

  // acabou o fourier, agora é só animação
  tempo -= sliderVelocidade.value();

  // economia de memória
  if (senoide.length > 500) {
    senoide.pop(); // remove o último elemento do array
  }

  // atualiza os valores dos sliders
  selectAll('div')[0].html('Raio - Amplitude: ' + sliderR.value());
  selectAll('div')[1].html('Nº de circunferências: ' + sliderComplex.value());
  selectAll('div')[2].html('Velocidade - Frequência: ' + sliderVelocidade.value());
}