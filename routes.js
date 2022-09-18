const fs = require("fs");
const users = [];

const handlerRoutes = (req, res) => {
  const url = req.url;
  if (url === "/") {
    res.setHeader("Content-type", "text/html");
    res.write("<html>");
    res.write(`<head><title>Lab2.1</title></head>`);
    res.write(`
    <body>
        <form action='/create-user' method='POST'>
            <input type='text' name='username' />
            <button type='submit'>Send</button>
            
        </form>
    </body>`);
    res.write("</html>");
    return res.end();
  }
  if (url === "/users") {
    res.write(
      ` <html>
            <head>
                <title>
                    Users
                </title>
            </head>
            <body>
                <ul>
                    <li>
                        User 1
                    </li>
                    <li>
                        User 2
                    </li>
                    <li> ${users}</li>
                </ul>
            </body>
        </html>`
    );
    return res.end();
  }
  if (url === "/create-user" && req.method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      console.log(">>> this is body", body);
      console.log(parseBody.split("=")[1]);
      users.push(parseBody.split("=")[1]);
    });
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }
  console.log(">>>>>>> users", users);
};

module.exports = handlerRoutes;
