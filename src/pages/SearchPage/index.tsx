import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { useDebounce } from "../../hooks/useDebounce";
import "./SearchPage.css";

export interface SearchedMovie {
  adult: boolean;
  backdrop_path?: string;
  id: number;
  title?: string;
  original_language?: string;
  original_title?: string;
  overview?: string;
  poster_path?: string;
  media_type: string;
  genre_ids?: number[];
  popularity: number;
  release_date?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
  name?: string;
  original_name?: string;
  gender?: number;
  known_for_department?: string;
  profile_path: unknown;
  known_for?: unknown[];
  first_air_date?: string;
  origin_country?: string[];
}

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState<SearchedMovie[]>();
  const navigate = useNavigate();
  const useQuery = (key: string) => {
    return new URLSearchParams(useLocation().search).get(key);
  };
  const search = useQuery("q");
  const debouncedSearchTerm = useDebounce(search, 1000);

  const fetchSearchMovie = async (term: string) => {
    try {
      //
      const response = await axios.get(
        `/search/multi?include_adult?false&query=${term}`
      );
      setSearchResults(response.data.results);
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchSearchMovie(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  if (searchResults && searchResults.length > 0)
    return (
      <section className="search-container">
        {searchResults.map((movie) => {
          if (movie.backdrop_path !== null && movie.media_type !== "person") {
            const movieImageUrl =
              "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;

            return (
              <div key={movie.id} className="movie">
                <div
                  onClick={() => navigate(`/${movie.id}`)}
                  className="movie__column-poster"
                >
                  <img
                    src={movieImageUrl}
                    alt={movie.name}
                    className="movie__poster"
                  />
                </div>
              </div>
            );
          }
        })}
      </section>
    );
  else
    return (
      <section className="search-container">
        <div>
          <p>찾고자 하는 검색어 {search}에 맞는 영화가 없습니다.</p>
        </div>
      </section>
    );
};

export default SearchPage;
