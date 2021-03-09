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

EventElement.addEventListener("change", event => {
  if (event.target.id === "yearSelection") {
    const yearAsNumber = parseInt(event.target.value)
    console.log(`User wants to see posts since ${yearAsNumber}`);
  }
})

EventElement.addEventListener("click", event => {
  if (event.target.id === "directMessageIcon") {
    alert("!*! Warning this computer is infected with CIA !*!")
  }
})

EventElement.addEventListener("click", event => {
  if(event.target.id === "default") {
    alert("Peanut Butter Fingers!!!")
  }
})

EventElement.addEventListener("click", event => {
  console.log(event.target);
  if (event.target.id.startsWith("edit")) {
    console.log("post clicked", event.target.id.split("--"))
    console.log("The ID is: ", event.target.id.split("--")[1])

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
  const DOMTarget = document.querySelector("footer");
  console.log(Footer());
  DOMTarget.innerHTML = Footer();
}



const startGiffyGram = () => {
  showNavBar();
  showPostList();
  showFooter();
};


startGiffyGram();
