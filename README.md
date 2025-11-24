# Zhennova E-commerce

![Status](https://img.shields.io/badge/Status-En_Desarrollo-yellow)
![License](https://img.shields.io/badge/License-MIT-blue)
![Stack](https://img.shields.io/badge/Stack-PERN-00d2ff)

**Zhennova** es una plataforma de comercio electrónico  especializada en la venta de hardware de alto rendimiento, componentes de PC y periféricos.

Este proyecto simula un entorno de producción real, priorizando la **integridad de datos**, la **seguridad en las transacciones** y una **arquitectura escalable**.

---

## Tecnologías (Stack PERN)

El proyecto fue desarrollado utilizando el stack **PERN** para garantizar integridad referencial y transacciones ACID.

### Backend & Base de Datos
*   **Node.js & Express:** Servidor RESTful con arquitectura en capas (Rutas, Handlers, Controllers).
*   **PostgreSQL:** Base de datos relacional para gestión estricta de inventarios y órdenes.
*   **Sequelize ORM:** Modelado de datos, relaciones (Associations) y validaciones.
*   **Seguridad:**
    *   `JWT` (JSON Web Tokens) para gestión de sesiones.
    *   `Bcrypt` para hasheado de contraseñas.
    *   `Joi` para validación estricta de datos de entrada.

### Frontend
*   **React + Vite:** Construcción de interfaz rápida y modular.
*   **Redux Toolkit:** Gestión del estado global (Sesión de usuario, Carrito).
*   **React Hook Form:** Manejo eficiente de formularios y validaciones.
*   **Bootstrap 5 & Icons:** Diseño responsive y estilizado (Dark Mode).

---

## 🏛️ Arquitectura y Decisiones Técnicas

### ¿Por qué PostgreSQL en lugar de MongoDB?
Aunque el requerimiento inicial sugería NoSQL, se optó por una **Base de Datos Relacional** debido a la naturaleza del negocio:
1.  **Integridad Referencial:** Garantiza que no existan carritos u órdenes huérfanas si un usuario es eliminado.
2.  **Transacciones ACID:** Vital para evitar condiciones de carrera en el stock de productos durante la compra.
3.  **Estructura Definida:** Modelos estrictos (`User`, `Product`, `Order`, `Cart`) que previenen datos corruptos.

### Patrón de Diseño
El Backend sigue el principio de **Separación de Responsabilidades**:
*   📂 **Routes:** Definición de endpoints y middlewares.
*   📂 **Handlers:** Manejo de peticiones HTTP y respuestas estándar.
*   📂 **Controllers:** Lógica de negocio pura y comunicación con la BD.
*   📂 **Models:** Definición de esquemas y relaciones SQL.

---

## Funcionalidades Principales

### 🔐 Autenticación y Usuarios
*   Registro seguro con validación de complejidad de contraseña.
*   Login con generación de Token JWT.
*   Persistencia de sesión mediante Redux y LocalStorage.
*   Roles de usuario: `Admin` (Gestión) y `User` (Cliente).

### 📦 Catálogo y Productos
*   CRUD completo de productos (Crear, Leer, Actualizar, Borrar).
*   **Soft Delete:** Implementación de borrado lógico (`paranoid: true`) para mantener historial de ventas.
*   Búsqueda de productos en tiempo real (Backend logic).

### 🛒 Carrito y Órdenes (Backend Ready)
*   Modelo de base de datos relacional: `User` -> `hasMany` -> `Cart`.
*   Uso de **UUID** para identificadores de órdenes (Mayor seguridad y escalabilidad).
*   Validación de stock antes de confirmar órdenes.

---

## Instalación y Configuración

Sigue estos pasos para correr el proyecto localmente:

### 1. Prerrequisitos
*   Node.js (v18+)
*   PostgreSQL instalado y corriendo.

### 2. Clonar el repositorio
```bash
git clone https://github.com/DanielXero/zhennova-ecommerce.git
cd zhennova-ecommerce
```
### 3. Configuración del Backend
```bash
npm install
```
Crea un archivo .env en la raíz con las siguientes variables:
```env
PORT=3001
DB_NAME=zhennova_db
DB_USER=postgres
PASSWORD_DB=tu_password
DB_HOST=localhost
JWT_SECRET=tu_secreto_seguro
```
### 4. Configuración del Frontend
```bash
cd client
npm install
```
### 5. Ejecutar el proyecto
**Backend:**
```bash
cd ..
# Desde la carpeta raíz
npm start
# O para desarrollo
npm run dev
```
**Frontend:**
```bash
cd client
npm run dev
```


## Documentación de la API (Endpoints Principales)

| Método | Endpoint | Descripción | Acceso |
| :--- | :--- | :--- | :--- |
| **AUTH** | | | |
| `POST` | `/api/auth/register` | Registrar nuevo usuario | Público |
| `POST` | `/api/auth/login` | Iniciar sesión | Público |
| **PRODUCTOS** | | | |
| `GET` | `/api/products` | Obtener catálogo | Público |
| `GET` | `/api/products?name=...` | Buscar por nombre | Público |
| `POST` | `/api/products` | Crear producto | **Admin** |
| `PUT` | `/api/products/:id` | Editar producto | **Admin** |
| `DELETE` | `/api/products/:id` | Eliminar producto (Soft) | **Admin** |

---

## Roadmap y Próximos Pasos

El proyecto se encuentra en una fase avanzada de desarrollo.

- [x] Arquitectura de Servidor y BD (Core Backend).
- [x] Sistema de Autenticación y Seguridad (JWT/Bcrypt).
- [x] Modelado de Datos Relacional Completo.
- [x] Frontend Base (Routing, Auth Forms, Redux Setup).
- [ ] Integración visual del Catálogo de Productos.
- [ ] Interfaz de Carrito de Compras.
- [ ] Simulación de Pasarela de Pagos.

