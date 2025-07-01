// 불필요한 useLayoutEffect, useRef 삭제
import React, { useState } from "react";
import "./MoodCheck.css";
import { useNavigate } from "react-router-dom";
import music from "../image/music.png";
import movie from "../image/movie.png";
import emotion from "../image/emotion.png";

function MoodCheck() {
    const navigate = useNavigate();
    const [hovered, setHovered] = useState(null);

    const items = [
        {
            key: "music",
            label: "노래 추천",
            description: "감정에 따라 어울리는 음악을 추천해드려요.",
            image: music,
            route: "/Music"
        },
        {
            key: "movie",
            label: "영화 추천",
            description: "지금 기분에 맞는 영화를 찾아드릴게요.",
            image: movie,
            route: "/Movie"
        },
        {
            key: "emotion",
            label: "감정 설문조사",
            description: "감정 상태를 파악할 수 있는 간단한 테스트입니다.",
            image: emotion,
            route: "/Survey"
        }
    ];

    const hoveredItem = items.find(item => item.key === hovered);

    return (
        <div className="Page-Design-MoodCheck">
            <div className="title-MoodCheck">
               원하는 활동을 선택하세요
            </div>
            <div className="article-MoodCheck">
                MOODI · TREE에서 다양한 활동을 체험하며, 현재의 감정 상태 확인 및<br/>
                콘텐츠 추천을 통하여 개인 맞춤형 활동을 추천받아 보세요. 
            </div>
            <div className="box">
                {items.map((item) => (
                    <div
                        key={item.key}
                        className={`box-item ${hovered && hovered !== item.key ? "dimmed" : ""}`}
                        onClick={() => navigate(item.route)}
                        onMouseEnter={() => setHovered(item.key)}
                        onMouseLeave={() => setHovered(null)}
                    >
                        <img src={item.image} alt={item.key} />
                        <div>{item.label}</div>
                    </div>
                ))}
            </div>

            <div className="hover-description">
                {hoveredItem ? hoveredItem.description : '\u00A0'}
            </div>
        </div>
    );
}

export default MoodCheck;
