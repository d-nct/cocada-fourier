// Implementação basicona
// Tradução direta do matematiquês...
// function transformadaDiscretaFourier_basicona(pontos) {
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

class Complexo {
  constructor(a, b) {
    this.re = a;
    this.im = b;
  }

  add(c) {
    return new Complex(this.re + c.re, this.im + c.im);
  }

  sub(c) {
    return new Complex(this.re - c.re, this.im - c.im);
  }

  mult(c) {
    return new Complex(this.re * c.re - this.im * c.im, this.re * c.im + this.im * c.re);
  }
}

// Implementação melhorada
// Algoritmo de Cooley-Tukey (recursivo)
// https://en.wikipedia.org/wiki/Cooley%E2%80%93Tukey_FFT_algorithm
function cooleyTukey(pontos) {
    let X = []; // vetor para armazenar os pontos da transformada
    let N = pontos.length; // número de pontos
    let pares = [];
    let impares = [];

    if (N > 2) {
        pares   = cooleyTukey(pontos.filter((_, i) => i % 2 == 0));
        impares = cooleyTukey(pontos.filter((_, i) => i % 2 == 1));
    } else {
        pares.push(pontos[0]);
        impares.push(pontos[1]);
    }

    let metade = Math.floor(N / 2);

    let fatores = [];
    for (let n = 0; n < N; n++) {
        let fator = new Complexo (cos(2*PI * n / N), sin(2*PI * n / N));
        fatores.push(fator);
    }

    for (let n = 0; n < metade; n++) {
        let fator = fatores[n];
        let par   = pares[n];
        let impar = impares[n];

        let temp = par.add(fator.mult(impar));
        X[n] = temp;
    }

    for (let n = metade; n < N; n++) {
        let fator = fatores[n];
        let par   = pares[n - metade];
        let impar = impares[n - metade];

        let temp = par.sub(fator.mult(impar));
        X[n] = temp;
    }

    return X;
}

// function cooleyTukey(x) {
//   let N = x.length;

//   if (N > 2) {
//     let xOdd = cooleyTukey(x.filter((_, i) => i % 2 === 0));
//     let xEven = cooleyTukey(x.filter((_, i) => i % 2 === 1));

//     let result = [];
//     for (let i = 0; i < N; i++) {
//       let n = i;
//       let half = Math.floor(N / 2);
//       let factor = p5.complex(Math.cos(-2 * PI * n / N), Math.sin(-2 * PI * n / N));

//       result[i] = p5.complex.add(xOdd[i % half], p5.complex.mult(xEven[i % half], factor));
//     }
//     return result;
//   } else {
//     let xOdd = x[0];
//     let xEven = x[1];

//     return [
//       p5.complex.add(xOdd, xEven),
//       p5.complex.sub(xOdd, xEven)
//     ];
//   }
// }

class Complex {
  constructor(a, b) {
    this.re = a;
    this.im = b;
  }

  add(c) {
    this.re += c.re;
    this.im += c.im;
  }

  mult(c) {
    const re = this.re * c.re - this.im * c.im;
    const im = this.re * c.im + this.im * c.re;
    return new Complex(re, im);
  }
}

function transformadaDiscretaFourier_basicona_complexa(x) {
  const X = [];
  const N = x.length;
  for (let k = 0; k < N; k++) {
    let sum = new Complex(0, 0);
    for (let n = 0; n < N; n++) {
      const phi = (TWO_PI * k * n) / N;
      const c = new Complex(cos(phi), -sin(phi));
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
