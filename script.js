// Sample app data
let apps = [];

// Simulated list of valid usernames for testing
const validUsernames = ["User123", "MetaUser456", "Gamer789"]; // Example usernames

// Handle login
document.getElementById('loginButton').onclick = function() {
    const usernameInput = document.getElementById('metaUsername').value.trim();
    const errorMessage = document.getElementById('errorMessage');

    if (usernameInput) {
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
            const apiUrl = `https://www.meta.com/${username}`;
            document.getElementById('metaAccountInfo').innerHTML = `
                Logged in as <a href="${apiUrl}" target="_blank">${username}</a>
            `;
            document.getElementById('loginPage').style.display = 'none';
            document.getElementById('mainPage').style.display = 'block';
            displayApps();
        } else {
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
    const apkFileInput = document.getElementById('apkFile');

    if (appName && appImage && appFileSize && apkFileInput.files.length > 0) {
        const formData = new FormData();
        formData.append('appName', appName);
        formData.append('appImage', appImage);
        formData.append('appFileSize', appFileSize);
        formData.append('apkFile', apkFileInput.files[0]);

        fetch('/apps', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.downloadUrl) {
                document.getElementById('result').innerHTML = `
                    <p>${data.message}</p>
                    <p>Download URL: <a href="${data.downloadUrl}" target="_blank">${data.downloadUrl}</a></p>
                `;
                clearForm(); // Clear the form after successful upload
                displayApps(); // Refresh the app list
            } else {
                document.getElementById('result').innerText = 'Upload failed.';
            }
        })
        .catch(error => {
            document.getElementById('result').innerText = 'Error: ' + error.message;
        });
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
            <a href="${app.apkUrl}" target="_blank">Download</a> <!-- Add download link -->
        `;
        appListContainer.appendChild(listItem);
    });
}

// Clear input fields
function clearForm() {
    document.getElementById('appName').value = '';
    document.getElementById('appImage').value = '';
    document.getElementById('appFileSize').value = '';
    document.getElementById('apkFile').value = ''; // Clear the APK file input
}
