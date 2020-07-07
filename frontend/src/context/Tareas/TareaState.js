import React, { useReducer } from "react";
//context
//dependencias 
import clienteAxios from '../../config/axios'
//context
import TareaContext from "./tareaContext";
//reducer
import TareaReducer from "./tareaReducer";
//types
import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
} from '../../types/index'
const TareaState = (props) => {
  const initialState = {

    tareasProyecto: [],
    errorTarea : false,
    tareaSeleccionada : null
  };

  //crear el dispatch y el state
  const [state, dispatch] = useReducer(TareaReducer, initialState);

     //crear las funciones

     //obtener tareas por protyecto
     const obtenerTareas = async proyecto => {
       console.log("id del proyecto",proyecto);
       
       
       try {
         const resultado =  await clienteAxios('tareas', {params : {proyecto}})
         
         
         dispatch({
          type: TAREAS_PROYECTO,
          payload : resultado.data.tareas
        })
       } catch (error) {
         console.log(error);
         
       }
      
     }

     //agregar tarea al proyecto actual
     const agregarTarea = async  tarea => {
       console.log(tarea);
       
        try {
          const resultado = await clienteAxios.post('/tareas', tarea)
          console.log(resultado);
          
          dispatch({
            type: AGREGAR_TAREA,
            payload: tarea
          })
        } catch (error) {
          console.log(error);
          
        }
     }
     //validar tarea
     const validarTarea = error => {
      dispatch({
        type:VALIDAR_TAREA,
        payload: error
      })
     }
     //Eliminar tarea por id
     const eliminarTarea = async (id , proyecto)=> {
      
      try {
          await clienteAxios.delete(`/tareas/${id}`, {params :{proyecto}} )
         dispatch({
          type:ELIMINAR_TAREA,
          payload: id
        })
      } catch (error) {
        console.log(error);
        
      }
     }
     const editarTarea =  async tarea => {
     
      try {
        const resultado = await clienteAxios.put(`/tareas/${tarea._id}`, tarea)
console.log(resultado)
        dispatch({
          type: ACTUALIZAR_TAREA ,
          payload: resultado.data.tarea
        })
      } catch (error) {
        console.log(error);
        
      }
       
    
    } 
     const guardarTareaActual = tarea => {
       dispatch({
         type: TAREA_ACTUAL ,
         payload: tarea
       })
     } 
   
  return (
    <TareaContext.Provider
      value={{
        //state
        tareas: state.tareas,
        tareasProyecto : state.tareasProyecto,
        errorTarea : state.errorTarea,
        tareaSeleccionada: state.tareaSeleccionada,
        //funciones
        obtenerTareas,
        agregarTarea,
        validarTarea,
        eliminarTarea,
        guardarTareaActual,
        editarTarea
      }}
    >
      {props.children}
    </TareaContext.Provider>
  );
};

export default TareaState;
