//dependencias
import React , {useReducer} from 'react';
//reducer
import alertaReducer from './alertaReducer'
//context
import alertaContext from './alertaContext'
//types
import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from "../../types";

const AlertaState = props => {
    const initialState = {
        alerta : null 
    }

    const [state, dispatch] = useReducer(alertaReducer, initialState)
    
    //funciones 

    const mostrarAlerta = (msg , categoria) => {

        
        dispatch({
            type:MOSTRAR_ALERTA,
            payload : {
                msg,
                categoria
            }
        });
console.log(msg , categoria);

        setTimeout(() => {
           dispatch({
            type : OCULTAR_ALERTA
           }) 

        }, 3000);
    }

    return (

        <alertaContext.Provider
        value={{
            // state
            alerta : state.alerta,
            //funciones
            mostrarAlerta
        }}
        >
            {props.children}
        </alertaContext.Provider>
    )
}

export default AlertaState;