# Logger

![Logger image](https://github.com/raselinfo/logger/blob/main/images/logger.png?raw=true)

- [Morgan](https://github.com/expressjs/morgan)
- Wins

### Morgan π₯±

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
    β¨STARTβ¨β¨β¨β¨β¨β¨β¨
    π Method   *:method 
    π URl      *:url 
    π Status   *:status 
    π Date     *:date[iso] 
    β° Time     *:total-time[4]ms 
    π ID       :id    
    β¨ENDβ¨β¨β¨β¨β¨β¨β¨
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
const development = ({ method, url, status, date, time, id, body, jwt }) => {
  return morgan((tokens, req, res) => {
    let str = `\nβ¨STARTβ¨β¨β¨β¨β¨β¨β¨\n`;
    if (method) {
      str += `π Method    * ${tokens.method(req, res)}\n`;
    }
    if (url) {
      str += `π URl       * ${tokens.url(req, res)}\n`;
    }
    if (status) {
      str += `π Status    * ${
        tokens.status(req, res) <= 400
          ? "β" + tokens.status(req, res) + "β"
          : "πΏ" + tokens.status(req, res) + "πΏ"
      }\n`;
    }
    if (date) {
      str += `π Date      * ${tokens
        .date(req, res, "iso")
        .slice(0, 19)
        .replace("T", " ")}\n`;
    }
    if (time) {
      str += `β° Time      * ${tokens["total-time"](req, res, 4) + "ms"}\n`;
    }
    if (id) {
      str += `π ID        * ${tokens.id(req, res)}\n`;
    }
    if (body) {
      str += `πͺ Body      * ${tokens.body(req, res)}\n`;
    }
    if (jwt) {
      str += `π JWT       * ${tokens.token(req, res)}\n`;
    }
    str += `β¨ENDβ¨β¨β¨β¨β¨β¨β¨β¨\n`;
    return str;
  });
};

// Logger function
const logger = (app, data) => {
  let options = {
    method: true,
    url: true,
    status: true,
    date: true,
    time: true,
    id: true,
    body: true,
    jwt: true,
    ...data,
  };

  // Custom id formatter
  morgan.token("id", (req) => uuid());
  // Custom request body formatter
  morgan.token("body", (req, _res) => JSON.stringify(req.body));
  // Custom header authorization formatter
  morgan.token("token", (req) => req.headers.authorization);

  process.env.NODE_ENV.trim(" ") === "development"
    ? app.use(development(options))
    : app.use(production);
};

module.exports = logger;
```
