# 🍖 Donde Javi - Asados y Comidas Rápidas

Bienvenido al repositorio oficial de **Donde Javi**, tu destino para los mejores asados y comidas rápidas con el auténtico sabor colombiano.

## 📋 Tabla de Contenidos

- [Descripción](#descripción)
- [Demo](#demo)
- [Características](#características)
- [Menú](#menú)
- [Promociones](#promociones)
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Configuración de Supabase](#configuración-de-supabase)
- [Despliegue en Vercel](#despliegue-en-vercel)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Contribuir](#contribuir)
- [Licencia](#licencia)
- [Contacto](#contacto)

## 📝 Descripción

Página web profesional para **Donde Javi**, un restaurante colombiano especializado en asados, picadas, burritos y comidas rápidas. El sitio cuenta con un diseño moderno responsive, menú digital interactivo, promociones especiales con enfoque inclusivo y un sistema de encuestas de satisfacción alimentado por Supabase.

Este proyecto fue desarrollado con la intención de brindar una experiencia digital atractiva y funcional, permitiendo a los clientes conocer el menú, las promociones y dejar sus comentarios fácilmente.

## 🚀 Demo

Puedes ver la página en vivo en: [https://asados-y-comidas-r-pidas-donde-javi.vercel.app](https://asados-y-comidas-r-pidas-donde-javi.vercel.app)

## ✨ Características

- **Diseño responsive** — Adaptable a dispositivos móviles, tablets y desktop
- **Slider interactivo** — Carrusel de imágenes en la sección principal
- **Menú categorizado** — Filtrado por categorías: Picadas, Burritos, Salvajadas y Asados
- **Promociones inclusivas** — Descuentos especiales para personas con discapacidad y cuidadores
- **Encuesta de satisfacción** — Formulario con calificación de estrellas conectado a Supabase
- **Mapa interactivo** — Ubicación del restaurante integrada con Google Maps
- **Animaciones al scroll** — Efectos visuales para mejorar la experiencia de usuario
- **Navegación suave** — Scroll suave entre secciones

## 🍽️ Menú

### Picadas
| Producto | Descripción | Precio |
|----------|-------------|--------|
| Personal | Cerdo, chorizo, butifarra, patacón, francesa, ensalada y suero | $15.000 |
| Dupla | Cerdo, chorizo, butifarra, patacón, francesa, ensalada y suero | $25.000 |
| Mediana | Cerdo, chorizo, butifarra, patacón, francesa, ensalada y suero | $35.000 |
| Grande | Cerdo, **res**, chorizo, butifarra, patacón, francesa, ensalada y suero | $55.000 |
| Extra Grande | Cerdo, pechuga, res, chorizo, buti, **salchicha ahumada**, patacón, francesa, ensalada y suero | $80.000 |
| Javi | Cerdo, pechuga, res, chorizo, **chuleta**, buti, salchicha ahumada, patacón, francesa, ensalada y suero | $100.000 |

### Burritos
| Producto | Descripción | Precio |
|----------|-------------|--------|
| Cerdo | Tortilla, chorizo, cerdo, buti, lechuga, queso rallado, tártara BBQ ahumada + palitos de plátano y suero | $15.000 |
| Mixto | Tortilla, chorizo, cerdo, buti, lechuga, queso rallado, tártara BBQ ahumada + palitos de plátano y suero | $20.000 |

### Salvajadas
| Producto | Descripción | Precio |
|----------|-------------|--------|
| Salvajada | Cerdo, salchicha, buti, chorizo, francesa, lechuga, ripio, queso costeño, salsas de la casa | $15.000 a $60.000 |

### Asados
Todos los asados se acompañan con papa francesa, ensalada y suero.

| Producto | Precio |
|----------|--------|
| Res | $15.000 |
| Cerdo | $15.000 |
| Pechuga | $15.000 |
| Chuleta | $15.000 |

## 🎉 Promociones

| Día | Promoción | Requisito |
|-----|-----------|-----------|
| **Jueves** | 🧡 **5% de descuento** para personas con discapacidad | Presentar carnet |
| **Domingos** | 💚 **10% de descuento** para cuidadores | Presentar certificado de caracterización |
| **Cumpleaños** | 🎂 **15% de descuento** | Celebrar con nosotros |

Creemos en la **inclusión** como valor fundamental. Queremos que todos disfruten de un buen sabor.

## 🛠️ Tecnologías

| Tecnología | Propósito |
|------------|-----------|
| ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) | Estructura de la página |
| ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) | Estilos y diseño responsive |
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) | Interactividad (slider, tabs, formularios) |
| ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase&logoColor=white) | Backend para almacenar encuestas |
| ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white) | Hosting y despliegue continuo |

## 📦 Instalación

### Requisitos
- Un navegador web moderno
- (Opcional) Live Server en VS Code para desarrollo local

### Pasos

```bash
# Clona el repositorio
git clone https://github.com/Jsanty24/Asados-y-Comidas-R-pidas-Donde-Javi.git

# Entra al directorio
cd Asados-y-Comidas-R-pidas-Donde-Javi

# Abre index.html en tu navegador
start index.html
```

O si usas VS Code:
```bash
code .
# Luego presiona F1 → Live Server: Open with Live Server
```

## 🔧 Configuración de Supabase

Para conectar la encuesta de satisfacción a Supabase:

1. Crea una cuenta en [supabase.com](https://supabase.com)
2. Crea un nuevo proyecto
3. Ve al **SQL Editor** y ejecuta el contenido de `supabase-setup.sql`
4. Ve a **Project Settings → API** y copia la **URL** y **anon key**
5. Abre `js/supabase-config.js` y reemplaza los valores:
   ```js
   const SUPABASE_URL = 'https://tu-proyecto.supabase.co';
   const SUPABASE_ANON_KEY = 'tu-anon-key';
   ```

### Estructura de la tabla `encuestas`
```sql
- id: BIGINT (auto-increment)
- nombre: TEXT
- email: TEXT
- calificacion: INTEGER (1-5)
- mensaje: TEXT
- referral: TEXT (cómo nos conocieron)
- created_at: TIMESTAMPTZ
```

## ▲ Despliegue en Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Ve a [vercel.com](https://vercel.com) e inicia sesión con GitHub
2. Haz clic en **Add New → Project**
3. Importa el repositorio `Jsanty24/Asados-y-Comidas-R-pidas-Donde-Javi`
4. Configura:
   - **Framework Preset:** Other
   - **Build Command:** (vacío)
   - **Output Directory:** (vacío)
5. Haz clic en **Deploy**

El proyecto incluye un archivo `vercel.json` con la configuración necesaria.

## 📁 Estructura del Proyecto

```
Asados-y-Comidas-R-pidas-Donde-Javi/
├── index.html              # Página principal
├── css/
│   └── styles.css          # Estilos CSS
├── js/
│   ├── script.js           # JavaScript (slider, tabs, formulario, animaciones)
│   └── supabase-config.js  # Configuración de Supabase
├── images/
│   └── Logo.jpeg            # Logo del restaurante
├── assets/                  # Recursos adicionales
├── supabase-setup.sql       # Script SQL para crear tabla en Supabase
├── vercel.json              # Configuración de Vercel
├── .gitignore               # Archivos ignorados por Git
└── README.md               # Este archivo
```

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para contribuir:

1. Haz un fork del proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Haz commit de tus cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Copyright © 2026 **Juan Santiago Blanco Herrera**. Todos los derechos reservados.

Este proyecto es de carácter privado. No está permitida su reproducción, distribución o modificación sin autorización expresa del autor. Ver el archivo `LICENSE` para más detalles.

---

<p align="center">Hecho con ❤️</p>
