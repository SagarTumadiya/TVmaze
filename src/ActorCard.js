import "./App.css";

import ActorImage from "./ActorImage";
import { useEffect, useState } from "react";
function ShowCard(props){
    const [mouse,setMouse]=useState(false);
    return  <div onMouseOver={()=>setMouse(true)} onMouseOut={()=>setMouse(false)} key={props.id} className={mouse?"onMouse":"card"}>
   <ActorImage
                 key={props.id}
                id={props.id}
                alt={props.name}
              />
              <h3>{props.name}</h3>
              <p>{props.gender}</p>
  </div>
}
export default ShowCard;