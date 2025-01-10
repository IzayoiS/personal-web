document.getElementById("saveRegist").addEventListener("click", function () {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!username || !email || !password) {
    Swal.fire({
      icon: "error",
      title: "Missing Information",
      text: "Please fill in all required fields.",
    });
    return;
  }

  if (!email.includes("@")) {
    Swal.fire({
      icon: "error",
      title: "Invalid Email",
      text: "Please enter a valid email address.",
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

  if (!/[A-Z]/.test(password)) {
    Swal.fire({
      icon: "error",
      title: "Password Missing Uppercase",
      text: "Password must contain at least one uppercase letter.",
    });
    return;
  }

  if (!/[a-z]/.test(password)) {
    Swal.fire({
      icon: "error",
      title: "Password Missing Lowercase",
      text: "Password must contain at least one lowercase letter.",
    });
    return;
  }

  if (!/\d/.test(password)) {
    Swal.fire({
      icon: "error",
      title: "Password Missing Number",
      text: "Password must contain at least one number.",
    });
    return;
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    Swal.fire({
      icon: "error",
      title: "Password Missing Special Character",
      text: "Password must contain at least one special character.",
    });
    return;
  }

  if (/\s/.test(password)) {
    Swal.fire({
      icon: "error",
      title: "Password Contains Spaces",
      text: "Password must not contain any spaces.",
    });
    return;
  }

  Swal.fire({
    title: "Are you sure?",
    text: "Do you want to save this user?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes, save it!",
  }).then((result) => {
    if (result.isConfirmed) {
      document.getElementById("registerForm").submit();
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
