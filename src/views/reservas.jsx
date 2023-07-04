import  Navbar  from "../components/NavBar"
import { ListaReservas } from "../components/ListaReservas"

function Reservas () {
    return (
        <div className="reservas-body">
        <Navbar />
        <div className="container-md">
        <ListaReservas />
        </div>
        <svg className="svg-background" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#84A98C" fill-opacity="1" d="M0,64L120,101.3C240,139,480,213,720,245.3C960,277,1200,267,1320,261.3L1440,256L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path></svg>
        </div>
    )
}
export default Reservas