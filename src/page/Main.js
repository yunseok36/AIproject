import React, { useState } from "react";
import "./Main.css";
import handImage from "../image/hand.jpg";

function Main() {
  const [inputText, setInputText] = useState("");
  const [emotionResult, setEmotionResult] = useState("");
  const [loading, setLoading] = useState(false);

  // 감정 분석 요청 함수 (Flask API 연동)
  const analyzeEmotion = async () => {
    if (!inputText.trim()) {
      setEmotionResult("내용을 입력해주세요!");
      return;
    }

    setLoading(true);
    setEmotionResult("");

    try {
      // 1️⃣ Flask 서버(포트 5000)로 POST
      const response = await fetch("http://localhost:5000/api/sentiment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) throw new Error("서버 에러");

      const data = await response.json();
      setEmotionResult(data.result);  // 이모지+문장 그대로 표시

      // 2️⃣ 로그인 사용자만 DB 저장 (서버가 없다면 이 부분 생략 가능)
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
          }),
        }).catch(e => {
          // 서버 미구현 시 에러 무시
          console.warn("4000번 서버 저장 실패:", e.message);
        });
      }

    } catch (error) {
      setEmotionResult("분석 중 오류가 발생했습니다: " + error.message);
    } finally {
      setLoading(false);
    }
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
        <div className="box-items"></div>
        <div className="article"></div>
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
          <button className="button-primary no-arrow" onClick={analyzeEmotion} disabled={loading}>
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
