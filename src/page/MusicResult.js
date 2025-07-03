import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { songRecommendations } from "../data/recommendationData"; // 데이터 import
import "./MusicResult.css"; // MusicResult 전용 CSS

// 3개의 랜덤 아이템을 선택하는 유틸리티 함수
const getRandomItems = (arr, count) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

function MusicResult() {
  const { mood } = useParams(); // URL에서 mood 파라미터 가져오기
  const [recommendedSongs, setRecommendedSongs] = useState([]);
  
  useEffect(() => {
    const songsForMood = songRecommendations[mood] || []; // 해당 mood의 노래 목록 가져오기
    setRecommendedSongs(getRandomItems(songsForMood, 3)); // 3개 랜덤 선택
  }, [mood]); // mood가 변경될 때마다 다시 선택

  return (
    <main className="result-main">
      <h1 className="result-title">당신의 {mood} 감정에 어울리는 음악을 추천드려요.</h1>
      <div className="result-list">
        {recommendedSongs.length > 0 ? (
          recommendedSongs.map((song, index) => (
            <div key={index} className="result-item">
              <div className="image-wrapper">
                {/* 음악 아이콘 이미지 (public 폴더에 music-icon.png가 있다고 가정) */}
                <img src="/images/music-icon.png" alt="Music Icon" className="result-image" />
              </div>
              <div className="song-info">
                <p className="singer">{song.name}</p>
                <p className="title">{song.title}</p>
                {song.year && <p className="year">({song.year})</p>}
              </div>
            </div>
          ))
        ) : (
          <p>추천할 음악이 없습니다.</p>
        )}
      </div>
    </main>
  );
}

export default MusicResult;