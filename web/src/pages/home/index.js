import {Divider, Grid, GridItem, Navbar} from "tdesign-mobile-react";
import {FullscreenIcon, FullscreenExitIcon} from 'tdesign-icons-react';
import {GlobalContext} from "../../context/GlobalContext";
import {useContext} from "react";
import {Link} from "react-router-dom";

export default function () {
    const globalContext = useContext(GlobalContext);
    const onRequestFullScreen = () => {
        document.getElementById('root').requestFullscreen({
            navigationUI: 'hide'
        }).then(() => {
            globalContext.setFullScreen(true);
        }).catch(() => {
            globalContext.setFullScreen(false);
        });
    };
    const onExitFullScreen = () => {
        document.exitFullscreen().then(() => globalContext.setFullScreen(false))
            .catch(() => globalContext.setFullScreen(false))
    }
    return (<div className={"home-page"}>
        <Navbar rightIcon={globalContext.fullscreen ? <FullscreenExitIcon onClick={() => {onExitFullScreen()}}/> : <FullscreenIcon onClick={onRequestFullScreen}/>}>
            游戏按键模拟器
        </Navbar>
        <div style={{marginTop: '50px'}}>
            <div style={{color: 'gray'}}>按键</div>
            <Divider/>
            <Grid gutter={4} border={true}>
                <GridItem className={"grid-btn-link"} border={true} text={<div>
                    <Link to={"/nes"}>街机</Link>
                </div>} description={"适用于街机游戏手柄"}/>
                <GridItem className={"grid-btn-link"} border={true} text={<div>
                    <Link to={"/fc"}>FC</Link>
                </div>} description={"适用于FC游戏手柄"}/>
                <GridItem className={"grid-btn-link"} border={true} text={<div>
                    <Link to={"/gba"}>GBA</Link>
                </div>} description={"适用于GBA游戏手柄"}/>
                <GridItem className={"grid-btn-link"} border={true} text={<div>
                    <Link to={"/md"}>MD</Link>
                </div>} description={"适用于MD游戏手柄"}/>
                <GridItem className={"grid-btn-link"} border={true} text={<div>
                    <Link to={"/fz"}>专业按键</Link>
                </div>} description={"适用于33tool.com游戏手柄"}/>
            </Grid>
            <Divider/>
            <p>
                支持游戏网站: <a href={"https://33tool.com/"}>https://33tool.com//</a><br/>
                支持游戏网站: <a href={"https://www.yikm.net/"}>https://www.yikm.net/</a><br/>
                支持游戏网站: <a href={"https://wgame80.com/"}>https://wgame80.com/</a><br/>
                <p>使用前，需要先在网站内配置按键</p>
            </p>
        </div>
    </div>);
}