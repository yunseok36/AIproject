import { useNavigate } from 'react-router-dom'; // Home.jsx에서 가져옴
import styles from './Movie.module.css';

function Movie() {
  const navigate = useNavigate(); // Home.jsx에서 가져옴

  const handleClick = () => { // Home.jsx에서 가져옴
    navigate('/loading'); // 이 경로가 App.js에 정의되어 있지 않다면 문제가 될 수 있습니다.
                          // App.js의 라우팅에 맞게 수정해야 합니다.
  };

  return (
    // Home.jsx의 mainContent 부분을 가져옴
    <div className={styles.movieContainer}> {/* 클래스 이름 변경 */}
      <main className={styles.mainContent}>
        <div className={styles.left}>
          {/* assets/earphones.png 경로는 public 폴더에 있어야 합니다. */}
          <img src="/assets/movie.png" alt="movie" className={styles.movie} /> 
        </div>

        <div className={styles.right}>
          <h1>Shall I recommend<br />your own movie?</h1>
          <h2>감정이 머무는 곳, 그곳에 당신만의 영화가 있습니다</h2>
          <p className={styles.description}>
            AI가 당신의 감정을 분석해,<br />
            기분에 맞는 영화 장르와 추천 리스트를 제공합니다.<br />
            오늘의 감정, 한 편의 영화로 감싸보세요.<br />
          </p>
          <button className={styles.recommendButton} onClick={handleClick}>
            영화 추천받기
          </button>
        </div>
      </main>
    </div>
  );
}

export default Movie;