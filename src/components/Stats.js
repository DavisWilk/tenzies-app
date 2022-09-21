import React from "react"

export default function Stats(props){
    return (
        <div className="stats">
            <h2>Rolls: {props.rollCount}</h2>
            <h2>Time: {props.time}s</h2>
        </div>
    )
}