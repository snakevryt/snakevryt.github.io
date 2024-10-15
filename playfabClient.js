// PlayFab configuration
const playFabSettings = {
    titleId: "EBF77"
};

// Check if user has selected "Remember Me" and automatically log in
window.onload = function() {
    if (localStorage.getItem('playFabSession')) {
        // Auto log in and redirect to home page if the session exists
        window.location.href = "index.html";
    }
};

// Register user
document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const user = {
        username: document.getElementById("regUsername").value,
        email: document.getElementById("regEmail").value,
        password: document.getElementById("regPassword").value,
        rememberMe: document.getElementById("regRememberMe").checked
    };

    const request = {
        TitleId: playFabSettings.titleId,
        Username: user.username,
        Email: user.email,
        Password: user.password
    };

    // Send the request to PlayFab to register the user
    fetch('https://EBF77.api.main.azureplayfab.com/Register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.error("Error:", data.error);
        } else {
            console.log("Account created:", data);

            // Store session info in localStorage if "Remember Me" is checked
            if (user.rememberMe) {
                localStorage.setItem('playFabSession', JSON.stringify(data));
            }

            // Redirect to home page after successful registration
            window.location.href = "index.html";
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

// Log in user
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const user = {
        username: document.getElementById("loginUsername").value,
        password: document.getElementById("loginPassword").value,
        rememberMe: document.getElementById("loginRememberMe").checked
    };

    const request = {
        TitleId: playFabSettings.titleId,
        Username: user.username,
        Password: user.password
    };

    // Send the request to PlayFab to log in the user
    fetch('https://EBF77.api.main.azureplayfab.com/LoginWithPlayFab', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.error("Error:", data.error);
        } else {
            console.log("Logged in:", data);

            // Store session info in localStorage if "Remember Me" is checked
            if (user.rememberMe) {
                localStorage.setItem('playFabSession', JSON.stringify(data));
            }

            // Redirect to home page after successful login
            window.location.href = "index.html";
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
