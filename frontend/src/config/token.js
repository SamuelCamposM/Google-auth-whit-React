import clienteAxios from "./axios";

const tokenAuth = (token1) => {
    let token = token1
  if (token) {
    clienteAxios.defaults.headers.common['x-auth-token'] = token ;
  } else{
      delete clienteAxios.defaults.headers.common['x-auth-token'];
  }
};

export default tokenAuth;