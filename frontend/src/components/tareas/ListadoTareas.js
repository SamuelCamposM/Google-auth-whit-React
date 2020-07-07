//dependencias
import React, { Fragment, useContext } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
//componentes
import Tarea from "./Tarea";
//context
import proyectoContext from "../../context/Proyectos/proyectoContext";
import tareaContext from "../../context/Tareas/tareaContext";

const ListadoTareas = () => {
  const { proyecto, eliminarProyecto } = useContext(proyectoContext);
  const { tareasProyecto } = useContext(tareaContext);
  if (!proyecto) return null;

  return (
    <Fragment>
      {proyecto === null || proyecto === undefined ? (
        <h2>Selecciona un proyecto</h2>
      ) : (
        <h1>
          proyecto <span>{proyecto.nombre} </span>
        </h1>
      )}
      <ul className="listado-tareas">
        {tareasProyecto.length === 0 ? (
          <li className="tarea">
            <p>no hay tareas</p>
          </li>
        ) : (
          <TransitionGroup>
              {tareasProyecto.map((tarea) =>  
              
              <CSSTransition 
              timeout={300}
              classNames="tarea"
              key={tarea._id}>
              <Tarea  tarea={tarea} />
              
              </CSSTransition>
              )}
          </TransitionGroup>
        )}
      </ul>
      <button
        onClick={() => eliminarProyecto(proyecto._id)}
        type="button"
        className="btn btn-eliminar"
      >
        Eliminar Proyecto &times;
      </button>
    </Fragment>
  );
};

export default ListadoTareas;
