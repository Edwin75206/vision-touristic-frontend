# Vision Touristic Frontend (React + Vite + Bootstrap + PWA)

Este frontend está hecho para tu API (Vision-API) con rutas:
- `GET /api/places`
- `POST/PUT/DELETE /api/places` (solo admin, con `Authorization: Bearer <token>`)
- `GET /api/comments/lugar/:idLugar`
- `POST /api/comments` (público)
- `POST /api/comments/yo` (logueado)
- `POST /api/auth/registrar`, `POST /api/auth/login`

## 1) Instalar

```bash
npm install
```

## 2) Configurar la API

Copia el archivo `.env.example` a `.env` y ajusta el backend:

```bash
cp .env.example .env
```

## 3) Ejecutar

```bash
npm run dev
```

Abre `http://localhost:5173`.

## PWA

Para probar la PWA real:

```bash
npm run build
npm run preview
```

Luego abre la URL que te muestra Vite Preview y podrás **instalar** la app.

## Tabs (requisitos)

- **Landing**: estado del backend (`/api/ping`).
- **Lugares**: listado y detalle con comentarios.
- **Comentarios**: vista enfocada a comentar por lugar.
- **Login**: login/registro.
- **Admin**: CRUD de lugares (solo rol `admin`).

> Nota: el backend actual **no** tiene endpoints para editar/eliminar comentarios; en el front solo se listan y se crean.
