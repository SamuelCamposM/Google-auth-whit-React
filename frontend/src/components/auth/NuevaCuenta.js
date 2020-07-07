//DEPENDENCAIS
import React, { useState, useContext , useEffect} from "react";
import { Link  } from "react-router-dom";
//context
import AlertaContext from "../../context/alertas/alertaContext";
import authContext from "../../context/auth/authContext";

const NuevaCuenta = (props) => {
  
  //extraer valores del context
  const { alerta, mostrarAlerta } = useContext(AlertaContext);
  const { RegistrarUsuario ,mensaje , autenticado } =  useContext(authContext)

  //en caso de que el usuario se haya autenticado p sea un registro duplicado
  useEffect(()=> {

    if (autenticado) {
      props.history.push('/Proyectos')
    }
    if(mensaje){
      mostrarAlerta(mensaje.msg, mensaje.categoria);
      return;
    }
// eslint-disable-next-line
  }, [ autenticado ])

  //DEFINIR STATE
  const [usuario, setusuario] = useState({
    email: "",
    password: "",
    nombre: "",
    confirmar: "",
  });

  //extraer valores
  const { email, password, nombre, confirmar } = usuario;
  const onChange = (e) => {
    setusuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  //cuando el usuario haga submit
  const onSubmit = (e) => {
    e.preventDefault();

    //validar que no hayan campos vacios
    if (
      nombre.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmar.trim() === ""
    ) {
      mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
      return;
    }
    //validando password
    if (password.length < 6) {
      mostrarAlerta(
        "El password debe ser de al menos 6 caracteres",
        "alerta-error"
      );
      return;
    }

    if (password !== confirmar) {
      mostrarAlerta("Las contraseñas no coinciden", "alerta-error");
      return;
    }


    RegistrarUsuario({
      nombre , email , password
    })
  };
  const handleClick = async ()=> {
    props.history.push('/Spinner')
    // auth/google/callback
  }
  return (
    <div className="form-usuario">
      {alerta ? (
        <div className={`alerta  ${alerta.categoria}`}>
          {" "}
          <h1> {alerta.msg} </h1>{" "}
        </div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Crea una cuenta </h1>
        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="email">email</label>

            <input
              type="text"
              name="email"
              placeholder="Tu email"
              id="email"
              onChange={onChange}
              value={email}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="nombre">Nombre</label>

            <input
              type="text"
              name="nombre"
              placeholder="Tu nombre"
              id="nombre"
              onChange={onChange}
              value={nombre}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="password"> password</label>

            <input
              type="password"
              name="password"
              placeholder="Escribe una contraseña"
              id="password"
              onChange={onChange}
              value={password}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="password"> Confirmar Contraseña</label>

            <input
              type="password"
              name="confirmar"
              placeholder="Confirma tun contraseña"
              id="confirmar"
              onChange={onChange}
              value={confirmar}
            />
          </div>

          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Registrarme"
            />
          </div>
        </form>
    
  
        <div>
            <a 
            
            className="enlace-cuenta" 
            onClick={handleClick}
            
            href="http://localhost:4000/auth/google/callback">Registrase con Google</a>
        </div>


        <Link to={"/"} className="enlace-cuenta">
          Ya tienes una cuenta inicia sesion
        </Link>
      </div>
    </div>
  );
};

export default NuevaCuenta;
