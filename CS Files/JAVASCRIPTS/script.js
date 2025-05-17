document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("signupForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent real form submission

    // Clear all error messages
    document.querySelectorAll(".error-message").forEach(e => e.textContent = "");

    let isValid = true;

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const sex = document.querySelector("input[name='sex']:checked");
    const reason = document.getElementById("supportReason").value.trim();

    if (!firstName) {
      document.getElementById("firstNameError").textContent = "required";
      isValid = false;
    }

    if (!lastName) {
      document.getElementById("lastNameError").textContent = "required";
      isValid = false;
    }

    if (!sex) {
      document.getElementById("sexError").textContent = "required";
      isValid = false;
    }

    if (!email) {
      document.getElementById("emailError").textContent = "required";
      isValid = false;
    }

    if (!password) {
      document.getElementById("passwordError").textContent = "required";
      isValid = false;
    }

    if (!reason) {
      document.getElementById("supportReasonError").textContent = "required";
      isValid = false;
    }

    if (isValid) {
      // Save to localStorage
      localStorage.setItem("firstName", firstName);
      localStorage.setItem("lastName", lastName);
      localStorage.setItem("email", email);
      localStorage.setItem("password", password); // Optional
      localStorage.setItem("sex", sex.value);
      localStorage.setItem("reason", reason);

      // Redirect to profile page
      window.location.href = "../HTMLS/proj_profile_naquila.html";

      document.addEventListener("DOMContentLoaded", function () {
      const name = localStorage.getItem("firstName");
      if (name) {
        document.getElementById("welcomeName").textContent = name;
      }
  });
    }
  });
});
