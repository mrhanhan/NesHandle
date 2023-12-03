import './App.css';
import {Grid, Navbar} from "tdesign-mobile-react";
import {AppRoute} from "./routes";
import {RouterProvider} from "react-router-dom";

function App() {


    return (
        <>
            <RouterProvider router={AppRoute}/>
        </>
    );
}

export default App;
