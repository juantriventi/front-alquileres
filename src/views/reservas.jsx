import  Navbar  from "../components/NavBar"
import { ListaReservas } from "../components/ListaReservas"

function Reservas () {
    return (
        <>
        <Navbar />
        <div className="container-md">
        <ListaReservas />
        </div>
        </>
    )
}
export default Reservas