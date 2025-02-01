# **Node TS Express REST API - Culinary Recipes**  

## **Descrição**  
Uma API RESTful construída com Node.js, Express e TypeScript para gerenciar e explorar receitas culinárias. Este projeto foi desenvolvido com o objetivo de praticar conceitos de desenvolvimento backend, arquitetura de software e boas práticas de código.  

A API oferece funcionalidades como busca de receitas, adição, atualização e exclusão de receitas, além de gerenciamento de favoritos e avaliações.  

## **Funcionalidades**  
- **Buscar receitas** por nome, ingredientes, tipo de refeição, tempo de preparo, e dificuldade.  
- **Filtrar receitas** por categorias, como veganas, vegetarianas ou sem glúten.  
- **Gerenciar receitas** (CRUD completo).  
- **Avaliações e comentários** para receitas.  
- **Gerenciamento de favoritos** para usuários.  

## **Tecnologias Utilizadas**  
- **Node.js**  
- **Express.js**  
- **TypeScript**  
- **Armazenamento de dados em arquivo JSON**

## **🌐 Endpoints**

### **🥗 Receitas**

#### **🔹 1. Buscar Todas as Receitas**

- **Endpoint:** `GET /recipes`
- **Query Strings (opcional):**
    - `name` → Filtrar por nome da receita
    - `ingredient` → Filtrar por ingrediente específico
    - `type` → Filtrar por tipo de refeição (`café da manhã`, `almoço`, `jantar`)
    - `difficulty` → Filtrar por dificuldade (`Fácil`, `Médio`, `Difícil`)

**Exemplo de Requisição:**

```
GET /recipes?ingredient=banana&type=café+da+manhã
```

**Resposta:**

```json
[
  {
    "id": 1,
    "name": "Panqueca de Banana",
    "ingredients": ["Banana", "Ovo", "Aveia"],
    "steps": ["Amasse a banana", "Misture com o ovo e a aveia", "Cozinhe em uma frigideira"],
    "type": "Café da Manhã",
    "time": "10 minutos",
    "difficulty": "Fácil",
    "category": "Sem Glúten",
    "ratings": []
  }
]
```

---

#### **🔹 2. Buscar Receita Específica**

- **Endpoint:** `GET /recipes/:id`

**Exemplo de Requisição:**

```
GET /recipes/1
```

**Resposta:**

```json
{
  "id": 1,
  "name": "Panqueca de Banana",
  "ingredients": ["Banana", "Ovo", "Aveia"],
  "steps": ["Amasse a banana", "Misture com o ovo e a aveia", "Cozinhe em uma frigideira"],
  "type": "Café da Manhã",
  "time": "10 minutos",
  "difficulty": "Fácil",
  "category": "Sem Glúten",
  "ratings": []
}
```

---

#### **🔹 3. Criar Nova Receita**

- **Endpoint:** `POST /recipes`
- **Corpo da Requisição:**

```json
{
  "name": "Omelete Simples",
  "ingredients": ["Ovo", "Sal", "Queijo"],
  "steps": ["Bata os ovos", "Tempere com sal", "Cozinhe em uma frigideira"],
  "type": "Café da Manhã",
  "time": "5 minutos",
  "difficulty": "Fácil",
  "category": "Vegetariano"
}
```

**Resposta:**

```json
{
  "id": 2,
  "name": "Omelete Simples",
  "ingredients": ["Ovo", "Sal", "Queijo"],
  "steps": ["Bata os ovos", "Tempere com sal", "Cozinhe em uma frigideira"],
  "type": "Café da Manhã",
  "time": "5 minutos",
  "difficulty": "Fácil",
  "category": "Vegetariano"
}
```

---

#### **🔹 4. Atualizar Receita**

- **Endpoint:** `PATCH /recipes/:id`
- **Corpo da Requisição (Exemplo de Atualização):**

```json
{
  "time": "7 minutos",
  "difficulty": "Médio"
}
```

**Resposta:**

```json
{
    "message": "Recipe updated successfully",
    "recipe": {
        "id": 30,
        "name": "Apple Pie",
        "ingredients": [
            "Bolacha",
            "Manteiga",
            "Maçã",
            "Leite Condensado",
            "Arroz"
        ],
        "steps": [
            "Prepare a massa.",
            "Recheie com creme de maçã.",
            "Leve à geladeira."
        ],
        "type": "Lanche",
        "time": "2 horas",
        "difficulty": "Médio",
        "category": "Sobremesa"
    }
}
```

---

#### **🔹 5. Excluir Receita**

- **Endpoint:** `DELETE /recipes/:id`

**Exemplo de Requisição:**

```
DELETE /recipes/2

```

**Resposta:**

```json
{
  "message": "Recipe deleted successfully"
}

```

---

#### **🔹 6. Adicionar Avaliação a uma Receita**  

- **Endpoint:** `POST /recipes/:id/ratings`  
- **O que faz?** Permite que usuários adicionem uma avaliação (nota e comentário) a uma receita.  

**Corpo da Requisição:**  

```json
{
  "userId": 101,
  "rating": 5,
  "comment": "Ótima receita! Fácil e rápida de fazer."
}
```

**Regras:**  
- `rating` deve ser um número entre 1 e 5.  
- `comment` é opcional, mas recomendado para melhor feedback.  

**Resposta:**  

```json
{
  "message": "Rating added successfully",
  "recipeId": 2,
  "rating": {
    "userId": 101,
    "rating": 5,
    "comment": "Ótima receita! Fácil e rápida de fazer."
  }
}
```

**Lógica:**  
1. Buscar a receita pelo `id`.  
2. Adicionar o novo rating à lista existente.  
3. Atualizar `recipes.json`.  

---

### **⭐ Favoritos (Gerenciamento dentro de `users.json`)**

#### **🔹 1. Listar Receitas Favoritas do Usuário**

- **Endpoint:** `GET /favorites?userId={{id}}`
- **O que faz?** Busca os favoritos armazenados no usuário.

**Exemplo de Requisição:**

```bash
GET /favorites?userId=101
```

**Resposta:**

```json
{
  "userId": 101,
  "recipes": [
  {
    "id": 2,
    "name": "Omelete Simples",
    "ingredients": ["Ovo", "Sal", "Queijo"],
    "steps": ["Bata os ovos", "Tempere com sal", "Cozinhe em uma frigideira"],
    "type": "Café da Manhã",
    "time": "5 minutos",
    "difficulty": "Fácil",
    "category": "Vegetariano"
  },
  {
    "id": 5,
    "name": "Macarrão ao Alho e Óleo",
    "ingredients": ["Macarrão", "Alho", "Azeite", "Sal", "Pimenta"],
    "steps": [
      "Cozinhe o macarrão até ficar al dente",
      "Aqueça o azeite em uma panela",
      "Adicione o alho picado e refogue até dourar",
      "Misture o macarrão ao alho e tempere com sal e pimenta"
    ],
    "type": "Almoço",
    "time": "15 minutos",
    "difficulty": "Fácil",
    "category": "Vegano"
  }
]

}
```

---

#### **🔹 2. Adicionar Receita aos Favoritos**

- **Endpoint:** `POST /favorites`
- **O que faz?** Adiciona um `recipeId` à lista de favoritos do usuário dentro de `users.json`.

**Corpo da Requisição:**

```json
{
  "userId": 101,
  "recipeId": 5
}
```

**Lógica:**

1. Buscar o usuário pelo `userId`.
2. Verificar se a receita já está nos favoritos.
3. Se não estiver, adicionar o `recipeId` à lista.
4. Atualizar `users.json`.

**Resposta:**

```json
{
  "message": "Recipe 5 - Macarrão ao Alho e Óleo added to favorites successfully"
}
```

---

#### **🔹 3. Remover Receita dos Favoritos**

- **Endpoint:** `DELETE /favorites/:recipeId?userId=101`
- **O que faz?** Remove um `recipeId` da lista de favoritos do usuário dentro de `users.json`.

**Lógica:**

1. Buscar o usuário pelo `userId`.
2. Remover o `recipeId` da lista de favoritos, se existir.
3. Atualizar `users.json`.

**Resposta:**

```json
{
  "message": "Favorite removed successfully"
}
```

---

### **👥 Usuários**

#### **🔹 1. Criar Usuário**

- **Endpoint:** `POST /users`
- **Corpo da Requisição:**

```json
{
  "name": "Carlos Oliveira",
  "email": "carlos@email.com"
}

```

**Resposta:**

```json
{
  "id": 103,
  "name": "Carlos Oliveira",
  "email": "carlos@email.com",
  "favorites": []
}

```

---

#### **🔹 2. Visualizar Perfil do Usuário**

- **Endpoint:** `GET  /users/:id`

**Exemplo de Requisição:**

```
GET /users/101

```

**Resposta:**

```json
{
  "id": 101,
  "name": "João Silva",
  "email": "joao@email.com",
  "favorites": [5, 2]
}

```

---

## **Exemplo de Receita JSON**  
```json
[
  {
    "id": 1,
    "name": "Panqueca de Banana",
    "ingredients": ["Banana", "Ovo", "Aveia"],
    "steps": [
      "Amasse a banana.",
      "Misture com o ovo e a aveia.",
      "Cozinhe em uma frigideira."
    ],
    "type": "Café da Manhã",
    "time": "10 minutos",
    "difficulty": "Fácil",
    "category": "Sem Glúten",
    "ratings": [
      {
        "user": "usuario1",
        "rating": 5,
        "comment": "Deliciosa!"
      }
    ]
  }
]

```  

## **Exemplo de Usuário JSON**
```json
[
  {
    "id": 101,
    "name": "João Silva",
    "email": "joao@email.com",
    "favorites": [5, 2, 8]
  },
  {
    "id": 102,
    "name": "Maria Souza",
    "email": "maria@email.com",
    "favorites": [3, 7]
  }
]
```
---

## **Possíveis Expansões Futuras**  
- **Integração com APIs externas** para buscar receitas adicionais.  
- **Autenticação de usuários** com JWT.  
- **Migração para banco de dados**, como MongoDB ou PostgreSQL.  

---

## **Licença**  
Este projeto está licenciado sob a licença [MIT](LICENSE).  
