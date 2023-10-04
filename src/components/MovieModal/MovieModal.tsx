import React, { useRef } from "react";
import { BASE_URL_ORIGIN } from "../../constant";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { MovieData } from "../Row";
import "./MovieModal.css";

const MovieModal = ({
  setIsModalOpen,
  backdrop_path,
  title,
  name,
  overview,
  release_date,
  first_air_date,
  vote_average
}: {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
} & MovieData) => {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => {
    setIsModalOpen(false);
  });

  return (
    <div className="presentation" role="presentation">
      <div className="wrapper-modal">
        <div className="modal" ref={ref}>
          <span
            className="modal-close"
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            X
          </span>
          <img
            className="modal__poster-img"
            src={`${BASE_URL_ORIGIN}${backdrop_path}`}
            alt=""
          />
          <div className="modal__content">
            <p className="movie__details">
              <span>100% for you</span>{" "}
              {release_date ? release_date : first_air_date}
            </p>
            <h2 className="modal__title">{title ? title : name}</h2>
            <p className="modal__overview">평점: {vote_average}</p>
            <p className="modal__overview">{overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
