import React, { useState } from "react";
import "./Contact.css";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    inquiryType: "",
    responseMethod: "",
    newsletterAgreed: false,
    file: null
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else if (type === "file") {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("폼 제출 데이터:", form);

    alert("문의가 제출되었습니다. 감사합니다!");
    // TODO: 서버 전송 로직 추가 필요 (formData 등)

    // 폼 초기화
    setForm({
      name: "",
      email: "",
      message: "",
      inquiryType: "",
      responseMethod: "",
      newsletterAgreed: false,
      file: null
    });
  };

  return (
    <div className="contact-page">
      <h1 className="contact-title">Please contact us</h1>
      <p className="contact-intro">
        MOODI-TREE는 여러분의 감정을 더 깊이 이해하고,
        <br />
        보다 정교한 콘텐츠 추천을 위해 항상 귀 기울이고 있습니다.
        <br />
        문의사항이나 개선 의견을 자유롭게 남겨주세요.
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="이름"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="이메일"
          value={form.email}
          onChange={handleChange}
          required
        />
        <select
          name="inquiryType"
          value={form.inquiryType}
          onChange={handleChange}
          required
        >
          <option value="">문의 유형을 선택하세요</option>
          <option value="bug">버그 신고</option>
          <option value="feature">기능 제안</option>
          <option value="emotion">감정 분석 관련</option>
          <option value="other">기타</option>
        </select>
        <textarea
          name="message"
          placeholder="문의 내용"
          rows="6"
          value={form.message}
          onChange={handleChange}
          required
        />
        <div className="file-upload">
          <label>
            <input
              type="file"
              name="file"
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="radio-group">
          <label>답변 방법:</label>
          <label>
            <input
              type="radio"
              name="responseMethod"
              value="email"
              checked={form.responseMethod === "email"}
              onChange={handleChange}
            />
            이메일
          </label>
          <label>
            <input
              type="radio"
              name="responseMethod"
              value="sms"
              checked={form.responseMethod === "sms"}
              onChange={handleChange}
            />
            SMS
          </label>
          <label>
            <input
              type="radio"
              name="responseMethod"
              value="none"
              checked={form.responseMethod === "none"}
              onChange={handleChange}
            />
            답변 불필요
          </label>
        </div>
        <label className="newsletter-checkbox">
          <input
            type="checkbox"
            name="newsletterAgreed"
            checked={form.newsletterAgreed}
            onChange={handleChange}
          />
          뉴스레터 및 후속 안내 수신에 동의합니다.
        </label><br/>
        <button type="submit">전송하기</button>
      </form>
    </div>
  );
}

export default Contact;