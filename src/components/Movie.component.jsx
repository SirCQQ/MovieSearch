import React from 'react'
const IMG_API="https://image.tmdb.org/t/p/w1280"

function Movie({title,poster_path,overview,vote_average}) {
    let color_class="green";
    if(vote_average>6 && vote_average<8){
        color_class="orange";
    }
    if(vote_average<=6){
        color_class="red";
    }
    return (
        <div className="movie">
            <img src={IMG_API+poster_path} alt={`${title} movie `}/>
            <div className="movie_header">
                <h3>{title}</h3>
                <span 
                className={color_class}
                >{vote_average}</span>
            </div>
            <div className="movie_over">
                <h2>Overview:</h2>
                <p>{overview}</p>
            </div>
        </div>

        )
}

export default Movie
