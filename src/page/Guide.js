import React from "react";
import "./Guide.css";
import emotionImg from "../image/emotion.png";

function Guide() {
    return (
        <div className="guide-page">
            <div className="guide-header">
                <h1 className="guide-title">MOODI-TREE 사용 가이드</h1>
                <img src={emotionImg} alt="Emotion" className="emotion-icon" />
            </div>

            <div className="guide-description">
                <strong>MOODI-TREE는 어떤 서비스인가요?</strong>
                <ul className="dot-list">
                    <li>감정 기반 콘텐츠 추천 플랫폼입니다.</li>
                    <li>사용자의 감정 상태에 따라 적절한 음악, 글, 활동을 추천하여 정서적 안정을 돕습니다.</li>
                </ul>
            </div>

            <div className="guide-description">
                <strong>어떤 식으로 감정을 입력해야 하나요?</strong>
                <ul className="dot-list">
                    <li>한두 단어: "우울함", "행복해", "짜증 나"</li>
                    <li>간단한 문장도 가능: "요즘 너무 지치고 무기력해요."</li>
                    <li>'외롭다'는 감정 → '위로되는 음악', '따뜻한 에세이' 추천</li>
                </ul>
            </div>

            <p className="guide-description">
                MOODI-TREE를 효과적으로 사용하는 방법을 안내해드려요.
            </p>

            <div className="flow-steps-centered">
                {[
                    "감정 입력하기",
                    "AI 감정<br />분석 결과 확인",
                    "맞춤 콘텐츠 및<br />활동 추천",
                    "추천 결과<br />저장 및 회고"
                ].map((step, index, arr) => (
                    <React.Fragment key={index}>
                        <div
                            className="step-circle"
                            dangerouslySetInnerHTML={{ __html: step }}
                        />
                        {index < arr.length - 1 && <span className="step-arrow">→</span>}
                    </React.Fragment>
                ))}
            </div>

            <div className="guide-description">
                AI가 입력된 감정 단어, 문장을 자연어 처리로 분석합니다.<br />
                <ul className="dot-list">
                    <li>이전에 입력한 감정과 추천 결과는 <strong>MY MOOD</strong> 메뉴에서 확인할 수 있습니다.</li>
                    <li>시간이 지남에 따라 자신의 감정 변화를 시각적으로 추적해보세요.</li>
                </ul>
            </div>

            <div className="qa-block">
                <p><strong>Q. 감정을 여러 개 입력해도 되나요?</strong><br />
                    A. 네, "불안하고 짜증나요"처럼 복합 감정도 인식합니다.</p>
                <p><strong>Q. 추천 콘텐츠가 마음에 들지 않아요.</strong><br />
                    A. 추천 결과는 언제든 새로고침하거나, 다른 감정을 입력해 다시 받을 수 있습니다.</p>
            </div>
        </div>
    );
}

export default Guide;