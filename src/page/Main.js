import React, { useState } from "react";
import "./Main.css";
import handImage from "../image/hand.jpg";

function Main() {
  const [inputText, setInputText] = useState("");
  const [emotionResult, setEmotionResult] = useState("");
  const [loading, setLoading] = useState(false);

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
          <button className="button-primary">시작하기</button>
          </div>
          <img className="image-Main" src={handImage} alt="Hand"/>
        </div>
      </div>

      <div className="section2">
        <h1 className="title2">AI와 함께 감정을 다루고, 케어하세요</h1>
        <div className="box-items">
          
        </div>
        <div className="article">

        </div>
      </div>
      
      <div className="section3">
        <h1 className="title2">현재의 감정을<br /> 한 번 확인해보세요</h1>
        <div className="article">
          현재의 기분을 알리는 글을 작성한 후 감정을 진단해드립니다.<br />
          AI가 상세히 분석하여 현재의 기분 및 이를 다룰 수 있는 방법을 알려드리겠습니다.
        </div><br /><br />
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
        {loading && (
          <div className="loading-container">
            <div className="loader"></div>
            <p>진단중...</p>
          </div>
        )}
        {!loading && emotionResult && (
          <div className="emotion-result">
            {emotionResult}
          </div>
        )}
      </div>
    </div>
  );
}

export default Main;