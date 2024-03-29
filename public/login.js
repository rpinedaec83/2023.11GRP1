const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent default form submission

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Basic validation (replace with more robust checks)
  if (username === "" || password === "") {
    alert("Please fill in both username and password");
    return;
  }

});
