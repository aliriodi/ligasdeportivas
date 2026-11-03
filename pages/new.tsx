// ... tus imports actuales se mantienen igual ...
import { useState, useEffect } from 'react';

// ... tu getdataBD y getStaticProps se mantienen exactamente igual ...

const Blog: React.FC<Props> = (props) => {
  const [IDTEAM, setIDTEAM] = useState(0);
  const [IDDIVISION, setIDDIVISION] = useState(0);
  
  // --- NUEVOS ESTADOS PARA EL FORMULARIO DE ESCRITURA ---
  const [nuevoNombreEquipo, setNuevoNombreEquipo] = useState("");
  const [divisionSeleccionada, setDivisionSeleccionada] = useState(1);
  const [cargando, setCargando] = useState(false);

  // --- FUNCIÓN DE ESCRITURA (FRONT-END) ---
  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoNombreEquipo.trim()) return alert("Ingresa un nombre para el equipo");

    setCargando(true);
    try {
      const respuesta = await fetch('/api/crear-equipo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nuevoNombreEquipo,
          idDivision: divisionSeleccionada
        }),
      });

      if (respuesta.ok) {
        alert("¡Equipo guardado con éxito!");
        setNuevoNombreEquipo(""); // Limpiar el campo de texto
        // Nota: Para ver el cambio reflejado inmediatamente, podrías recargar la página
        // o manejar un estado local para la lista de equipos.
        window.location.reload(); 
      } else {
        const errorData = await respuesta.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error de red:", error);
      alert("No se pudo conectar con el servidor.");
    } finally {
      setCargando(false);
    }
  };

  function tabla(Division: any): JSX.Element[] {
    const rows = [];
    for (let i = 0; i < Math.ceil(Division.length / 5); i++) {
      const cols = [];
      for (let j = 0; j < 5; j++) {
        const z = i * 5 + j;
        if (Division[z]) {
          cols.push(<td key={Division[z].name}>{Division[z].name}</td>);
        }
      }
      rows.push(<tr key={i}>{cols}</tr>);
    }
    return rows;
  }

  return (
    <>
      <Nav {...props} />
      <div key='0' className="page">
        <p></p>
        <div key='3' className="center">
          <h1><p>Liga Dario Salazar</p></h1>
        </div>

        {/* --- FORMULARIO VISUAL PARA AGREGAR EQUIPOS --- */}
        <div className="center" style={{ margin: "20px 0", padding: "15px", border: "1px solid #ccc", borderRadius: "8px" }}>
          <h3>Registrar Nuevo Equipo</h3>
          <form onSubmit={manejarEnvio}>
            <input 
              type="text" 
              placeholder="Nombre del Equipo" 
              value={nuevoNombreEquipo}
              onChange={(e) => setNuevoNombreEquipo(e.target.value)}
              disabled={cargando}
            />
            
            <select 
              value={divisionSeleccionada} 
              onChange={(e) => setDivisionSeleccionada(Number(e.target.value))}
              disabled={cargando}
              style={{ marginLeft: "10px", marginRight: "10px" }}
            >
              {props.division && props.division.map(div => (
                <option key={div.idDivision} value={div.idDivision}>{div.name}</option>
              ))}
            </select>

            <button type="submit" disabled={cargando}>
              {cargando ? "Guardando..." : "Guardar Equipo"}
            </button>
          </form>
        </div>

        {/* --- TU RENDERIZADO ACTUAL DE TABLAS --- */}
        {props.league ?
          props.league.map(league =>
            props.division.map(division =>
              <div key={division.idDivision}>
                <div key={division.idDivision} className="center"><h3>{division.name}</h3></div>
                <p></p>
                <table className="table table-hover">
                  <tbody>
                    {1 === division.idDivision ? tabla(props.team1) : null}
                    {2 === division.idDivision ? tabla(props.team2) : null}
                    {3 === division.idDivision ? tabla(props.team3) : null}
                    {4 === division.idDivision ? tabla(props.team4) : null}
                    {5 === division.idDivision ? tabla(props.team5) : null}
                  </tbody>
                </table>
                <p></p>
              </div>
            )
          ) : null}
        <p></p>
      </div>
    </>
  );
};

export default Blog;
