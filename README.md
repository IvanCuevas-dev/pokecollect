# 🎴 PokeCard Collector

Aplicación web fullstack de colección de cartas Pokémon basada en los 151 Pokémon originales de la región de Kanto.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)
![Laravel](https://img.shields.io/badge/Laravel-12-FF2D20?style=flat&logo=laravel)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=flat&logo=tailwindcss)
![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?style=flat&logo=mysql)

---

## ✨ Funcionalidades

- **Autenticación** — Registro e inicio de sesión con tokens mediante Laravel Sanctum.
- **Tienda de Sobres** — 3 tipos de sobres (Básico, Estándar, Premium).
- **Apertura de Sobres** — Las cartas se revelan una a una con animaciones CSS.
- **Colección (Pokédex)** — Vista de los 151 Pokémon con varios filtros de búsqueda.
- **Mazo de Batalla** — 6 slots donde el usuario puede armar su mazo con drag & drop.
- **Sección Social** — Mazos de otros usuarios con sistema de likes y dislikes.
- **PokéCoins** — Sistema de moneda virtual con recarga simulada.

---

## 🛠️ Tecnologías

### Frontend
- **React 18** con Vite
- **TailwindCSS 4** para estilos
- **React Router** para navegación
- **Context API** para estado global

### Backend
- **Laravel 12** (PHP)
- **MySQL** como base de datos
- **Laravel Sanctum** para autenticación por tokens
- **PokeAPI** como fuente de datos de los Pokémon

---

## 🗄️ Estructura de la base de datos

| Tabla | Descripción |
|---|---|
| `users` | Usuarios registrados con nombre, email, contraseña y monedas |
| `pokemon` | Los 151 Pokémon con todos sus datos (cargados desde PokeAPI) |
| `user_pokemon` | Colección de cada usuario con cantidad de copias por Pokémon |
| `decks` | Mazos de batalla de cada usuario |
| `deck_slots` | Los 6 slots de cada mazo con el Pokémon asignado |
| `votes` | Votos (like/dislike) de los mazos en la sección social |

---

## 🚀 Instalación

### Requisitos previos
- PHP 8.1+
- Composer
- Node.js 18+
- MySQL

### Backend (Laravel)

```bash
# Clonar el repositorio
git clone https://github.com/IvanCuevas-dev/pokecollect.git
cd pokecollect/backend

# Instalar dependencias
composer install

# Configurar el entorno
cp .env.example .env
php artisan key:generate

# Configurar la base de datos en .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=pokecollect
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_contraseña

# Crear las tablas y cargar los Pokémon
php artisan migrate --seed

# Arrancar el servidor
php artisan serve
```

### Frontend (React)

```bash
cd pokecollect/frontend

# Instalar dependencias
npm install

# Arrancar el servidor de desarrollo
npm run dev
```

La app estará disponible en `http://localhost:5173` y la API en `http://localhost:8000`.

---

## 🔌 Endpoints de la API

| Método | Endpoint | Descripción | Auth |
|---|---|---|---|
| POST | `/api/register` | Registro de usuario 
| POST | `/api/login` | Inicio de sesión 
| GET | `/api/user` | Datos del usuario logueado 
| GET | `/api/pokemon` | Lista de Pokémon 
| POST | `/api/buy` | Comprar un sobre 
| POST | `/api/buyCoins` | Recargar monedas 

---

## 👤 Autor

**Iván Cuevas** — [@IvanCuevas-dev](https://github.com/IvanCuevas-dev)
