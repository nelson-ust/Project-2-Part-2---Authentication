// Function to handle API requests
async function fetchData(url, options) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
}

// Check user authentication status on page load
document.addEventListener('DOMContentLoaded', async function () {
  try {
    // You can perform other actions here if needed
    console.log("Page loaded");
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
});

// Event delegation for form submissions
document.addEventListener("submit", async function (event) {
  if (event.target.tagName.toLowerCase() === 'form') {
    event.preventDefault();

    const form = event.target;

    if (form.id === "registerForm") {
      // Handle registration form submission
      const username = form.querySelector("#register-username").value;
      const password = form.querySelector("#register-password").value;

      try {
        const response = await fetchData("http://localhost:3000/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        console.log(response.message); // Handle the response appropriately
      } catch (error) {
        console.error(`Registration failed: ${error.message}`);
      }
    }

    if (form.id === "loginForm") {
      // Handle login form submission
      const username = form.querySelector("#login-username").value;
      const password = form.querySelector("#login-password").value;

      try {
        const response = await fetchData("http://localhost:3000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ username, password }),
        });

        console.log(response.message); // Handle the response appropriately
      } catch (error) {
        console.error(`Login failed: ${error.message}`);
      }
    }
  }
});

// Function to handle logout
async function logout() {
  try {
    // You can perform other logout actions here if needed
    console.log("Logout successful");
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}
