import  {ManejoTareas}  from "../components/ManejoTareas";
import NavBar from "../components/NavBar";
import Wrapper from "../components/IsLoading"
import { useAuth0 } from "@auth0/auth0-react"

function Tareas () {

    const { isAuthenticated } = useAuth0();

    if (isAuthenticated) { 

    return(
        <Wrapper>
        <NavBar />
        <ManejoTareas />
        </Wrapper> 
    );
} else {
    return (
        <Wrapper>
        <NavBar />
        <div className="container-md todo">
        <h1 style={{textAlign: "center"}} >Pagina no autorizada</h1>
        <button onClick={() =>loginWithRedirect()}  type='submit' class="btn btn
        -primary mb-2 mt-5 mx-auto d-block"><span>Inicia sesión para ver el contenido</span></button><br/>
        </div>
        </Wrapper> 
        )
    }
};

export default Tareas;