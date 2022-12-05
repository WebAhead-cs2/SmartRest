const express = require('express');
const app = express();
const {Pool, pool} = require('./dbConfig');
const PORT = 3000;
app.use(express.urlencoded({extended: false}));


app.use('/public',express.static(__dirname + '/public'));
app.use('/menu',express.static(__dirname + '/public/menu'));
app.use('/sign-up',express.static(__dirname + '/public/sign-up'));
app.use(express.static(__dirname + '/public/sign-in'));


app.get('/', (req, res) => {

  res.sendFile(__dirname + '/public/sign-in/sign-in.html');
  
});

app.get('/menu', (req, res) => {

    res.sendFile(__dirname + '/public/menu/menu.html');
  
});

app.get('/sign-up', (req, res) => {

  res.sendFile(__dirname + '/public/sign-up/sign-up.html');

});

 app.post('/sign-up', (req,res)=>{
   let { name,email,password} = req.body;
   console.log(req.body);
   console.log({name,email,password});
  //  if (pool.)
   
  });
   // //  let errors =[];
  // try{

  //   // validators
  //  if(!name || !email || !password || !password2) throw new Error("please enter all fields");
  // //  {
  // //   errors.push({messege: "please enter all fields"})
  // //  } 
  //  if(password.length <6) throw new Error("password should be at least 6 charcters");
  // //  {
  // //   errors.push({messege: "password should be at least 6 charcters"})
  // //  }
  //  if(password !== password2) throw new Error("passwords doesnt match");
  // //  {


  //  db connect and check if user exist


  // db insert ... 
  // res.redirect()


  //   errors.push({messege: "passwords doesnt match"})
  //  }
  //  if(errors.length>0)
  //  {
  //  } catch(err) {
  //   res.json(err.message)
  // }
  //   res.send({errors},"/public/sign-up/sign-up.html")
  //  }
  //  console.log(errors)


app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
