
export const cloudinary = require("cloudinary").v2
cloudinary.config({
  cloud_name: "dx8erzov8",
  api_key: "589783353425658",
  api_secret: "EwUtq7RD4DqTyH5f61na_F10jJk",
});

module.exports = cloudinary.uploader;
