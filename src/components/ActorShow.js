import "../App.css";

import ShowCard from "./ShowCard";
import { useNavigate,useParams } from "react-router-dom";
import { useEffect, useState } from "react";
function ActorShow(props){
  const navigate = useNavigate();
  let { id } = useParams();
  const [actorShowList, setActorShowList] = useState([]);
  async function getTheActorShow(searchTerm){
    const response = await fetch(`https://api.tvmaze.com/people/${searchTerm}/castcredits?embed=show`);
   const data = await response.json();
   setActorShowList(data);
  
  }
  useEffect(()=>{
      getTheActorShow(id);
  },[actorShowList])
   
    return actorShowList.map((showObj) => {
        return (
          <>
            <ShowCard key={showObj._embedded.show.id}  id={showObj._embedded.show.id}
        
        name={showObj._embedded.show.name} rating={showObj._embedded.show.rating.average}/>
          </>
        );
      })
  
}
export default ActorShow;