import {getUsers , getPosts, getJoke} from "./data/DataManager.js";
import { PostList } from "./feed/PostList.js";
import { Joke } from "./feed/Joke.js";
/**
 * Main logic module for what should happen on initial page load for Giffygram
 */

//Get a reference to the location on the DOM where the app will display
// const postElement = document.querySelector(".postList");
// const navElement = document.querySelector("nav");
// const entryElement = document.querySelector(".entryForm");

const showPostList = () => {
  const postElement = document.querySelector(".postList");
	getPosts().then((allPosts) => {
		postElement.innerHTML = PostList(allPosts);
	})
}

const dadJoke = () => {
    const postElement = document.querySelector(".joke");
    getJoke().then(joke => {
        console.log("This is a DAD joke", joke)
        postElement.innerHTML = Joke(joke);
    });
}
document.querySelector(".joke-button").addEventListener("click", dadJoke);
/*
    This function performs one, specific task.

    1. Can you explain what that task is?
    2. Are you defining the function here or invoking it?
*/
const startGiffyGram = () => {
    showPostList();
}

// const startGiffyGram = () => {
//   postElement.innerHTML = "Hello Cohort 47";
//   getUsers()
//   .then(hotdog=> {
//       console.log("UserData: ", hotdog)
//   })

//   getPosts().then((hotdog) => {
//     console.log("PostData: ", hotdog);
//   });
// };

// Are you defining the function here or invoking it?
startGiffyGram();
