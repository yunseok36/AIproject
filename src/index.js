import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css'; // App.css를 임포트합니다.
import App from './App';
// reportWebVitals는 임포트하지 않습니다.

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// reportWebVitals() 함수는 호출하지 않습니다.