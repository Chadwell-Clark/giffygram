//   ***  Exports Post formatting of post entry object that is passed in
//   ***    Uses properties of that object to fill in approriate data

export const Post = (postObject) => {
  return `
      <section class="post">
        <header>
            <h2 class="post__title">${postObject.title}</h2>
        </header>
        <img class="post__image" src="${postObject.imageURL}" alt="${postObject.description}" />
        <button id="delete__${postObject.id}">Delete</button>
        <button id="edit__${postObject.id}">Edit</button>
      </section>
    `;
};
