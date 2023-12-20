// function getRandom(numPts, min=-100, max=100) {
//   let vetor = [];
//   for(let i = 0; i < numPts; i++) {
//     vetor.push(random(min, max));
//   }
//   return vetor;
// }

function getRuido(numPts=200, range=100) {
  let vetor = [];
  let x = 0;
  for (let i = 0; i < numPts; i++) {
    vetor[i] = 100 * noise(x) - range; // gera um valor entre -range e range
    x += 0.1;
  }
  return vetor;
}

function getModulo(max=100, min=-100) {
  let vetor = [];
  y = (max + min) / 2;
  crescendo = true;
  for(let i = 0; i < (max - min); i++) {
    vetor[i] = y;
    if (y == max) {
      crescendo = false;
    }
    if (crescendo) {
      y++;
    } else {
      y--;
    }
  }
  return vetor;
}

function getSenoide(numPts=100, amplitude=100, frequencia=1) {
  let vetor = [];
  for(let i = 0; i < numPts; i++) {
    angulo = (2*PI * i * frequencia) / numPts;
    vetor[i] = amplitude * sin(angulo);
  }
  return vetor;
}

function getCossenoide(numPts=100, amplitude=100, frequencia=1) {
  let vetor = [];
  for(let i = 0; i < numPts; i++) {
    angulo = (2*PI * i * frequencia) / numPts;
    vetor[i] = amplitude * cos(angulo);
  }
  return vetor;
}