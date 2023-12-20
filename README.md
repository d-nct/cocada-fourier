# Desenhando Com Fourier

O programa foi elaborado como Projeto Final de tema livre da disciplina de Computação Científica e Análise de Dados (COCADA), ofertada pelo Instituto de Computação (IC) da Universidade Federal do Rio de Janeiro (UFRJ).

A ideia é entender as Séries de Fourier e as Transformadas de Fourier com visualização através de animações interativas.

Para mais detalhes, consulte o relatório!

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

### Executando na Rede Local

Para que todos na rede local tenham acesso ao site, basta utilizar como host (no método `app.run`, em `app.py`) o endereço de bradcast:

- Para IPv4, é `'0.0.0.0'`
- Para IPv6, é `'::'`

Qualquer um funciona.

O endereço de IP da sua máquina será exibido no console assim que o servidor for iniciado.

# Roadmap

- [ ] Adicionar controle de velocidade para display de desenhos
- [ ] Fazer o programa aceitar imagens SVG como entrada da Transformada Discreta de Fourier
<!-- - [ ]  -->

# Referências

---
