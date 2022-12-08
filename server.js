// const http = require('http');
const express = require('express');
// const router = require('./router');
const db = require('./database/connection.js');
const crypto = require('crypto');
const PORT = 3000;
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
const {home} = require("./public/menu/menu");
// const validation2 = require('./public/sign-up/sign-up');
// const { rows } = require('pg/lib/defaults');
// const server = http.createServer(router);



app.use('/public', express.static(`${__dirname}/public`));
app.use('/menu', express.static(`${__dirname}/public/menu`));
app.use('/sign-up', express.static(`${__dirname}/public/sign-up`));
app.use(express.static(`${__dirname}/public/sign-in`));

app.get('/', (req, res) => {

  res.sendFile(`${__dirname}/public/menu/menu.html`);
//   const email= req.cookies.email;

//   if(!email){
   
//    res.status(401).send("you must log in first"+`<input type="button" href="location.href='/public/sign-up/sign-up.html'" onClick="location.href='/public/sign-up/sign-up.html'" value="try again">`);
//   }
//  else {
//    res.send(home(email));
//   //  res.sendFile(`${__dirname}/public/menu/menu.html`);
//  }

});

app.get('/menu', (req, res) => {
   res.sendFile(`${__dirname}/public/menu/menu.html`);
 });

app.get('/sign-up', (req, res) => {
  res.sendFile(`${__dirname}/public/sign-up/sign-up.html`);
});

app.get('/sign-in', (req, res) => {
  res.cookie("email", email, { maxAge: 600000 });
  res.sendFile(`${__dirname}/public/sign-in/sign-in.html`);
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
    res.send("email already exists"+`<input type="button" href="location.href='/public/sign-up/sign-up.html'" onClick="location.href='/public/sign-up/sign-up.html'" value="try again">`); 
  } 
  else{
  db.query(`INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *`, [username, email, hashedPassword], (error, results) => {
    if (error) {
      throw error;
    }else{
      res.send("thank for signing up" +`<input type="button" href="location.href='/public/menu/menu.html'" onClick="location.href='/public/menu/menu.html'" value="Go To Home">`)
    }
    
  });
}
});


app.post("/sign-in",async(req,res)=>{
    let email = req.body.email;
    let password = req.body.password;
    let haspass = await db.query(`SELECT  password FROM users WHERE email = $1 `,[email]);///
    let pass = haspass.rows.map(e=>e.password);
    let users = await db.query(`SELECT  email FROM users WHERE email = $1 `,[email]);
    let newusers=users.rows.map(e=>e.email);
    const hash = crypto.createHash("sha256").update(password).digest("hex");
    console.log(pass[0],hash);
    
    try{
      
      if(newusers.length===0 || pass[0] !== hash)
      {
          res.send("the user not found please, "+`<input type="button" href="location.href='/public/sign-in/sign-in.html'" onClick="location.href='/public/sign-in/sign-in.html'" value="try again">`);
      }
      else if(newusers[0]===users.rows[0].email&& pass[0]===hash)
      {
          res.redirect('/menu');

      }
      else
      {
        res.send("the user not found please, "+`<input type="button" href="location.href='/public/sign-in/sign-in.html'" onClick="location.href='/public/sign-in/sign-in.html'" value="try again">`);
      }
    }
    catch(err){
      console.log(err);
      res.send(`not found1`)
    }
  
});




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