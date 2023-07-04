import NavBar from "../components/NavBar"
import { PanelHome } from "../components/PanelHome";



function Home () {

    return (
        <>
        <NavBar />
        <div className="container-md todo">
            
        <PanelHome />

               
        </div>
        </>
    );
}
export default Home;