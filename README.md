# Logger

- [Morgan](https://github.com/expressjs/morgan)
- Wins

### Morgan 🥱
**Save logger in a access.log file**

```js
var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});

app.use(
  morgan(
    `
    :method * 
    :url * 
    :status *
    :date[iso] *
    :total-time[4]ms *
    :user-agent`,
    { stream: accessLogStream }
  )
);
```

**Custom Stylish Logger**
```js
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

```