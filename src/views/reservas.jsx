import  Navbar  from "../components/NavBar"
import { ListaReservas } from "../components/ListaReservas"
import { useAuth0 } from "@auth0/auth0-react";
import Wrapper from "../components/IsLoading"

function Reservas () {

    const { isAuthenticated } = useAuth0();
    if (isAuthenticated) { 
    return (
        <Wrapper>
        <div className="reservas-body">
        <Navbar />
        <div className="container-md">
        <ListaReservas />
        </div>
        <svg className="svg-background" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#84A98C" fill-opacity="1" d="M0,64L120,101.3C240,139,480,213,720,245.3C960,277,1200,267,1320,261.3L1440,256L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path></svg>
        </div>
        </Wrapper> 
    ) } else {
        return (
        <Wrapper>
        <Navbar />
        <div className="container-md todo">
        <h1 style={{textAlign: "center"}} >Pagina no autorizada</h1>
        <button onClick={() =>loginWithRedirect()}  type='submit' class="btn btn
        -primary mb-2 mt-5 mx-auto d-block"><span>Inicia sesión para ver el contenido</span></button><br/>
        </div>
        </Wrapper> 

        )
    }
}
export default Reservas