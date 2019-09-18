# Prueba de candidatas-front

Esto es una prueba para los candidatos a responsable de tecnología de Adalab. La prueba consiste en desplegar este repositorio en Firebase, conectarlo con una base de datos. Después se añadirá una funcionalidad para añadir nuevas candidatas desde un formulario usando zapier y una cloud function. Finalmente se desarrollará una nueva parte de la aplicación que mostrará un listado de canidatas solo para usuarios administradores.

El código que se provee consiste en

- Una aplicación front-end realizada con React y componentes de la librería Material UI
- Se conecta a Firebase para hacer registrar nuevos usuarios y hacer login
- Tiene algunas funciones para acceder a las colecciones de la base de datos de Firestore (`src/firebase/db.js`)

Para configurar el proyecto en Firebase, podemos seguir estos pasos:

- Crear nuevo proyecto desde la consola de Firebase
- Configurar el proyecto para que use la configuración del proyecto Firebase creado
- Activar la autenticación por usuario / contraseña
- Activar la creación de la base de datos (Firestore) y aplicar las reglas de Firestore provistas (`firestore.rules`)

## Tareas nuevas a realizar

- Construir una Cloud function que permita guardar una candidata en la colección de candidatas en Firestore. Para crear una nueva candidata necesitamos: nombre completo, email, código postal y fecha de nacimiento. La edad se calcula a partir de la fecha de nacimiento y se guarda también en BBDD.
- Crear un formulario de Google Forms público para crear nuevas candidatas
- Usar Zapier para conectar el formulario anterior y que las candidatas se guarden en BBDD a través de la cloud function
- En la aplicación de front-end, vamos a crear una nueva vista en la ruta `/home` donde mostraremos un listado de candidatas. Este listado lo podremos filtrar mediante un input de texto permitirá buscar por nombre o email
- El listado de candidatas solo será visible para usuarios administradores
- La aplicación front-end se desplegará en Firebase hosting, y será accesible mediante URL

## Entrega

Para evaluar la prueba necesitamos que nos compartas

- la URL a un repositorio con el código del proyecto
- la URL al formulario de Google Forms
- la URL a la versión desplegada de la aplicación de front-end

## Guía de instalación y uso de la app

```
git clone repo-url
cd repo-folder
npm install
```

Instala firebase-tools de forma global

`npm install -g firebase-tools`

Conectar al proyecto de firebase creado

`firebase use --add`

Instala, si no las tienes, estas herramientas de desarrollo:

- eslint
- prettier
- editorconfig

### Lanza el servidor local

`npm start`

### Desplegar

Desplegar todo:
`firebase deploy`

Desplegar solo el front-end:
`npm run build`
`firebase deploy --only hosting`

Desplegar solo las funciones:
`firebase deploy --only functions`
