require("dotenv").config()
const express = require("express")
const app = express()
const router = express.Router()
const logger = require('./logger/logger')
app.use(express.json())
// MORGAN exported from logger.js file
logger(app, {  })


router.route("/users").get((req, res) => {
    res.send("hello get route")
}).post((req, res) => {
    res.send("hello post route")
})

app.use(router)
app.use((req, res, next) => {
    next()
})

app.listen(4000, () => {
    console.log("http://localhost:4000")
})