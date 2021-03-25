//   ***  Import from modules functions needed
import {
  getPosts,
  usePostCollection,
  getLoggedInUser,
  createPost,
  deletePost,
  updatePost,
  getSinglePost,
  logoutUser,
  loginUser,
  setLoggedInUser,
  registerUser,
  getSingleUserPosts,
  postLike,
  getLikes
  
} from "./data/DataManager.js";
import { PostList } from "./feed/PostList.js";
import { NavBar } from "./nav/NavBar.js";
import { Footer } from "./footer/Footer.js";
import { PostEntry } from "./feed/PostEntry.js";
import { LoginForm } from "./auth/LoginForm.js";
import { RegisterForm } from "./auth/RegisterForm.js";

//**************Creates Parent DOM Target for Page *******/
const eventElement = document.querySelector(".giffygram");

//   ***   Click event handlers for  Nav events
eventElement.addEventListener("click", (event) => {
     if (event.target.id === "logout") {
       logoutUser();
       console.log(getLoggedInUser());
       sessionStorage.clear();
       checkForUser();
     }
   else if (event.target.id === "default") {
    console.log("Peanut Butter Fingers!!!");
  } else if (event.target.id === "directMessageIcon") {
    alert("!*! Warning this computer is infected with CIA !*!");
  } else if (event.target.id === "loggedInUsersPosts") {
    console.log("get single user posts")
    getSingleUserPosts()
    .then(userPosts => {
      postElement.innerHTML = PostList(userPosts);
    })
  }
});

//   ***  Change event handler for Footer Year selector
eventElement.addEventListener("change", (event) => {
  if (event.target.id === "yearSelection") {
    const yearAsNumber = parseInt(event.target.value);
    // console.log(`User wants to see posts since ${yearAsNumber}`);
    //invoke a filter function passing the year as an argument
    showFilteredPosts(yearAsNumber);
  }
});

//   ***  Click Event Handler for Edit button  ***   //
eventElement.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.id.startsWith("edit")) {
    window.scrollTo(0, 0);
    const postId = event.target.id.split("__")[1];
    getSinglePost(postId)
    .then((response) => {
      showEdit(response);
    });
  }
});


//   ***   Click event handler for cancelling  a post entry  ***   //
eventElement.addEventListener("click", (event) => {
  if (event.target.id === "newPost__cancel") {
    //clear the input fields
    showPostEntry();
  }
});

//   ***   Click event handler for deleting a post entry  ***   //
eventElement.addEventListener("click", event => {
  event.preventDefault();
  if (event.target.id.startsWith("delete")) {
    const postId = event.target.id.split("__")[1];
    debugger
    deletePost(postId)
    .then(response => {
      showPostList();
    })
  }
})

//   ***  Click event handler for update a post entry
eventElement.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.id.startsWith("updatePost")) {
    const postId = event.target.id.split("__")[1];
    //collect all the details into an object
    const title = document.querySelector("input[name='postTitle']").value;
    const url = document.querySelector("input[name='postURL']").value;
    const description = document.querySelector(
      "textarea[name='postDescription']"
    ).value;
    const timestamp = document.querySelector("input[name='postTime']").value;

    const postObject = {
      title: title,
      imageURL: url,
      description: description,
      userId: getLoggedInUser().id,
      timestamp: parseInt(timestamp),
      id: parseInt(postId),
    };
    showPostEntry();
    updatePost(postObject).then((response) => {
      showPostList();
    });
  }
});

//   ***  Click event listener for submitting a new post entry from form
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
      userId: getLoggedInUser().id,
      timestamp: Date.now(),
    };

    // be sure to import from the DataManager
    createPost(postObject).then((response) => {
      console.log("JSON Response: ", response);
      showPostList();
      // Reset post entry form to default placeholders
      showPostEntry();
    });
  }
});

//   ***  Click event handler for submitting a like to a post
eventElement.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.id.startsWith("like")) {
    const likeObject = {
      postId: event.target.id.split("__")[1],
      userId: getLoggedInUser().id,
    };
    postLike(likeObject).then(() => {
      console.log('likeObject', likeObject);
      getLikes(likeObject.postId).then((response) => {
        document.querySelector(
          `#likes__${likeObject.postId}`
        ).innerHTML = `🌞  ${response.length}`;
      });
    })
  }
});


//   ***  Render navbar in DOM at nav DOM target tag
const showNavBar = () => {
  // Get DOM reference and save in a variable
  const DOMTarget = document.querySelector("nav");
  DOMTarget.innerHTML = NavBar();
};

//   ***  Render footer in DOM at footer DOM target tag
const showFooter = (numPosts) => {
  // Get DOM reference and save in a variable
  const DOMTarget = document.querySelector("footer");
  // console.log(numPosts);
  // console.log(Footer(numPosts));
  DOMTarget.innerHTML = Footer(numPosts);
};

//   ***   Get DOM reference target class and save in variable
const postElement = document.querySelector(".postList");

//   ***  Render filtered by year posts in DOM at postList DOM target class
const showFilteredPosts = (year) => {
  //get a copy of the post collection
  const epoch = Date.parse(`01/01/${year}`);
  //filter the data
  const filteredData = usePostCollection().filter((singlePost) => {
    if (singlePost.timestamp >= epoch) {
      return singlePost;
    }
  });
  postElement.innerHTML = PostList(filteredData);
};

//   ***  Render full user post list in DOM at postlist DOM target class
const showPostList = () => {
  // Get DOM reference and save in a variable
  getPosts().then((allPosts) => {
    postElement.innerHTML = PostList(allPosts);
  });
};

//   ***  Render Post entry form in DOM  at entryForm DOM target class
const showPostEntry = () => {
  //Get a reference to the location on the DOM where the nav will display
  const entryElement = document.querySelector(".entryForm");
  entryElement.innerHTML = PostEntry();
};
//   ***  Click Event handler for submit button  ***   //
eventElement.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.id === "login__submit") {
    //collect all the details into an object
    const userObject = {
      name: document.querySelector("input[name='name']").value,
      email: document.querySelector("input[name='email']").value,
    };
    loginUser(userObject).then((dbUserObj) => {
      if (dbUserObj) {
        sessionStorage.setItem("user", JSON.stringify(dbUserObj));
        startGiffyGram();
      } else {
        //got a false value - no user
        const entryElement = document.querySelector(".entryForm");
        entryElement.innerHTML = `<p class="center">That user does not exist. Please try again or register for your free account.</p> ${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
      }
    });
  }
});

//   ***  Click Event handler for Register submit button  ***   //
eventElement.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.id === "register__submit") {
    //collect all the details into an object
    const userObject = {
      name: document.querySelector("input[name='registerName']").value,
      email: document.querySelector("input[name='registerEmail']").value,
    };
    registerUser(userObject).then((dbUserObj) => {
      sessionStorage.setItem("user", JSON.stringify(dbUserObj));
      startGiffyGram();
    });
  }
});

//   ***  Function to check for user in sessionStorage  ***   //
//   ***  If there is a user setLoggedInUser to user  ***   //
//   ***  If not get user to login or register  ***   //
const checkForUser = () => {
  if (sessionStorage.getItem("user")) {
    //   ***  setLoggedInUser(expects object)
    //   ***   get user item from sessionStorage
    //   ***  parse session storage string into an object
    setLoggedInUser(JSON.parse(sessionStorage.getItem("user")));
    startGiffyGram();
  } else {
   showLoginRegister();
  }
};

//   ***  Show Login/Register forms if no one is logged in  ***   //
const showLoginRegister = () => {
  showNavBar();
  const entryElement = document.querySelector(".entryForm");
  //template strings can be used here too
  entryElement.innerHTML = `${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
  //make sure the post list is cleared out too
  const postElement = document.querySelector(".postList");
  postElement.innerHTML = "";
};

//   ***  Show Post Entry with edit options enabled  ***   //
const showEdit = (postObj) => {
  const entryElement = document.querySelector(".entryForm");
  entryElement.innerHTML = PostEntry(postObj);
};

//   ***  Create variable to hold total post and set to 0
let total = 0;
//   ***  Function to initiate  DOM rendering sequence
const startGiffyGram = () => {
  showNavBar();
  showPostList();
  //get the total number of posts may be able refactor this
  getPosts()
    .then((response) => {
      total = usePostCollection();
      // console.log(total);
    })
    .then(() => {
      showFooter(total.length);
      // console.log(total.length);
    });

  showPostEntry();
};

// //   ***  Start GiffyGram App
// startGiffyGram();


checkForUser();
