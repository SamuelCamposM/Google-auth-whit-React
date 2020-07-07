

import React, { useState, useEffect ,useContext} from 'react';
import authContext from "../../context/auth/authContext";
import alertaContext from '../../context/alertas/alertaContext';


const Spinner = (props) => {

      //extraer valores del context
  const { alerta, mostrarAlerta } = useContext(alertaContext);
  const { RegistrarUsuario ,mensaje , autenticado ,registrarGoogle , usuario } =  useContext(authContext)

    const  valor = document.cookie.split("token=");
const [cookie , setCookie] = useState(valor[1]);


useEffect(() => {
 console.log(valor)
 if(!usuario){

     registrarGoogle(cookie)
 }
 if (usuario) {
     props.history.push('/Proyectos')
 }
  

          
          
  
}, [ cookie ,usuario ])

    return ( <div className="spinner"></div> );
}
 
export default Spinner;