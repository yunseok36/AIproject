import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyPage.css';

function extractEmoji(str) {
  if (!str) return null;
  const match = str.match(/[\p{Emoji}]/gu);
  if (match && match.length > 0) return match[0];
  if (/^([\uD800-\uDBFF][\uDC00-\uDFFF])/u.test(str)) {
    return str[0] + str[1];
  }
  const alt = str.match(/([\u231A-\uD83E\uDDFF])/);
  if (alt) return alt[0];
  return null;
}

function MyPage() {
  const [activeTab, setActiveTab] = useState('music');
  const [user, setUser] = useState(null);

  const [imgEditing, setImgEditing] = useState(false);
  const [editImg, setEditImg] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);

  const [emotionHistory, setEmotionHistory] = useState([]);
  const [todayEmotion, setTodayEmotion] = useState(null);

  const navigate = useNavigate();

  const labelToShort = {
    "Very Positive": "매우 긍정",
    "Positive": "긍정",
    "Neutral": "중립",
    "Negative": "부정",
    "Very Negative": "매우 부정",
    "5 star": "매우 긍정",
    "4 star": "긍정",
    "3 star": "중립",
    "2 star": "부정",
    "1 star": "매우 부정"
  };

  const getSimpleEmotion = (item) => {
    if (!item) return { emoji: "❓", label: "미진단" };
    let emoji = extractEmoji(item.emotion) || "❓";
    let label = labelToShort[item.label] || "감정";
    return { emoji, label };
  };

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
    else navigate('/Login');
  }, [navigate]);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:4000/api/emotion?email=${encodeURIComponent(user.email)}`)
        .then(res => res.json())
        .then(data => {
          const emotions = Array.isArray(data.emotions) ? data.emotions : [];
          setEmotionHistory(emotions);

          const today = new Date().toISOString().slice(0, 10);
          const todayLog = emotions.find(e => (e.date && e.date.slice(0,10) === today));
          setTodayEmotion(todayLog || null);
        })
        .catch(() => {
          setEmotionHistory([]);
          setTodayEmotion(null);
        });
    }
  }, [user]);

  const handleImgChange = e => {
    const file = e.target.files[0];
    if (file) {
      setEditImg(file);
      setImgPreview(URL.createObjectURL(file));
    }
  };

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

  const musicListAll = [
    {
      title: "Personal",
      artist: "Emotional Oranges",
      img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=facearea&w=300&h=300",
      link: "#"
    },
    {
      title: "Pink + White",
      artist: "Frank Ocean",
      img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=300&h=300",
      link: "#"
    },
    {
      title: "Like Him",
      artist: "Tyler, The Creator",
      img: "https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG",
      link: "#"
    },
    {
      title: "Someone Like You",
      artist: "Adele",
      img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=facearea&w=300&h=300",
      link: "#"
    },
    {
      title: "Cheer Up",
      artist: "TWICE",
      img: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Music-icon.png",
      link: "#"
    }
  ];

  function pickRandom(arr, n = 3) {
    const copy = arr.slice();
    const result = [];
    while (copy.length && result.length < n) {
      const idx = Math.floor(Math.random() * copy.length);
      result.push(copy.splice(idx, 1)[0]);
    }
    return result;
  }

  const renderContent = () => {
    const showList = pickRandom(musicListAll, 3);
    if (activeTab === 'music') {
      return showList.map((item, index) => (
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

  if (!user) return null;

  return (
    <div className="Page-Design-MyMood">
      <div className="sidebar">
        <h1 className="page-title">My Page</h1>
        <h1 className="page-title">Profile</h1>
        <div className="profile">
          <div className="profile-img-select">
            <img
              src={imgPreview || user.profileImg || process.env.PUBLIC_URL + "/profile.png"}
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
          <div className="today-emotion">
            <div className="label">오늘의 감정</div>
            <div className="emoji">
              {todayEmotion
                ? (
                  <>
                    <span>{getSimpleEmotion(todayEmotion).emoji}</span>
                    <span className="today-emotion-label">{getSimpleEmotion(todayEmotion).label}</span>
                  </>
                )
                : "아직 진단 내역 없음"}
            </div>
            <div className="date">{new Date().toISOString().slice(0, 10)}</div>
          </div>
        </div>
        <button className="button" onClick={() => navigate('/calendar')}>달력 확인</button>
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

          <div style={{ marginTop: "60px", textAlign: "left" }}>
            <h3 style={{ color: "#36795A", fontSize: "1.1rem", marginBottom: 10 }}>최근 감정 진단 기록</h3>
            {emotionHistory.length === 0 ? (
              <div style={{ color: "#888", margin: "10px 0" }}>기록이 없습니다.</div>
            ) : (
              <ul style={{ listStyle: "none", padding: 0 }}>
                {emotionHistory.slice(0, 7).map((e, idx) => (
                  <li key={idx} style={{ marginBottom: 8, borderBottom: "1px solid #eee", paddingBottom: 4 }}>
                    <span style={{ marginRight: 14 }}>{e.date ? e.date.slice(0, 10) : ""}</span>
                    <span>{e.emotion}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
