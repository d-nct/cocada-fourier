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
├── documentacao.md
├── README.md
├── static
│   ├── draws.js
│   ├── fourier.js
│   ├── images
│   │   ├── Untitled 1.png
│   │   ├── Untitled 2.png
│   │   └── Untitled.png
│   ├── inputHandler.js
│   ├── p5.js
│   ├── sketch_circulo.js
│   ├── sketch_complexos.js
│   ├── sketch_desenhar.js
│   └── sketch_onda_quadrada.js
└── templates
    ├── 1.html
    ├── 2.html
    ├── 3.html
    ├── 4.html
    ├── base.html
    ├── index.html
    ├── relatorio.html
    └── style.css
```

TODO: explicar todos

- `static/`: Contém arquivos estáticos, como CSS e JavaScript.
    - `script.js`: Arquivo JavaScript principal.
- `templates/`: Contém os modelos HTML para renderização pelo Flask.
    - `index.html`: Página inicial do site.
    - `about.html`: Página "Sobre nós".
- `app.py`: Arquivo principal do Flask para o aplicativo da web.
- `README.md`: Este arquivo README explicativo.

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

Para que todos na rede local tenham acesso ao site, basta utilizar como host (no método `app.run`, em `app.py`) o endereço de bradcast:

- Para IPv4, é `'0.0.0.0'`
- Para IPv6, é `'::'`

Qualquer um funciona.

O endereço de IP da sua máquina será exibido no console assim que o servidor for iniciado.

# Para o Futuro

- [~] Implementar a FTT.
- [ ] Adicionar controle de velocidade para display de desenhos.
- [ ] Adicionar a opção de diminuir a complexidade do desenho.
- [ ] Fazer o programa aceitar imagens SVG como entrada da Transformada Discreta de Fourier.

# pra entregar
- Mencionar q tentei implementar a ftt
- refazer a homepage!