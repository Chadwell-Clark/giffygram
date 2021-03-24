//   ***  Post entry HTML input form  ready for export  
//   ***  Original below  ***   //
export const PostEntry = () => {
  return `
        <form class="newPost">
            <div>
                <input value=""
                       name="postTitle"
                       class="newPost__input"
                       type="text"
                       placeholder="Title" />
            </div>
            <div>
                <input value=""
                       name="postURL"
                       class="newPost__input"
                       type="text"
                       placeholder="URL of gif" />
            </div>

            <textarea name="postDescription"
                class="newPost__input newPost__description"
                placeholder="Story behind your gif..."></textarea>

            <button id="newPost__submit">Save</button>
            <button id="newPost__cancel">Cancel</button>
        </form>
        `;
};


// //   !!!  Refactor Below  !!!   //

// let title, imgURL, desc, postPartA, postPartC = "";

// export const PostEntry = (postObj) => {
//     if (postObj === undefined) {
//        title, imgURL, desc ="";
//         postPartA = `<form class="newPost">`;
//         postPartC = `<button id="newPost__submit">Save</button>
//             <button id="newPost__cancel">Cancel</button>
//         </form>`;
//     } else {
//         postPartA = `<div class="newPost">
// 	        <h3>Edit This Post</h3>`;
//         postPartC = `<input type="hidden" value="${postObj.id}" name="postId">
// 		    <input type="hidden" value="${postObj.timestamp}" name="postTime">	
// 		    <button id="updatePost__${postObj.id}">Update</button>
// 		    <button id="newPost__cancel">Cancel</button>
// 	        </div>`;
//     title = postObj.title;
//     imgURL = postObj.imageURL;
//     desc = postObj.description;
//     }
//     console.log ("title: ", title, "IMG: ", imgURL, "description: ", desc)
//     return `
//     ${postPartA}
//     <div>
// 			<input value="${title}"
// 				   name="postTitle"
// 				   class="newPost__input"
// 				   type="text"
// 				   placeholder="Title" />
// 		</div>
// 		<div>
// 			<input value="${imgURL}"
// 				   name="postURL"
// 				   class="newPost__input"
// 				   type="text"
// 				   placeholder="URL of gif" />
// 		</div>

//     	<textarea name="postDescription"
//     	class="newPost__input newPost__description"
//     	placeholder="Story behind your gif...">${desc}</textarea>
//         ${postPartC}
//     `;
// }
