# Desafío: Aplicación de Gestión de Pagos Bancarios

Esta aplicación web permite a los usuarios gestionar pagos bancarios de manera eficiente. Los usuarios pueden registrar nuevos pagos, ver la lista de pagos realizados, filtrar y buscar pagos, y exportar la lista de pagos a un archivo CSV o Excel.

## Funcionalidades

- **Operaciones CRUD**: La API RESTful permite a los usuarios realizar operaciones de crear, leer, actualizar y eliminar pagos.
- **Interfaz de Usuario Intuitiva**: La interfaz de usuario simple permite a los usuarios registrar nuevos pagos con detalles como monto, fecha, tipo de pago y destinatario. También pueden ver la lista de pagos realizados, filtrar por diferentes criterios y realizar búsquedas.
- **Autenticación Segura**: Se implementa una autenticación para garantizar la seguridad de los usuarios.
- **Pruebas Básicas**: Se incluyen pruebas básicas para asegurar la funcionalidad de la API.

## Backend:

- Node.js
- Express.js
- PostgreSQL
- JWT
- Zod
- Prima
- Vitest
- Supertest

## Frontend:

- React
- Tailwind CSS
- Zustand
- Axios
- Radix UI
- React-hook-form
- Zod

## Base de datos:

- PostgreSQL: Base de datos relacional robusta y confiable para almacenar información de pagos.

## Endpoints

### Autenticación

- `POST /auth/signup`: Registro de usuario.
- `POST /auth/login`: Inicio de sesión de usuario.
- `GET /auth/logout`: Cierre de sesión de usuario.
- `GET /auth/verify`: Verificación de token de autenticación.

### Pagos

- `GET /payments`: Obtener todos los pagos.
- `GET /payments/:id`: Obtener un pago por ID.
- `POST /payments/:id`: Realizar un pago.
- `POST /payments`: Crear un nuevo pago.
- `PATCH /payments/:id`: Actualizar un pago existente.
- `DELETE /payments/:id`: Eliminar un pago existente.

### Usuarios

- `GET /users`: Obtener todos los usuarios.
- `GET /users/:id`: Obtener un usuario por ID.
- `POST /users`: Crear un nuevo usuario.
- `PATCH /users/:id`: Actualizar un usuario existente.
- `DELETE /users/:id`: Eliminar un usuario existente.

### Variables de Entorno:

El archivo `.env.example` contiene las variables de entorno necesarias para configurar la aplicación. Se deben definir estas variables en un archivo `.env` en el directorio raíz del proyecto.

## Cómo Levantar el Proyecto Localmente

Siga estos pasos para levantar el proyecto localmente:

1. Clone este repositorio en su máquina local:

```sh
git clone https://github.com/villarrealjoaquin/Gestion-de-Pagos-Bancarios.git
```

2. Navegue al directorio del proyecto:

```sh
cd nombre-del-proyecto
```

3. Instale las dependencias del backend y del frontend utilizando npm o pnpm:

```sh
cd server
npm install
```

```sh
cd client
npm install
```

4. Cree un archivo .env en el directorio raíz del proyecto y configure las variables de entorno necesarias. Las variables de entorno se encuentran en .env.example.

5. Levante el servidor backend y el cliente frontend:

```sh
cd server
npm run dev
```

```sh
cd client
npm run dev
```

## Disclaimer

Dado que el backend está desplegado en Render, es importante tener en cuenta la advertencia que indica: "Su instancia gratuita dejará de funcionar debido a la inactividad, lo que puede retrasar las solicitudes 50 segundos o más". Si experimentas retrasos en la carga de los productos, es posible que solo necesites esperar mientras la instancia se reactiva.

## Preview

[![banco.png](https://i.postimg.cc/V6TspY8t/banco.png)](https://postimg.cc/xJvSbVqj)

[Deploy](https://gestion-de-pagos-bancarios.vercel.app)

