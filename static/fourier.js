// Implementação basicona
// Tradução direta do matematiquês...
function transformadaDiscretaFourier(pontos) {
  let X = []; // vetor para armazenar os pontos da transformada
  let N = pontos.length; // número de pontos
  let real = 0; // variável auxiliar para somatório
  let imag = 0;
  
  // itera pelos pontos do vetor da transformada
  for (let k = 0; k < N; k++) {
      real = 0;
      imag = 0;

      // itera pelos pontos da entrada
      for (let n = 0; n < N; n++) {
          xn = pontos[n];
          
          // calcula
          angulo = (2*PI * k * n) / N; // ganhei a rotação de graça da fórmula
          real += xn * cos(angulo);
          imag -= xn * sin(angulo);
      }

      real = real / N;
      imag = imag / N;

      // salvando metadados
      X[k] = {real, imag, 
        amplitude: sqrt(real*real + imag*imag), // como é vetor, a amplitude é a norma
        fase: atan2(imag, real),                // por definição
        frequencia: k
      };
  }

  return X;
}

// Objeto de número complexo
class Complexo {
  constructor(a, b) {
    this.re = a;
    this.im = b;
  }
  
  add(outro) {
    this.re += outro.re;
    this.im += outro.im;
  }
  
  mult(outro) {
    const re = this.re * outro.re - this.im * outro.im;
    const im = this.re * outro.im + this.im * outro.re;
    return new Complexo(re, im);
  }

  div_escalar(x) {
    this.re /= x;
    this.im /= x;
  }

  norma() {
    return sqrt(this.re * this.re + this.im * this.im);
  }
}

function transformadaDiscretaFourier_complexa_CT(pontos) {
  const X = []; // vetor para armazenar os pontos da transformada
  const N = pontos.length; // número de pontos
  let somatorio; 
  let angulo, termo_e; // complexos

  // itera pelos pontos do vetor da transformada
  for (let k = 0; k < N; k++) {
    somatorio = new Complexo(0, 0); // um somatório para cada frequência

    // itera pelos pontos da entrada
    for (let n = 0; n < N; n++) {
      angulo = (2*PI * k * n) / N; // rotação
      termo_e = new Complexo(cos(angulo), -sin(angulo)); // termo e^(-i*2*pi*k*n/N) da DFT
      somatorio.add(pontos[n].mult(termo_e)); // somatório do atual rotacionado
    }
    somatorio.div_escalar(N);
    
    // salvando metadados
    X[k] = { real: somatorio.re, imag: somatorio.im, 
      frequencia: k,                                // metadados
      amplitude:  somatorio.norma(),                // a amplitude é a "norma" do complexo,
      fase:       atan2(somatorio.im, somatorio.re) // por definição
      };
    }
  return X;
}


// TODO: FFT

// class Complexo {
//   constructor(a, b) {
//     this.re = a;
//     this.im = b;
//     return this;
//   }

//   add(x) {
//     return new Complexo(this.re + x.re, this.im + x.im);
//   }

//   sub(x) {
//     return new Complexo(this.re - x.re, this.im - x.im);
//   }

//   mult(x) {
//     return new Complexo(this.re * x.re - this.im * x.im, this.re * x.im + this.im * x.re);
//   }
// }
  
// Implementação melhorada
// Algoritmo de Cooley-Tukey (recursivo)
// function cooleyTukey(pontos) {
//   let X = []; // vetor para armazenar os pontos da transformada
//   let N = pontos.length;

//   // caso base
//   if (N <= 1) {
//     return pontos;
//   } 

//   // dividir e conquistar
//   const pares   = cooleyTukey(pontos.filter((_, i) => i % 2 == 0));
//   const impares = cooleyTukey(pontos.filter((_, i) => i % 2 == 1));

//   // recombinação
//   const metade = Math.floor(N / 2);
//   let fator;
//   let angulo;
//   for (let k = 0; k < metade -1; k++) {
//     angulo = -(2*PI * k / N);
//     fator = new Complexo(cos(angulo), sin(angulo)); // giro

//     X[k] = pares[k].add(fator.mult(impares[k]));
//     // X[k + metade] = pares[k].sub(fator.mult(impares[k]));
//   }

//   return X;
// }