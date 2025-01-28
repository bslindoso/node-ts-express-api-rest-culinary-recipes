# **Node TS Express REST API - Culinary Recipes**  

## **Descrição**  
Uma API RESTful construída com Node.js, Express e TypeScript para gerenciar e explorar receitas culinárias. Este projeto foi desenvolvido com o objetivo de praticar conceitos de desenvolvimento backend, arquitetura de software e boas práticas de código.  

A API oferece funcionalidades como busca de receitas, adição, atualização e exclusão de receitas, além de gerenciamento de favoritos e avaliações.  

---

## **Funcionalidades**  
- **Buscar receitas** por nome, ingredientes, tipo de refeição, tempo de preparo, e dificuldade.  
- **Filtrar receitas** por categorias, como veganas, vegetarianas ou sem glúten.  
- **Gerenciar receitas** (CRUD completo).  
- **Avaliações e comentários** para receitas.  
- **Gerenciamento de favoritos** para usuários.  

---

## **Tecnologias Utilizadas**  
- **Node.js**  
- **Express.js**  
- **TypeScript**  
- Armazenamento de dados em arquivo JSON  

---

## **Instalação e Configuração**  

1. **Clone o repositório:**  
   ```bash
   git clone https://github.com/seu-usuario/node-ts-express-api-rest-culinary-recipes.git
   cd node-ts-express-api-rest-culinary-recipes
   ```  

2. **Instale as dependências:**  
   ```bash
   npm install
   ```  

3. **Execute o servidor de desenvolvimento:**  
   ```bash
   npm run dev
   ```  

4. A API estará disponível em: `http://localhost:3000`  

---

## **Endpoints Principais**  

### **Receitas**  
- `GET /recipes` - Buscar todas as receitas  
- `GET /recipes/:id` - Buscar uma receita específica  
- `POST /recipes` - Adicionar uma nova receita  
- `PATCH /recipes/:id` - Atualizar uma receita existente  
- `DELETE /recipes/:id` - Excluir uma receita  

### **Favoritos**  
- `GET /favorites` - Listar receitas favoritas  
- `POST /favorites` - Adicionar uma receita aos favoritos  
- `DELETE /favorites/:id` - Remover uma receita dos favoritos  

### **Usuários**  
- `POST /users/register` - Registrar um novo usuário  
- `GET /users/profile` - Visualizar o perfil do usuário  

---

## **Estrutura do Projeto**  

```plaintext
src/
├── controllers/
│   ├── recipeController.ts
│   ├── userController.ts
├── services/
│   ├── recipeService.ts
├── models/
│   ├── recipe.ts
│   ├── user.ts
├── routes/
│   ├── recipeRoutes.ts
│   ├── userRoutes.ts
├── data/
│   ├── recipes.json
│   ├── users.json
├── app.ts
├── server.ts
```  

---

## **Exemplo de Receita JSON**  
```json
{
  "id": "1",
  "name": "Panqueca de Banana",
  "ingredients": ["Banana", "Ovo", "Aveia"],
  "steps": [
    "Amasse a banana.",
    "Misture com o ovo e a aveia.",
    "Cozinhe em uma frigideira."
  ],
  "type": "Café da Manhã",
  "time": 600, // 600 segundos (10 min)
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
```  

---

## **Possíveis Expansões Futuras**  
- **Integração com APIs externas** para buscar receitas adicionais.  
- **Autenticação de usuários** com JWT.  
- **Migração para banco de dados**, como MongoDB ou PostgreSQL.  

---

## **Contribuição**  
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.  

---

## **Licença**  
Este projeto está licenciado sob a licença [MIT](LICENSE).  
