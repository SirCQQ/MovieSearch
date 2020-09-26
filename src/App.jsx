import React,{useEffect,useState} from 'react';
import './App.css';
import Movie from "./components/Movie.component"
import {API_KEY} from "./constns"

// console.log(API_KEY)
function App() {
  const setBubble=({left,top,width,height})=>{
    bubbleRef.current.style.setProperty("left",`${left}px`)
    bubbleRef.current.style.setProperty("top",`${top}px`)
    bubbleRef.current.style.setProperty("width",`${width}px`)
    bubbleRef.current.style.setProperty("height",`${height}px`)
  }
  const [type,setType]=useState("movie")
  const bubbleRef=React.useRef();
  const [movies,setMovie]=useState([])
  const [search,setSearch]=useState("")
  const SEARCH_API=`https://api.themoviedb.org/3/search/${type}?&api_key=${API_KEY}&query=`
  // const MOVIE_API=`https://api.themoviedb.org/3/discover/${type}?sort_by=popularity.desc&api_key=${API_KEY}&page=1`
  const MOVIE_API=`https://api.themoviedb.org/3/trending/${type}/week?api_key=${API_KEY}&page=1`
  console.log(MOVIE_API)
  useEffect(()=>{ 
    searchMovies(MOVIE_API)

  },[])
  let lis=document.querySelectorAll("li");
  console.log(bubbleRef.current)
  if(bubbleRef.current && !bubbleRef.current.style.getPropertyValue("top")){
    let cords=lis[0].getBoundingClientRect();
    let directions={
        left:cords.left,
        top:cords.top,
        width:cords.width,
        height:cords.height,
    }
    setBubble(directions);
}
  const searchMovies=(API)=>{
    fetch(API)
    .then(resp=>resp.json())
    .then(resp=>{
      setMovie(resp.results)
      setSearch("");
    })
  }


  const  onSubmit=(e)=>{
    e.preventDefault();
    if(search!==""){
      searchMovies(SEARCH_API+search)
    
  }
  }
  
  const onChange=(e)=>{
    setSearch(e.target.value);
    console.log(search)
  }


const moveBubble=(e)=>{
  const cords=e.target.getBoundingClientRect()
  const directions={
    height:cords.height,
    width:cords.width,
    left:cords.left,  
    top:cords.top,
  }
  setBubble(directions)
}



  const handleOnLinkClick=(e)=>{
    console.log(e.target.innerText.toLowerCase())
    setType(e.target.innerText.toLowerCase())
    moveBubble(e);
    searchMovies(MOVIE_API)

  }
  return (
    <div className="App">
      <header>
        <ul>
          {/* <li onClick={(e)=>{handleOnLinkClick(e)}} name="all">All</li> */}
          <li onClick={(e)=>{handleOnLinkClick(e)}} name="movie">
           Movie</li>
          <li onClick={(e)=>{handleOnLinkClick(e)}} name="tv">
           TV</li>
          <div ref={bubbleRef} className="bubble"></div>
        </ul>
        <form onSubmit={onSubmit}>

        <input className="search" 
        placeholder="Search a movie"
        type="text"
        value={search}
        onChange={onChange}
        />
        </form>
        </header>
      <div  className="movie_list">
      {movies.length>0 &&
      movies.map(movie=>{
        return <Movie {...movie} key={movie.id}/>
      })}
      {/* {console.log(movies)} */}
      </div>
    </div>
  );
}

export default App;
