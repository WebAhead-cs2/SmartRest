// const http = require('http');
const express = require("express");
// const router = require('./router');
var path = require("path");
const db = require("./database/connection.js");
const crypto = require("crypto");
const PORT = 4000;
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/public/menu/menu.html`);
});

app.get("/menu", (req, res) => {
  res.sendFile(`${__dirname}/public/menu/menu.html`);
});

app.get("/sign-up", (req, res) => {
  res.sendFile(`${__dirname}/public/sign-up/sign-up.html`);
});

app.get("/sign-in", (req, res) => {
  res.sendFile(`${__dirname}/public/sign-in/sign-in.html`);
});

app.get("/menuAfter", (req, res) => {
  res.sendFile(`${__dirname}/public/menuAfter/menuAfter.html`);
});

app.get("/review", (req, res) => {
  res.sendFile(`${__dirname}/public/review`);
});

app.get("/review", async (req, res) => {

  let reviews = await db.query(
    "SELECT users.username, reviews.postdate ,reviews.review FROM users INNER JOIN reviews ON users.id = reviews.user_id"
  );
  let data = reviews.rows;
  let str = " ";
  for (let i = 0; i < data.length; i++) {
    str +=
      " <div class='card' style='background-color: yellow; width: 1000px; height: 160px; border-radius:10px; font-size:22px; box-shadow: 5px 10px blue; font-family: Comic Sans MS; font-weight: bold; padding:20px;'>" +
      "posted by " + data[i].username +
      "<br><br>" +
      data[i].postdate +
      "</br></br>" +
      data[i].review +
      "</div>" + "</br>";

  }

  res.send("<style>background-color:grey;</style>" + "<h1 style='color:blue; font-size:300%; justify-content:center;'>Our Reviews</h1>" + str
    + "<a href='/menu/menu.html'><input type='button' value='back to home' style='background-color:yellow; font-size:200%; width: 300px; height: 100px; border-radius:10px;'></a>");
});

app.post("/sign-up", async (req, res) => {
  const { username, email, password, password2 } = req.body;
  console.log(req.body);

  const hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");
  const hashedConfPassword = crypto
    .createHash("sha256")
    .update(password2)
    .digest("hex");
  console.log({ username, email, hashedPassword, hashedConfPassword });

  let rowsNumber = await db.query(
    `SELECT COUNT(*) FROM users WHERE email = $1`,
    [email]
  );

  if (rowsNumber.rows[0].count > 0) {
    res.send(
      "email already exists" +
      `<input type="button" href="location.href='/sign-up/sign-up.html'" onClick="location.href='/sign-up/sign-up.html'" value="try again">`
    );
  }
  else if (hashedPassword !== hashedConfPassword) {
    res.send(
      "passwords doesn't match please try again" +
      `<input type="button" href="location.href='/sign-up/sign-up.html'" onClick="location.href='/sign-up/sign-up.html'" value="try again">`
    );
  } else {
    db.query(
      `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *`,
      [username, email, hashedPassword],
      (error, results) => {
        if (error) {
          throw error;
        } else {
          res.redirect("/menu");
        }
      }
    );
  }
});

app.post("/sign-in", async (req, res) => {
  try {
    let email = req.body.email;
    let password = req.body.password;
    let userData = await db.query(`SELECT  * FROM users WHERE email = $1 `, [
      email,
    ]);
    userData = userData.rows[0];
    console.log("test value", userData); // test
    let pass = userData.password;
    let users = userData.username; //await db.query(`SELECT  email FROM users WHERE email = $1 `,[email]);
    let newemail = userData.email;
    const hash = crypto.createHash("sha256").update(password).digest("hex");
    console.log(pass, hash);

    console.log(newemail.length);
    console.log(pass);
    console.log(hash);
    console.log(!userData);
    if (newemail.length === 0 || pass !== hash || !userData) {
      res.send(
        "the user not found please, " +
        `<input type="button" href="location.href='/sign-in/sign-in.html'" onClick="location.href='/sign-in/sign-in.html'" value="try again">`
      );
    }
    //else if(newemail[0]===users.rows[0].email&& pass[0]===hash)
    //{
    else {
      res.cookie("userId", userData.id);
      res.redirect("/menuAfter/menuAfter.html");
    }
  } catch (err) {
    console.log(err);
    res.send(`not found1`);
  }
});

app.post("/menuAfter", async (req, res) => {
  //users = db.query("SELECT * FROM users");
  debugger;
  const user_id = req.cookies.userId;
  const review = req.body.Review;
  console.log(req.body.Review);
  console.log(user_id);

  try {
    const inserResult = await db.query(
      `INSERT INTO reviews (user_id, review, postdate) VALUES ($1, $2, $3) RETURNING *`,
      [user_id, review, new Date()]
    );
    if (!inserResult) {
      throw new Error();
    } else {
      res.send(
        "thanks for review" +
        `<input type="button" href="location.href='/menuAfter/menuAfter.html'" onClick="location.href='/menuAfter/menuAfter.html'" value="Go To Home">`
      );
    }
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
