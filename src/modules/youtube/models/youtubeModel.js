const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");

const YouTubeComment = sequelize.define("YouTubeComment", {
  videoId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  likeCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = YouTubeComment;
