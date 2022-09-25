import {useEffect,useState} from "react";

function ShowImage(props){
    const [image,setImage]=useState("");
    useEffect(()=>{
        fetch(`https://api.tvmaze.com/shows/${props.id}/images`)
        .then((res)=>res.json())
        .then((data)=>setImage(data[0].resolutions.medium.url))
    })

    return <img src={image} alt={props.alt} ></img>
}
export default ShowImage;