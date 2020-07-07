//DEPENDENCIAS
import React, { useReducer } from "react";
import clienteAxios  from '../../config/axios'
//DEPENDENCIAS PARA CONTEXT
import proyectoContext from "./proyectoContext";
import proyectoReducer from "./proyectoReducer";
//IMPORTANDO LOS TYPES
import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTOS,
  AGREGAR_PROYECTO,
  PROYECTO_ERROR,
  VALIDAR_FORMULARIO,
  PROYECTO_ACTUAL,
  ELIMINAR_PROYECTO
} from "../../types/index";

const ProyectoState = (props) => {
 
  const initialState = {
    proyectos: [],
    formulario: false,
    errorForm: false,
    proyecto: null,
    mensaje: null
  };
  //ejecutar las acciones con dispatch

  const [state, dispatch] = useReducer(proyectoReducer, initialState);

  //serie de funciones para el crud
  const mostrarForm = () => {
    dispatch({
      type: FORMULARIO_PROYECTO,
    });
  };

  const obtenerProyectos = async() => {
   
    try {
      const resultado = await clienteAxios.get('/proyectos')


      dispatch({
        type: OBTENER_PROYECTOS,
        payload: resultado.data,
      });
    } catch (error) {
      const alerta = {
        msg : 'Hubo un error',
      categoria : 'alerta-error'
      }
      dispatch ({
        type:PROYECTO_ERROR,
        payload: alerta
    })
    }
  };
  const agregarProyecto = async (proyecto) => {
     
  try {
    const resultado = await clienteAxios.post('proyectos', proyecto)
    console.log(resultado);

      //insertar proyecto en el state
      dispatch({
        type: AGREGAR_PROYECTO,
        payload: resultado.data,
      });
    
  } catch (error) {
    const alerta = {
      msg : 'Hubo un error',
    categoria : 'alerta-error'
    }
    dispatch ({
      type:PROYECTO_ERROR,
      payload: alerta
  })
  }
  };
  //Valida el formulario
  const mostrarError = () => {
    dispatch({
      type: VALIDAR_FORMULARIO,
    });
  };
  //cuando el usuario sellecciona un proyecto
  const proyectoActual = proyectoId => {
      dispatch({
          type:PROYECTO_ACTUAL,
          payload: proyectoId
      })
  }

    //elimina un proyecto 
    const eliminarProyecto = async  proyectoId => {
        
      try {
        await clienteAxios.delete(`/proyectos/${proyectoId}`)
          dispatch ({
            type:ELIMINAR_PROYECTO,
            payload: proyectoId
        })
        } catch (error) {
          const alerta = {
            msg : 'Hubo un error',
          categoria : 'alerta-error'
          }
          dispatch ({
            type:PROYECTO_ERROR,
            payload: alerta
        })
           }
    }
  return (
    <proyectoContext.Provider
      value={{
        //state
        formulario: state.formulario,
        proyectos: state.proyectos,
        errorForm: state.errorForm,
        proyecto : state.proyecto,
        mensaje:  state.mensaje,
        //funciones
        mostrarForm,
        obtenerProyectos,
        agregarProyecto,
        mostrarError,
        proyectoActual,
        eliminarProyecto
      }}
    >
      {props.children}
    </proyectoContext.Provider>
  );
};
export default ProyectoState;
