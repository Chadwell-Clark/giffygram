export const getUsers = () => {
  return fetch("http://localhost:8088/users")
  .then((response) => response.json()
  );
  // If you are going to filter data it can be done here or elsewhere
  // .then((parsedResponse) => {
  //   // do something with response here
  //   return parsedResponse;
  // });
};

let postCollection = [];
export const usePostCollection = () => {
  //Best practice: we don't want to alter the original state, so
  //make a copy of it and then return it
  //The spread operator makes this quick work
  let postCollectionCopy = [...postCollection]
  return postCollectionCopy;
}

export const getPosts = () => {
  return fetch("http://localhost:8088/posts")
  .then((response) => response.json())
  .then(parsedResponse => {
      // do something with response here
      postCollection = parsedResponse;
      return parsedResponse;
  })
};

// const loggedInUser = {
// 	id: 1,
// 	name: "Bryan",
// 	email: "bryan@bn.com"
// }

// export const getLoggedInUser = () => {
// 	return loggedInUser;
// }
