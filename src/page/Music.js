import React from 'react';
import { useNavigate } from 'react-router-dom'; // Home.jsx에서 가져옴
import styles from './Music.module.css';

function Music() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('./page/Loading');
  };

  return (
    // Home.jsx의 mainContent 부분을 가져옴
    <div className={styles.musicContainer}> {/* 클래스 이름 변경 */}
      <main className={styles.mainContent}>
        <div className={styles.left}>
          {/* assets/earphones.png 경로는 public 폴더에 있어야 합니다. */}
          <img src="/assets/earphones.png" alt="earphones" className={styles.earphones} /> 
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