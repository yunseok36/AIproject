import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Music.module.css';
import earphonesImage from '../image/earphones.png'; // 이미지 import 추가

function Music() {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("음악 추천받기 버튼 클릭됨");
    // URL 파라미터로 'music' 전달
    navigate('/Loading/music');
  };

  return (
    <div className={styles.musicContainer}>
      <main className={styles.mainContent}>
        <div className={styles.left}>
          <img 
            src={earphonesImage} // import한 변수 사용
            alt="earphones" 
            className={styles.earphones} 
          />
        </div>

        <div className={styles.right}>
          <h1>Would you listen to<br /> your own music?</h1>
          <h2>당신의 감정에 딱 맞는 음악, 들어볼래요?</h2>
          <p className={styles.description}>
            AI가 현재 감정을 분석하여 상황에 맞는 음악을 추천해드립니다.<br />
            추천받은 음악을 통해 나만의 사운드트랙을 만나보세요.
          </p>
          <button className={styles.recommendButton} onClick={handleClick}>
            음악 추천받기
          </button>
        </div>
      </main>
    </div>
  );
}

export default Music;