import React, {useState, useEffect} from 'react';
import Pagination from '../components/Pagination';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [prevStartPage, setPrevStartPage] = useState(1);
  const displayPages = 10;
  
  const fetchMovies = async () => {
    const response = await fetch(`http://localhost:8080/api/imdb?page=${pageNumber-1}&size=10`)
    if (response.status === 200) {
      const { content, totalPages } = await response.json();
      setMovies(content);
      setTotalPages(totalPages);
    } else {
      throw new Error("Something wrong while fetching");
    }
  }

  useEffect(() => {
    fetchMovies();
  }, [pageNumber]);

  return (
    <div className='container'>
      <div className='container-cards'>
        { movies.map(movie => (
          <div key={movie.id} className='card-detail'>
            <img src={movie.image} className='card-image' alt={""}/>
            <div className='content'>
              <h5>{movie.title} ({movie.year})</h5>
              <p>Rating: {movie.rating}/10</p>
            </div>
          </div>
        ))}
      </div>
      <Pagination 
        totalPages={totalPages}
        setPageNumber={setPageNumber}
        pageNumber={pageNumber}
        displayPages={displayPages}
        prevStartPage={prevStartPage}
        setPrevStartPage={setPrevStartPage}
      />
    </div>
  );
}

export default Movies;
