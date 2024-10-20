// server.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Save uploaded APKs in the 'uploads' directory
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Keep the original file name
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

// Ensure the uploads directory exists
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// Serve static files from the uploads directory
app.use('/uploads', express.static('uploads'));

// Sample app data
let apps = [];

// Load existing apps from the JSON file
const appsFilePath = path.join(__dirname, 'apps.json');
if (fs.existsSync(appsFilePath)) {
    const data = fs.readFileSync(appsFilePath);
    apps = JSON.parse(data);
}

// Endpoint to get all apps
app.get('/apps', (req, res) => {
    res.json(apps);
});

// Endpoint to add a new app
app.post('/apps', upload.single('apkFile'), (req, res) => {
    const { appName, appImage, appFileSize } = req.body;

    if (appName && appImage && appFileSize && req.file) {
        const newApp = {
            name: appName,
            image: appImage,
            fileSize: appFileSize,
            downloads: 0, // Initial download count
            apkUrl: `http://localhost:${PORT}/uploads/${req.file.filename}` // URL for downloading the APK
        };
        
        apps.push(newApp);
        fs.writeFileSync(appsFilePath, JSON.stringify(apps, null, 2)); // Save to file

        res.status(201).json({ message: 'App uploaded successfully', downloadUrl: newApp.apkUrl });
    } else {
        res.status(400).json({ error: 'Invalid app data' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
