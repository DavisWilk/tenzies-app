import React from "react"

const Pip = () => <span className="pip" />;

const Face = ({ children }) => <div className="face">{children}</div>;

export default function Die(props){

    let pips = Number.isInteger(props.value)
		? Array(props.value)
				.fill(0)
				.map((_, i) => <Pip key={i} />)
		: null;

    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    return (
        <div className="die" style={styles} onClick={props.holdDice}>
            <Face className="die">{pips}</Face>
        </div>
        
    )

} 