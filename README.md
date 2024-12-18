# Teste Backend

Todos os testes foram feitos usando Node.js, exceto o quarto.
Deixo abaixo instruções básicas de execução.
Alguns projetos tem testes automatizados para a sua execução.

## Pré-requisitos

- Node 22
- Python 3

## Teste PLD

```sh
cd teste-backend-pld

npm install

npm run execute
```

## Teste Stack

```sh
cd teste-backend-stack

npm install

npm run test
```

## Teste Dicionário

```sh
cd teste-backend-dict

npm install

npm run test
```

## Teste Fibonacci

```sh
cd teste-backend-fibonacci

python fibonacci.py
```

## Teste Inventário de Produtos

```sh
cd teste-backend-products

npm install

# Para executar o projeto
npm run start

# Para rodar todos os testes
npm run test

# Para rodar os testes junto da cobertura de testes
npm run test:coverage
```
