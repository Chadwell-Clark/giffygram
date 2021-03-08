import { getUsers, getPosts } from "./data/DataManager.js";
import { PostList } from "./feed/PostList.js";
import { NavBar } from "./nav/NavBar.js";
import { Footer } from "./footer/Footer.js";

const EventElement = document.querySelector(".giffygram");

EventElement.addEventListener("click", event => {
  // console.log("event.target.id", event.target.id);
  if (event.target.id === "logout") {
    console.log("What did you do that for? You clicked on logout")
  }
})

const showPostList = () => {
  // Get DOM reference and save in a variable
  const postElement = document.querySelector(".postList");
  getPosts().then((allPosts) => {
    postElement.innerHTML = PostList(allPosts);
  });
};

const showNavBar = () => {
  // Get DOM reference and save in a variable
  const DOMTarget = document.querySelector("nav");
  DOMTarget.innerHTML = NavBar();
}

const showFooter = () => {
  // Get DOM reference and save in a variable
  const potato = document.querySelector("footer");
  console.log(Footer());
  potato.innerHtml = Footer();
}



const startGiffyGram = () => {
  showNavBar();
  showPostList();
  showFooter();
};


startGiffyGram();
