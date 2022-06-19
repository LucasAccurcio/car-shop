# Projeto Car Shop :red_car:

## Contexto :selfie:

Neste projeto, foi utilizado o princípio da Programação Orientada a Objetos e desenvolvido um **CRUD** (_Create, Read, Update_ e _Delete_) para gerenciar uma concessionária de veículos.

## Técnologias usadas :technologist:

- Projeto desenvolvido em TypeScript, utilizando a biblioteca Express para criação da API RESTful.
- ORM Mongoose para criação e associação de tabelas MongoDB.

## Habilidades desenvolvidas

Neste projeto, consegui desenvolver as seguintes habilidades:

- Exercitar o conhecimento dos pilares da Programação Orientada a Objetos: `Herança`, `Abstração`, `Encapsulamento` e `Polimorfismo`;

- Exercitar a utilização de `Composição`;

- Exercitar a criação e utilização de `Interfaces`;

- Implementar, em TypeScript: Classes, Instâncias, Atributos, Métodos e Objetos;

- Aplicar os conhecimentos de MongoDB, Typescript e POO para criar uma API com CRUD.

## Executando aplicação

1. Clone o repositório
  * `git clone git@github.com:LucasAccurcio/car-shop.git`.
  * Entre na pasta do repositório que você acabou de clonar:
    * `cd car-shop`

2. Instalando os pacotes necessários:
  - `npm install`

3. Altere o arquivo .env-example para .env

4. Inicialize o servidor de banco de dados MongoDB:
  - **Na própria máquina:**
    * Certifique-se que o servidor MongoDB esteja rodando com o comando:
      `sudo service mongod status`
    - Para iniciar o serviço:
      `sudo service mongod start`
    
  - **Através do Docker**
    * Certifique-se que já tenha o Docker instalado em sua máquina.
      - Inicie um container com a imagem do MongoDB:
       - Baixe a imagem do MongoDB:

        ```sh
        docker pull mongo
        ```

        - Crie o contêiner do MongoDB:

        ```sh
        docker run --name <nome-do-conteiner> -p 27017:27017 -d mongo
        ```

        - Confira se o contêiner está rodando:

        ```sh
        docker ps
        ```

5. Inicializando a API:
  - `npm run dev`

6. Utilize a extensão no VSCode "Thunder Client" ou instale o Postman em sua máquina.
  - Para visualizar os veículos cadastrados acesse:
    * GET http://localhost:3001/cars

  - Para criar um novo veículo no banco de dados, acesse:
    * POST http://localhost:3001/cars
    
    `body: {
      "model": "GM Tracker",
      "year": 2022,
      "color": "black",
      "buyValue": 120000,
      "seatsQty": 5,
      "doorsQty": 4
    }`

  - Para visualizar apenas um veículo específico, acesse:
    * http://localhost:3001/cars/id, onde id seria o id do veículo no banco de dados.
      Exemplo: GET http://localhost:3001/cars/62577ca7a555d8ae1da3544e

  - Para atualizar um veículos especifício, acesse:
    * PUT http://localhost:3001/cars/id
      Exemplo: PUT http://localhost:3001/cars/625776f0e0470e2212e53261

    `body: {
      "model": "Ford Focus",
      "color": "black",
      "buyValue": 80000,
      "doorsQty": 4,
      "seatsQty": 5
    }`

  - Para deletar um veículo específico, acesse:
    * DELETE http://localhost:3001/cars/id
      Exemplo: DELETE http://localhost:3001/cars/625776f0e0470e2212e53261

  - Outras rotas disponíves:
  * GET http://localhost:3001/motorcycles
  * GET http://localhost:3001/motorcycles/id
  * POST http://localhost:3001/motorcycles
  * PUT http://localhost:3001/motorcycles/id
  * DELETE http://localhost:3001/motorcycles/id

6. Rodando os Testes do projeto:
  - Apenas os testes:
    * npm run test:dev

  - Teste com relatório de cobertura:
    * npm run test:coverage