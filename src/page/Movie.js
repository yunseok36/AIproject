import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Movie.module.css'; // 영화 페이지용 CSS
import cameraImage from '../image/camera.png'; // 카메라 이미지 import 추가

function Movie() {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("영화 추천받기 버튼 클릭됨");
    // URL 파라미터로 'movie' 전달
    navigate('/Loading/movie');
  };

  return (
    <div className={styles.movieContainer}>
      <main className={styles.mainContent}>
        <div className={styles.left}>
          <img 
            src={cameraImage} // import한 변수 사용
            alt="movie" 
            className={styles.movieIcon} 
            style={{ transform: 'scale(1.5)' }} // 1.5배 확대 인라인 스타일 추가
          />
        </div>

        <div className={styles.right}>
          <h1>Would you watch<br /> your own movie?</h1>
          <h2>당신의 감정에 딱 맞는 영화, 보러 갈래요?</h2>
          <p className={styles.description}>
            AI가 현재 감정을 분석하여 상황에 맞는 영화를 추천해드립니다.<br />
            추천받은 영화를 통해 나만의 시네마를 만나보세요.
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