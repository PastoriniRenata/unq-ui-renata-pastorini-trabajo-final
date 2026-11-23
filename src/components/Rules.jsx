const Rules = () => {
  return (
    <div>
      <ul>
        <li>Escribí una palabra para iniciar la partida</li>
        <li>La siguiente tiene que empezar con la última letra de la anterior: <strong>casa → árbol → lápiz</strong></li>
        <li>Tenés <strong>15 segundos</strong> por turno, y cada palabra válida reinicia el reloj</li>
        <li>Cada letra vale un punto</li>
        <li>No se vale repetir</li>
        <li>Las tildes y mayúsculas no importan (<strong>árbol = arbol</strong>, <strong>CASA = casa</strong>), pero la <strong>ñ</strong> no es lo mismo que la <strong>n</strong></li>
        <li>La partida termina cuando se acaba el tiempo</li>
      </ul>
      <p className="mb-0 text-danger">¡Importante! El reloj no se detiene si abrís esta guía en plena partida</p>
    </div>
  );
};

export default Rules;