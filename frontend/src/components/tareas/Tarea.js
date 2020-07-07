//dependencias
import React  ,{useContext} from 'react'
//context
import tareaContext from "../../context/Tareas/tareaContext";
import proyectoContext from '../../context/Proyectos/proyectoContext';



const Tarea = ({tarea}) => {

    const {eliminarTarea ,obtenerTareas  , editarTarea,guardarTareaActual} = useContext(tareaContext);
    const { proyecto } = useContext(proyectoContext)
    
    //funcion que se ejecuta cuando el usuario presiona el btn de eliminar
    const tareaEliminar = id => {
        
      
        eliminarTarea(id , proyecto._id)
        obtenerTareas(proyecto._id)
        
        
    } 
    //funcion que cambia el estado de las tareas
    const cambiarEstado = tarea => {
        tarea.estado = !tarea.estado
        console.log("tarea modificada",tarea);
        
        editarTarea(tarea)
    }
    const seleccionarTarea = tarea =>{
        guardarTareaActual(tarea)
    }
    return ( 
    <li className="tarea sombra">
        <p>{tarea.nombre}</p>
        <div className="estado">
            {tarea.estado ? 
        (
            <button
             className="completo"
            type="button"
            onClick={()=>  cambiarEstado(tarea)}  
             >Completo
            </button>
        )    
        : 
        (
            <button
            className="incompleto"
           type="button"            
           onClick={()=>  cambiarEstado(tarea)}  
            >Incompleto
           </button>
        )
        
        }
        </div>
        <div className="acciones">
            <button 
            type="button"
            className="btn btn-primario"
            onClick={()=> seleccionarTarea(tarea)}
            >
           Editar </button>
            <button 
            type="button"
            className="btn btn-secundario"
            onClick={()=>tareaEliminar(tarea._id)}
            >
            Eliminar</button>
        </div>
            </li>
    );
}
 
export default Tarea;