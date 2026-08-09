const passwordInput = document.getElementById("password");
const strengthText = document.getElementById("strength");
const meterBar = document.getElementById("meter-bar");

const showBtn = document.getElementById("showBtn");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");

const lengthReq = document.getElementById("length");
const uppercaseReq = document.getElementById("uppercase");
const numberReq = document.getElementById("number");
const specialReq = document.getElementById("special");


// Check password strength
passwordInput.addEventListener("input", checkPassword);

function checkPassword() {

    const password = passwordInput.value;

    let score = 0;

    const hasLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    // Update requirement list
    lengthReq.textContent =
        (hasLength ? "✓ " : "✗ ") + "At least 8 characters";

    uppercaseReq.textContent =
        (hasUpper ? "✓ " : "✗ ") + "Contains an uppercase letter";

    numberReq.textContent =
        (hasNumber ? "✓ " : "✗ ") + "Contains a number";

    specialReq.textContent =
        (hasSpecial ? "✓ " : "✗ ") + "Contains a special character";


    // Calculate score
    if (hasLength) score++;
    if (hasUpper) score++;
    if (hasNumber) score++;
    if (hasSpecial) score++;


    // Weak password
    if (score <= 1) {
        strengthText.textContent = "Strength: Weak";
        strengthText.style.color = "red";
        meterBar.style.width = "25%";
        meterBar.style.backgroundColor = "red";
    }

    // Medium password
    else if (score <= 3) {
        strengthText.textContent = "Strength: Medium";
        strengthText.style.color = "orange";
        meterBar.style.width = "65%";
        meterBar.style.backgroundColor = "orange";
    }

    // Strong password
    else {
        strengthText.textContent = "Strength: Strong";
        strengthText.style.color = "green";
        meterBar.style.width = "100%";
        meterBar.style.backgroundColor = "green";
    }

}


// Show or hide password
showBtn.addEventListener("click", () => {

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        showBtn.textContent = "Hide";
    } else {
        passwordInput.type = "password";
        showBtn.textContent = "Show";
    }

});


// Generate a secure password
generateBtn.addEventListener("click", () => {

    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

    let generatedPassword = "";

    for (let i = 0; i < 12; i++) {
        generatedPassword += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );
    }

    passwordInput.value = generatedPassword;
    checkPassword();

});


// Copy password
copyBtn.addEventListener("click", () => {

    navigator.clipboard.writeText(passwordInput.value);

    alert("Password copied successfully!");

});