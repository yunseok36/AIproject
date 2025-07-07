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

        if (totalScore >= 28) {
            setKeywords(
                "지금은 휴식이 매우 필요할 때입니다. 가벼운 산책이나 좋아하는 취미 활동으로 몸과 마음을 회복해보세요. 충분한 수면과 자연 속에서의 시간도 큰 도움이 됩니다. 가능하다면 주말에는 가까운 공원을 찾아가 잠시라도 일상에서 벗어나보세요."
            );
            return "많은 피로와 무기력이 느껴집니다.";
        } else if (totalScore >= 24) {
            setKeywords(
                "스트레스를 줄이고 마음을 편히 가질 수 있는 활동이 필요합니다. 가벼운 운동이나 친구와의 대화, 음악 감상 등으로 기분 전환을 해보세요. 짧은 여행이나 새로운 카페를 찾아가보는 것도 기분 전환에 큰 도움이 될 수 있습니다."
            );
            return "약간의 무기력과 불안이 감지됩니다.";
        } else if (totalScore >= 16) {
            setKeywords(
                "일상에서의 작은 변화가 도움이 될 수 있습니다. 새로운 책이나 영화, 소소한 취미 활동으로 활력을 찾아보세요. 평소 가지 않던 곳을 산책하거나 새로운 음식을 시도해보는 것도 좋은 자극이 될 수 있습니다."
            );
            return "보통 수준의 감정 상태입니다.";
        } else if (totalScore >= 8) {
            setKeywords(
                "전반적으로 안정적인 상태입니다. 지금의 긍정적인 상태를 유지하며 가벼운 운동과 취미 활동으로 에너지를 더해보세요. 주기적으로 휴식을 취하고 스스로를 칭찬해주는 것도 지금의 좋은 상태를 유지하는 데 큰 도움이 됩니다."
            );
            return "안정적인 상태로 보입니다.";
        } else {
            setKeywords(
                "매우 안정적이고 긍정적인 상태입니다! 새로운 도전이나 취미 생활을 통해 이 에너지를 이어가보세요. 자원봉사나 새로운 만남도 큰 활력이 될 수 있습니다. 이 긍정적인 기운을 주변 사람들과 나누며 더 큰 만족감을 느껴보세요."
            );
            return "매우 안정적인 상태로 보입니다.";
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
                                    disabled={submitted}
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