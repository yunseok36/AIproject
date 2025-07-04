const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = 4000;

// 1. MongoDB 연결
mongoose.connect(
  'mongodb+srv://ljh9236032:1234@mooditree.1s0a6qd.mongodb.net/?retryWrites=true&w=majority&appName=MOODITREE',
  { dbName: 'MOODITREE' }
)
.then(() => console.log('몽고디비 연결 성공!'))
.catch(err => console.error('MongoDB 연결 에러:', err));

// 2. User 스키마 및 모델 정의
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});
const User = mongoose.model('User', userSchema);

// 3. Emotion 모델 불러오기 (models/Emotion.js)
const Emotion = require('./models/Emotion');

app.use(cors());
app.use(express.json());

// 서버 기본 라우트
app.get('/', (req, res) => {
  res.send('서버가 정상적으로 작동중입니다!');
});

// 회원가입
app.post('/api/join', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: '모든 값을 입력하세요.' });
  }
  try {
    const exist = await User.findOne({ email });
    if (exist) return res.status(409).json({ message: '이미 존재하는 이메일입니다.' });
    await User.create({ name, email, password });
    res.status(201).json({ message: '회원가입 성공' });
  } catch (e) {
    res.status(500).json({ message: '서버 에러', error: e.message });
  }
});

// 로그인
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ message: '이메일 또는 비밀번호가 올바르지 않습니다.' });
    res.json({ message: '로그인 성공', name: user.name, email: user.email });
  } catch (e) {
    res.status(500).json({ message: '서버 에러', error: e.message });
  }
});

// 감정 저장 (POST)
app.post('/api/emotion', async (req, res) => {
  const { email, emotion, label, date } = req.body;
  if (!email || !emotion || !label || !date) {
    return res.status(400).json({ message: '필수값 누락' });
  }
  try {
    await Emotion.create({ email, emotion, label, date });
    res.status(201).json({ message: '감정 저장 완료' });
  } catch (e) {
    res.status(500).json({ message: '서버 오류', error: e.message });
  }
});

// 감정 이력 조회 (GET)
app.get('/api/emotion', async (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ message: '이메일이 필요합니다.' });
  }
  try {
    const list = await Emotion.find({ email }).sort({ date: -1 }); // 최신순
    res.json({ message: '감정 조회 성공', emotions: list });
  } catch (e) {
    res.status(500).json({ message: '서버 오류', error: e.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행중`);
});
