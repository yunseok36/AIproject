import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCalendarStore from '../store/calendarStore';
import './MyPage.css';

function MyPage() {
  const [activeTab, setActiveTab] = useState('music');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // 캘린더 스토어에서 감정 데이터 가져오기
  const { emotionMap } = useCalendarStore();

  // 오늘 날짜 관련 데이터
  const today = new Date();
  const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const todayEmotion = emotionMap[todayKey] || "😊";
  const todayString = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, "0")}.${String(today.getDate()).padStart(2, "0")}`;

  // 프로필 이미지 수정 관련 state
  const [imgEditing, setImgEditing] = useState(false);
  const [editImg, setEditImg] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
    else navigate('/Login');
  }, [navigate]);

  // 파일 변경 핸들러 (미리보기 생성)
  const handleImgChange = e => {
    const file = e.target.files[0];
    if (file) {
      setEditImg(file);
      setImgPreview(URL.createObjectURL(file));
    }
  };

  // 저장 버튼 - 이미지 base64로 localStorage 및 user state에 저장
  const handleImgSave = () => {
    if (editImg) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const newUser = { ...user, profileImg: e.target.result };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        setImgEditing(false);
        setImgPreview(null);
      };
      reader.readAsDataURL(editImg);
    }
  };

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
          <a href={item.link} className="listen-btn">재생하기</a>
        </div>
      ));
    } else {
      return <p style={{ color: '#777' }}>콘텐츠 준비중입니다.</p>;
    }
  };

  if (!user) return null;

  return (
    <div className="Page-Design-MyMood">
      <div className="sidebar">
        <h1 className="page-title">My Page</h1>
        <div className="page-subtitle">프로필</div>
        <div className="profile">
          <div className="profile-img-select">
            <img
              src={imgPreview || user.profileImg || "https://i.ibb.co/5TKD4bp/profile.png"}
              alt="profile"
              className="profile-img"
              style={{ marginBottom: '8px' }}
            />
            {imgEditing && (
              <label className="custom-file-label">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImgChange}
                  style={{ display: 'none' }}
                />
                <span className="file-upload-text">이미지 선택</span>
              </label>
            )}
          </div>
          <div className="username">{user.name}</div>
          <div className="email">{user.email}</div>
          {imgEditing ? (
            <>
              <button className="button" onClick={handleImgSave} style={{ marginBottom: "6px" }}>저장</button>
              <button className="button" onClick={() => { setImgEditing(false); setImgPreview(null); }}>취소</button>
            </>
          ) : (
            <button className="button" onClick={() => setImgEditing(true)}>
              프로필 이미지 변경
            </button>
          )}
        </div>
        <div className="today-emotion">
          <div className="label">오늘의 감정</div>
          <div className="emoji">{todayEmotion}</div>
          <div className="date">{todayString}</div>
        </div>
        <div className="buttons">
          <button className="button-2">로그아웃</button>
          <button className="button-1" onClick={() => navigate('/calendar')}>달력 확인</button>
        </div>
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