import { getUsers, getPosts, usePostCollection, getLoggedInUser, createPost } from "./data/DataManager.js";
import { PostList } from "./feed/PostList.js";
import { NavBar } from "./nav/NavBar.js";
import { Footer } from "./footer/Footer.js";
import { PostEntry } from "./feed/PostEntry.js";

//**************Creates Parent DOM Target for Page *******/
const eventElement = document.querySelector(".giffygram");

eventElement.addEventListener("click", event => {
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
eventElement.addEventListener("change", event => {
  if (event.target.id === "yearSelection") {
    const yearAsNumber = parseInt(event.target.value)
    console.log(`User wants to see posts since ${yearAsNumber}`);
    //invoke a filter function passing the year as an argument
    showFilteredPosts(yearAsNumber)
  }
})

eventElement.addEventListener("click", (event) => {
  if (event.target.id === "newPost__cancel") {
    //clear the input fields
  }
});

eventElement.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.id === "newPost__submit") {
    //collect the input values into an object to post to the DB
    const title = document.querySelector("input[name='postTitle']");
    const url = document.querySelector("input[name='postURL']");
    const description = document.querySelector(
      "textarea[name='postDescription']"
    );
    //we have not created a user yet - for now, we will hard code `1`.
    //we can add the current time as well
    const postObject = {
      title: title.value,
      imageURL: url.value,
      description: description.value,
      userId: getLoggedInUser.id,
      timestamp: Date.now(),
    };

    // be sure to import from the DataManager
    createPost(postObject).then(response => {
      console.log("JSON Response: ", response)
      showPostList();
      // title.value ="Title";
      // imageURL.value = "URL of gif";
      // description.value = "Story behind your gif...";
      showPostEntry();
    }
      )
  }
});

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


const showNavBar = () => {
  // Get DOM reference and save in a variable
  const DOMTarget = document.querySelector("nav");
  DOMTarget.innerHTML = NavBar();
}

const showFooter = (numPosts) => {
  // Get DOM reference and save in a variable
  const DOMTarget = document.querySelector("footer");
  console.log(numPosts);
  console.log(Footer(numPosts));
  DOMTarget.innerHTML = Footer(numPosts);
}


const showPostList = () => {
  // Get DOM reference and save in a variable
  getPosts().then((allPosts) => {
    postElement.innerHTML = PostList(allPosts);
    
  });
};
const showPostEntry = () => {
  //Get a reference to the location on the DOM where the nav will display
  const entryElement = document.querySelector(".entryForm");
  entryElement.innerHTML = PostEntry();
};
let total = 0;
const startGiffyGram = () => {
  showNavBar();
  showPostList();
  getPosts()
    .then(response => {
      total = usePostCollection();
      console.log(total);
    })
    .then(() => {
      showFooter(total.length)
    console.log(total.length);
  })
  showPostEntry();
};

startGiffyGram();
