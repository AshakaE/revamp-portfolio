import express from "express"
import fetch from "node-fetch"
import cors from "cors"
import dotenv from "dotenv"
import { dirname } from "path"
import { fileURLToPath } from "url"

dotenv.config()

const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
app.use(cors({ origin: "*" }))
app.use(express.static(`${__dirname}/public`))

const PORT = process.env.PORT || 7000
//make the contact page the the first page on the app
// app.use("/public", static(process.cwd() + "/public"))

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
      // let ves = JSON.stringify(data, null, 2)
      let vals = data.data.viewer.pinnedItems.edges
      console.log(typeof vals)
      let an = vals[0].node.name
      res.status(200).send({ an })
    })
    .catch((error) => {
      console.log(error)
    })
  // res.sendFile(process.cwd() + "/public/index.html")
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`)
})
