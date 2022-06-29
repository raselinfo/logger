require("dotenv").config()
const express = require("express")
const app = express()
const router = express.Router()
const fs = require("fs")
const path = require("path")
const morgan = require("morgan")
const { v4: uuid } = require('uuid');

morgan.token("id", (req) => {
    return uuid()
})
process.env.MODE === "DEVELOPMENT" ?
    app.use(
        morgan(`
    ✨START✨✨✨✨✨✨✨
    🙋 Method   *:method 
    🔗 URl      *:url 
    📋 Status   *:status 
    📅 Date     *:date[iso] 
    ⏰ Time     *:total-time[4]ms 
    🆔 ID       :id    
    ✨END✨✨✨✨✨✨✨
`
        )
    )
    :
    app.use(morgan((tokens, req, res) => {
        return JSON.stringify({
            method: tokens['method'](req, res),
            url: tokens['url'](req, res),
            status: tokens['status'](req, res),
            date: tokens['date'](req, res, 'iso'),
            time: tokens['total-time'](req, res, 4),
            id: tokens['id'](req, res)
        })
    }))



router.route("/users").get((req, res) => {
    res.send("hello get route")
}).post((req, res) => {
    res.send("hello post route")
})

app.use(router)


app.listen(4000, () => {
    console.log("http://localhost:4000")
})