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
// }
// let body = JSON.stringify(content)

// fetch("https://api.github.com/graphql", {
//   method: "POST",
//   headers: {
//     Authorization: `Bearer  ${process.env.REACT_APP_GH_TOKEN}`,
//     "Content-Type": "application/json",
//   },
//   body: body,
// })
//   .then((response) => response.json())
//   .then((data) => {
//     // res = JSON.stringify(data, null, 2);
//     vals = data.data.viewer.pinnedItems.edges
//     console.log(vals)
//   })
//   .catch((error) => {
//     console.log(error)
//   })

// fetch('https://api.github.com/users/ashakae/repos')
//   .then((response) => response.json())
//   .then((data) => console.log(data));
