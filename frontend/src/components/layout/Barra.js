//dependencias
import React , {useContext, useEffect} from "react";
//context
import authContext  from '../../context/auth/authContext'

const Barra = () => {
    //extrayendo valores del context
    const {  usuario, usuarioAutenticado  , cerrarSesion }= useContext(authContext)


  useEffect(() => {
    usuarioAutenticado()
    // eslint-disable-next-line
  }, [])
    return ( 
        <header className="app-header">
            {usuario ? <p className="nombre-usuario">hola <span>{usuario.nombre}</span> </p>  : null }
            <nav className="nav-principal">
                <button
                 className="btn btn-blank cerrar-sesion"
                onClick={ () => cerrarSesion()}
                >
                 Cerrar Sesion   
                </button>
            </nav>
        </header>
     );
}
 
export default Barra;