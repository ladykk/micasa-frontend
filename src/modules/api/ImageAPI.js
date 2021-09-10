const baseUrl = require("./API");

const getAvatarURL = (avatar_id) => {
  return `${baseUrl}/images/avatar/${avatar_id}`;
};

const getImageURL = (image_id) => {
  if (image_id) {
    return `${baseUrl}/images/${image_id}`;
  } else {
    return null;
  }
};

module.exports = {
  getAvatarURL,
  getImageURL,
};
