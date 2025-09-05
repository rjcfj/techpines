<p align="center">
<a href="https://laravel.com" target="_blank">
<img src="https://techpines.com.br/assets/logo.jpeg" width="200" alt="Techpines">
</a>
</p>

# Techpines - Backend e Frontend

[![PHP](https://img.shields.io/badge/PHP-8.3-blue)](https://www.php.net/)
[![Laravel](https://img.shields.io/badge/Laravel-12-red)](https://laravel.com/)
[![Laravel](https://img.shields.io/badge/ReactJS-20-blue)](https://react.dev/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-orange)](https://www.mysql.com/)
[![Docker](https://img.shields.io/badge/Docker-20%2B-lightblue)](https://www.docker.com/)

**Desafio Músicas** - Desenvolvida em Backend e Frontend para gerenciamento de Músicas.

---

## Ambiente

| Componente | Versão |
| ---------- | ------ |
| PHP        | 8.3    |
| Laravel    | 11     |
| MySQL      | 8.0    |
| Node       | 20+    |
| ReactJS    | 19+    |
| Docker     | 20+    |

---

## Setup do Projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/rjcfj/techpines.git -b main
cd techpines
```

### 2. Iniciar Docker

```bash
docker compose up -d --build
```

> Sobe serviços PHP, MySQL e Node em background.

### 3. Acessar servidor

Backend

```
http://localhost:8001
```

Frontend

```
http://localhost:8002
```

---

## 🔑 Autenticação

- Para endpoints protegidos, use o header:

```
Authorization: Bearer <token>
```

- O token é obtido via endpoint `/api/login`.

---

## 📦 Endpoints da API

### 1. Login

| Método | Endpoint     | Auth | Descrição         |
| ------ | ------------ | ---- | ----------------- |
| POST   | `/api/login` | Não  | Retorna token JWT |

**Request Body:**

```json
{
  "email": "admin@techpines.com",
  "password": "admin123"
}
```

**Response Exemplo:**

```json
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

---

### 2. Listar Música

| Método | Endpoint      | Auth | Descrição                          |
| ------ | ------------- | ---- | ---------------------------------- |
| GET    | `/api/musica` | Sim  | Lista todas as músicas disponíveis |

**Response Exemplo:**

```json
[
  {
    "id": 3,
    "titulo": "Rio de Lágrimas",
    "visualizacoes": "153.0K",
    "youtube_id": "FxXXvPL3JIg",
    "thumb": "https://img.youtube.com/vi/FxXXvPL3JIg/hqdefault.jpg",
    "created_at": "03/09/2025",
    "updated_at": "03/09/2025"
  }
]
```

---

### 3. Listar Música Top 5

| Método | Endpoint            | Auth | Descrição               |
| ------ | ------------------- | ---- | ----------------------- |
| GET    | `/api/musica/top-5` | Sim  | Lista musicas por top 5 |

**Response Exemplo:**

```json
[
  {
    "id": 3,
    "titulo": "Rio de Lágrimas",
    "visualizacoes": "153.0K",
    "youtube_id": "FxXXvPL3JIg",
    "thumb": "https://img.youtube.com/vi/FxXXvPL3JIg/hqdefault.jpg",
    "created_at": "03/09/2025",
    "updated_at": "03/09/2025"
  }
]
```

### 4. Listar Música por código

| Método | Endpoint              | Auth | Descrição               |
| ------ | --------------------- | ---- | ----------------------- |
| GET    | `/api/musica/:codigo` | Sim  | Lista musica por código |

**Parâmetros:**

- `:codigo` → código da música

**Response Exemplo:**

```json
[
  {
    "id": 3,
    "titulo": "Rio de Lágrimas",
    "visualizacoes": "153.0K",
    "youtube_id": "FxXXvPL3JIg",
    "thumb": "https://img.youtube.com/vi/FxXXvPL3JIg/hqdefault.jpg",
    "created_at": "03/09/2025",
    "updated_at": "03/09/2025"
  }
]
```

### 5. Salvar Música

| Método | Endpoint       | Auth | Descrição                   |
| ------ | -------------- | ---- | --------------------------- |
| POST   | `/api/musica/` | Sim  | Salva os dados de um música |

**Request Body:**

```json
{
  {
	"titulo": "Xavier Rudd - Stoney Creek",
	"visualizacoes": "342000000",
	"youtube_id": "o6kDnY1L-2s",
	"thumb": "https://img.youtube.com/vi/o6kDnY1L-2s/hqdefault.jpg"
}
}
```

**Response Exemplo:**

```json
{
  "success": true,
  "message": "Música criado com sucesso."
}
```

### 6. Atualizar Música

| Método | Endpoint              | Auth | Descrição                      |
| ------ | --------------------- | ---- | ------------------------------ |
| PUT    | `/api/musica/:codigo` | Sim  | Atualiza os dados de um música |

**Parâmetros:**

- `:codigo` → código da usuário

**Request Body:**

```json
{
  "titulo": "Xavier Rudd - Stoney Creek",
  "visualizacoes": "342000000",
  "youtube_id": "o6kDnY1L-2s",
  "thumb": "https://img.youtube.com/vi/o6kDnY1L-2s/hqdefault.jpg"
}
```

**Response Exemplo:**

```json
{
  "success": true,
  "message": "Música atualizado com sucesso."
}
```

### 7. Excluir Música

| Método | Endpoint              | Auth | Descrição                      |
| ------ | --------------------- | ---- | ------------------------------ |
| DELETE | `/api/musica/:codigo` | Sim  | Atualiza os dados de um música |

**Parâmetros:**

- `:codigo` → código da música

**Response Exemplo:**

```json
{
  "success": true,
  "message": "Música excluído com sucesso."
}
```

### 8. Listar Usuário

| Método | Endpoint       | Auth | Descrição                          |
| ------ | -------------- | ---- | ---------------------------------- |
| GET    | `/api/usuario` | Sim  | Lista todas as usuário disponíveis |

**Response Exemplo:**

```json
[
  {
    "id": 1,
    "name": "Admin TechPines",
    "email": "admin@techpines.com",
    "created_at": "03/09/2025",
    "updated_at": "03/09/2025"
  }
]
```

---

### 4. Listar Usuário por código

| Método | Endpoint               | Auth | Descrição                |
| ------ | ---------------------- | ---- | ------------------------ |
| GET    | `/api/usuario/:codigo` | Sim  | Lista usuário por código |

**Parâmetros:**

- `:codigo` → código da usuário

**Response Exemplo:**

```json
[
  {
    "id": 1,
    "name": "Admin TechPines",
    "email": "admin@techpines.com",
    "created_at": "03/09/2025",
    "updated_at": "03/09/2025"
  }
]
```

### 9. Salvar Usuário

| Método | Endpoint        | Auth | Descrição                    |
| ------ | --------------- | ---- | ---------------------------- |
| POST   | `/api/usuario/` | Sim  | Salva os dados de um usuário |

**Request Body:**

```json
[
  {
    "name": "Ricardo Junior",
    "email": "ricardojcfj@gmail.com",
    "password": "admin123",
    "confirm_password": "admin123"
  }
]
```

**Response Exemplo:**

```json
{
  "success": true,
  "message": "Usuário criado com sucesso."
}
```

### 10. Atualizar Usuário

| Método | Endpoint               | Auth | Descrição                       |
| ------ | ---------------------- | ---- | ------------------------------- |
| PUT    | `/api/usuario/:codigo` | Sim  | Atualiza os dados de um usuário |

**Parâmetros:**

- `:codigo` → código da usuário

**Request Body:**

```json
[
  {
    "name": "Ricardo Junior",
    "email": "ricardojcfj@gmail.com",
    "password": "admin123",
    "confirm_password": "admin123"
  }
]
```

**Response Exemplo:**

```json
{
  "success": true,
  "message": "Usuário atualizado com sucesso."
}
```

### 11. Excluir Usuário

| Método | Endpoint               | Auth | Descrição                       |
| ------ | ---------------------- | ---- | ------------------------------- |
| DELETE | `/api/usuario/:codigo` | Sim  | Atualiza os dados de um usuário |

**Parâmetros:**

- `:codigo` → código da usuário

**Response Exemplo:**

```json
{
  "success": true,
  "message": "Usuário excluído com sucesso."
}
```

### 12. Salvar Sugerir

| Método | Endpoint                 | Auth | Descrição                    |
| ------ | ------------------------ | ---- | ---------------------------- |
| POST   | `/api/extrair-vídeo-id/` | Sim  | Salva os dados de um sugerir |

**Request Body:**

```json
[
  {
    "youtube_url": "https://www.youtube.com/watch?v=0k61x-mHORw"
  }
]
```

**Response Exemplo:**

```json
{
  "success": true,
  "message": "Informações do vídeo do YouTube com sucesso."
}
```

---

## 📝 Dicas e Boas Práticas

- Utilize Postman ou Insomnia para testar a API rapidamente.
- Certifique-se de usar o token JWT nos endpoints protegidos.

---

## 📂 Links Úteis

- [Postman](https://www.postman.com/)
- [Insomnia](https://insomnia.rest/)
