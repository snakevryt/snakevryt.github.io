// Simulate user data
let user = {
    metaAccountName: "User123",
    metaAccountUrl: "https://www.meta.com/user123"
};

// Sample app data
let apps = [];

// Handle login
document.getElementById('loginButton').onclick = function() {
    // Simulate successful login
    document.getElementById('metaAccountInfo').innerHTML = `
        Logged in as <a href="${user.metaAccountUrl}" target="_blank">${user.metaAccountName}</a>
    `;
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('mainPage').style.display = 'block';
    displayApps();
};

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
            downloads: 0  // Initial download count
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
        `;
        appListContainer.appendChild(listItem);
    });
}

// Clear input fields
function clearForm() {
    document.getElementById('appName').value = '';
    document.getElementById('appImage').value = '';
    document.getElementById('appFileSize').value = '';
}
