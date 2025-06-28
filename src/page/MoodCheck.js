import React, { useLayoutEffect, useRef, useState } from "react";
import "./MoodCheck.css";
import { useNavigate } from "react-router-dom";
import music from "../image/music.png";
import movie from "../image/movie.png";
import emotion from "../image/emotion.png";

function MoodCheck() {
    const navigate = useNavigate();

    return (
        <div className="Page-Design-MoodCheck">
            <div className="title-MoodCheck">
               원하는 활동을 선택하세요. 
            </div>
            <div className="article-MoodCheck">
                MOODI · TREE에서 다양한 활동을 체험하며, 현재의 감정 상태 확인 및<br/>
                콘텐츠 추천을 통하여 개인 맞춤형 활동을 추천받아 보세요. 
            </div>
            <div className="box">
                <div className="box-item" onClick={() => navigate("/Music")}>
                    <img src={music} alt="music" />
                    노래 추천
                </div>
                <div className="box-item" onClick={() => navigate("/Movie")}>
                    <img src={movie} alt="movie" />
                    영화 추천
                </div>
                <div className="box-item" onClick={() => navigate("/Survey")}>
                    <img src={emotion} alt="emotion" />
                    감정 설문조사
                </div>

            </div>
            
        </div>
    );
}

export default MoodCheck;

