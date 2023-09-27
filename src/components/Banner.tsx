import React, { useEffect, useState } from "react";
import "./Banner.css";
import axios from "../api/axios";
import requests from "../api/requests";
import { MovieDetails } from "./Banner.types";
import styled from "styled-components";

const Banner = () => {
  const [movie, setMovie] = useState<MovieDetails>();
  const [isClicked, setIsClicked] = useState(false);

  const fetchData = async () => {
    // 현재 상영중인 영화 정보를 가져오기
    const response = await axios.get(requests.fetchNowPlaying);

    // 여러 영화중 영화 하나의 ID를 가져오기
    const movieId =
      response.data.results[
        Math.floor(Math.random() * response.data.results.length)
      ].id;

    // 특정 영화의 더 상세한 정보를 가져오기
    const { data: movieDetail } = await axios.get(`/movie/${movieId}`, {
      params: { append_to_response: "videos" }
    });
    setMovie(movieDetail);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!movie) {
    return <div>Loading..</div>;
  }

  if (isClicked) {
    return (
      <>
        <Container>
          <HomeContainer>
            <Iframe
              src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1`}
            ></Iframe>
          </HomeContainer>
        </Container>
        <button
          onClick={() => {
            setIsClicked(false);
          }}
        >
          X
        </button>
      </>
    );
  } else {
    return (
      <header
        className="banner"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`,
          backgroundPosition: "top center",
          backgroundSize: "cover"
        }}
      >
        <div className="banner__contents">
          <h1 className="banner__title">
            {movie.title || movie.name || movie.original_name}
          </h1>
          <div className="banner__buttons">
            {movie.videos?.results[0]?.key && (
              <button
                className="banner__button play"
                onClick={() => {
                  setIsClicked(true);
                }}
              >
                Play
              </button>
            )}
          </div>
          <p className="banner__description">{movie.overview}</p>
        </div>
      </header>
    );
  }
};

export default Banner;

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding-top: 56.25%;
`;

const HomeContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;
