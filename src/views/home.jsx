import NavBar from "../components/NavBar"
import { PanelHome } from "../components/PanelHome";



function Home () {

    return (
        <div className="container-todo-home">
        <NavBar />
        <div className="container-md todo">
        <PanelHome />     
        </div>
        </div>
    );
}
export default Home;