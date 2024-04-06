import signIn from "../../server/inputs/signin_validation";

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
        await signIn(username, password);
        console.log("success");
    } catch (error) {
        console.error("Error during sign-in:", error.message);
    }

}

