import React, { useState } from "react";
import "./Guide.css";
import logo from "../image/logo_footer.png";
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
                <img src={logo} alt="logoimage" className="guide-image" />
                <h1 className="guide-title"><strong>MOODI · TREE</strong>에 대해 소개합니다</h1><br/>
                MOODI · TREE는 사용자가 현재의 감정을 인식하고 돌보도록 도와주는 서비스입니다.<br/>
                고도화된 감정 분석 모델을 상시 적용함으로써, 기존 감정 기반 서비스와 차별화된 정확도 및 맞춤형 추천 기능을 제공하고 있습니다.<br/>
                사용자가 자신의 감정을 보다 쉽게 이해하고, 스스로 진단하고 돌봐 긍정적의 방향으로 나아갈 수 있도록 지원합니다.<br/><br/>
                시간과 장소의 제약 없이 누구나, 언제 어디서나 감정을 진단하고 돌볼 수 있도록 목표하고 있으며,<br/>
                감정 기반 서비스에 대한 수요 증가에 발맞춰, MOODI · TREE는 보다 다양한 감정 케어 솔루션를 지속적으로 확장하고자 합니다.
            </div>

            <div className="page-line-guide">
                <span className="line"></span>
                <span className="star">✺✺✺</span>
                <span className="line"></span>
            </div>

            <div className="section-Guide">
                <div className="guide-description">
                    <div className="guide-subtitle">MOODI · TREE는 어떤 사이트인가요?</div>
                    <div className="dot-list">
                        MOODI-TREE는 현재의 감정 상태를 기반으로 다양한 콘텐츠를 추천하는 감정 기반 추천 플랫폼입니다.<br/>
                            사용자가 스트레스, 우울감, 불안 등 <strong>다양한 정서적 어려움을 겪고 있을 때</strong>, MOODI · TREE는 사용자를 도와 이를 <strong>극복하고 회복하는 것</strong>을 주 목표로 삼고 있습니다.<br/><br/>
                            현재의 감정 상태를 객관적으로 진단 및 인지시키고, 적합한 활동 콘텐츠를 제안함으로써 사용자의 감정의 회복과 자기 돌봄을 유도함과 동시에
                            자신의 감정을 보다 명확히 이해하고, 감정 관리 능력을 향상시키며, 심리적 웰빙을 증진할 수 있도록 도와줍니다.
                    </div>
                    <div className="guide-subtitle">MOODI · TREE는 어떠한 역할을 하나요?</div>
                    <div className="dot-list">
                        MOODI-TREE는 바쁜 일상 속에서 사용자가 언제어디서나 쉽게 감정을 진단할 수 있도록 도와주는 역할을 합니다.<br/>
                        시간과 비용의 제약으로 인해 정서적 지원을 받기 어려운 상태일 때, 실제 상담가와 유사하게 감정 표현을 분석 및 현재의 심리 상태를 객관적으로 파악하고, 그에 적합한 콘텐츠를 제안함으로써 심리적 안정과 정서적 회복을 돕습니다.<br/><br/>
                        이를 통해 MOODI · TREE는 누구나 손쉽게, <strong>언제 어디서나 자신의 감정을 돌볼 수 있는 환경을 구축하며, 일상 속에서의 심리적 웰빙을 실현</strong>하는 데 실질적인 역할을 하고 있습니다.
                    </div>
                    <div className="guide-subtitle">유사 사이트와의 비교점은 뭔가요?</div>
                        <div className="dot-list">
                            MOODI-TREE는 기존 감정 분석 플랫폼과 차별화된 접근 방식을 채택하여, <strong>AI 기반의 정밀한 감정 진단 서비스</strong>를 제공합니다.
                            사용자가 입력한 자유 텍스트 및 설문응답 데이터를 분석하여 실제 전문가처럼 감정을 인식 및 진단해줍니다.<br/><br/>
                            또한 단일 콘텐츠 유형에 국한되지 않고, 감정 상태에 따라 음악, 영화, 드라마 등 <strong>다양한 콘텐츠를 맞춤형으로 추천</strong>하며 더 나아가 감정 개선에 도움이 되는 신체 활동 및 일상 실천 과제까지 제안함으로써 전반적인 삶의 균형을 도모합니다.<br/><br/>
                            진단 결과 및 추천 콘텐츠는 <strong>일기 형식의 기록 기능</strong>을 통해 저장할 수 있으며, 저장된 기록들은 캘린터 형식으로 확인할 수 있어 감정의 변화를 시각적으로 추적하고, 장기적 감정 관리에 활용할 수 있습니다.
                        </div>
                    <div className="guide-subtitle">MOODI · TREE의 감정 분석은 어떻게 이루어지나요?</div>
                        <div className="flow-steps-centered">
                            {[
                                "감정 텍스트 입력",
                                "AI 자연어 처리",
                                "감정 분류",
                                "콘텐츠 매칭 및<br />추천"
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
                        <div className="guide-description">
                            <div className="dot-list">
                                MOODI · TREE는 감정 분석을 위해 <strong> 자연어 처리(NLP) 기술과 첨단 머신러닝 기반 분류 모델</strong>을 적극 활용합니다.
                                사용자가 입력한 텍스트 데이터를 심층적으로 분석하여, 단어와 문장의 미묘한 뉘앙스까지 포착하고 감정 상태를 정확하게 진단합니다.<br/><br/>
                                이를 통해 단순한 긍정·부정 구분을 넘어서 복합적이고 섬세한 감정들을 세밀하게 인식하며,
                                각 사용자에게 최적화된 맞춤형 콘텐츠 추천을 실시간으로 제공합니다.
                                이러한 고도화된 분석 기술 덕분에 MOODI · TREE는 사용자 개개인의 감정에 깊이 공감하고,
                                효과적인 감정 관리와 긍정적 변화에 기여할 수 있는 콘텐츠를 제안할 수 있습니다.
                            </div>    
                        </div>
                    </div>
            </div>

            <div className="page-line-guide">
                <span className="line"></span>
                <span className="star">✺✺✺</span>
                <span className="line"></span>
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
