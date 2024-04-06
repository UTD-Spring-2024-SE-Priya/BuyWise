
const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");
const loginSubmit = document.getElementById("loginSubmit")
signupBtn.onclick = (()=>{
 loginForm.style.marginLeft = "-50%";
 loginText.style.marginLeft = "-50%";
});
loginBtn.onclick = (()=>{
 loginForm.style.marginLeft = "0%";
 loginText.style.marginLeft = "0%";
});
signupLink.onclick = (()=>{
 signupBtn.click();
 return false;
});
loginSubmit.onclick = (() => {
    loginCheck();
});

async function loginCheck() {
    const username = document.getElementById("usernameField").value;
    console.log(username);
    const password = document.getElementById("passwordField").value;
    try {
        try {
            const response = await fetch(`http://localhost:5050/user/${username}/${password}`);
            if (response.status === 404){
                throw new Error("Username or Password mismatch");
            }
        } catch (error) {
            throw new Error("Username or Password mismatch");
    
        }
        console.log("success");
    } catch (error) {
        console.error("Error during sign-in:", error.message);
    }

}

