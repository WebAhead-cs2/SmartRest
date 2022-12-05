function validation() {
  let message = document.getElementById("errors");
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let password2 = document.getElementById("password2").value;

  message.innerHTML = "";
  console.log(name, email, password, password2);
  try {
    if (!name || !email || !password || !password2)
      throw "please enter all fields";

    else if  (password.length < 6) throw "password should be at least 6 charcters";

    else if (password !== password2) throw "passwords doesnt match";
  } catch (err) {
    message.innerHTML = err;
  }
}

module.exports = validation;

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
//    res.sendFile("/public/sign-up/sign-up.html",{errors})
//   }
//   console.log(errors)
// })
