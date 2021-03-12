//   ***  Imports formatted post objects  and appends them into a HTML 
//   ***    Collection and exports them for insertion in the DOM

import { Post } from "./Post.js";

export const PostList = (allPosts) => {
  let postHTML = "";
  //Loop over the array of posts and for each one, invoke the Post component which returns HTML representation
  for (const postObject of allPosts) {
    //what is a postObject?
    postHTML += Post(postObject);
  }
  return postHTML;
};
