//dependencias
import {CSSTransition , TransitionGroup} from 'react-transition-group'
import React ,{useContext , useEffect} from 'react'
//componentes
import Proyecto from './Proyecto'
//context

import proyectoContext from "../../context/Proyectos/proyectoContext";
import alertaContext from '../../context/alertas/alertaContext';

const ListadoProyectos = () => {
    //extraer valores del context
    const { mensaje ,  proyectos , obtenerProyectos } = useContext(proyectoContext)
    const { alerta , mostrarAlerta} = useContext(alertaContext)
    useEffect(()=>{
        if (mensaje) {
            
            //si hay un error
            mostrarAlerta(mensaje.msg , mensaje.categoria)
        }
        obtenerProyectos()
        //eslint-disable-next-line
    },[mensaje])

    if(proyectos.length === 0 )return <p>No hay proyectos comienza creando uno </p>
    return ( 
        <ul className="listado-proyectos">
            {alerta ? (
                <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
            )  : null}
            <TransitionGroup>            
{proyectos.map(proyecto => (
   <CSSTransition 
   key={proyecto._id}
   timeout={300}
   classNames="proyecto"
   >
        <Proyecto
    
    proyecto={proyecto}
    />
   </CSSTransition>
)) }
</TransitionGroup>
        </ul>
    );
}
 
export default ListadoProyectos;