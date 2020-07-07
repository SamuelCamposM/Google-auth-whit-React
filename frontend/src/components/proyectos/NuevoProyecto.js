//dependencias
import React, { Fragment , useState  , useContext} from "react";
//context
import proyectoContext from "../../context/Proyectos/proyectoContext";


const NuevoProyecto = () => {

    //obtener state del context
    const { formulario , mostrarForm ,errorForm ,agregarProyecto , mostrarError  } = useContext(proyectoContext)
    
    
    //state
    const [proyecto, setproyecto] = useState({
        nombre  :''
    })
    //extraer valores
    const { nombre  } =proyecto
    const onChangeProyecto = e => {
       setproyecto({
           ...proyecto,
           [e.target.name] : e.target.value
       })
    }
    //cunado el usuario envia un proyecto 
    const onSubmitProyecto = e => {
        e.preventDefault();
        if(nombre === ''){
          mostrarError()
          return 
        }
        agregarProyecto(proyecto)
        
        setproyecto({
          nombre : ''
        })

    }


  return (
    <Fragment>
      <button 
       onClick={mostrarForm}
       type="button"
        className="btn btn-block btn-primario">
        Nuevo Proyecto
      </button>
   {formulario
   ?
   <form 
   onSubmit={onSubmitProyecto}
   className="formulario-nuevo-proyecto">
     <input
       type="text"
       className="input-text"
       placeholder="Nombre proyecto"
       name="nombre"
       onChange={onChangeProyecto}
       value={nombre}
     />

     <input 

     type="submit"
      className="btn btn-primario btn-block"
     value="agregar proyecto"
     />
   </form>
   :
   null}
   {errorForm ? 
  <p className="mensaje error">El proyecto es obligatorio</p> :
  null
  }

    </Fragment>
  );
};

export default NuevoProyecto;
