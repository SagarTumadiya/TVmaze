import "../App.css";

import ActorImage from "./ActorImage";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
function ShowCard(props){
  const navigate = useNavigate();
 
  
    const [mouse,setMouse]=useState(false);
    return  <div onClick={()=>{navigate(`/Actor/${props.id}`);console.log(props.id)}} onMouseOver={()=>setMouse(true)} onMouseOut={()=>setMouse(false)} key={props.id} className={mouse?"onMouse":"card"}>
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