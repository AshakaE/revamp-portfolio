import express from "express"
import fetch from "node-fetch"
import cors from "cors"
import nodemailer from "nodemailer"
import multiparty from "multiparty"
import dotenv from "dotenv"

dotenv.config()

const app = express()
app.use(cors({ origin: "*" }))
app.use(express.static("public"))
app.set("view engine", "ejs")

const PORT = process.env.PORT || 7000

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
    accessToken: process.env.ACCESS_TOKEN,
    expires: process.env.EXPIRY_DATE,
  },
})

transporter.verify(function (error, success) {
  if (error) {
    console.log(error)
  } else {
    console.log("Server is ready to take our messages")
  }
})

app.post("/send", (req, res) => {
  let form = new multiparty.Form()
  let data = {}
  form.parse(req, function (err, fields) {
    console.log(fields)
    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString()
    })
    console.log(data)
    const mail = {
      sender: `Mail from ${data.email} - ${data.name}`,
      to: process.env.EMAIL,
      subject: data.subject,
      text: `\n ${data.name} <${data.email}> \n${data.message}`,
    }
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        console.log(err)
        res.status(500).send("Something went wrong.")
      } else {
        res.status(200).send("Email successfully sent to recipient!")
      }
    })
  })
})

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

      let payload = {
        Description: "",
        toGit: "",
        toDemo: "",
        stacks: "",
        mediaUrl: "",
      }
      for (let i = 0; i < 6; i++) {
        payload[`Description${i}`] = vals[i].node.description
        payload[`toGit${i}`] = vals[i].node.url
        payload[`toDemo${i}`] = vals[i].node.homepageUrl
        payload[
          `mediaUrl${i}`
        ] = `https://raw.githubusercontent.com/AshakaE/${vals[i].node.name}/main/docs/snapshot.png`
        let stack = Object.values(vals[i].node.languages.nodes)
        let tags = Object.values(stack)
        tags = tags.map((a) => a.name)
        payload[`stacks${i}`] = tags.join(", ")
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
