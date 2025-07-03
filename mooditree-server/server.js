const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const emotionRoutes = require('./routes/emotions');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/emotions', emotionRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB 연결 성공"))
.catch((err) => console.error("❌ MongoDB 연결 실패:", err));

app.listen(PORT, () => {
  console.log(`🚀 서버 실행 중: http://localhost:${PORT}`);
});
