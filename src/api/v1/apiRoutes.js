const express = require("express");

//유튜브
const youtubeRoutes = require("../../modules/youtube/routes/youtubeRoutes");

const router = express.Router();

// YouTube 모듈 라우트 추가
router.use("/youtube", youtubeRoutes);

module.exports = router;
