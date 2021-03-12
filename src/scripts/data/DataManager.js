//   ***  Data Manager   GET users and posts from  JSON Server or API
//   ***    POST  entries to JSON database     
//   ***    Keeps track of logged in user      

//   ***  GET users from JSON database and export
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

//   ***  Variable for post entry database   
let postCollection = [];

//   ***  Create copy of current user database for use and export   
export const usePostCollection = () => {
  //Best practice: we don't want to alter the original state, so
  //make a copy of it and then return it
  //The spread operator makes this quick work
  // let postCollectionCopy = [...postCollection]
  return [...postCollection];
}

//   ***  GET Post entries for current User  
//   ***    from JSON database and export  
export const getPosts = () => {
  return fetch("http://localhost:8088/posts")
  .then((response) => response.json())
  .then(parsedResponse => {
      // do something with response here
      postCollection = parsedResponse;
      return parsedResponse;
  })
};

//   ***   POST new post entry to the JSON database  and export  
export const createPost = (postObj) => {
  return fetch("http://localhost:8088/posts", {
    method: "POST",                   //   ***  Include minimal needed information
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postObj),  //   ***  Stringify to JSON Format
  }).then((response) => response.json()); //   ***  Recieve response from JSON sever
};

//   ***  Current user object for testing   
const loggedInUser = {
	id: 1,
	name: "Bryan",
	email: "bryan@bn.com"
}


//   ***  Get Logged in User and Export   
export const getLoggedInUser = () => {
	return {...loggedInUser};
}
