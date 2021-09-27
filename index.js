// require('dotenv').config();

// let content = {
//   query: `{
//   viewer {
//     pinnedItems(first: 6) {
//       edges {
//         node {
//           ... on Repository {
//             name
//             description
//             pushedAt
//             url
//             homepageUrl
//           }
//         }
//       }
//     }
//   }
// }
// `,
// };
// let body = JSON.stringify(content);

// fetch('https://api.github.com/graphql', {
//   method: 'POST',
//   headers: {
//     // Authorization: `Bearer  ${process.env.REACT_APP_GH_TOKEN}`,
//     Authorization: 'Bearer  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',
//     'Content-Type': 'application/json',
//   },
//   body: body,
// })
//   .then((response) => response.json())
//   .then((data) => {
//     // res = JSON.stringify(data, null, 2);
//     vals = data.data.viewer.pinnedItems.edges;
//     console.log(vals);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

const sendMail = (mail) => {
  //1.
  fetch('https://objective-borg-174efc.netlify.app/send', {
    method: 'post', //2.
    body: mail, //3.
  }).then((response) => {
    return response.json();
  });
};

const form = document.getElementById('contact-form');

const formEvent = form.addEventListener('submit', (event) => {
  event.preventDefault();

  let mail = new FormData(form);

  sendMail(mail);
});

// fetch('https://api.github.com/users/ashakae/repos')
//   .then((response) => response.json())
//   .then((data) => console.log(data));
