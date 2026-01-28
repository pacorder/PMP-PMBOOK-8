
# PMP Master Exam 2026 - Preparación PMBOK 8

Este es un simulador de examen PMP actualizado para el ECO de Julio 2026 y PMBOK 8va Edición. Desarrollado por Patricio Cordero.

## 🚀 Cómo publicar en GitHub y Vercel (Paso a Paso)

### 1. Preparar el Repositorio en GitHub
1. Entra en [github.com](https://github.com) y crea un nuevo repositorio llamado `pmp-master-exam-2026`.
2. No lo inicialices con README (ya lo tienes aquí).

### 2. Subir el Código desde tu PC
Abre una terminal en la carpeta del proyecto y ejecuta:

```bash
# Inicializar Git
git init

# Añadir todos los archivos
git add .

# Crear el primer commit
git commit -m "Initial commit: PMP Exam 2026 Platform"

# Conectar con tu repositorio (reemplaza TU_USUARIO)
git branch -M main
git remote add origin https://github.com/TU_USUARIO/pmp-master-exam-2026.git

# Subir los archivos
git push -u origin main
```

### 3. Despliegue en Vercel (Recomendado)
Vercel es la mejor opción para este proyecto "Vercel-ready":

1. Ve a [vercel.com](https://vercel.com) e inicia sesión con tu cuenta de GitHub.
2. Haz clic en **"Add New"** > **"Project"**.
3. Importa el repositorio `pmp-master-exam-2026`.
4. En "Framework Preset", selecciona **Other** o **Vite** (si usas un bundler) o simplemente deja los valores por defecto.
5. Haz clic en **Deploy**.
6. ¡Listo! Vercel te dará una URL como `pmp-master-exam-2026.vercel.app`.

### 4. Despliegue en GitHub Pages (Alternativa estática)
Si prefieres usar GitHub Pages directamente:
1. En tu repo de GitHub, ve a **Settings** > **Pages**.
2. En "Build and deployment" > "Source", elige **GitHub Actions**.
3. Selecciona el workflow de "Static HTML" o "Next.js" según prefieras.

---
## Características Técnicas
- **Frontend**: React 19 (ESM) + Tailwind CSS 3.4.
- **Idiomas**: Toggle dinámico ES/EN.
- **Persistencia**: LocalStorage para progreso y leaderboard.
- **Dificultad**: Simulador nivel PMP Real.

**Autor**: Patricio Cordero, PMP.
