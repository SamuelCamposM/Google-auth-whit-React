//dependencias
import React  , {useContext} from 'react'
//context
import proyectoContext from "../../context/Proyectos/proyectoContext";
import tareaContext from "../../context/Tareas/tareaContext";

const Proyecto = ({proyecto}) => {
    //extraer valores de context
    const { proyectoActual  } = useContext(proyectoContext)
    const {obtenerTareas} = useContext(tareaContext)
    //funcion para agregar el proyecto atual
    const seleccionarProyectoActual = proyecto  =>{
        //fijar proyecto actaual
      proyectoActual(proyecto)
      //filtrar tareas por proyeecto
      obtenerTareas(proyecto._id)
    }
    return (  
        <li><button
        type="button"
        className="btn btn-blank"
        onClick={()=>  seleccionarProyectoActual(proyecto)}
        >{proyecto.nombre} </button></li>
    );
}
 
export default Proyecto;