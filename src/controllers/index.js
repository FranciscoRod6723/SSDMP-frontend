import Api from "../modules/api";
import Login from "./login"
import Mascotas from "./mascotas";
import Singup from "./singup";

const Controllers = (enviroment = 'dev') => {

    const apiInstance = new Api(enviroment);
    const login = new Login(enviroment, apiInstance);
    const singup = new Singup(enviroment, apiInstance);
    const mascotas = new Mascotas(enviroment, apiInstance);

    return {
        users: {
            login,
            singup
        },
        mascotas
    }
}

export {
    Controllers
}