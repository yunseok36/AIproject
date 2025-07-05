import { useState } from "react";
import "./Main.css";
import { useNavigate } from "react-router-dom"; // useNavigate 훅 임포트
import handImage from "../image/hand.jpg";
import hand2Image from "../image/hand2.png";
import handImage2 from "../image/two-hands.jpg";
import checkImage from "../image/checking.png";
import RecommendImage from "../image/recommend.png";
import ActivityImage from "../image/activity.png";
import SaveImage from "../image/save.png";

const functionItems = [
  {
    id: "01.",
    image: checkImage,
    title: "실시간 감정분석",
    description: "사용자가 입력한 텍스트 및 감정 설문조사 테스트를 통하여 심리를 분석하고 현재의 감정 상태를 진단해줍니다.\n 최신 감성 분석 알고리즘을 통해 현재의 감정 상태를 실시간으로 진단하며 사용자 자신도 인지하지 못한 감정 변화를 정교하게 파악할 수 있습니다.",
  },
  {
    id: "02.",
    image: RecommendImage,
    title: "감정 기반 콘텐츠 추천",
    description: "AI가 감정 분석 결과를 토대로 사용자에게 가장 적합한 콘텐츠를 추천합니다.\n 음악, 영화, 드라마와 같은 감정 회복에 긍정적인 영향을 줄 수 있는 콘텐츠들을 제안하여, 감정을 보다 자연스럽고 건강하게 다룰 수 있도록 돕습니다.",
  },
  {
    id: "03.",
    image: ActivityImage,
    title: "향후 행동 가이드 추천",
    description: "단순한 콘텐츠 추천에서 더 나아가, 명상, 산책, 운동 등과 같은 감정을 긍정적인 방향으로 유도해주는 활동을 제안해줍니다.\n 내부적으로 영향을 주는 활동 뿐만이 아닌 외부적으로 사용자가 실천하는 활동을 통해 신체적, 정신적 향상을 이룰 수 있습니다.",
  },
  {
    id: "04.",
    image: SaveImage,
    title: "감정 기록 및 추천 콘텐츠 저장",
    description: "사용자가 진단받은 감정과 추천받은 콘텐츠를 기록 및 저장하여 일별로 감정 변화를 시각화하여 쉽게 확인할 수 있습니다.\n 이를 통해 감정 패턴을 장기적으로 추적하고, 스스로의 정서 상태를 체계적으로 관리할 수 있도록 돕습니다.",
  },
];

function Main() {
  const SLIDE_WIDTH = 1020;

  // 감정 진단 텍스트
  const [inputText, setInputText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [emotionResult, setEmotionResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const navigate = useNavigate(); // useNavigate 훅 사용

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

    setTimeout(() => {
      setLoading(false);
      setEmotionResult("😊 감정 분석 결과: 당신은 현재 긍정적인 감정을 느끼고 있습니다.");
      setAnalyzed(true);
    }, 3000);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? functionItems.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === functionItems.length - 1 ? 0 : prev + 1));
  };

  // "시작하기" 버튼 클릭 시 MoodCheck 페이지로 이동하는 함수
  const handleStartClick = () => {
    navigate("/MoodCheck");
  };

  return (
    <div className="Page-Design">
      <div className="section0">
            KN✺W YOUR MOOD,<br/>
            CHANGE YOUR DAY <br/>
            <div className="main-text-article">
                Artificial Intelligence-Driven Platform for<br/>
                Emotion Analysis & Content Recommendation<br/>
            </div>
      </div>

      <div className="gradient-transition-start"></div>

      <div className="page-line">
        <span className="line"></span>
        <span className="star">✺✺✺</span>
        <span className="line"></span>
      </div>

      <div className="section1">
        <div className="content-wrapper">
          <div className="text-content">
          <h1 className="title1">How are your<br /> feelings today?</h1>
          <p>
            <span className="sub-title">오늘 당신의 감정, 안녕하신가요?</span>
          </p><br />
          <div className="article">
            현재 당신의 감정을 섬세하게 읽고 분석하며,<br />
            지금 마음에 꼭 맞는 콘텐츠 및 활동을 추천해드립니다.<br />
            감정을 이해하며 조절해가는 첫걸음을 시작해보세요.
          </div>
          <br />
          <button className="button-primary" onClick={handleStartClick}>더 알아보기</button>
          </div>
        </div> 
      </div>

      <div className="page-line">
        <span className="line"></span>
        <span className="star">✺✺✺</span>
        <span className="line"></span>
      </div>

      <div className="section1">
        <div className="content-wrapper">
          <div className="text-content">
          <h1 className="title1">Why using <br/>MOODI · TREE?</h1>
          <p>
            <span className="sub-title">왜 MOODI · TREE를 사용하나요?</span>
          </p><br />
          <div className="article">
              우리는 감정이 삶의 질을 좌우한다고 믿습니다.<br/>
              하지만 바쁜 일상 속에서 자신의 감정을 돌볼 시간은 많지 않죠.<br/>
              그래서 탄생했습니다 — <strong>감정을 들여다보고, 공감하고, 케어해주는 플랫폼.</strong><br/><br/>
              작은 대화 하나로도 스스로를 이해하는 계기가 될 수 있도록,<br/>
              이 서비스가 당신의 하루에 따뜻한 쉼표가 되었으면 합니다.
          </div>
          <br />
          </div>
        </div> 
      </div>

      <div className="page-line">
        <span className="line"></span>
        <span className="star">✺✺✺</span>
        <span className="line"></span>
      </div>

      <div className="section1">
        <div className="content-wrapper">
        <div className="text-content">
          <h1 className="title1">MOODI · TREE<br/>Functions</h1>
          <p>
            <span className="sub-title">MOODI · TREE 기능에 대해 설명드립니다</span>
          </p><br />
          <br/>
          <div className="content-wrapper-boxs">
            <div className="main-functions-box">
              <p>01 AI를 활용한 감정 분석</p><br/>
              <div className="main-functions-text">텍스트를 통해 현재 상태를 입력 시 이를 분석 후 가장 일치하는 감정을 진단합니다.</div>
              </div>
            <div className="main-functions-box">
              <p>02 콘텐츠 및 활동 추천</p><br/>
              <div className="main-functions-text">진단받은 감정에 어울리는 콘텐츠 및 활동을 추천하여 긍정적 방향으로 이끌어가도록 도와줍니다.</div>
            </div>
            <div className="main-functions-box">
              <p>03 감정 기록 일기</p><br/>
              <div className="main-functions-text">달력에 진단받은 감정 및 있었던 일, 추천받은 콘텐츠를 기록 및 저장하여 감정 변화를 확인할 수 있습니다.</div>
            </div>
          </div>
        </div>
        </div>
      </div>

      <div className="page-line">
        <span className="line"></span>
        <span className="star">✺✺✺</span>
        <span className="line"></span>
      </div>

      <div className="section3">
        <div className="content-wrapper">
          <div className="text-content">
          <h1 className="title3">How to use</h1>
          </div>     
        </div>
        <div className="slider">
          <button className="arrow left" onClick={prevSlide}>◀</button>

          <div className="slider-wrapper">
            <div className="slider-track" style={{ transform: `translateX(-${currentIndex * SLIDE_WIDTH}px)` }}>
              {functionItems.map((item, index) => (
                <div className="functions-box" key={index}>
                  <div className="functions-text">
                    <h2>{item.id}</h2>
                    <div className="function-title">{item.title}</div><br/>
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
          <span key={idx}
          className={`indicator-dot ${currentIndex === idx ? "active" : ""}`}
          onClick={() => setCurrentIndex(idx)}
          />
          ))}
      </div>
      </div>

      <div className="gradient-transition-last"></div>

    <div className="section4">
      <div className="title-right">
        <h1 className="title4">현재의 감정을<br /> 한 번 확인해보세요</h1>
        <div className="article">
          현재의 기분을 알리는 글을 작성한 후 감정을 진단해드립니다.<br />
          AI가 상세히 분석하여 현재의 기분 및 이를 다룰 수 있는 방법을 알려드리겠습니다.
        </div>
      </div>
      <br /><br />
      <div className="emotion-box">
        {loading ? (
          <div className="loading-container">
            <div className="loader"></div>
            <p>진단중...</p>
          </div>
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
        <button className="button-primary no-arrow" onClick={analyzeEmotion}>
          {analyzed ? "다시하기" : "감정 진단"}
        </button>
      </div>
    </div>
  </div>
  );
}

export default Main;