const express = require('express');
const multer = require('multer');

const { sendEmails } = require('../controllers/emailController');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.single('resume'), sendEmails);

module.exports = router;