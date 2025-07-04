import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { movieRecommendations } from "../data/recommendationData";
import "./MovieResult.css";

// 3개의 랜덤 아이템을 선택하는 유틸리티 함수
const getRandomItems = (arr, count) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

function MovieResult() {
  const { mood } = useParams(); // URL에서 mood 파라미터 가져오기
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  
  useEffect(() => {
    const moviesForMood = movieRecommendations[mood] || []; // 해당 mood의 영화 목록 가져오기
    setRecommendedMovies(getRandomItems(moviesForMood, 3)); // 3개 랜덤 선택
  }, [mood]); // mood가 변경될 때마다 다시 선택

  return (
    <main className="result-main">
      <h1 className="result-title">당신의 {mood} 감정에 어울리는 영화를 추천드려요.</h1>
      <div className="result-list">
        {recommendedMovies.length > 0 ? (
          recommendedMovies.map((movie, index) => (
            <div key={index} className="result-item">
              <div className="image-wrapper">
                <img 
                  src={movie.image} // recommendationData.js에서 가져온 이미지 사용
                  alt={`${movie.title} 포스터`} 
                  className="result-image"
                />
              </div>
              <div className="song-info">
                <p className="singer">{movie.director || '감독 정보 없음'}</p>
                <p className="title">{movie.title}</p>
                {movie.year && <p className="year">({movie.year})</p>}
              </div>
            </div>
          ))
        ) : (
          <p>추천할 영화가 없습니다.</p>
        )}
      </div>
    </main>
  );
}

export default MovieResult;