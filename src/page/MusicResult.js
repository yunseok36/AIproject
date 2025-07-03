import React from "react";
import "./MusicResult.css"; // 기존 CSS 재활용

function MusicResult() {
  // 추천 음악 데이터 예시
  const recommendedSongs = [
    { id: 1, singer: "아티스트명", title: "노래 제목", img: "/images/music-icon.png" },
    { id: 2, singer: "아티스트명", title: "노래 제목", img: "/images/music-icon.png" },
    { id: 3, singer: "아티스트명", title: "노래 제목", img: "/images/music-icon.png" },
  ];

  return (
    <main className="result-main">
      <h1 className="result-title">이런 음악들을 추천드려요.</h1>
      <div className="result-list">
        {recommendedSongs.map(({ id, singer, title, img }) => (
          <div key={id} className="result-item">
            <div className="image-wrapper">
              <img src={img} alt={`${singer} - ${title}`} className="result-image" />
            </div>
            <div className="song-info">
              <p className="singer">{singer}</p>
              <p className="title">{title}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default MusicResult;