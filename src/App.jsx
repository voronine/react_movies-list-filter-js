import './App.scss';
import React, { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import moviesFromServer from './api/movies.json';

// import cn from 'className';

function getPreparedMovies(movies, { lowerQuery }) {
  let preparedMovies = [...movies];

  if (lowerQuery) {
    preparedMovies = preparedMovies
      .filter(movie => movie.description
        .toLowerCase()
        .includes(lowerQuery)
        || movie.title
          .toLowerCase()
          .includes(lowerQuery));
  }

  return preparedMovies;
}

export const App = () => {
  const [query, setQuery] = useState('');
  const lowerQuery = query.toLowerCase().trim();

  const visibleMovies = getPreparedMovies(moviesFromServer, { lowerQuery });

  return (
    <div className="page">
      <div className="page-content">

        <div className="box">
          <div className="field">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="search-query" className="label">
              Search movie
            </label>

            <div className="control">
              <input
                value={query}
                type="text"
                id="search-query"
                className="input"
                placeholder="Type search word"
                onChange={(event) => {
                  setQuery(event.currentTarget.value);
                }}
              />
            </div>
          </div>
        </div>

        <MoviesList movies={visibleMovies} />
      </div>

      <div className="sidebar">
        Sidebar goes here
      </div>
    </div>
  );
};
