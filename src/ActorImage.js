import {useEffect,useState} from "react";
function ActorImage(props){
    const [image,setImage]=useState({});
    useEffect(()=>{
        
        fetch(`https://api.tvmaze.com/people/${props.id}`)
        .then((res)=>res.json())
        .then((data)=>setImage(data.image.medium))
        .catch((err) => {
            console.error(err);
          });
    })
    return <img src={image} alt={props.alt}></img>
}
export default ActorImage;