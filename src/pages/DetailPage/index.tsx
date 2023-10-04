import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import { Movie } from "../../components/MovieModal/MovieModal.types";

const DetailPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<Movie>();
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`/movie/${movieId}`);
      setMovie(response.data);
    }
    fetchData();
  }, [movieId]);
  if (!movie) return null;
  return (
    <section>
      <img
        className="modal__poster-img"
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt="detail-img"
      />
    </section>
  );
};

export default DetailPage;
