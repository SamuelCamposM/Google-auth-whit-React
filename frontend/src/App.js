//dependencias
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//componentes
import Login from "./components/auth/Login";
import Spinner from "./components/Cargando/Spinner";
import NuevaCuenta from "./components/auth/NuevaCuenta";
import Proyectos from "./components/proyectos/Proyectos";
//higher order component 
import RutaPrivada from './components/rutas/rutaPrivada'
//context
import ProyectoState from "./context/Proyectos/proyectoState";
import TareaState from "./context/Tareas/TareaState";
import AlertaState from "./context/alertas/alertaState";
import AuthState from './context/auth/authState';

//revisar si hay un token 
 import tokenAuth from './config/token'
const token = localStorage.getItem('token')
if(token){
 tokenAuth(token)
}
function App() {
  
  
  return (
    <AlertaState>                                                       
      <TareaState>
        <ProyectoState>
          <AuthState>
            
          <Router>
              <Route exact path="/Spinner" component={Spinner} />
            <Switch>
              
              <Route exact path="/" component={Login} />
              <Route exact path="/NuevaCuenta" component={NuevaCuenta} />
              <RutaPrivada exact path="/Proyectos" component={Proyectos} />
            </Switch>
          </Router>
          </AuthState>
        </ProyectoState>
      </TareaState>
    </AlertaState>
  );
}

export default App;

