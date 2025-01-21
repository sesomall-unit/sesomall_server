const axios = require("axios");
const config = require("../../../config/env");

const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3";

/**
 * 유튜브 채널의 모든 영상 ID 가져오기
 * @param {string} channelId - 유튜브 채널 ID
 * @param {number} maxResults - 가져올 최대 영상 수
 * @returns {Promise<{videoId: string, title: string}[]>} 영상 ID와 제목 배열
 */
async function fetchVideoIds(channelId, maxResults = 50) {
  try {
    const response = await axios.get(`${YOUTUBE_API_URL}/search`, {
      params: {
        part: "snippet",
        channelId,
        maxResults,
        key: config.youtubeApiKey,
        type: "video",
        order: "date", // 최신 동영상 순으로 정렬
      },
    });

    return response.data.items.map((item) => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
    }));
  } catch (error) {
    console.error(
      "Error fetching video IDs:",
      error.response?.data || error.message
    );
    throw new Error("영상 ID를 가져오는 중 오류가 발생했습니다.");
  }
}

/**
 * 특정 동영상의 댓글 가져오기
 * @param {string} videoId - 동영상 ID
 * @param {number} maxResults - 댓글 수
 * @returns {Promise<Object[]>} 댓글 데이터
 */
async function fetchComments(videoId, maxResults = 10) {
  try {
    const response = await axios.get(`${YOUTUBE_API_URL}/commentThreads`, {
      params: {
        part: "snippet",
        videoId,
        key: config.youtubeApiKey,
        maxResults,
        order: "time", // 최신 댓글 순서로 가져오기
      },
    });

    return response.data.items.map((item) => {
      const comment = item.snippet.topLevelComment.snippet;
      return {
        author: comment.authorDisplayName,
        text: comment.textDisplay,
        likeCount: comment.likeCount,
      };
    });
  } catch (error) {
    console.error(
      "Error fetching comments:",
      error.response?.data || error.message
    );
    throw new Error("댓글을 가져오는 중 오류가 발생했습니다.");
  }
}

/**
 * 유튜브 채널의 모든 영상 댓글 가져오기
 * @param {string} channelId - 유튜브 채널 ID
 * @param {number} maxVideos - 최대 영상 수
 * @param {number} maxComments - 각 영상당 최대 댓글 수
 * @returns {Promise<Object[]>} 모든 댓글 데이터와 제목
 */
async function fetchChannelComments(
  channelId,
  maxVideos = 10,
  maxComments = 10
) {
  try {
    const videoData = await fetchVideoIds(channelId, maxVideos);
    const allComments = [];

    for (const { videoId, title } of videoData) {
      const comments = await fetchComments(videoId, maxComments);
      allComments.push({
        videoId,
        title,
        comments,
      });
    }

    return allComments;
  } catch (error) {
    console.error(
      "Error fetching channel comments:",
      error.response?.data || error.message
    );
    throw new Error("채널 댓글을 가져오는 중 오류가 발생했습니다.");
  }
}

module.exports = {
  fetchVideoIds,
  fetchComments,
  fetchChannelComments,
};
