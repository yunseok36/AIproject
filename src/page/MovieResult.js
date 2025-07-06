import React, { useEffect, useState } from "react";

function getRandomItems(arr, count) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function MovieResult() {
  const [movies, setMovies] = useState([]);
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
          // 💡 반드시 today.recommendations.movie 확인!
          if (today && Array.isArray(today.recommendations?.movie)) {
            setTodayLabel(today.label);
            setMovies(getRandomItems(today.recommendations.movie, 3));
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
          ? `오늘 감정(${todayLabel})에 어울리는 영화 추천`
          : "오늘 진단한 감정에 어울리는 영화 추천"}
      </h1>
      {movies.length > 0 ? (
        <div className="result-list">
          {movies.map((movie, idx) => (
            <div key={idx} className="result-item">
              <div className="image-wrapper">
                <img src={movie.image} alt={movie.title} className="result-image" />
              </div>
              <div className="song-info">
                <p className="singer">{movie.director}</p>
                <p className="title">{movie.title}</p>
                {movie.year && <p className="year">({movie.year})</p>}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>오늘 감정 진단을 먼저 해주세요!</p>
      )}
    </main>
  );
}

export default MovieResult;
