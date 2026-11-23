# Palabras Encadenadas

Trabajo Final Integrador de **Interfaces de Usuario** - UNQ - 2° cuatrimestre 2026\
Alumna: Renata Pastorini

Juego web de palabras encadenadas hecho con React: cada palabra tiene que empezar con la última letra de la anterior, existir en el diccionario y no estar repetida. Hay 15 segundos por turno y cada letra suma un punto.

## Tecnologías

- React + Vite
- Bootstrap 5 (con clases, sin react-bootstrap) y Bootstrap Icons
- axios para las consultas a la API

## Diseño

Las pantallas están en Figma: [Palabras Encadenadas en Figma](https://www.figma.com/design/p5eKt8UhB0Lr6R1WMdR7c8/Palabras-Encadenadas?node-id=2-4&p=f&t=cYMfgy71JOopdTjt-0)

La estética está inspirada en los juegos de plataformas de 8 bits (cielo, nubes, ladrillos y bloque "?"), dibujada con CSS propio.

## Requisitos

- [Node.js](https://nodejs.org/) 22 o superior
- npm (viene con Node.js)

## Instalación y ejecución

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/PastoriniRenata/unq-ui-renata-pastorini-trabajo-final.git
   cd unq-ui-renata-pastorini-trabajo-final
   ```

2. Crear el archivo `.env` a partir del de ejemplo, que ya trae la URL de la API:

   ```bash
   cp .env.example .env
   ```

   En Windows (cmd): `copy .env.example .env`

3. Instalar las dependencias:

   ```bash
   npm install
   ```

4. Levantar la aplicación:

   ```bash
   npm run dev
   ```

5. Abrir [http://localhost:5173](http://localhost:5173) en el navegador.

## Cómo se juega

- La partida empieza con la primera palabra válida; puede ser cualquiera.
- Cada palabra siguiente tiene que empezar con la última letra de la anterior: casa → árbol → lápiz.
- Hay 15 segundos por turno y cada palabra válida reinicia el reloj.
- Cada letra vale un punto.
- No se pueden repetir palabras.
- La partida termina cuando se acaba el tiempo. Al final se puede guardar el puntaje en el ranking y volver a jugar.

## Decisiones tomadas

- **Inicio del reloj:** el enunciado dice que arranca "al ingresar la primera palabra"; se interpreta como la primera palabra **válida**.
- **Tildes y mayúsculas:** no importan (árbol = arbol, CASA = casa). La **ñ no es lo mismo que la n**: "niño" y "nino" son palabras distintas.
- **Largo mínimo:** se aceptan palabras de 2 letras o más.
- **Una sola palabra por vez:** no se aceptan espacios en el medio, números ni símbolos.
- **Orden de los errores:** si una palabra rompe el encadenamiento y además está repetida, se informa primero el encadenamiento.
- **Verificación con la API:** mientras se consulta si la palabra existe, el reloj se pausa y el input queda bloqueado, para que la demora de la red no le saque tiempo al jugador. Si la API no responde en 5 segundos, se muestra un error y se puede volver a intentar.
- **Palabras en la cadena:** se muestran como se escribieron (con mayúsculas y tildes); para comparar, encadenar y puntuar se usa la versión sin tildes y en minúsculas.
- **Guía:** se abre sola la primera vez y después con el botón "?". El reloj no se detiene mientras está abierta.
- **Ranking:** guarda los 10 mejores puntajes en el navegador (`localStorage`). El nombre es libre, de hasta 15 caracteres. Si no se escribe un nombre y se toca "Jugar de nuevo", el puntaje se guarda igual como Player001, Player002, etc.
- **Recargar la página:** la partida en curso se guarda en `sessionStorage`, así que sobrevive a una recarga (el reloj sigue desde donde estaba). Al cerrar la pestaña, la partida se pierde; el ranking queda guardado.

### Sobre la API

La validación usa la API de la cátedra (`GET /api/validate?word=...`), que solo indica si la palabra existe. La API ignora tildes y trata la ñ como n, por eso el resto de las reglas (encadenamiento, repetidas, ñ, largo mínimo) lo revisa el frontend antes de consultarla.