import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Music.module.css';
import earphonesImage from '../image/earphone.png';

function Music() {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("음악 추천받기 버튼 클릭됨");
    // 'music' type과 '긍정적' mood를 URL 파라미터로 전달
    navigate('/Loading/music/긍정적'); // 여기에 실제 감정 상태를 연결해야 합니다.
  };

  return (
    <div className={styles.musicContainer}>
      <main className={styles.mainContent}>
        <div className={styles.left}>
          <img 
            src={earphonesImage} 
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