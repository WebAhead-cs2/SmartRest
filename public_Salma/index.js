var login = document.querySelector('button')
var signup = document.querySelector('button')
var menu = document.querySelector('button')


login.addEventListener('click', () => {

    window.location('/login.html')

})

signup.addEventListener('onclick', () => {

    window.location('/signup.html')

})

menu.addEventListener('click', () => {

    location.replace('/menu.html')

})
