# Logger

- [Morgan](https://github.com/expressjs/morgan)
- Wins

### Morgan 🥱

**Save logger in a access.log file**

```js
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

morgan.token("id", (req) => {
  return uuid();
});
process.env.MODE === "DEVELOPMENT"
  ? app.use(
      morgan(`
    ✨START✨✨✨✨✨✨✨
    🙋 Method   *:method 
    🔗 URl      *:url 
    📋 Status   *:status 
    📅 Date     *:date[iso] 
    ⏰ Time     *:total-time[4]ms 
    🆔 ID       :id    
    ✨END✨✨✨✨✨✨✨
`)
    )
  : app.use(
      morgan(
        (tokens, req, res) => {
          return (
            JSON.stringify({
              method: tokens["method"](req, res),
              url: tokens["url"](req, res),
              status: tokens["status"](req, res),
              date: tokens["date"](req, res, "iso"),
              time: tokens["total-time"](req, res, 4),
              id: tokens["id"](req, res),
            }) + ","
          );
        },
        { stream: accessLogStream }
      )
    );
```

**Custom Stylish Logger And JSON formate Logger**

```js
morgan.token("id", (req) => {
  return uuid();
});
morgan.token("body", (req, _res) => {
  return JSON.stringify(req.body);
});

morgan.token("token", (req) => {
  return req.headers.authorization;
});

process.env.MODE === "DEVELOPMENT"
  ? app.use(
      morgan((tokens, req, res) => {
        return `
            ✨START✨✨✨✨✨✨✨
            🙋 Method    * ${tokens.method(req, res)}
            🔗 URl       * ${tokens.url(req, res)}
            📋 Status    * ${
              tokens.status(req, res) <= 400
                ? "✅" + tokens.status(req, res) + "✅"
                : "⚠️" + tokens.status(req, res) + "⚠️"
            }
            📅 Date      * ${tokens.date(req, res, "iso")}
            ⏰ Time      * ${tokens["total-time"](req, res, 4) + "ms"}
            🆔 ID        * ${tokens.id(req, res)}
            💪 Body      * ${tokens.body(req, res)}
            👑 JWT       * ${tokens.id(req, res)}
            ✨END✨✨✨✨✨✨✨
            `;
      })
    )
  : app.use(
      morgan((tokens, req, res) => {
        return (
          JSON.stringify({
            method: tokens["method"](req, res),
            url: tokens["url"](req, res),
            status: tokens["status"](req, res),
            date: tokens["date"](req, res, "iso"),
            time: tokens["total-time"](req, res, 4),
            id: tokens["id"](req, res),
          }) + ","
        );
      })
    );
```
