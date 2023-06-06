import React from "react";

const CardText = ({ text,type,color }) => {
    return (
        <div
        style={{backgroundImage:color ? color : " linear-gradient(to right bottom, rgb(228, 64, 92), purple)"}}
         className="cardCanvas">
            {type === "trending" &&  <p>{text}</p> }
            {type === "posts" &&  <h3>{text}</h3> }
            </div>
    )
}
export default CardText