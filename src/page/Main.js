import { useState } from "react";
import "./Main.css";
import { useNavigate } from "react-router-dom"; // useNavigate 훅 임포트
import leftBracket from "../image/left-bracket.svg";
import rightBracket from "../image/right-bracket.svg";
import speech1 from "../image/speech1.svg";
import speech2 from "../image/speech2.svg";
import speech3 from "../image/speech3.svg";
import AI from "../image/AI.png";
import popular from "../image/popular.png";
import diary from "../image/diary.png";
import checkImage from "../image/question-desc.png";
import RecommendImage from "../image/recommend-desc.png";
import ActivityImage from "../image/guide_desc.png";
import SaveImage from "../image/check-desc.png";
import { songRecommendations, movieRecommendations } from "../data/recommendationData";

// 감정 label → 추천데이터 한글 키 변환표
const labelMap = {
  '5 star': '아주 긍정적',
  '5 stars': '아주 긍정적',
  'Very Positive': '아주 긍정적',
  '4 star': '긍정적',
  '4 stars': '긍정적',
  'Positive': '긍정적',
  '3 star': '보통',
  '3 stars': '보통',
  'Neutral': '보통',
  '2 star': '부정적',
  '2 stars': '부정적',
  'Negative': '부정적',
  '1 star': '아주 부정적',
  '1 stars': '아주 부정적',
  'Very Negative': '아주 부정적',
};

const functionItems = [
  {
    id: "01.",
    image: checkImage,
    title: "실시간 감정분석",
    description:
      "사용자가 입력한 텍스트 및 감정 설문조사 테스트를 통하여 심리를 분석하고 현재의 감정 상태를 진단해줍니다.\n 최신 감성 분석 알고리즘을 통해 현재의 감정 상태를 실시간으로 진단하며 사용자 자신도 인지하지 못한 감정 변화를 정교하게 파악할 수 있습니다.",
  },
  {
    id: "02.",
    image: RecommendImage,
    title: "감정 기반 콘텐츠 추천",
    description:
      "AI가 감정 분석 결과를 토대로 사용자에게 가장 적합한 콘텐츠를 추천합니다.\n 음악, 영화, 드라마와 같은 감정 회복에 긍정적인 영향을 줄 수 있는 콘텐츠들을 제안하여, 감정을 보다 자연스럽고 건강하게 다룰 수 있도록 돕습니다.",
  },
  {
    id: "03.",
    image: ActivityImage,
    title: "향후 행동 가이드 추천",
    description:
      "단순한 콘텐츠 추천에서 더 나아가, 명상, 산책, 운동 등과 같은 감정을 긍정적인 방향으로 유도해주는 활동을 제안해줍니다.\n 내부적으로 영향을 주는 활동 뿐만이 아닌 외부적으로 사용자가 실천하는 활동을 통해 신체적, 정신적 향상을 이룰 수 있습니다.",
  },
  {
    id: "04.",
    image: SaveImage,
    title: "감정 기록 및 추천 콘텐츠 저장",
    description:
      "사용자가 진단받은 감정과 추천받은 콘텐츠를 기록 및 저장하여 일별로 감정 변화를 시각화하여 쉽게 확인할 수 있습니다.\n 이를 통해 감정 패턴을 장기적으로 추적하고, 스스로의 정서 상태를 체계적으로 관리할 수 있도록 돕습니다.",
  },
];

// n개 랜덤 추출 함수
function pickRandom(arr, n = 3) {
  if (!arr || arr.length === 0) return [];
  const copy = arr.slice();
  const result = [];
  while (copy.length && result.length < n) {
    const idx = Math.floor(Math.random() * copy.length);
    result.push(copy.splice(idx, 1)[0]);
  }
  return result;
}

function Main() {
  const [inputText, setInputText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [emotionResult, setEmotionResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigate = useNavigate();

  // 감정 분석 및 추천곡/영화 DB 저장
  const analyzeEmotion = async () => {
    if (analyzed) {
      setInputText("");
      setErrorMessage("");
      setEmotionResult("");
      setLoading(false);
      setAnalyzed(false);
      return;
    }

    if (!inputText.trim()) {
      alert("내용을 입력해주세요!");
      return;
    }

    setErrorMessage("");
    setLoading(true);
    setEmotionResult("");

    try {
// (1) Flask API로 감정 분석 요청
      const response = await fetch("https://flask-emotion-api-7u41.onrender.com/api/sentiment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) throw new Error("서버 에러");

      const data = await response.json();
      setEmotionResult(data.result);
      setAnalyzed(true);

      // (2) label을 한글키로 변환
      const labelKor = labelMap[data.label] || "보통";
      // (3) 추천곡/영화 뽑기
      const songs = pickRandom(songRecommendations[labelKor], 3);
      const movies = pickRandom(movieRecommendations[labelKor], 3);

// (4) 감정 및 추천 DB 저장
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && data.result && data.label) {
        fetch("http://localhost:4000/api/emotion", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user.email,
            emotion: data.result,
            label: data.label,
            date: new Date().toISOString(),
            recommendations: {
              music: songs,
              movie: movies,
            },
          }),
        })
          .then((res) => res.json())
          .then((resp) => {
            console.log("DB 저장 결과:", resp);
          })
          .catch((e) => {
            console.warn("4000번 서버 저장 실패:", e.message);
          });
      }



      // ✅ 감정 분석 결과 페이지로 자동 이동 (원하면 아래 라인 해제!)
      // navigate(`/MusicResult/${labelKor}`);

    } catch (error) {
      setEmotionResult("분석 중 오류가 발생했습니다: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  /*슬라이더 클릭 시 보일 영역*/

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % functionItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + functionItems.length) % functionItems.length);
  };

  const handleStartClick = () => {
    navigate("/MoodCheck");
  };

  return (
    <div className="Page-Design">
      {/* Section 0: 메인 타이틀 */}
      <div className="section0">
        <div className="title-row">
          <div className="title-line left-line" />
          <div className="title-bracket">
            <img src={leftBracket} alt="[" className="bracket" />
            <div className="main-text-title">
              KN✺W YOUR MOOD,<br/>
              CHANGE YOUR DAY<br/>
            </div>
            <img src={rightBracket} alt="]" className="bracket" />
          </div>
          <div className="title-line right-line" />
        </div>

      <div className="main-text-article">
        Artificial Intelligence-Driven Platform for<br/>
        Emotion Analysis & Content Recommendation<br/>
      </div>
      </div>
      

      <div className="page-line">
        <span className="line"></span>
        <span className="star">✺✺✺</span>
        <span className="line"></span>
      </div>

      {/* Section 1: 오늘 감정 체크 안내 */}
      <div className="section1">
        <div className="content-wrapper">
          <div className="text-content">
          <h1 className="title1">How are you<br /> feeling today?</h1>
          <p>
            <span className="sub-title">오늘 당신의 감정, 안녕하신가요?</span>
          </p><br />
          <img src={speech1} className="side-image"></img>
          <img src={speech2} className="side-image2"></img>
          <img src={speech3} className="side-image3"></img>
          <div className="article">
            현재 당신의 감정을 섬세하게 읽고 분석하며,<br />
            지금 마음에 꼭 맞는 콘텐츠 및 활동을 추천해드립니다.<br />
            감정을 이해하며 조절해가는 첫걸음을 시작해보세요.
          </div>
          <br />
          <button className="button-primary-second" onClick={handleStartClick}>더 알아보기</button>
          </div>
        </div>
      </div>

      <div className="page-line">
        <span className="line"></span>
        <span className="star">✺✺✺</span>
        <span className="line"></span>
      </div>

      {/* Section 1: WHY 사용 설명 */}
      <div className="section1">
        <div className="content-wrapper">
          <div className="text-content">
            <h1 className="title1">Why using <br />MOODI · TREE?</h1>
            <p>
              <span className="sub-title">왜 MOODI · TREE를 사용하나요?</span>
            </p>
            <br />
            <div className="article">
              우리는 감정이 삶의 질을 좌우한다고 믿습니다.
              <br />
              하지만 바쁜 일상 속에서 자신의 감정을 돌볼 시간은 많지 않죠.
              <br />
              그래서 탄생했습니다 — <strong>감정을 들여다보고, 공감하고, 케어해주는 플랫폼.</strong>
              <br />
              <br />
              작은 대화 하나로도 스스로를 이해하는 계기가 될 수 있도록,
              <br />
              이 서비스가 당신의 하루에 따뜻한 쉼표가 되었으면 합니다.
            </div>
          </div>
        </div>
      </div>

      <div className="page-line">
        <span className="line"></span>
        <span className="star">✺✺✺</span>
        <span className="line"></span>
      </div>

      {/* Section 1: 기능 설명 */}
      <div className="section1">
        <div className="content-wrapper">
        <div className="text-content">
          <h1 className="title1">Join with<br/>MOODI · TREE</h1>
          <p>
            <span className="sub-title">MOODI · TREE에서 다양한 기능을 즐기세요</span>
          </p><br />
          <br/>
          <div className="content-wrapper-boxs">
            <div className="main-functions-box">
              <p><span className="functions-number">01</span><br/>
              AI를 활용한 감정 분석</p>
              <div className="main-functions-text">감정을 인지하는 인공지능 모델을 통하여 현재 나의 감정 상태를 객관적으로 진단할 수 있습니다.</div>
              <img src={AI} className="activity-image"></img>
            </div>
            <div className="main-functions-box">
              <p><span className="functions-number">02</span><br/>
              콘텐츠 및 활동 추천</p>
              <div className="main-functions-text">진단받은 감정에 어울리는 다양한 콘텐츠 및 활동을 추천받아 이를 즐길 수 있습니다</div>
              <img src={popular} className="activity-image"></img>
            </div>
            <div className="main-functions-box">
              <p><span className="functions-number">03</span><br/>
              감정 기록 일기</p>
              <div className="main-functions-text">달력에 진단받은 감정, 추천받은 콘텐츠 등을 기록 및 저장하여 일기처럼 적어 저장할 수 있습니다.</div>
              <img src={diary} className="activity-image"></img>
            </div>
          </div>
        </div>
      </div>

      <div className="page-line">
        <span className="line"></span>
        <span className="star">✺✺✺</span>
        <span className="line"></span>
      </div>

      {/* Section 3: 기능 슬라이드 */}
      <div className="section3">
        <div className="content-wrapper">
          <div className="text-content">
          <h1 className="title1">How to use</h1>
            <p>
              <span className="sub-title">MOODI · TREE를 이용하는 방법을 안내드립니다</span>
            </p><br />
          </div>
        </div>
        <div className="slider">
          <button className="arrow left" onClick={prevSlide}>◀</button>

          <div className="slider-wrapper">
            <div
              className="slider-track"
              style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {functionItems.map((item, index) => (
                <div className="functions-box" key={index}>
                  <div className="functions-text">
                    <h2>{item.id}</h2>
                    <div className="function-title">{item.title}</div>
                    <br />
                    <div className="function-desc">{item.description}</div>
                  </div>
                  <div className="functions-image">
                      <img src={item.image} className="functions-Images" alt={`기능 ${item.id}`} />
                  </div>
                  </div>
                  ))}  
            </div>
          </div>

          <button className="arrow right" onClick={nextSlide}>▶</button>
        </div>
        <div className="slider-indicators">
          {functionItems.map((_, idx) => (
            <span
              key={idx}
              className={`indicator-dot ${currentIndex === idx ? "active" : ""}`}
              onClick={() => setCurrentIndex(idx)}
            />
          ))}
        </div>
      </div>

      <div className="section4">
        <div className="title-right">
          <h1 className="title4">현재의 감정을<br /> 한 번 확인해보세요</h1>
          <div className="article">
            현재의 기분을 알리는 글을 작성한 후 감정을 진단해드립니다.<br />
            AI가 상세히 분석하여 현재의 기분 및 이를 다룰 수 있는 방법을 알려드리겠습니다.
          </div>
        </div>
        <br />
        <div className="emotion-box">
          {loading ? (
            <>
              <div className="loading-container">
                <div className="loader"></div>
                <p>진단중...</p>
              </div>
              <br /><br />
            </>
          ) : emotionResult ? (
            <div className="emotion-result">{emotionResult}</div>
          ) : errorMessage ? (
            <div className="emotion-result error">{errorMessage}</div>
          ) : (
            <textarea
              className="text-input"
              rows="6"
              placeholder="내용을 입력해주세요.(1000자 제한)"
              maxLength={1000}
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                setErrorMessage("");
              }}
            />
          )}
        </div>
        <div className="space">
          <button
            className="button-primary no-arrow"
            onClick={analyzeEmotion}
            disabled={loading}
          >
            {analyzed ? "다시하기" : "감정 진단"}
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Main;