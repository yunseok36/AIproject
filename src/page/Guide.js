import React, { useState } from "react";
import "./Guide.css";
import emotionImg from "../image/emotion.png";

function Guide() {

    const [openIndex, setOpenIndex] = useState(null); // 열려있는 질문 인덱스
    const [closingIndex, setClosingIndex] = useState(null); // 닫히는 질문 인덱스

    const toggleAnswer = (index) => {
        if (openIndex === index) {
            setClosingIndex(index);
            setOpenIndex(null);
            setTimeout(() => 
                setClosingIndex(null), 400);
            } else {
                if (openIndex !== null) {
                setClosingIndex(openIndex);
                setTimeout(() => 
                    setClosingIndex(null), 400);
            }
            setOpenIndex(index);
        }
    };

    const faqList = [
        {
            question: "Q. 어떤 식으로 감정을 입력해야 하나요?",
            answer: (
                <>
                간단한 한두 단어 혹은 짧은 문장 형태로 입력하시면 AI가 자동으로 이를 분석합니다.<br/>
                예: "우울함", "행복해", "일이 너무 많아서 피곤해", · · ·
                </>
            )    
        },
        {
            question: "Q. 감정을 여러 개 입력해도 되나요?",
            answer: '네, "불안하고 짜증나요"처럼 복합적인 감정도 인식하여 결과를 도출합니다.',
        },
        {
            question: "Q. 추천 콘텐츠가 마음에 들지 않아요.",
            answer: "추천 결과는 언제든 새로고침하거나, 다른 감정을 입력하여 다시 추천받을 수 있습니다.",
        },
        {
            question: "Q. 로그인 및 화원가입하면 어떤 기능을 사용할 수 있나요?",
            answer: "로그인 및 회원가입 시 진단받은 감정 및 추천받은 콘텐츠를 저장 및 확인할 수 있으며 이를 날짜별로 기록할 수 있습니다.",
        },
    ];

    return (
        <div className="guide-page">
            <div className="guide-header">
                <h1 className="guide-title"><strong>MOODI · TREE</strong>에 대해 소개합니다</h1><br/>
                MOODI · TREE는 사용자가 현재의 감정을 인식하고 돌보도록 도와주는 서비스입니다.<br/>
                고도화된 감정 분석 모델을 상시 적용함으로써, 기존 감정 기반 서비스와 차별화된 정확도 및 맞춤형 추천 기능을 제공하고 있습니다.<br/>
                사용자가 자신의 감정을 보다 쉽게 이해하고, 스스로 진단하고 돌봐 긍정적의 방향으로 나아갈 수 있도록 지원합니다.<br/><br/>
                시간과 장소의 제약 없이 누구나, 언제 어디서나 감정을 진단하고 돌볼 수 있도록 목표하고 있으며,<br/>
                감정 기반 서비스에 대한 수요 증가에 발맞춰, MOODI · TREE는 보다 다양한 감정 케어 솔루션를 지속적으로 확장하고자 합니다.
            </div>

            <div className="section-Guide">
                <div className="guide-description">
                    <div className="guide-subtitle">MOODI · TREE는 어떤 사이트인가요?</div>
                    <ul className="dot-list">
                        <li>MOODI-TREE는 AI를 활용한 감정 기반 콘텐츠 추천 플랫폼입니다.</li>
                        <li>사용자가 현재의 감정 상태를 입력하면 AI가 해당 정보에 따라 적절한 음악, 글, 활동 등을 사용자에게 추천합니다.</li>
                    </ul>
                <div className="guide-subtitle">MOODI · TREE는 어떤 기능을 사용할 수 있나요?</div>
                    <ul className="dot-list">
                        <li>MOODI-TREE는 AI를 활용한 감정 기반 콘텐츠 추천 플랫폼입니다.</li>
                        <li>사용자가 현재의 감정 상태를 입력하면 AI가 해당 정보에 따라 적절한 음악, 글, 활동 등을 사용자에게 추천합니다.</li>
                    </ul>
                </div>
            </div>
            <br/><br/>

            <div className="section-Guide">
                <p className="guide-description">
                    <div className="guide-subtitle">MOODI · TREE 사용 방법</div>
                    <strong>MOODI-TREE를 효과적으로 사용하는 방법을 안내해드립니다.</strong>
                </p>
                <div className="flow-steps-centered">
                    {[
                        "현재 감정 입력",
                        "AI 분석<br /> 결과 확인",
                        "맞춤 콘텐츠 및<br />활동 추천",
                        "추천 결과<br />저장 및 회고"
                    ].map((step, index, arr) => (
                        <React.Fragment key={index}>
                            <div
                                className="step-circle"
                                dangerouslySetInnerHTML={{ __html: step }}
                            />
                            {index < arr.length - 1 && <span className="step-arrow">➡</span>}
                        </React.Fragment>
                    ))}
                </div>
                <br/>

                <div className="guide-description">
                    <strong>1. 사용자가 텍스트를 통해 현재의 감정 상태를 입력합니다.</strong>
                    <ul className="dot-list">
                        <li>짧은 단어 또는 문장 형태로 현 상태에 대해 간단히 작성합니다.</li>
                        <li>시간이 지남에 따라 자신의 감정 변화를 시각적으로 추적해보세요.</li>
                    </ul>
                    <br/>

                    <strong>2. AI가 입력된 단어 및 문장을 자연어 처리로 분석합니다.</strong>
                    <ul className="dot-list">
                        <li>사용자가 입력한 텍스트를 분석하여 감정을 나타내는 특정 단어 및 문장을 찾아냅니다.</li>
                        <li>분석된 내용을 토대로 사용자의 현 상태와 가장 일치하는 감정을 결과로 출력합니다.</li>
                    </ul>
                    <br/>

                    <strong>3. 출력된 감정 결과를 바탕으로 이에 어울리는 콘텐츠를 추천합니다.</strong>
                    <ul className="dot-list">
                        <li>감정 결과를 기반으로 사용자의 감정을 긍정적인 방향으로 유도해주는 콘텐츠를 주제별로 3개 추천합니다.</li>
                        <li>만약 추천받은 콘텐츠가 마음에 들지 않는다면, 새로운 콘텐츠를 다시 추천받을 수 있습니다.</li>
                    </ul>
                    <br/>
                    
                    <strong>4. 저장된 감정 상태 및 추천 콘텐츠 기록들을 확인합니다.</strong>
                    <ul className="dot-list">
                        <li>회원가입 및 로그인 시 감정 상태 및 추천 결과를 <strong>MY MOOD</strong> 메뉴에 확인할 수 있습니다</li>
                        <li>나의 기록 화면에서 기록하고 싶은 내용 및 감정을 원하는 달력의 날짜에 입력 및 저장할 수 있습니다.</li>
                        <li>시간이 지남에 따라 바뀌어가는 감정 상태를 시각적으로 추적 및 확인해보세요.</li>
                    </ul>
                </div>
            </div>

            {/* FAQ (아코디언 방식) */}
            <div className="qa-block">
            <div className="question">FAQ</div>
                {faqList.map((item, index) => {
                const isOpen = openIndex === index;
                const isClosing = closingIndex === index;
                return (
                    <div key={index} className="faq-item">
                    <div className="faq-question" onClick={() => toggleAnswer(index)}>
                        {item.question}
                        <span className="arrow-icon">{isOpen ? "▲" : "▼"}</span>
                    </div>
                    <div className={`faq-answer-wrapper ${isOpen ? "open" : ""} ${isClosing ? "closing" : ""}`}>
                        {(isOpen || isClosing) && <p className="faq-answer">{item.answer}</p>}
                    </div>
                    </div>
                );
                })}
            </div>
        </div>
    );
}

export default Guide;
