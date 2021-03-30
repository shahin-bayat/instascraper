const express = require("express")
const scrapeProfile = require("./scrape.js")

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Instagram account scraper")
})

app.post("/instagram", async (req, res) => {
  const data = await scrapeProfile(req.body.link)
  console.log(data)
  res.status(200).json(data)
})

app.listen(8000, () => {
  console.log("listening on port 8000")
})
