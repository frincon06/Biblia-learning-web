# Sagrapp - Aplicación de Estudio Bíblico Gamificada

## Despliegue de la Aplicación

### Requisitos Previos
- Node.js 16 o superior
- Cuenta en Vercel
- Cuenta en Supabase

### Pasos para Desplegar

#### 1. Configurar Supabase
1. Crea un nuevo proyecto en Supabase
2. Ejecuta el script SQL proporcionado en el editor SQL de Supabase
3. Obtén las credenciales de API (URL y anon key)

#### 2. Configurar Variables de Entorno
Configura las siguientes variables de entorno en Vercel:
\`\`\`
NEXT_PUBLIC_SUPABASE_URL=tu-url-de-supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anon-de-supabase
SUPABASE_SERVICE_ROLE_KEY=tu-clave-de-servicio-de-supabase
\`\`\`

#### 3. Desplegar en Vercel
1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno en Vercel
3. Despliega la aplicación

#### 4. Crear Usuario Administrador
Ejecuta la siguiente consulta SQL en Supabase para crear un usuario administrador:
\`\`\`sql
UPDATE users
SET role = 'admin'
WHERE email = 'tu-email@ejemplo.com';
\`\`\`

### Desarrollo Local

1. Instala las dependencias: `npm install`
2. Crea un archivo `.env.local` con las variables de entorno
3. Ejecuta el servidor de desarrollo: `npm run dev`
4. Accede a http://localhost:3000

## Estructura del Proyecto

- `/app` - Rutas y páginas de Next.js
  - `/app/app` - Aplicación para usuarios finales
  - `/app/dashboard` - Panel de administración (próximamente)
- `/components` - Componentes reutilizables
  - `/components/app` - Componentes para la aplicación de usuarios
  - `/components/ui` - Componentes de interfaz de usuario
- `/lib` - Utilidades y configuración

## Características

### Aplicación de Usuario
- Autenticación con verificación de email
- Visualización de cursos y lecciones
- Sistema de gamificación (XP, niveles, logros)
- Preguntas interactivas
- Perfil de usuario
