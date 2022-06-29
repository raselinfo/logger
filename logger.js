const morgan = require("morgan")
const { v4: uuid } = require('uuid');
const logger = (app) => {
    morgan.token("id", (req) => {
        return uuid()
    })
    morgan.token("body", (req, _res) => {
        return JSON.stringify(req.body)
    })


    morgan.token("token", (req) => {
        return req.headers.authorization
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
    💪 Body     * :body 
    👑 JWT      :token
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
            }) + ","
        }))

}

module.exports = logger