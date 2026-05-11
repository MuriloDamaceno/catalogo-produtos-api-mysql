# Catálogo de Produtos API

API REST para gerenciamento de catálogo de produtos, desenvolvida com Node.js, Express e MongoDB.

## Tecnologias Utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- BCryptjs
- JSON Web Token (JWT)

## Como Rodar o Projeto

### Pré-requisitos
- Node.js instalado
- MongoDB instalado e rodando

### Passo a passo

1. Clone o repositório:
https://github.com/MuriloDamaceno/catalogo-produtos-api.git
2. Entre na pasta do projeto:
cd catalogo-produtos-api
3. Instale as dependências:
npm install
4. Crie o arquivo `.env` baseado no `.env.example`:
PORT=3000
MONGODB_URI=mongodb://localhost:27017/catalogo-produtos
JWT_SECRET=sua_chave_secreta
5. Inicie o servidor:
node app.js
O servidor estará rodando em `http://localhost:3000`

## Endpoints

### Autenticação

| Método | Rota | Descrição | Requer Token |
|--------|------|-----------|--------------|
| POST | /auth/registrar | Registrar novo usuário | Não |
| POST | /auth/login | Fazer login e receber token | Não |

### Produtos

| Método | Rota | Descrição | Requer Token |
|--------|------|-----------|--------------|
| GET | /produtos | Listar todos os produtos | Sim |
| GET | /produtos/:id | Buscar produto por ID | Sim |
| GET | /produtos?nome=x | Filtrar produtos por nome | Sim |
| GET | /produtos?categoria=x | Filtrar por categoria | Sim |
| POST | /produtos | Criar novo produto | Sim |
| PUT | /produtos/:id | Atualizar produto | Sim |
| DELETE | /produtos/:id | Deletar produto | Sim |

## Como Autenticar

1. Registre um usuário em `POST /auth/registrar`:
```json
{
    "nome": "Seu Nome",
    "email": "seu@email.com",
    "senha": "suasenha"
}
```

2. Faça login em `POST /auth/login`:
```json
{
    "email": "seu@email.com",
    "senha": "suasenha"
}
```

3. Use o token retornado no header das requisições:
## Exemplo de Produto
```json
{
    "nome": "Teclado Mecânico",
    "preco": 250.00,
    "descricao": "Teclado mecânico RGB",
    "categoria": "Periféricos",
    "estoque": 10
}
```
## Estrutura do Projeto
catalogo-produtos-api/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   └── routes/
├── .env.example
├── app.js
└── package.json

