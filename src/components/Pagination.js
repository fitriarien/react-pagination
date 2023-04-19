import React from 'react';

const Pagination = ({ totalPages, setPageNumber, pageNumber, displayPages, prevStartPage, setPrevStartPage }) => {

  const startPageTemp = Math.max(1, pageNumber-displayPages+1);
  let startPage; // fixed displayed start page

  if (prevStartPage > startPageTemp) {
    startPage = prevStartPage;
     
    if (pageNumber < startPage) {
      startPage = pageNumber;
    }
  } else {
    startPage = startPageTemp;
  }

  const pages = Array.from(Array(displayPages), (el, i) => startPage + i);
  setPrevStartPage(startPage); // set previous start page for the next conditional start page

  return (
    <div>
      <ul className='containerPagination'>
        <button 
          disabled={pageNumber === 1} 
          onClick={() => setPageNumber(1)}
        >
          {"<<"}
        </button>
        <button 
          disabled={pageNumber === 1} 
          onClick={() => setPageNumber(pageNumber-1)}
        >
          {"<"}
        </button>
        {startPage !== 1 && (<h4>. . .</h4>)}
        {pages.map((page) => (
          <li 
            key={page}
            className={`pagination ${pageNumber === page && 'active'}`} 
            onClick={() => setPageNumber(page)}
          >
            {page}
          </li>
        ))}
        {Math.max(...pages) !== totalPages && (<h4>. . .</h4>)}
        <button 
          disabled={pageNumber >= totalPages} 
          onClick={() => setPageNumber(pageNumber+1)}
        >
          {">"}
        </button>
        <button 
          disabled={pageNumber >= totalPages} 
          onClick={() => setPageNumber(totalPages)}
        >
          {">>"}
        </button>
      </ul>
    </div>
  );
}

export default Pagination;
