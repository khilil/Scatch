// middleware/upload.js
const multer = require('multer');

// If you want to access file.buffer
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = upload;
