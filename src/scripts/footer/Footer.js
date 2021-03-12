// ********* Footer HTML with year selector 
//   ***     parameter of total post count

export const Footer = (postTotal) => {
  // HTML for Footer to be returned to GiffyGram component
  return `
    <div class="footer__item">
        Posts since <select id="yearSelection">
            <option>2020</option>
            <option>2019</option>
            <option>2018</option>
            <option>2017</option>
        </select>
        <span id="postCount">${postTotal}</span>
    </div>
  `;
};
