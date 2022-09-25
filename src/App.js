import "./App.css";
import { useEffect, useState } from "react";
import ActorCard from "./ActorCard"
import ShowCard from "./ShowCard";
import ActorImage from "./ActorImage";
import TextField from "@mui/material/TextField";
function App() {
  const [searchItem, setSearchItem] = useState("");
  const [showList, setShowList] = useState([]);
  const [actorList, setActorList] = useState([]);
 
  const [checked, setChecked] = useState({ Actor: false, Shows: false });
  
  function handleChange(e) {
    const val = e.target.value;
    console.log("value", val, e);
    setSearchItem(val);
  }

  async function getTheMovies(searchTerm) {
    
    setActorList([])
    const response = await fetch(`https://api.tvmaze.com/search/shows?q=${searchTerm}`);
        const data = await response.json();
        
        setShowList(data);
    // fetch(`https://api.tvmaze.com/search/shows?q=${searchTerm}`)
    // .then((res)=>res.json())
    // .then((data)=>setShowList(data))
  }

 async function getTheActor(searchTerm) {
   setShowList([])
   const response = await fetch(`https://api.tvmaze.com/search/people?q=${searchTerm}`);
   const data = await response.json();
   setActorList(data)
   
    // fetch(`https://api.tvmaze.com/search/people?q=${searchTerm}`)
    // .then((res)=>res.json())
    // .then((data)=>setActorList(data))
  }
  useEffect(() => {
      (async ()=>{
        if(checked.Shows === true) 
        await getTheMovies(searchItem);
        else if(checked.Actor === true)  
        await getTheActor(searchItem);
      })();
     
   
  },[checked,searchItem]);
 
  
  function displayShowUi() {
    return (
    
    showList.map((showObj) => {
        
       
        return (
          <>
            <ShowCard key={showObj.show.id}  id={showObj.show.id}
      
               name={showObj.show.name} rating={showObj.show.rating.average}/>
            
            
          </>
        );
      })
    );
  }
  function displayActorUi() {
    return (
      actorList.map((showObj) => {
        return (
          <>
            <ActorCard  key={showObj.person.id}  id={showObj.person.id} name={showObj.person.name} gender={showObj.person.gender}/>
           
          </>
        );
      })
    );
  }

  function changeRadio(e){
    setChecked(() => {
      return {
        Actor: false,
        Shows: false,
        [e.target.value]: true,
      };
    });
  };

  return (
    <>
      <div className="landing">
        <div className="landing-inside">
          <h1>Enter the TV show name Or Actor name</h1>

          <label>
            <input
              type="radio"
              checked={checked.Actor}
              value="Actor"
              name="choice"
              onChange={changeRadio}
            />
            Actor
          </label>

          <label>
            <input
              type="radio"
              checked={checked.Shows}
              value="Shows"
              name="choice"
              onChange={changeRadio}
            />
            Shows
          </label>
          <br></br>

          <TextField
            id="outlined-basic"
            style={{ margin: "20px" }}
            onChange={handleChange}
            type={"text"}
            value={searchItem}
            label="eg:Friends"
            variant="outlined"
          />
        </div>
      </div>

      {/* result list */}
      <div className="container">
        {displayShowUi().length ? (
          displayShowUi()
        ) :( displayActorUi().length ? (
          displayActorUi()
        ) : (
          <>No results found</>
        ))}
       
      </div>
    </>
  );
}

export default App;
