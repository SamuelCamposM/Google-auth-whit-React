//dependencias 
import React , {useState , useContext , useEffect} from "react";
import { Link } from 'react-router-dom'
//context
import AlertaContext from "../../context/alertas/alertaContext";
import authContext from "../../context/auth/authContext";

const Login = (props) => {
  //extraer valores del context
  const { alerta, mostrarAlerta } = useContext(AlertaContext);
  const { iniciarSesion , mensaje ,autenticado } =  useContext(authContext)
    //DEFINIR STATE
    const [usuario, setusuario] = useState({
        email: '',
        password: ''
    })
    useEffect(()=> {

      if (autenticado) {
        props.history.push('/Proyectos')
      }
      if(mensaje){
        console.log("asd", mensaje);
        
        mostrarAlerta(mensaje.msg, mensaje.categoria);
        return;
      }
  // eslint-disable-next-line
    }, [mensaje, autenticado , props.history])
    //extraer valores
    const { email , password } = usuario
    const onChange = e => {
        setusuario({
            ...usuario,
            [e.target.name]  : e.target.value
        })
    }

    //cuando el usuario haga submit
    const onSubmit = e => {
        e.preventDefault();
        
        //validar espacios en blanco
        if (email.trim() === '' || password.trim() === '') {
          mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
          return;

        }
        iniciarSesion(usuario)   
    }
  return (
    <div className="form-usuario">
        {alerta ? (
        <div className={`alerta  ${alerta.categoria}`}>
          {" "}
          <h1> {alerta.msg} </h1>
        </div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Iniciar Sesion </h1>
        <form 
         onSubmit={onSubmit}
        >
          <div className="campo-form">
            <label htmlFor="email">email</label>
              
              <input
                type="email"
                name="email"
                placeholder="Tu nombre"
                id="email"
                onChange={onChange}
                value={email}
              />
            
          </div>

          <div className="campo-form">
            <label htmlFor="password"> password</label>
              
              <input
                type="password"
                name="password"
                placeholder="Tu contraseña"
                id="password"
                onChange={onChange}
                value={password}
              />
            
           
          </div>
          <div className="campo-form">
                <input
                  type="submit"
                  className="btn btn-primario btn-block"
                  value="iniciar sesion"
                />
              </div>
        </form>
        <Link to={'/NuevaCuenta'}  className="enlace-cuenta">Obtener cuenta</Link>
      </div>
    </div>
  );
};

export default Login;
