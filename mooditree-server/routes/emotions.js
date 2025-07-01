const express = require('express');
const router = express.Router();
const Emotion = require('../models/Emotion');

// 감정일기 저장
router.post('/', async (req, res) => {
  try {
    const { userId, date, emotion, note } = req.body;
    const newEmotion = new Emotion({ userId, date, emotion, note });
    await newEmotion.save();
    res.status(201).json(newEmotion);
  } catch (err) {
    res.status(500).json({ error: '감정 저장 실패' });
  }
});

// 특정 유저의 감정일기 조회
router.get('/:userId', async (req, res) => {
  try {
    const emotions = await Emotion.find({ userId: req.params.userId }).sort({ date: -1 });
    res.json(emotions);
  } catch (err) {
    res.status(500).json({ error: '감정 조회 실패' });
  }
});

module.exports = router;
