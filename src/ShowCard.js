import "./App.css";
import ShowImage from "./ShowImage";

import { useEffect, useState } from "react";
function ShowCard(props){
    const [mouse,setMouse]=useState(false);
    return  <div onMouseOver={()=>setMouse(true)} onMouseOut={()=>setMouse(false)} key={props.id} className={mouse?"onMouse":"card"}>
    <ShowImage className="car-image"
      id={props.id}
      key={props.id}
      alt={props.name}
    />
    <h3>{props.name}</h3>
    <div><img alt="star" src="https://img.icons8.com/emoji/15/FFFFFF/star-emoji.png"/>{props.rating}</div>
    
  </div>
}
export default ShowCard;