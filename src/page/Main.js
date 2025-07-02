import React, { useState } from "react";
import "./Main.css";
import handImage from "../image/hand.jpg";
import checkImage from "../image/checking.png";
import RecommendImage from "../image/recommend.png";
import ActivityImage from "../image/activity.png";
import SaveImage from "../image/save.png"

const functionItems = [
  {
    id: "01",
    image: checkImage,
    text: ["텍스트 및 설문조사를 통한", "실시간 감정분석"],
  },
  {
    id: "02",
    image: RecommendImage,
    text: ["분석된 감정을 기반으로 한", "콘텐츠 추천"],
  },
  {
    id: "03",
    image: ActivityImage,
    text: ["감정 회복을 위한", "행동 가이드 연계 제공"],
  },
  {
    id: "04",
    image: SaveImage,
    text: ["현재 감정 및 추천받은 콘텐츠", "저장 및 기록"],
  },
];

function Main() {
  const [inputText, setInputText] = useState("");
  const [emotionResult, setEmotionResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);


  const analyzeEmotion = async () => {
    if (!inputText.trim()) {
      setEmotionResult("내용을 입력해주세요!");
      return;
    }

    setLoading(true);
    setEmotionResult("");

    setTimeout(() => {
      setLoading(false);
      setEmotionResult("😊 감정 분석 결과: 당신은 현재 긍정적인 감정을 느끼고 있습니다.");
    }, 3000);
  };

    const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? functionItems.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === functionItems.length - 1 ? 0 : prev + 1));
  };

  const currentItem = functionItems[currentIndex];

  return (
    <div className="Page-Design">
      <div className="section1">
        <div className="content-wrapper">
          <div className="text-content">
          <h1 className="title1">How are you<br /> feeling today?</h1>
          <p>
            <span className="sub-title">오늘 당신의 감정, 안녕하신가요?</span>
          </p><br />
          <div className="article">
            현재 당신의 감정을 섬세하게 읽고 분석하며,<br />
            지금 마음에 꼭 맞는 콘텐츠 및 활동을 추천해드립니다.<br />
            감정을 이해하며 조절해가는 첫걸음을 시작해보세요.
          </div>
          <br />
          </div>
          <img className="image-Main" src={handImage} alt="Hand"/>
        </div>
      </div>

      <div className="section2">
        <h1 className="title2">AI와 함께 감정을 다루고, 케어하세요</h1>
                <div className="slider">
          <button className="arrow left" onClick={prevSlide}>←</button>

          <div className="functions-box">
            <h2>{currentItem.id}</h2>
            <img src={currentItem.image} className="functions-Image" alt={`기능 ${currentItem.id}`} />
            <p>{currentItem.text[0]}<br />{currentItem.text[1]}</p>
          </div>

          <button className="arrow right" onClick={nextSlide}>→</button>
        </div>
      </div>
      
      <div className="section3">
        <div className="title-right">
          <h1 className="title2">현재의 감정을<br /> 한 번 확인해보세요</h1>
          <div className="article">
            현재의 기분을 알리는 글을 작성한 후 감정을 진단해드립니다.<br />
            AI가 상세히 분석하여 현재의 기분 및 이를 다룰 수 있는 방법을 알려드리겠습니다.
          </div>
        </div>
        <br /><br />
        <textarea
          className="text-input"
          rows="6"
          placeholder="내용을 입력해주세요.(1000자 제한)"
          maxLength={1000}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        /><br /><br />
        <div className="space">
          <button className="button-primary no-arrow" onClick={analyzeEmotion}>
            감정 진단
          </button>
        </div>
        <div className="loading-placeholder">
        {loading ? (
            <div className="loading-container">
              <div className="loader"></div>
              <p>진단중...</p>
            </div>
        ) : (
        emotionResult && <div className="emotion-result">{emotionResult}</div>
        )}
        </div>
      </div>
    </div>
  );
}

export default Main;