//dependencias
import React, { useReducer } from "react";
import clienteAxios from '../../config/axios'
import tokenAuth from  '../../config/token'
//context
import AuthContext from "./authContext";
//reducer
import authReducer from "./authReducer";

import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION,
  REGISTRO_EXITOSO_GOOGLE
} from "../../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    autenticado: null,
    usuario: null,
    mensaje: null,
    cargando : true
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  //funciones
const registrarGoogle = async (cookie)=> {
  console.log("desde el context",cookie)
    
  try {
  
      
//coloca el token en el local storage
if (!cookie){
return

}
    await  dispatch({
          type: REGISTRO_EXITOSO_GOOGLE,
          payload: cookie
      })
      //obtener el usuario
      usuarioAutenticado()
      
  } catch (error) {
    console.log("eerrror",error.response);
    const alerta = {
        msg : error.response.data.mensaje ,
        categoria : 'alerta-error'
    }
      dispatch({
          type: REGISTRO_ERROR,
          payload: alerta
      })
      
  }
}

const RegistrarUsuario = async datos => {
    console.log(datos);
    
    try {
      //envia los datos para uqe los guarde
        const respuesta = await clienteAxios.post('usuarios', datos)
        console.log("respuesta json", respuesta);
        
//coloca el token en el local storage
        dispatch({
            type: REGISTRO_EXITOSO,
            payload: respuesta.data
        })
        //obtener el usuario
        usuarioAutenticado()
        
    } catch (error) {
      console.log("eerrror",error.response);
      const alerta = {
          msg : error.response.data.mensaje ,
          categoria : 'alerta-error'
      }
        dispatch({
            type: REGISTRO_ERROR,
            payload: alerta
        })
        
    }
}
//retorna el usuario autenticado
const usuarioAutenticado = async () => {
  //obtiene el token
  const token = localStorage.getItem('token');
  //pregunta si hay token y si hay coloca el token en el header
  if (token) {
await  tokenAuth(token)
      }
console.log("autenticar usuario",token)
  try {
        //funcion para enviar el token por header
        const respuesta = await clienteAxios.get('/auth');
        console.log("usuario de respuesta", respuesta);
        
        // console.log("respuesta",respuesta);

        await dispatch({
          type: OBTENER_USUARIO,
          payload : respuesta.data.usuario
        })
        
  } catch (error) {
    console.log("error", error)
    dispatch({
      type:LOGIN_ERROR
    })
  }
}
//cuando el usuario inicia sesion 
const iniciarSesion = async datos => {
  try {
    const respuesta = await clienteAxios.post('auth', datos)
    console.log("token",respuesta);
    //coloca el token en el local storage
    dispatch({
      type: LOGIN_EXITOSO,
      payload: respuesta.data
    })
//pregunta si hay token
//en el token va el id del usuario hcae la consulta 
//y coloca el usuario en el state

    usuarioAutenticado()
  } catch (error) {
    console.log("eerrror",error.response);
    const alerta = {
        msg : error.response.data.msg ,
        categoria : 'alerta-error'
    }
      dispatch({
          type: LOGIN_ERROR,
          payload: alerta
      })
  }
}
//cerrar sesion
const cerrarSesion = () => {
  dispatch({
    type: CERRAR_SESION
  })
}
  return <AuthContext.Provider 
  value={{
      //state
      token : state.token,
      autenticado: state.autenticado,
      usuario: state.usuario,
      mensaje: state.mensaje,
      cargando : state.cargando,
      //funciones
      RegistrarUsuario,
      iniciarSesion,
      usuarioAutenticado,
      cerrarSesion,
      registrarGoogle
  }}
  >
      {props.children}
      </AuthContext.Provider>;
};

export default AuthState;
