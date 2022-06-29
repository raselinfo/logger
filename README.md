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
```