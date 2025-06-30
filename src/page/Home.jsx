import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/loading');
  };

  return (
    <div className={styles.homeContainer}>
      <header className={styles.nav}>
        <div className={styles.logo}>MOODI-TREE</div>
        <nav>
          <ul>
            <li>ABOUT</li>
            <li>MOOD CHECK</li>
            <li>MY MOOD</li>
            <li>CONTACT</li>
            <li><button className={styles.login}>LOGIN</button></li>
          </ul>
        </nav>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.left}>
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
};

export default Home;
