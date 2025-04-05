# 🎌 Anime Collection App - Backend

Bienvenido al backend del proyecto **Anime Collection App**, una plataforma para que los fanáticos del anime puedan registrar, administrar y explorar sus animes favoritos. Este proyecto está construido con Node.js y MongoDB.

---

## 🧩 Descripción

Esta aplicación permite:

- 👥 **Registro e inicio de sesión de usuarios.**
- 📚 **Navegación por un catálogo de animes** con carga infinita.
- 🎯 **Agregar y eliminar animes de una colección personal.**
- ⚙️ **Administración de animes y usuarios** (para el rol admin).
- 🛡️ **Control de roles:** `user` y `admin`.

---

## 🧪 Tecnologías utilizadas

Este proyecto está construido utilizando las siguientes tecnologías:

- **Node.js**
- **Express.js**
- **MongoDB** (MongoDB Atlas)
- **Mongoose**
- **JWT** (para autenticación)
- **bcrypt** (para hashing de contraseñas)
- **Dotenv** para manejar variables de entorno

---

## 🌱 Estado actual del proyecto

El proyecto se encuentra en fase inicial. Ya se configuró:

- Estructura básica del backend.
- Integración con MongoDB Atlas.
- Control de versiones con Git y GitHub.
- Planificación de desarrollo en **JIRA** con metodología **Scrum**.

---

## 🚀 Cómo ejecutar el proyecto

Sigue estos pasos para correr el servidor de desarrollo:

### ✅ Requisitos previos

- Tener instalado **[Node.js](https://nodejs.org/)** (versión recomendada: LTS)
- Tener **npm** disponible en tu sistema
- Tener instalado **nodemon** (opcional, pero recomendado)

---

### 📦 Instalación de dependencias

En la raíz del proyecto, ejecuta los siguientes comandos para instalar las dependencias necesarias:

```bash
npm install
npm install express dotenv cors mongoose
npm install --save-dev nodemon