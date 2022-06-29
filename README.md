# Logger
[Logger image](https://github.com/raselinfo/logger/blob/main/images/logger.png?raw=true)

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

**Custom stylish logger for Development and production**

```js
const morgan = require("morgan");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const path = require("path");

// Save the production log
const accessLogStream = fs.createWriteStream(
  path.resolve("logs", "access.log"),
  { flags: "a" }
);

// Production log
const production = morgan(
  (tokens, req, res) => {
    return (
      JSON.stringify({
        method: tokens["method"](req, res),
        url: tokens["url"](req, res),
        status: tokens["status"](req, res),
        date: tokens["date"](req, res, "iso"),
        time: tokens["total-time"](req, res, 4),
        id: tokens["id"](req, res),
      }) + ";"
    );
  },
  { stream: accessLogStream }
);

// Development log
const development = morgan((tokens, req, res) => {
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
            👑 JWT       * ${tokens.token(req, res)}
            ✨END✨✨✨✨✨✨✨
            `;
});

// Logger function
const logger = (app) => {
  // Custom id formatter
  morgan.token("id", (req) => uuid());
  // Custom request body formatter
  morgan.token("body", (req, _res) => JSON.stringify(req.body));
  // Custom header authorization formatter
  morgan.token("token", (req) => req.headers.authorization);

  process.env.NODE_ENV.trim(" ") === "development"
    ? app.use(development)
    : app.use(production);
};

module.exports = logger;
```
