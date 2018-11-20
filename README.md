![Logo EDboilerplate](https://ed.team/sites/default/files/EDboilerplate-logo.png)

# EDboilerplate

Es una sencilla estructura para un proyecto web estático.

## Características de EDboilerplate:

* Usa gulp para automatizar tareas
* Esta basado en Sass, Pug y ES6.
* Compila Sass con autoprefixer y muestra los cambios en tiempo real
* Compila Pug y actualiza el navegador con cada cambio
* Compila ES6 con soporte para módulos ES6 (importar y exportar modulos)
* Detecta nuevos archivos añadidos al proyecto sin tener que reiniciar gulp
* Captura errores en Sass, Pug y Js evitando que gulp se detenga.
* Crea los sourcemaps de los archivos compilados
* Tiene una estructura lista de estilos (con Sass) basada en SMACSS y ITCSS
* Tiene una estructura lista para HTML (con Pug) que divide páginas e includes.
* Tiene una estructura lista para importar y exportar modulos ES6
* Optimiza y comprime imágenes

## Modo de uso

1. Cree un fork de este repositorio y clonelo en local (o descargue este repositorio por zip).
2. Ejecute en terminal `npm install -g gulp-cli`
3. Ejecute `npm install` (asegurese de tener npm actualizado y Nodejs en v6 como minimo)
4. Ejecute `gulp dev` para trabajar e desarrollo
5. Ejecute `gulp build` para compilar sus archivos para produccion
6. Disfrute

## Estructura

1. La carpeta **src** contiene la estructura de archivos con la que trabajará
2. La carpeta **public** contiene los archivos compilados que deberan llevarse a producción
3. Para Sass importe sus partials desde `styles.scss`, el orden está indicado en el mismo archivo
4. Para Pug, la carpeta `pages` contiene las paginas del proyecto y la carpeta `includes` los bloques.
5. Para Js, la carpeta `modules` contiene los módulos que serán importados desde `index.js`

Siéntase libre de usarlo y de reportar cualquier problema que encuentre o sugerencia que tenga.
EDboilerplate es gratis, open source y de la comunidad para la comunidad.
