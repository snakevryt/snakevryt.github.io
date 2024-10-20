// Sample app data
let apps = [];

// Simulated list of valid usernames for testing
const validUsernames = ["User123", "MetaUser456", "Gamer789"]; // Example usernames

// Handle login
document.getElementById('loginButton').onclick = function() {
    const usernameInput = document.getElementById('metaUsername').value.trim();
    const errorMessage = document.getElementById('errorMessage');

    if (usernameInput) {
        // Call a function to validate the username
        validateMetaUsername(usernameInput);
        errorMessage.style.display = 'none';  // Hide error message
    } else {
        errorMessage.innerText = 'Please enter a Meta Quest username.';
        errorMessage.style.display = 'block';
    }
};

// Simulated function to validate Meta Quest username
function validateMetaUsername(username) {
    // Simulating an API call with a timeout
    setTimeout(() => {
        if (validUsernames.includes(username)) {
            // If user is found, proceed with login
            const apiUrl = `https://www.meta.com/${username}`;
            document.getElementById('metaAccountInfo').innerHTML = `
                Logged in as <a href="${apiUrl}" target="_blank">${username}</a>
            `;
            document.getElementById('loginPage').style.display = 'none';
            document.getElementById('mainPage').style.display = 'block';
            displayApps();
        } else {
            // Show error message if the username is invalid
            document.getElementById('errorMessage').innerText = 'This is not a valid Meta Quest account.';
            document.getElementById('errorMessage').style.display = 'block';
        }
    }, 1000); // Simulating network delay
}

// Create a new app
document.getElementById('createAppButton').onclick = function() {
    const appName = document.getElementById('appName').value;
    const appImage = document.getElementById('appImage').value;
    const appFileSize = document.getElementById('appFileSize').value;

    if (appName && appImage && appFileSize) {
        const newApp = {
            name: appName,
            image: appImage,
            fileSize: appFileSize,
            downloads: 0,  // Initial download count
            apkUrl: appImage  // Assuming the APK URL is the same as the image URL for demo purposes
        };
        apps.push(newApp);
        displayApps();
        clearForm();
    } else {
        alert('Please fill all fields.');
    }
};

// Display apps in the app list
function displayApps() {
    const appListContainer = document.getElementById('appListContainer');
    appListContainer.innerHTML = '';
    apps.forEach(app => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <img src="${app.image}" alt="${app.name}" style="width: 50px; height: 50px;"/> 
            <strong>${app.name}</strong> - ${app.fileSize} MB - Downloads: ${app.downloads}
            <button onclick="downloadApp('${app.apkUrl}')">Download</button>
        `;
        appListContainer.appendChild(listItem);
    });
}

// Function to handle APK download
function downloadApp(apkUrl) {
    // Simulate downloading the APK
    alert(`Downloading ${apkUrl}`);
    // Here you would implement the actual download logic, possibly by opening the APK URL
    // window.open(apkUrl, '_blank'); // Uncomment to actually open the APK link
}

// Clear input fields
function clearForm() {
    document.getElementById('appName').value = '';
    document.getElementById('appImage').value = '';
    document.getElementById('appFileSize').value = '';
}
