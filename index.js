const express = require("express")
const app = express()
const router = express.Router()
const morgan = require("morgan")

app.use(morgan("tiny"))


router.route("/users").get((req, res) => {
    console.log(`${req.method} ${req.url} ${new Date().toISOString()}`)
    res.send("hello get route")
}).post((req, res) => {
    res.send("hello post route")
})

app.use(router)


app.listen(4000, () => {
    console.log("http://localhost:4000")
})