import React, { useEffect, useState } from "react";
import "./MusicResult.css";

// 3개 랜덤 추출 함수
const getRandomItems = (arr, count) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

function MusicResult() {
  const [recommendedSongs, setRecommendedSongs] = useState([]);
  const [todayLabel, setTodayLabel] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    fetch(`http://localhost:4000/api/emotion?email=${encodeURIComponent(user.email)}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data.emotions)) {
          const todayStr = new Date().toISOString().slice(0, 10);
          const today = data.emotions.find(e => e.date && e.date.slice(0,10) === todayStr);
          if (today && Array.isArray(today.recommendations?.music)) {
            setTodayLabel(today.label);
            
            // 추천 음악에 유튜브 링크 추가 (서버에서 제공하지 않는 경우)
            const songsWithYoutubeLinks = today.recommendations.music.map(song => {
              // 이미 youtubeLink가 있으면 그대로 사용, 없으면 기본 검색 링크 생성
              if (!song.youtubeLink) {
                const searchQuery = encodeURIComponent(`${song.name} ${song.title} official`);
                song.youtubeLink = `https://www.youtube.com/results?search_query=${searchQuery}`;
              }
              return song;
            });
            
            setRecommendedSongs(getRandomItems(songsWithYoutubeLinks, 3));
          }
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>로딩중...</div>;

  return (
    <main className="result-main">
      <h1 className="result-title">
        {todayLabel
          ? `오늘 감정(${todayLabel})에 어울리는 음악을 추천드려요.`
          : "오늘 진단한 감정에 어울리는 음악 추천"}
      </h1>
      <div className="result-list">
        {recommendedSongs.length > 0 ? (
          recommendedSongs.map((song, index) => (
            <div key={index} className="result-item">
              <div className="image-wrapper">
                {/* 앨범 이미지에 유튜브 링크 추가 */}
                <a 
                  href={song.youtubeLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  title={`${song.name} - ${song.title} 유튜브에서 듣기`}
                >
                  <img
                    src={song.image}
                    alt={`${song.name} - ${song.title} 앨범 커버`}
                    className="result-image"
                  />
                </a>
              </div>
              <div className="song-info">
                <p className="singer">{song.name}</p>
                <p className="title">{song.title}</p>
                {song.year && <p className="year">({song.year})</p>}
              </div>
            </div>
          ))
        ) : (
          <p>오늘 감정 진단을 먼저 해주세요!</p>
        )}
      </div>
    </main>
  );
}

export default MusicResult;