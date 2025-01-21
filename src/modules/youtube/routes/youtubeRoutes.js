const express = require("express");
const youtubeController = require("../controllers/youtubeController");

const router = express.Router();

/**
 * GET /api/v1/youtube/comments/:channelId
 */
router.get("/comments/:channelId", youtubeController.getChannelComments);

module.exports = router;
