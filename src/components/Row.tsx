import React, { useCallback, useState, useEffect } from "react";
import axios from "../api/axios";
import { BASE_URL_w500 } from "../constant";
import MovieModal from "./MovieModal/MovieModal";
import "./Row.css";

export interface MovieData {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title?: string;
  original_language: string;
  original_title?: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  name?: string;
  original_name?: string;
  first_air_date?: string;
  origin_country?: string[];
}

const Row = ({
  title,
  id,
  fetchUrl
}: {
  title: string;
  id: string;
  fetchUrl: string;
}) => {
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState<MovieData>();

  const fetchMovieData = useCallback(async () => {
    const response = await axios.get(fetchUrl);
    setMovies(response.data.results);
  }, [fetchUrl]);

  const handleClick = (movie: MovieData) => {
    setIsModalOpen(true);
    setMovieSelected(movie);
  };

  useEffect(() => {
    // 요청 보내기
    fetchMovieData();
  }, [fetchMovieData]);

  return (
    <div>
      <h2>{title}</h2>
      <div className="slider">
        <div
          className="slider__arrow-left"
          onClick={() => {
            const el = document.getElementById(id);
            if (el) el.scrollLeft -= window.innerWidth - 80;
          }}
        >
          <span className="arrow">{"<"}</span>
        </div>
        <div id={id} className="row__posters">
          {movies.map((movie) => (
            <img
              key={movie.id}
              className="row__poster"
              src={`${BASE_URL_w500}${movie.backdrop_path}`}
              alt={movie.name}
              onClick={() => {
                handleClick(movie);
              }}
            />
          ))}
        </div>
        <div
          className="slider__arrow-right"
          onClick={() => {
            const el = document.getElementById(id);
            if (el) el.scrollLeft += window.innerWidth - 80;
          }}
        >
          <span className="arrow">{">"}</span>
        </div>
      </div>

      {isModalOpen && movieSelected && (
        <MovieModal setIsModalOpen={setIsModalOpen} {...movieSelected} />
      )}
    </div>
  );
};

export default Row;
