export const imageSource = (user) => {
  if (user.image) {
    return user.image.url;
  } else {
    return "/images/defaultPeople.png";
  }
};

export const checkForLikes = (post) => {
  if (post.likes.length === 1) {
    return "like";
  } else {
    return "likes";
  }
};

export const checkForComments = (post) => {
  if (post.comments.length === 1) {
    return "comment";
  } else {
    return "comments";
  }
};

export const checkForFollowers = (user) => {
  if (user.followers && user.followers.length === 1) {
    return "Follower";
  } else {
    return "Followers";
  }
};
