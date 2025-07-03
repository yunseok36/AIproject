import React from "react";
import "./MovieResult.css"; // 기존 CSS 재활용

function MovieResult() {
  // 추천 영화 데이터 예시
  const recommendedMovies = [
    { id: 1, director: "감독명", title: "영화 제목", img: "/images/movie-icon.png" },
    { id: 2, director: "감독명", title: "영화 제목", img: "/images/movie-icon.png" },
    { id: 3, director: "감독명", title: "영화 제목", img: "/images/movie-icon.png" },
  ];

  return (
    <main className="result-main">
      <h1 className="result-title">이런 영화들을 추천드려요.</h1>
      <div className="result-list">
        {recommendedMovies.map(({ id, director, title, img }) => (
          <div key={id} className="result-item">
            <div className="image-wrapper">
              <img src={img} alt={`${director} - ${title}`} className="result-image" />
            </div>
            <div className="song-info">
              <p className="singer">{director}</p>
              <p className="title">{title}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default MovieResult;