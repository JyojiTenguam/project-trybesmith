# ⚔️ Trybesmith

Uma API RESTful desenvolvida com Node.js, Express e MySQL que simula o back-end de uma loja medieval de itens e personagens. A API permite cadastrar usuários, produtos e realizar ordens de compra com autenticação via JWT.

## ✨ Demonstração

> Projeto sem interface visual. Os endpoints da API podem ser testados utilizando ferramentas como Postman ou Insomnia.

## 📋 Índice

- [Sobre](#-sobre)
- [Habilidades desenvolvidas](#-habilidades-desenvolvidas)
- [Tecnologias utilizadas](#-tecnologias-utilizadas)
- [Como rodar o projeto](#-como-rodar-o-projeto)
- [Autor](#-autor)

## 💡 Sobre

Neste projeto foi desenvolvida uma API baseada em uma loja de itens medievais, com as seguintes funcionalidades:

- Cadastro e login de usuários
- Registro e listagem de produtos
- Registro e listagem de ordens
- Validações de dados com middleware
- Autenticação via JSON Web Token (JWT)
- Arquitetura em camadas: Model, Service e Controller

## 🛠️ Habilidades desenvolvidas

- Construção de APIs REST com Express
- Autenticação e autorização com JWT
- Modelagem e integração com banco de dados MySQL usando Sequelize
- Criação de middlewares personalizados
- Arquitetura em camadas (MSC)
- Validação de dados com `Joi`

## 🧪 Tecnologias utilizadas

- Node.js
- Express
- Sequelize
- MySQL
- JWT
- Joi
- Docker & Docker Compose

## 🚀 Como rodar o projeto

1. Clone o repositório:

```bash
git clone https://github.com/tryber/project-trybesmith.git
```

2. Acesse a pasta do projeto

```bash
cd project-trybesmith
```

3. Instale as dependências

```bash
npm install
```

4. Inicie os containers com Docker

```bash
docker-compose up -d
```

5. Execute as migrations (se necessário)

```bash
npm run migration:run
```

6. Inicie o servidor local

```bash
npm start
```
>A aplicação abrirá no navegador em http://localhost:3000

## 👤 Autor

Este projeto foi desenvolvido como parte do curso de Desenvolvimento Web da Trybe, por Jyoji Tenguam.
