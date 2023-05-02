import React from "react"
import s from "./PopOut.module.css"

const PopOut=(props)=>{
    return (props.trigger)?(<div className={s.popOut}>
        <div className={s.innerPop}>
            <button onClick={()=>{props.setTrigger(false)}}>X</button>
            {props.children}
        </div>
    </div>):""
}
export default PopOut