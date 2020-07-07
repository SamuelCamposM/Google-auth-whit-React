import React , {useContext, useEffect} from "react";
import Sidebar from '../layout/Sidebar'
import Barra from '../layout/Barra'
import FormTarea from '../tareas/FormTarea'
import ListadoTareas from '../tareas/ListadoTareas'
import authContext  from '../../context/auth/authContext'


const Proyectos = (props) => {
  //extraer valores del context de autenticacion
  const { usuarioAutenticado , usuario }= useContext(authContext)

  useEffect(() => {
    usuarioAutenticado();
    if (usuario) {
    props.history.push('/Proyectos')
    }
    // eslint-disable-next-line
  }, [])
  return (
    <div className="contenedor-app">
      <Sidebar />
      <div className="seccion-principal">
          <Barra />
        <main>
          
<FormTarea />
          <div className="contenedor-tareas">
            
              <ListadoTareas />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Proyectos;
