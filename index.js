require("dotenv").config()
const express = require("express")
const app = express()
const router = express.Router()
const fs = require("fs")
const path = require("path")
const morgan = require("morgan")


process.env.MODE === "DEVELOPMENT" ?
    app.use(
        morgan(`
    ✨✨✨✨✨✨✨✨
    🙋 Method   *:method 
    🔗 URl      *:url 
    📋 Status   *:status 
    📅 Date     *:date[iso] 
    ⏰ Time     *:total-time[4]ms 
    ✨✨✨✨✨✨✨✨
`
        )
    )
    :
    app.use(morgan(":method * :url * :status * :date[iso] * :total-time[4]ms"))



router.route("/users").get((req, res) => {
    res.send("hello get route")
}).post((req, res) => {
    res.send("hello post route")
})

app.use(router)


app.listen(4000, () => {
    console.log("http://localhost:4000")
})