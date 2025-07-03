import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Movie.module.css';
import cameraImage from '../image/camera.png';

function Movie() {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("영화 추천받기 버튼 클릭됨");
    // 'movie' type과 '보통' mood를 URL 파라미터로 전달
    navigate('/Loading/movie/보통'); // 여기에 실제 감정 상태를 연결해야 합니다.
  };

  return (
    <div className={styles.movieContainer}>
      <main className={styles.mainContent}>
        <div className={styles.left}>
          <img 
            src={cameraImage} 
            alt="movie" 
            className={styles.movieIcon} 
            style={{ transform: 'scale(1.5)', marginLeft: '30px' }} 
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