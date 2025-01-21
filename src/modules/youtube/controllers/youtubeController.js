const youtubeService = require("../services/youtubeService");

/**
 * 특정 유튜브 채널의 모든 영상 댓글 가져오기
 * @route GET /api/v1/youtube/comments/:channelId
 */
const getChannelComments = async (req, res) => {
  const { channelId } = req.params;
  const { maxVideos = 5, maxComments = 10 } = req.query;

  try {
    const comments = await youtubeService.fetchChannelComments(
      channelId,
      maxVideos,
      maxComments
    );
    res.success(comments, "유튜브 채널 댓글을 성공적으로 가져왔습니다.");
  } catch (error) {
    res.error(error);
  }
};

module.exports = {
  getChannelComments,
};
