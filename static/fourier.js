// Implementação basicona
// Tradução direta do matematiquês...
function transformadaDiscretaFourier(pontos) {
  let X = []; // vetor para armazenar os pontos da transformada
  let N = pontos.length; // número de pontos
  let real = 0; // variável auxiliar para somatório
  let imag = 0;
  let amplitude = 0;
  let fase = 0;
  let frequencia = 0;
  
  // itera pelos pontos do vetor da transformada
  for (let k = 0; k < N; k++) {
      real = 0;
      imag = 0;

      // itera pelos pontos da entrada
      for (let n = 0; n < N; n++) {
          xn = pontos[n];
          
          // calcula
          angulo = (2*PI * k * n) / N; // ganhei de graça da wikipédia
          real += xn * cos(angulo);
          imag -= xn * sin(angulo);
      }

      real = real / N;
      imag = imag / N;

      // salvando metadados
      frequencia = k; // por definição
      amplitude = sqrt(real*real + imag*imag); // como é vetor, a amplitude é a norma
      fase = atan2(imag, real); // por definição

      X[k] = {real, imag, amplitude, fase, frequencia};
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
}

function transformadaDiscretaFourier_complexa(pontos) {
  let X = []; // vetor para armazenar os pontos da transformada
  let N = pontos.length; // número de pontos
  let somatorio = new Complexo(0, 0); // variável auxiliar para somatório
  let amplitude = 0;
  let fase = 0;
  let frequencia = 0;
  let termo_e = new Complexo(0, 0); // termo e^(-i*2*pi*k*n/N) da DFT

  // itera pelos pontos do vetor da transformada
  for (let k = 0; k < N; k++) {
    somatorio = new Complexo(0, 0);  

    // itera pelos pontos da entrada
    for (let n = 0; n < N; n++) {
        xn = pontos[n];
        
        // calcula
        angulo = (2*PI * k * n) / N; // ganhei de graça da fórmula
        termo_e = new Complexo(cos(angulo), -sin(angulo));
        somatorio.add(xn.mult(termo_e));
      }

    somatorio.real /= N;
    somatorio.imag /= N;

    // salvando metadados
    frequencia = k; // por definição
    amplitude = sqrt(somatorio.real * somatorio.real + somatorio.imag * somatorio.imag); // a amplitude é a "norma" do vetor
    fase = atan2(somatorio.imag, somatorio.real); // por definição

    X[k] = {real: somatorio.real, imag: somatorio.imag, amplitude, fase, frequencia};
  }

  return X;
}


function transformadaDiscretaFourier_complexa(x) {
  const X = [];
  const N = x.length;
  for (let k = 0; k < N; k++) {
    let sum = new Complexo(0, 0);
    for (let n = 0; n < N; n++) {
      const phi = (TWO_PI * k * n) / N;
      const c = new Complexo(cos(phi), -sin(phi));
      sum.add(x[n].mult(c));
    }
    sum.re = sum.re / N;
    sum.im = sum.im / N;
    
    let freq = k;
    let amp = sqrt(sum.re * sum.re + sum.im * sum.im);
    let phase = atan2(sum.im, sum.re);
    X[k] = { real: sum.re, 
      imag: sum.im, 
      frequencia: freq, 
      amplitude: amp, 
      fase: phase };
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
  
  // // Implementação melhorada
  // // Algoritmo de Cooley-Tukey (recursivo)
  // // https://en.wikipedia.org/wiki/Cooley%E2%80%93Tukey_FFT_algorithm
  // function cooleyTukey(pontos) {
  //     let X = []; // vetor para armazenar os pontos da transformada
  //     let N = pontos.length; // número de pontos
  //     let pares = [];
  //     let impares = [];
  
  //     if (N > 2) {
  //         pares   = cooleyTukey(pontos.filter((_, i) => i % 2 == 0));
  //         impares = cooleyTukey(pontos.filter((_, i) => i % 2 == 1));
  //     } else {
  //         pares.push(pontos[0]);
  //         impares.push(pontos[1]);
  //     }
  
  //     let metade = Math.floor(N / 2);
  
  //     let fatores = [];
  //     for (let n = 0; n < N; n++) {
  //         let fator = new Complexo (cos(2*PI * n / N), sin(2*PI * n / N));
  //         fatores.push(fator);
  //     }
  
  //     for (let n = 0; n < metade; n++) {
  //         let fator = fatores[n];
  //         let par   = pares[n];
  //         let impar = impares[n];
  
  //         let temp = par.add(fator.mult(impar));
  //         X[n] = temp;
  //     }
  
  //     print()
  //     for (let n = metade; n <= N; n++) {
  //         let fator = fatores[n];
  //         let par   = pares[n - metade];
  //         let impar = impares[n - metade];
  
  //         let fatorImpar = fator.mult(impar);
  //         let temp = par.sub(fatorImpar);
          
  //         X[n] = temp;
  //     }
  
  //     return X;
  // }