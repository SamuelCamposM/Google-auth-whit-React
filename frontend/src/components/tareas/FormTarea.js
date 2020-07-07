//dependencais
import React, { useContext, useState, useEffect } from "react";
//context
import proyectoContext from "../../context/Proyectos/proyectoContext";
import tareaContext from "../../context/Tareas/tareaContext";

const FormTarea = () => {
  //extrayendo valores del  context
  const { proyecto } = useContext(proyectoContext);
  const {
    agregarTarea,
    errorTarea,
    validarTarea,
    obtenerTareas,
    tareaSeleccionada,
    editarTarea
  } = useContext(tareaContext);
  //definir state
  const [tarea, settarea] = useState({
    nombre: "",
    proyectoId: "",
    estado: false,
  });

  //extraer valores de tarea
  const { nombre } = tarea;
  //efffect que detecta si vcambia una tarea
  useEffect(() => {
    if (tareaSeleccionada) {
      settarea(tareaSeleccionada);
    } else {
      settarea({
        nombre: "",
        proyectoId: "",
        estado: false,
      });
    }
  }, [tareaSeleccionada]);
  //funcion que lee los valores
  const handleChange = (e) => {
    settarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };

  if (!proyecto) return null;
  const onSubmit = (e) => {
    e.preventDefault();
    if (nombre.trim() === "") {
      validarTarea(true);
      return;
    }

    if (tareaSeleccionada === null) {
      tarea.proyecto = proyecto._id;
    agregarTarea(tarea);
      console.log('nueva');
      
    }else{
      console.log(' no es null');
      console.log(tarea);
      
      editarTarea(tarea)
      
    }
    validarTarea(false);

    
    settarea({ nombre: "" });
    obtenerTareas(proyecto._id);
  };
  return (
    <div className="formulario">
      {errorTarea ? (
        <h1 className="mensaje">todos los campos son obligatorios</h1>
      ) : null}
      <form onSubmit={onSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="nombre tarea"
            name="nombre"
            value={nombre}
            onChange={handleChange}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-block"
            value={tareaSeleccionada ? "Editando Tarea" : "Agregar tarea"}
          />
        </div>
      </form>
    </div>
  );
};

export default FormTarea;
