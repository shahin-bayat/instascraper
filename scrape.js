const { chromium } = require("playwright")
module.exports = async function scrapeProfile(link) {
  const browser = await chromium.launch({ headless: true, slowMo: 100 })
  const context = await browser.newContext()
  const page = await context.newPage()
  await page.goto("https://www.instagram.com/accounts/login/")

  await page.waitForSelector("[type=submit]", {
    state: "visible",
  })

  await page.screenshot({
    path: `ig-sign-in.png`,
  })

  // 🔴 fill your username and password here <your-username> & <your-password>:
  await page.type("[name=username]", "<your-username>") // ->
  await page.type('[type="password"]', "<your-password>") // ->

  await page.click("[type=submit]")
  await page.waitForSelector("[placeholder=Search]", { state: "visible" })
  await page.goto(link) // ->
  await page.waitForSelector("img", {
    state: "visible",
  })
  await page.screenshot({ path: `profile.png` })
  // Get whatever data you need here, I have got the images source files
  const data = await page.evaluate(() => {
    const images = document.querySelectorAll("img")
    const urls = Array.from(images).map(v => v.src)
    return urls
  })
  await browser.close()
  return data
}
