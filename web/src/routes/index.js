import {createHashRouter} from "react-router-dom";
import Home from "../pages/home";
import Config from "../pages/config";
import NesPage from "../pages/nes";
import FcPage from "../pages/fc";
import GBAPage from "../pages/gba";
import MDPage from "../pages/md";
import FzPage from "../pages/fz";


export const AppRoute = createHashRouter([
    {
        path: '/',
        id: 'home',
        element: <Home/>
    },
    {
        path: '/config',
        id: 'config',
        element: <Config/>
    },
    {
        path: '/nes',
        id: 'nes',
        element: <NesPage/>
    },
    {
        path: '/fc',
        id: 'fc',
        element: <FcPage/>
    },
    {
        path: '/gba',
        id: 'gba',
        element: <GBAPage/>
    },
    {
        path: '/md',
        id: 'md',
        element: <MDPage/>
    },
    {
        path: '/fz',
        id: 'fz',
        element: <FzPage/>
    },

])