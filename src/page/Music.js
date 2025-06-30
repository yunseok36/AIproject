import React from 'react';
import { useNavigate } from 'react-router-dom'; // Home.jsx에서 가져옴
import styles from './Home.module.css'; // Music.css 대신 Music.module.css를 사용하거나, Music.css에 Home.module.css 내용 추가

// 만약 Home.module.css가 Music.module.css와 이름이 다르다면,
// Home.module.css의 내용을 Music.css에 복사하거나,
// Music.module.css 파일을 새로 만들고 Home.module.css의 내용을 복사해야 합니다.

function Music() {
  const navigate = useNavigate(); // Home.jsx에서 가져옴

  const handleClick = () => { // Home.jsx에서 가져옴
    navigate('/loading'); // 이 경로가 App.js에 정의되어 있지 않다면 문제가 될 수 있습니다.
                          // App.js의 라우팅에 맞게 수정해야 합니다.
  };

  return (
    // Home.jsx의 mainContent 부분을 가져옴
    <div className={styles.musicContainer}> {/* 클래스 이름 변경 */}
      <main className={styles.mainContent}>
        <div className={styles.left}>
          {/* assets/earphones.png 경로는 public 폴더에 있어야 합니다. */}
          <img src="/assets/earphones.png" alt="earphones" className={styles.earphones} />
          <button className={styles.recommendButton} onClick={handleClick}>
            음악 추천받기 →
          </button>
          <p className={styles.description}>
            AI가 현재 감정을 분석해,<br />
            기쁨, 위로, 집중 등 상황에 맞는 음악을 추천해드립니다.<br />
            나만을 위한 사운드트랙을 만나보세요.
          </p>
        </div>

        <div className={styles.right}>
          <h1>Would you like to<br />listen to music?</h1>
          <h2>“당신의 감정에 딱 맞는 음악,<br />들어볼래요?”</h2>
        </div>
      </main>
    </div>
  );
}

export default Music;