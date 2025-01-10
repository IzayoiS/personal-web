document.getElementById("saveLogin").addEventListener("click", function () {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!username || !password) {
    Swal.fire({
      icon: "error",
      title: "Missing Information",
      text: "Please fill in all required fields.",
    });
    return;
  }

  if (password.length < 8) {
    Swal.fire({
      icon: "error",
      title: "Password Too Short",
      text: "Password must be at least 8 characters long.",
    });
    return;
  }

  Swal.fire({
    title: "Are you sure?",
    text: "Do you want to log in with these credentials?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes, log me in!",
  }).then((result) => {
    if (result.isConfirmed) {
      document.getElementById("loginForm").submit();
    }
  });
});

const passwordField = document.getElementById("password");
const toggleButton = document.getElementById("togglePassword");
const eyeIcon = document.getElementById("eye-icon");

toggleButton.addEventListener("click", () => {
  const isPasswordVisible = passwordField.type === "text";
  passwordField.type = isPasswordVisible ? "password" : "text";
  eyeIcon.classList.toggle("fa-eye");
  eyeIcon.classList.toggle("fa-eye-slash");
});
