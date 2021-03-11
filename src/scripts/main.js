import { getUsers, getPosts, usePostCollection } from "./data/DataManager.js";
import { PostList } from "./feed/PostList.js";
import { NavBar } from "./nav/NavBar.js";
import { Footer } from "./footer/Footer.js";

const EventElement = document.querySelector(".giffygram");

EventElement.addEventListener("click", event => {
  console.log("event:", event);
  if (event.target.id === "logout") {
    console.log("What did you do that for? You clicked on logout")
  } else if (event.target.id.startsWith("edit")) {
    console.log("post clicked", event.target.id.split("--"))
    console.log("The ID is: ", event.target.id.split("--")[1])
  } else if(event.target.id === "default") {
    console.log("Peanut Butter Fingers!!!")
  } else if (event.target.id === "directMessageIcon") {
      alert("!*! Warning this computer is infected with CIA !*!")
    }
});
// EventElement.addEventListener("mousemove", event => {
//   console.log(event);
// })
EventElement.addEventListener("change", event => {
  if (event.target.id === "yearSelection") {
    const yearAsNumber = parseInt(event.target.value)
    console.log(`User wants to see posts since ${yearAsNumber}`);
    //invoke a filter function passing the year as an argument
    showFilteredPosts(yearAsNumber)
  }
})
const postElement = document.querySelector(".postList");
const showFilteredPosts = (year) => {
  //get a copy of the post collection
  const epoch = Date.parse(`01/01/${year}`);
  //filter the data
  const filteredData = usePostCollection().filter(singlePost => {
    if (singlePost.timestamp >= epoch) {
      return singlePost
    }
  })
  postElement.innerHTML = PostList(filteredData);
}

let postTotal = "";
const showPostList = () => {
  // Get DOM reference and save in a variable
  getPosts().then((allPosts) => {
    postTotal = allPosts.length;
    console.log(postTotal);
    postElement.innerHTML = PostList(allPosts);
    return postTotal;
  });
};

const showNavBar = () => {
  // Get DOM reference and save in a variable
  const DOMTarget = document.querySelector("nav");
  DOMTarget.innerHTML = NavBar();
}

const showFooter = (postTotal) => {
  // Get DOM reference and save in a variable
  const DOMTarget = document.querySelector("footer");
  console.log(postTotal);
  console.log(Footer(postTotal));
  DOMTarget.innerHTML = Footer(postTotal);
}

const startGiffyGram = () => {
  showNavBar();
  showPostList();
  showFooter(postTotal);
};

startGiffyGram();
