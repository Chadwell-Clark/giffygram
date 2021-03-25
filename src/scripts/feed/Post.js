import { getLoggedInUser } from "../data/DataManager.js"
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
    <button id="delete__${postObject.id}">Delete</button>
        <button id="edit__${postObject.id}">Edit</button>
    `;
  }
  return `
      <section class="post">
        <header>
            <h2 class="post__title">${postObject.title}</h2>
        </header>
        <img class="post__image" src="${postObject.imageURL}" alt="${postObject.description}" />
        <p>Posted by: ${postObject.user.name}</p>
        <p>Posted : ${datePosted}</p>
       ${deleteEditBtns}
      </section>
    `;
};
