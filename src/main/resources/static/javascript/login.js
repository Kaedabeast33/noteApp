const username = document.getElementById("login-username")
const password = document.getElementById("login-password")
const logInForm = document.getElementById("login-form")
const loginPasswordDiv = document.getElementById("login-password-div")

const headers = {
    'Content-Type':'application/json'
}
const baseUrl = 'http://localhost:8080/api/v1/users'


const handleSubmit = async (e) =>{
    e.preventDefault()

    postObject = {
        username:username.value,
        password:password.value
    }
    console.log(postObject.username, postObject.password)

const response = await fetch(`${baseUrl}/login`, {
method:"POST",
body: JSON.stringify(postObject),
headers:headers})
.catch(err=> console.error(err.message))

const responseArr = await response.json()
console.log(responseArr[0])
if (responseArr[0]!="Username or password incorrect"){
    window.location.replace("http://localhost:8080/home.html")
    document.cookie = `userId = ${responseArr[1]}`
}else{
    loginPasswordDiv.innerHTML=`
<span style="color:red;">incorrect username or password</span>
`
}

}

//database.forEach(element => {
//    if(element == ){
//
//    }
//});

logInForm.addEventListener("submit",handleSubmit)