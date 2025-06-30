import React, { useState } from 'react';
import './MyPage.css';

function MyPage() {
  const [activeTab, setActiveTab] = useState('music');

  const musicList = [
    {
      title: "Personal",
      artist: "Emotional Oranges",
      img: "https://i.scdn.co/image/ab67616d0000b273bc94d67b6050301567f7e0a7",
      link: "#"
    },
    {
      title: "Pink + White",
      artist: "Frank Ocean",
      img: "https://upload.wikimedia.org/wikipedia/en/a/a0/Blonde_-_Frank_Ocean.jpeg",
      link: "#"
    },
    {
      title: "Like Him",
      artist: "Tyler, The Creator",
      img: "https://i1.sndcdn.com/artworks-000233857417-5uhx9f-t500x500.jpg",
      link: "#"
    }
  ];

  const renderContent = () => {
    if (activeTab === 'music') {
      return musicList.map((item, index) => (
        <div className="music-item" key={index}>
          <img src={item.img} alt={item.title} className="music-img" />
          <div className="music-info">
            <div className="music-title">{item.title}</div>
            <div className="music-artist">{item.artist}</div>
          </div>
          <a href={item.link} className="listen-btn">음악 듣기</a>
        </div>
      ));
    } else {
      return <p style={{ color: '#777' }}>콘텐츠 준비중입니다.</p>;
    }
  };

  return (
    <div className="Page-Design-MyMood">
      <div className="sidebar">
        <h1 className="page-title">My Page</h1>
        <div className="profile">
          <img src="https://i.ibb.co/5TKD4bp/profile.png" alt="profile" className="profile-img" />
          <div className="username">이재희</div>
          <button className="button">프로필 수정</button>
        </div>
        <div className="today-emotion">
          <div className="label">오늘의 감정</div>
          <div className="emoji">😊</div>
          <div className="date">2025.06.24</div>
        </div>
        <button className="button">로그아웃</button>
      </div>

      <div className="content">
        
        <div className="tabs">
          <div
            className={`tab ${activeTab === 'music' ? 'active' : ''}`}
            onClick={() => setActiveTab('music')}
          >음악</div>
          <div
            className={`tab ${activeTab === 'movie' ? 'active' : ''}`}
            onClick={() => setActiveTab('movie')}
          >영화</div>
          <div
            className={`tab ${activeTab === 'drama' ? 'active' : ''}`}
            onClick={() => setActiveTab('drama')}
          >드라마</div>
        </div>

        <div className="tab-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default MyPage;