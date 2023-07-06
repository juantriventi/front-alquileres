import NavBar from "../components/NavBar"
import { PanelHome } from "../components/PanelHome";
import { useAuth0 } from "@auth0/auth0-react";
import Wrapper from "../components/IsLoading"

function Home () {
    const { isAuthenticated } = useAuth0();
    const { loginWithRedirect } = useAuth0();

    if (isAuthenticated) { 
   
    return (
        <Wrapper >
        <div className="container-todo-home">
        <NavBar />
        <div className="container-md todo">
        <PanelHome />     
        </div>
        </div>
        </Wrapper> 
    )
} else {
    return (

        <Wrapper >
            <NavBar />
            <div className="container-md todo">
            <div className="col">
            <div className="row mt-4" id="inicio-no-logueado">
                
            <h3 className="text-left mt-5 py-5 display-5">Bienvenido Hoyo 3 Admin</h3>
            <p id="p-home-no-logueado" className="lead text-left mb-3">El panel de administrador de Hoyo3 Arelauquen Bungalows</p>
            <button onClick={() =>loginWithRedirect()}  type='submit' id="boton-home-no-logueado" class="btn mb-2 mt-3"><span>Iniciar sesión para ver tu dashboard</span></button><br/>
            </div>
            </div>
            <div className="row">
            <div className="container-img">
                <img src='../../public/undraw_data_trends_re_2cdy.svg' alt="Logo" />
            </div>   
            </div>
            </div>     
        </Wrapper>

        )
    }
}
export default Home;