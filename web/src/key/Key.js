import {useEffect, useRef, useState} from "react";
import {ArrowDownIcon, ArrowRightIcon, ArrowLeftIcon, ArrowUpIcon} from "tdesign-icons-react";

export function BtnKey(props) {
    const [statue, setStatus] = useState(false);
    return (<div className={`game-btn ${props.type ? props.type : ''} ${statue ? 'active' : ''}`}
                 onTouchStart={(e) => {
                     setStatus(true);
                     fetch('/api/keydown?key=' + props.btnKey).then();
                 }}
                 onTouchEnd={(e) => {
                     setStatus(false);
                     fetch('/api/keyup?key=' + props.btnKey).then();
                 }}
    >
        {props.children}
    </div>)
}

/**
 *
 * @param element {HTMLElement}
 * @return {number}
 */
const getOffsetX = (element) => {
    if (!element) {
        return 0;
    }
    return element.offsetLeft + element.scrollLeft + getOffsetX(element.offsetParent);
}

/**
 *
 * @param element {HTMLElement}
 * @return {number}
 */
const getOffsetY = (element) => {
    if (!element) {
        return 0;
    }
    return element.offsetTop + element.scrollTop + getOffsetY(element.offsetParent);
}

const CanvasKey = (props) => {
    const canvas = useRef(null);
    const btnSize = props.size || 76;
    const pos = useRef({
        touchX: 100,
        touchY: 80,
        x: 0,
        y: 0,
        active: 0,
        up: false,
        down: false,
        right: false,
        left: false,
    });
    const onMove = (e) => {
        const current = e.touches[0];
        pos.current.x = current.clientX - getOffsetX(e.currentTarget);
        pos.current.y = current.clientY  - getOffsetY(e.currentTarget);
    };

    console.log(props.keymap);
    const up = (status) => {
        if (status) {
            fetch('/api/keydown?key=' + props.keymap.up).then();
        } else {
            fetch('/api/keyup?key=' + props.keymap.up).then();
        }
    };
    const down = (status) => {
        if (status) {
            fetch('/api/keydown?key=' + props.keymap.down).then();
        } else {
            fetch('/api/keyup?key=' + props.keymap.down).then();
        }
    };
    const left = (status) => {
        if (status) {
            fetch('/api/keydown?key=' + props.keymap.left).then();
        } else {
            fetch('/api/keyup?key=' + props.keymap.left).then();
        }
    };
    const right = (status) => {
        if (status) {
            fetch('/api/keydown?key=' + props.keymap.right).then();
        } else {
            fetch('/api/keyup?key=' + props.keymap.right).then();
        }
    };
    const onEnd = () => {
        if (pos.current.up) {
            // 释放
            pos.current.up = false;
            up(false);
        }
        if (pos.current.down) {
            // 释放
            pos.current.down = false;
            down(false);
        }
        if (pos.current.right) {
            // 释放
            pos.current.right = false;
            right(false);
        }
        if (pos.current.left) {
            // 释放
            pos.current.left = false;
            left(false);
        }
    };
    const draw = () => {
        /** @type {CanvasRenderingContext2D} */
        const ctx = canvas.current?.getContext('2d');
        if (!ctx) {
            return;
        }
        const {width, height} = canvas.current;

        ctx.clearRect(0, 0, width, height);
        const startX = pos.current.touchX;
        const startY = pos.current.touchY;
        const arcRadius = {
            a: btnSize / 6.5,
            b: btnSize / 1.19,
            c: btnSize,
            d: btnSize - ((btnSize - (btnSize / 1.19)) / 2),
            e: (btnSize - (btnSize / 1.19)) / 2,
        };
        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.arc(startX, startY, arcRadius.a,0, Math.PI * 2, false);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(startX, startY, arcRadius.b, 0, Math.PI * 2, false);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(startX, startY, arcRadius.c, 0, Math.PI * 2, false);
        ctx.stroke();
        const r = Math.atan2(pos.current.y - startY, pos.current.x - startX);
        const align = r * (180 / Math.PI);
        const dx = Math.abs(pos.current.x - startX);
        const dy = Math.abs(pos.current.y - startY);
        const d = Math.sqrt(dx * dx + dy * dy);

        const drawAlignArc = (align, r, line) => {
            line = line || {x: arcRadius.d, y: arcRadius.d};
            const x = pos.current.touchX + line.x * Math.cos(align);
            const y = pos.current.touchY + line.y * Math.sin(align);
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2, false);
            ctx.stroke();
        }
        if (pos.current.x === pos.current.touchX && pos.current.y === pos.current.touchY) {

        } else {
            const s = {x: Math.min(dx, arcRadius.d), y: Math.min(dy, arcRadius.d)};
            drawAlignArc(r, arcRadius.e, s);
            drawAlignArc(r, arcRadius.e * 2, s);
        }
        // 定位点
        ctx.strokeStyle = 'green';
        drawAlignArc(-30 / (180 / Math.PI), arcRadius.e);
        drawAlignArc(30 / (180 / Math.PI), arcRadius.e);
        drawAlignArc(-150 / (180 / Math.PI), arcRadius.e);
        drawAlignArc(150 / (180 / Math.PI), arcRadius.e);
        drawAlignArc(70 / (180 / Math.PI), arcRadius.e);
        drawAlignArc(120 / (180 / Math.PI), arcRadius.e);
        drawAlignArc(-60 / (180 / Math.PI), arcRadius.e);
        drawAlignArc(-120 / (180 / Math.PI), arcRadius.e);

        // 判断手指是否在正中央
        console.log(dx, dy, d, align, pos.current, (align <= 60 && align >= 0) || (align <= 0 && align >= -60 ));
        // 判断那些需要按下 右边
        if (d < 16) {
            onEnd();
            return;
        }
        if (dx > arcRadius.c / 2 && ((align <= 60 && align >= 0) || (align <= 0 && align >= -60 ))) {
            if (!pos.current.right) {
                pos.current.right = true;
                right(true);
            }
        } else if (pos.current.right) {
            pos.current.right = false;
            right(false);
        }
        // 判断那些需要按下 左边
        if (dx > arcRadius.c / 2 && (align <= 180 && align >= 120 || align <= -120 && align >= -180)) {
            if (!pos.current.left) {
                pos.current.left = true;
                left(true);
            }
        } else if (pos.current.left) {
            pos.current.left = false;
            left(false);
        }
        // 判断那些需要按下 上
        if (dy > arcRadius.c / 2 && (align <= 90 && align >= 30 || align <= 150 && align >= 90) ) {
            if (!pos.current.down) {
                pos.current.down = true;
                down(true);
            }
        } else if (pos.current.down) {
            pos.current.down = false;
            down(false);
        }
        // 判断那些需要按下 下
        if (dy > arcRadius.c / 2 && (align <= -90 && align >= -180 || align <= -30 && align >= -90 )) {
            if (!pos.current.up) {
                pos.current.up = true;
                up(true);
            }
        } else if (pos.current.up) {
            pos.current.up = false;
            up(false);
        }
    };
    useEffect(() => {
    }, []);

    return (
        <canvas ref={canvas} width={550} height={250}
                onTouchStart={e => {
                    const current = e.touches[0];
                    const {clientTop, offsetTop, scrollTop} = e.currentTarget;
                    pos.current.touchX = current.clientX - getOffsetX(e.currentTarget);
                    pos.current.touchY = current.clientY  - getOffsetY(e.currentTarget);
                    draw();
                }}
                onTouchEnd={ e => {
                    pos.current.x = pos.current.touchX;
                    pos.current.y = pos.current.touchY;
                    draw();
                }}
                onTouchMove={e => {
                    onMove(e);
                    draw();
                }}
        >

        </canvas>)
}

export function MoveKey(props) {
    const {keymap} = props.keymap || {keymap: {}};
    return (<div >
        {props.type !== 'keymap' ?
            <CanvasKey keymap={keymap}/>:
            <><div style={{display: 'flex', justifyContent: 'center'}}>
                <BtnKey btnKey={keymap.up} type={"move"}>
                    <ArrowUpIcon/>
                </BtnKey>
            </div>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <BtnKey btnKey={keymap.left} type={"move"}>
                        <ArrowLeftIcon/>
                    </BtnKey>
                    <BtnKey btnKey={keymap.right} type={"move"}>
                        <ArrowRightIcon/>
                    </BtnKey>
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <BtnKey btnKey={keymap.down} type={"move"}>
                        <ArrowDownIcon/>
                    </BtnKey>
                </div>
            </>}
    </div>);
}