import {createContext, useRef, useState} from "react";


export const GlobalContext = createContext({
    fullscreen: false,
    setFullScreen: (state) =>{}
});

export const GlobalContextConfig = (props) => {
    const [state, setState] = useState({fullscreen: false});
    const setFullScreen = (status) => {
        setState({...state, fullscreen: status})
    };
    return <GlobalContext.Provider value={{...state, setFullScreen}}>
        {props.children}
    </GlobalContext.Provider>;
}