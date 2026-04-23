# Primer Parcial - Simulador de Dados 2026 GRUPO 20
Buenas! Este es nuestro repositorio para el primer parcial de la materia. Armamos un simulador de dados donde podés tirar dos dados a la vez y la página te va guardando todas las estadísticas de las sumas que van saliendo en la sesión.
## Integrantes
* Alejo Simos
* David Cardozo
* Naim Neman
* Severino Tomás
* Ramón Pastré

## descripción del Proyecto
El proyecto consiste en una interfaz simple pero funcional. Usamos **Flexbox** para acomodar todo (los dados arriba, el botón al medio y las estadísticas abajo) para que quede bien ordenado y sea responsive.
toda la lógica está hecha con **JavaScript**, manejando los números aleatorios de los dados y actualizando el tablero de resultados sin tener que recargar la página.

## funcionalidades
* **Simulación de Azar:** Generación de números aleatorios (1-6) mediante JavaScript.
* **Manipulación del DOM:** Actualización en tiempo real de los dados y el tablero de resultados.
* **Estadísticas Dinámicas:** Conteo acumulativo de cada suma posible (2 al 12).
* **Validaciones:** Control de eventos para asegurar el correcto flujo de la aplicación.

## Cómo está armado??(Estructura)
Seguimos la estructura de carpetas que pidió el profe:
* `/assets`: para las imágenes o iconos que usemos.
* `/css`: Donde está el `index.css` con todo el diseño de Flexbox.
* `/js`: con el `script.js` que tiene toda la lógica del juego y las estadísticas.
* `index.html`: El archivo principal en la raíz.

## Cómo correrlo?
1. Clonás el repositorio con `git clone [link del repo]`.
2. Abrís el `index.html` con el navegador o usando Live Server en VS Code.
=======
# dice-simulator
Proyecto web de simulación de tiradas de dados del grupo 20 de programación III UTN FRBB.

Consigna:
# Ejercicio 20: Simulador de dados con estadísticas

### Construye una interfaz con controles y resultados usando **Flexbox**. Al presionar un botón, **JavaScript** debe simular el lanzamiento de dos dados y mostrar la suma obtenida. Lleva además un conteo de cuántas veces apareció cada suma posible durante la sesión.

