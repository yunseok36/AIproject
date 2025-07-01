const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

let users = [];

app.get('/', (req, res) => {
  res.send('서버가 정상적으로 작동중입니다!');
});

app.post('/api/join', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: '모든 값을 입력하세요.' });
  }
  if (users.find(u => u.email === email)) {
    return res.status(409).json({ message: '이미 존재하는 이메일입니다.' });
  }
  users.push({ name, email, password });
  res.status(201).json({ message: '회원가입 성공' });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: '이메일 또는 비밀번호가 올바르지 않습니다.' });
  }
  res.json({ message: '로그인 성공', name: user.name });
});

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행중`);
});
