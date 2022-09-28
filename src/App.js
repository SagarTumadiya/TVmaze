import "./App.css";
import { useEffect, useState } from "react";
import ActorCard from "./components/ActorCard"
import ShowCard from "./components/ShowCard";
import ActorShow from "./components/ActorShow";
import { Link, Navigate, NavLink, redirect, Route, Routes } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
function App() {
  const [searchItem, setSearchItem] = useState("");
  const [showList, setShowList] = useState([]);
  const [actorList, setActorList] = useState([]);
  
  const [checked, setChecked] = useState({ Actor: false, Shows: false });
  const navigate = useNavigate();
  function handleChange(e) {
    const val = e.target.value;
    console.log("value", val, e);
    setSearchItem(val);
  }

  async function getTheMovies(searchTerm) {
    
    
    const response = await fetch(`https://api.tvmaze.com/search/shows?q=${searchTerm}`);
        const data = await response.json();
        
        setShowList(data);
        navigate('/Show')
    
  }

 async function getTheActor(searchTerm) {
  
   const response = await fetch(`https://api.tvmaze.com/search/people?q=${searchTerm}`);
   const data = await response.json();
   setActorList(data);
   navigate('/Actor')
   
  }
 
  useEffect(() => {
      
      (async ()=>{
        if(checked.Shows === true) 
        await getTheMovies(searchItem);
        else if(checked.Actor === true)  
        await getTheActor(searchItem);
        else  navigate('/')
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
      <Routes>
                
                {/* basic example */}
                
                
                
                <Route path="/Show" element={<div className="container">{displayShowUi()}</div>}/>
                <Route path="/Actor" element={<div className="container">{displayActorUi()}</div>}/>
                <Route path="/Actor/:id" element={<div className="container">{<ActorShow/>}</div>}/>
                
               
                {/* <Route path="/birds" element={<Bird />} >
                    <Route path=":birdId" element={<Parrot />}></Route>
                    <Route path="edit" element={<EditBirdPage />}></Route>
                </Route> */}

                {/* for path not matching */}
                <Route path="*" element={<p>No results found</p>}/>
                
            </Routes>
      
    </>
  );
}

export default App;
