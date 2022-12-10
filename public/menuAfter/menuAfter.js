
























// const cookieParser = require("cookie-parser");
// const db = require('./database/connection.js');
// const user_id = req.cookies.userId;
// const review = req.body.Review;
//const responseResult =  db.query(`SELECT users.username, reviews.postdate ,reviews.review FROM users INNER JOIN reviews ON users.id = reviews.user_id`);
// console.log(responseResult.rows);










//const db = require('../../database/connection.js');

// const e = require("express");

// function postAReview(){
//         const postReviewButton = document.getElementsByClassName('postReviewButton');
//         postReviewButton.onclick(()=>{
//         console.log("Test!!!")
//         const {user_id,review} = req.body;
//         console.log(req.body);
      
//         db.query(`INSERT INTO reviews (user_id, review, postdate) VALUES ($1, $2, $3) RETURNING *`, [user_id, review, now()], (error, results) => {
//           if (error) {
//             throw error;
//           }else{
//             res.send("thanks for review")// +`<input type="button" href="location.href='/menu/menu.html'" onClick="location.href='/menu/menu.html'" value="Go To Home">`)
//           }
//         });
//       }); 
//     }
// const reviews = [
//   {
//     username: 'moha',
//     postdate: '2022-12-10T16:18:50.256Z',
//     review: '345678909876543'
//   },
//   {
//     username: 'moha',
//     postdate: '2022-12-10T16:26:56.084Z',
//     review: 'hello theree gooood fooood..'
//   },
//   {
//     username: 'moha',
//     postdate: '2022-12-10T16:37:06.961Z',
//     review: '12345678asdfghjk'
//   },
//   {
//     username: 'moha',
//     postdate: '2022-12-10T16:38:27.992Z',
//     review: 'asdfgbnmijhgbvcx'
//   }
// ];


// function showReview(review){

//   review.forEach(element => {
//     console.log("posted by " + element.username+"  " +element.postdate + "  " + element.review)
//   });
// }


// showReview(reviews);

// function myFunction() {

//   // Create an "li" node:
//   const node = document.createElement("li");
  
//   // Create a text node:
//   const textnode = document.createTextNode("Water");
  
//   // Append the text node to the "li" node:
//   node.appendChild(textnode);
  
//   // Append the "li" node to the list:
//   document.getElementById("myList").appendChild(node);
//   }

module.exports = showReview;



// function validation() {
//     const message = document.getElementById('errors');

//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;
//     const password2 = document.getElementById('password2').value;
  
//     message.innerHTML = '';
  
//     try {
//       if (!username || !email || !password || !password2) throw 'please enter all fields';
  
//       else if (password.length < 6) throw 'password should be at least 6 charcters';
  
//       else if (password !== password2) throw 'passwords doesnt match';
//     } catch (err) {
//       message.innerHTML = err;
//     }
//   }
//   function validation2(number){
//   const message = document.getElementById('errors');
//   // const username = document.getElementById('username').value;
//   // const email = document.getElementById('email').value;
//   // const password = document.getElementById('password').value;
//   // const password2 = document.getElementById('password2').value;
  
//    message.innerHTML = '';
//     try{
//     if (number.length > 0) throw "email already exists"; 
//     }catch(err){
//       message.innerHTML = err;
//     }
//   }
  
  
//   module.exports = validation2;
  
  
  
  
  
  
  
  // module.exports = validation;
  
  // btn.addEventListener(onsubmit,(e)=>{
  //   e.preventDefault();
  //   let name = document.getElementById("name");
  //   let email = document.getElementById("email");
  //   let password = document.getElementById("password");
  //   let password2 = document.getElementById("password2");
  
  //   let errors =[];
  //   if(!name || !email || !password || !password2){
  //    errors.push({messege: "please enter all fields"})
  
  //   }
  //   if(password.length <6){
  //    errors.push({messege: "password should be at least 6 charcters"})
  //   }
  //   if(password !== password2){
  //    errors.push({messege: "passwords doesnt match"})
  //   }
  //   if(errors.length>0){
  //    res.sendFile("/sign-up/sign-up.html",{errors})
  //   }
  //   console.log(errors)
  // })
  




// function home(email){
//   if (email) {
//     return (/*html */ `
//       <h1>Welcome back ${email}</h1>
//       <a href="/log-out">Log out</a>
//     `);
//   }
//    else{
//     return (`
//        <h1>Elite Peak</h1>

//    `)
//    }
// }

// module.exports = home;
