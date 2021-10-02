import express from "express"
import fetch from "node-fetch"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app = express()
app.use(cors({ origin: "*" }))
app.use(express.static("public"))
app.set("view engine", "ejs")

const PORT = process.env.PORT || 7000

app.route("/").get(function (req, res) {
  let content = {
    query: `{
    viewer {
      pinnedItems(first: 6) {
        edges {
          node {
            ... on Repository {
              name
              description
              pushedAt
              url
              homepageUrl
              languages(first: 10) {
                nodes {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
  `,
  }
  let body = JSON.stringify(content)
  fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GH_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: body,
  })
    .then((response) => response.json())
    .then((data) => {
      let vals = data.data.viewer.pinnedItems.edges
      console.log(vals)

      // let an = vals[0].node
      // let stack = vals.node.languages
      // console.log(vals)
      // let tags = Object.values(stack)

      console.log(stack[0][0].name)

      let payload = {
        Description: "",
        toGit: "",
        toDemo: "",
      }
      for (let i = 0; i < 6; i++) {
        payload[`Description${i}`] = vals[i].node.description
        payload[`toGit${i}`] = vals[i].node.url
        payload[`toDemo${i}`] = vals[i].node.homepageurl
      }

      res.render("index", payload)
    })
    .catch((error) => {
      console.log(error)
    })
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`)
})
