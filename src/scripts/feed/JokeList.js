import { Joke } from "./Joke.js";

export const JokeList = (joke) => {
  
  //  invoke the Joke component which returns HTML representation
  // let jokeHTML = ""
    //what is a jokeObject?
   let jokeHTML = Joke(joke);
   return jokeHTML;
  }

