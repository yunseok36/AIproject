import { useState } from "react";
import { Link } from "react-router-dom";
import "./MoodSurvey.css";

const questions = [
    "요즘 일상에서 쉽게 피로를 느낀다.",
    "최근에 무기력하거나 아무것도 하기 싫은 기분이 든다.",
    "사소한 일에도 예민하거나 짜증이 난다.",
    "기분이 이유 없이 가라앉는 것 같다.",
    "누군가와 이야기하고 싶은 마음이 든다.",
    "최근 웃거나 즐거웠던 순간이 기억나지 않는다.",
    "나 자신이 쓸모없게 느껴진 적이 있다.",
    "마음을 안정시키고 싶다는 생각이 든다.",
];

const MoodSurvey = () => {
    const [answers, setAnswers] = useState(Array(questions.length).fill(0));
    const [submitted, setSubmitted] = useState(false);
    const [result, setResult] = useState("");
    const [keywords, setKeywords] = useState("");

    const handleSelect = (qIdx, value) => {
        const newAnswers = [...answers];
        newAnswers[qIdx] = value;
        setAnswers(newAnswers);
    };

    const analyzeMood = () => {
        const totalScore = answers.reduce((a, b) => a + b, 0);
        if (totalScore >= 32) {
            setKeywords("무기력 / 우울 / 피로감 / 회피");
            return "현재 피로와 무기력이 많이 느껴지는 상태입니다.";
        } else if (totalScore >= 24) {
            setKeywords("불안 / 걱정 / 예민함 / 혼란");
            return "약간의 무기력과 불안이 감지됩니다.";
        } else if (totalScore >= 16) {
            setKeywords("스트레스 / 일시적 감정 / 변화");
            return "보통 수준의 감정 상태입니다.";
        } else {
            setKeywords("안정 / 여유 / 긍정 / 활력");
            return "전반적으로 안정적인 상태로 보입니다.";
        }
    };

    const handleSubmit = () => {
        if (answers.includes(0)) {
            alert("모든 문항에 응답해 주세요.");
            return;
        }

        const moodResult = analyzeMood();
        setResult(moodResult);
        setSubmitted(true);
    };

    const resetSurvey = () => {
        setAnswers(Array(questions.length).fill(0));
        setSubmitted(false);
        setResult("");
        setKeywords("");
    };

    return (
        <div className="mood-page">
            <h2 className="mood-title">오늘의 기분을 알아볼까요?</h2>
            <p className="mood-description">
                아래 문항에 답하면서 현재 감정을 알아보세요.<br />
                결과에 따라 당신에게 딱 맞는 콘텐츠를 추천해드립니다.
            </p>

            <div className="survey-table">
                <div className="survey-header">
                    <div className="question-col-header"></div>
                    {[1, 2, 3, 4, 5].map((v) => (
                        <div className="score-col-header" key={v}>{v}</div>
                    ))}
                </div>
                {questions.map((q, i) => (
                    <div className="survey-row" key={i}>
                        <div className="question-col">Q{i + 1}. {q}</div>
                        {[1, 2, 3, 4, 5].map((v) => (
                            <div className="score-col" key={v}>
                                <input
                                    type="radio"
                                    name={`q${i}`}
                                    value={v}
                                    checked={answers[i] === v}
                                    onChange={() => handleSelect(i, v)}
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {!submitted ? (
                <button className="button-primary" onClick={handleSubmit}>설문하기</button>
            ) : (
                <>
                    <div className="result-message">{result}</div>
                    <p className="result-sub">{keywords}</p>
                    <div className="result-actions">
                        <button className="button-primary" onClick={resetSurvey}>다시 설문하기</button>
                        <Link to="/" className="button-primary">직접 입력하기</Link>
                        <Link to="/MoodCheck" className="button-primary">콘텐츠로 가기</Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default MoodSurvey;