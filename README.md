# Desenhando Com Fourier

O programa foi elaborado como Projeto Final de tema livre da disciplina de Computação Científica e Análise de Dados (COCADA), ofertada pelo Instituto de Computação (IC) da Universidade Federal do Rio de Janeiro (UFRJ).

A ideia é entender as Séries de Fourier e as Transformadas de Fourier com visualização através de animações interativas.

Para mais detalhes, consulte o relatório diretamente pelo site!

## Navegando pelo Site

Como o foco do projeto não era a estética, recomendo deixar duas janelas do navegador abertas, uma sempre com o relatório aberto e outra para navegar e interagir com as visualizações. 

## Estrtura de Arquivos do Projeto

```
cocada-fourier/
├── app.py
├── README.md
├── static
│   ├── fourier.js
│   ├── images
│   │   ├── 1_senoides_combinadas.png
│   │   ├── 2_circunf_trigonometrica.png
│   │   └── 3_identidade_euler.png
│   ├── inputHandler.js
│   ├── p5.js
│   ├── sketch_circulo.js
│   ├── sketch_complexos.js
│   ├── sketch_desenhar.js
│   └── sketch_onda_quadrada.js
└── templates
    ├── 1.html
    ├── 2.html
    ├── 3.html
    ├── 4.html
    ├── base.html
    ├── index.html
    ├── relatorio.html.
    ├── style.css
    └── tutorial_celular.html
```

- `app.py`: Contém o arquivo principal do site em flask. Na verdade, só serve para unir as páginas HTML.
- `README.md`: Este arquivo README explicativo.
- `static/`: Contém arquivos estáticos, como JavaScript e as imagens do relatório.
    - `fourier.js`: Contém as implementações da DFT para: vetor de pontos, complexos e complexos com FFT (Cooley-Tukey) (esboço).
    - `images/`: Diretório para as imagens do relatório
    - `inputHandler.js`: Este arquivo é responsável por prover dados de input para a DFT. Atualmente, só entrega um vetor de cosseno e seno para desenhar o círculo.
    - `p5.js`: Biblioteca javascript utilizada para as animações.
    - `sketch_circulo`: Contém a animação que desenha a circunferência usando sen e cos.
    - `sketch_complexos`: Contém a animação do desenho livre com números complexos.
    - `sketch_desenhar`: Contém a animação do desenho livre com duas máquinas de desenhar.
    - `sketch_onda_quadrada`: Contém o simulador de ondas quadradas.
- `templates/`: Contém os arquivos HTML para renderização pelo Flask.
    - `1-4.html`: Páginas com breve descrição sobre cada animação.
    - `base.html`: Barra superior para a página inicial. Não foi compatível com o bootstrap do notion nem com o `p5js`, então não foi utilizado nas demais páginas.
    - `index.html`: Página inicial do site. É esse README convertido para HTML.
    - `relatorio.html`: Relatório do notion convertido para HTML.
    - `style.css`: Arquivo padrão de CSS do projeto `p5js`.
    - `tutorial_celular.html`: Guia sobre como acessar o site local pelo celular para desenhar com o dedo.

# Instalação

## Dependências

O programa usa o Flask do Python e o p5.js do JavaScript. Esta última já está inclusa no repositório, então só é necessário instalar o Flask com 

```sh
pip install flask
```

## Rodando o WebServer

Para rodar o servidor, basta executar o comando

```sh
python3 app.py
```

Uma saída de sucesso é algo do tipo 

```sh
$ python3 app.py 
 * Serving Flask app 'app'
 * Debug mode: on
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:5000            <- aqui é o localhost
 * Running on http://192.168.0.224:5000        <- por esse endereço é possível acessar de qualquer dispositivo na rede local
Press CTRL+C to quit
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 115-228-340
```

### Executando na Rede Local

Para que todos na rede local tenham acesso ao site, basta utilizar como host (no método `app.run`, em `app.py`) o endereço de broadcast:

- Para IPv4, é `'0.0.0.0'`
- Para IPv6, é `'::'`

Qualquer um funciona.

O endereço de IP da sua máquina será exibido no console assim que o servidor for iniciado. Basta acessar pelo navegador do dispositivo móvel na mesma rede wifi por ele.

# Para o Futuro

- [~] Implementar a FFT.
- [ ] Adicionar controle de velocidade para display de desenhos.
- [ ] Adicionar a opção de diminuir a complexidade do desenho, removendo as N menores circunferências.
- [ ] Fazer o programa aceitar imagens SVG como entrada da Transformada Discreta de Fourier.