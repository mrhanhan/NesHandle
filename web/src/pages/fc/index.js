import {Button,  Navbar} from "tdesign-mobile-react";
import {HomeIcon} from "tdesign-icons-react";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {BtnKey, MoveKey} from "../../key/Key";
import {KEYMAPS} from "../keymap";

export default function FcPage() {
    const to = useNavigate();
    const [keymapIndex, setKeyIndex] = useState(0);
    const [kmt, setKMT] = useState(false);
    return (<div className={"nes-page"}>
        <Navbar rightIcon={
            <>
                <div style={{zIndex: 999, position: 'absolute', right: '20px'}}><HomeIcon onClick={() => to("/")}/></div>
                <div style={{marginRight: '100px'}}>
                    <Button size={"small"} onClick={() =>  setKMT(false)} theme={!kmt ? "primary" : ''}>按键</Button>
                    <Button size={"small"} onClick={() =>  setKMT(true)} theme={kmt ? "primary" : ''}>轮盘</Button>
                </div>
            </>
        }
                leftIcon={<div>
                    {KEYMAPS.map((key, index) => {
                        return <Button key={`${index}`} onClick={() => setKeyIndex(index)}
                                       size={"small"}
                                       theme={keymapIndex === index ? "primary" : ''}>{key.title}</Button>
                    })}
                </div>}>
            FC按键
        </Navbar>
        <div style={{marginTop: '50px'}}>
            <div style={{display: "flex", alignItems: 'end', position: 'absolute', bottom: '30px', width: '100%'}}>
                <div style={{width: '250px'}}>
                    <MoveKey type={kmt ? '' : "keymap"} keymap={KEYMAPS[keymapIndex]}/>
                </div>
                <div style={{flex: "1", textAlign: "center"}}>
                    <BtnKey type={"sm"} btnKey={KEYMAPS[keymapIndex].keymap.start}> 开始 </BtnKey>
                    <BtnKey type={"sm"} btnKey={KEYMAPS[keymapIndex].keymap.com}> 选择 </BtnKey>
                </div>
                <div style={{display: "inline-block"}}>
                    <BtnKey type={"attach"} btnKey={KEYMAPS[keymapIndex].keymap.X}>X</BtnKey>&nbsp;
                    <BtnKey type={"attach"} btnKey={KEYMAPS[keymapIndex].keymap.Y}>Y</BtnKey>&nbsp;<br/>
                    {/*<BtnKey type={"attach"} btnKey={KEYMAPS[keymapIndex].keymap.Z}>Z</BtnKey><br/>*/}
                    <BtnKey type={"attach"} btnKey={KEYMAPS[keymapIndex].keymap.A}>A</BtnKey>&nbsp;
                    <BtnKey type={"attach"} btnKey={KEYMAPS[keymapIndex].keymap.B}>B</BtnKey>&nbsp;
                    {/*<BtnKey type={"attach"} btnKey={KEYMAPS[keymapIndex].keymap.C}>C</BtnKey>&nbsp;*/}
                </div>
            </div>
        </div>
    </div>);
}