import { getLoggedInUser, getLikes } from "../data/DataManager.js"
//   ***  Function to get the number of likes for each post
const getNumberOfLikes = (postId) => {
  getLikes(postId).then((response) => {
    document.querySelector(`#likes__${postId}`).innerHTML = `🌞  ${response.length}`;
  });
};

//   ***  Exports Post formatting of post entry object that is passed in
//   ***    Uses properties of that object to fill in approriate data

export const Post = (postObject) => {
  // console.log("Post-object: ", postObject)
  const date = new Date(postObject.timestamp);
  const datePosted = `${date
    .toLocaleString("en-US", { weekday: "short" })
    .toUpperCase()} ${
    date.getMonth() + 1
  }/${date.getDate()}/${date.getFullYear()} ${date.getHours()
  }:${date.getMinutes()}:${date.getSeconds()}`;

  // console.log(datePosted);
  const loggedInUser = getLoggedInUser();
  let deleteEditBtns = ""
  if (loggedInUser.id === postObject.userId) {
    deleteEditBtns = `
    <div><button id="delete__${postObject.id}">Delete</button></div>
        <div><button id="edit__${postObject.id}">Edit</button></div>
    `;
  }
  return `
      <section class="post">
        <header>
            <h2 class="post__title">${postObject.title}</h2>
        </header>
        <img class="post__image" src="${postObject.imageURL}" alt="${
    postObject.description
  }" />
        <div><p>${postObject.user.name}</p></div>
        <div><p>${datePosted}</p></div>
        <div class="postBtns">
       <div>${deleteEditBtns}</div>
       <button id="like__${postObject.id}">Like</button>
       <p id="likes__${postObject.id}">🌞 ${getNumberOfLikes(postObject.id)}</p>
       <div>
      </section>
    `;
};
