// const http = require('http');
const express = require('express');
// const router = require('./router');
var path = require('path');
const db = require('./database/connection.js');
const crypto = require('crypto');
const PORT = 4000;
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname,"public"))); 
//app.use('/public', express.static(`${__dirname}/public`));
// app.use('/menu', express.static(`${__dirname}/public/menu`));
// app.use('/menuAfter', express.static(`${__dirname}/public/menuAfter`));
// app.use('/sign-up', express.static(`${__dirname}/public/sign-up`));
// app.use('/sign-in',express.static(`${__dirname}/public/sign-in`));
// app.use('/review',express.static(`${__dirname}/public/review`));

// app.get('/', (req, res) => {
//   res.sendFile(`${__dirname}/public/menu/menu.html`);
// //   const email= req.cookies.email;

// //   if(!email){
   
// //    res.status(401).send("you must log in first"+`<input type="button" href="location.href='/public/sign-up/sign-up.html'" onClick="location.href='/public/sign-up/sign-up.html'" value="try again">`);
// //   }
// //  else {
// //    res.send(home(email));
// //   //  res.sendFile(`${__dirname}/public/menu/menu.html`);
// //  }

// });

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/menu/menu.html`);
});

app.get('/menu', (req, res) => {
   res.sendFile(`${__dirname}/public/menu/menu.html`);
 });

app.get('/sign-up', (req, res) => {
  res.sendFile(`${__dirname}/public/sign-up/sign-up.html`);
});

app.get('/sign-in', (req, res) => {
  res.sendFile(`${__dirname}/public/sign-in/sign-in.html`);
});

app.get('/menuAfter', (req, res) => {
  res.sendFile(`${__dirname}/public/menuAfter/menuAfter.html`);
});

app.get('/review', (req, res) => {
  res.sendFile(`${__dirname}/public/review/review.html`);
});

app.post('/sign-up', async (req, res) => {
  
  const { username, email, password } = req.body;
  console.log(req.body);
  
  const hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");
  console.log({ username, email, hashedPassword });
  
  let rowsNumber = await db.query(`SELECT COUNT(*) FROM users WHERE email = $1`, [email]);
  
  if (rowsNumber.rows[0].count > 0){
    res.send("email already exists"+`<input type="button" href="location.href='/sign-up/sign-up.html'" onClick="location.href='/sign-up/sign-up'" value="try again">`); 
  } 
  else{
  db.query(`INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *`, [username, email, hashedPassword], (error, results) => {
    if (error) {
      throw error;
    }else{
      res.redirect(menuAfter)
    }
    
  });
}
});

app.post("/sign-in",async(req,res)=>{
  try{  
       let email = req.body.email;
       let password = req.body.password;
       let userData = await db.query(`SELECT  * FROM users WHERE email = $1 `,[email]);
       userData = userData.rows[0];
    console.log("test value",userData); // test
    let pass = userData.password;
    let users = userData.username;//await db.query(`SELECT  email FROM users WHERE email = $1 `,[email]);
    let newemail=userData.email;
    const hash = crypto.createHash("sha256").update(password).digest("hex");
    console.log(pass,hash);
   
    console.log(newemail.length);
    console.log(pass);
    console.log(hash);
    console.log(!(userData));
      if(newemail.length===0 || pass !== hash || !(userData))
      {
          res.send("the user not found please, "+`<input type="button" href="location.href='/public/sign-in/sign-in.html'" onClick="location.href='/public/sign-in/sign-in.html'" value="try again">`);
      }
      //else if(newemail[0]===users.rows[0].email&& pass[0]===hash)
      //{ 
        else{
          res.cookie("userId",userData.id);
          res.redirect('/menuAfter/menuAfter.html');
        }
      //}
      //else
      //{
       // res.send("the user not found please, "+`<input type="button" href="location.href='/public/sign-in/sign-in.html'" onClick="location.href='/public/sign-in/sign-in.html'" value="try again">`);
      //}
    }
    catch(err){
      console.log(err);
      res.send(`not found1`)
    }
});

app.post("/menuAfter", async (req,res)=>{
  //users = db.query("SELECT * FROM users");
  debugger;
  const user_id = req.cookies.userId;
  const review = req.body.Review;
  console.log(req.body.Review);
  
  //user_id = db.query("SELECT id FROM users WHERE email = $1`", [email]);
  //console.log(req.body);
  //console.log(review);
 try{
   const result = await db.query(`INSERT INTO reviews (user_id, review, postdate) VALUES ($1, $2, $3) RETURNING *`, [user_id, review, new Date()]);
    if (!(result)) {
      throw new Error();
    }else{
      res.send("thanks for review")// +`<input type="button" href="location.href='/public/menu/menu.html'" onClick="location.href='/public/menu/menu.html'" value="Go To Home">`)
    }
    // await db.query(`SELECT users.username, reviews.postdate ,reviews.review FROM users INNER JOIN reviews ON users.id = reviews.user_id`);
    // if (error) {
    //   throw error;
    // }else{
    //   res.send(results)// +`<input type="button" href="location.href='/public/menu/menu.html'" onClick="location.href='/public/menu/menu.html'" value="Go To Home">`)
    // }  
  }
  catch(err)
  {
    console.log(err);
  }
});


// app.post("/review", async (req,res)=>{
//   debugger;
//   const {review} = req.body;
//   console.log(req.body);
//   console.log(review);
//  try{
//    await db.query(`INSERT INTO reviews (user_id, review, postdate) VALUES ($1, $2, $3) RETURNING *`, [user_id, review, now()]);
//     if (error) {
//       throw error;
//     }else{
//       res.send("thanks for review")// +`<input type="button" href="location.href='/public/menu/menu.html'" onClick="location.href='/public/menu/menu.html'" value="Go To Home">`)
//     }
//     // await db.query(`SELECT users.username, reviews.postdate ,reviews.review FROM users INNER JOIN reviews ON users.id = reviews.user_id`);
//     // if (error) {
//     //   throw error;
//     // }else{
//     //   res.send(results)// +`<input type="button" href="location.href='/public/menu/menu.html'" onClick="location.href='/public/menu/menu.html'" value="Go To Home">`)
//     // }  
//   }
//   catch(err)
//   {
//     console.log(err);
//   }
// });

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

// const { Pool, pool } = require('./database/dbConfig');
// const message = document.getElementById('errors');
// message.innerHTML = '';
  // db.query(
  //   `SELECT * FROM users WHERE email = $1`, [email], (err,results)=>{
  //     if (err){
  //       throw err;
  //     }
  //     console.log(results.rows);
  //   }
  // )
  // try{
  // if (results.rows.length > 0) throw "email already exists"; 
  // }catch(err){
  //   message.innerHTML = err;
  // }
  

//----------------------------------------------------------------
  // res.send(`alert(user added succsessfuly)`)
  // const sqlEmail = await db.query(`SELECT email FROM users WHERE email="($1)"`,[email]);
  // console.log(sqlEmail);

//----------------------------------------------------------------
// app.post('/public/sign-up/sign-up.html', (req, res) => {
//   const { name, email, password } = req.body;
//   console.log({ name, email, password });
  
//   })