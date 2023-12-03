import {Fab, Navbar, TabPanel, Tabs, Toast} from "tdesign-mobile-react";
import {useNavigate} from "react-router-dom";
import {HomeIcon} from 'tdesign-icons-react';

export default function Config() {
    const to = useNavigate();
    return (<div className={"home-page"}>
        <Navbar>
            游戏按键配置
        </Navbar>
        <div style={{marginTop: '50px'}}>
            <Tabs>
                <TabPanel value={"v1"} label={"街机配置"}>
                    街机
                </TabPanel>
                <TabPanel value={"v2"} label={"FC"}>
                    FC配置
                </TabPanel>
            </Tabs>
            <Fab icon={<HomeIcon/>} onClick={() => to("/")} style={{ position: 'fixed', right: '16px', bottom: '32px' }}/>

        </div>
    </div>);
}