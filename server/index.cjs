const express = require('express');
const multer = require('multer');
const aesjs = require('aes-js');
const { PinataSDK } = require('pinata-web3');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { Blob } = require('buffer');
//const mime = require('mime-types');
const path = require('path');
const fs  = require('fs');
require('dotenv').config();

const PINATA_JWT = process.env.pinataJwt;
const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Pinata setup 
const pinata = new PinataSDK({ 
   pinataJwt: PINATA_JWT,
   pinataGateway: process.env.PINATA_GATEWAY,
});
// Connect to MongoDB
const uri = process.env.MONGODB_URI;
mongoose.connect(uri)
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

// Define User Schema
const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    registeredAt: { type: String },
    loginTimestamps:{type: [String], default: [] },
    files: [{ filename: String, hash: String, iv: String, key: String}]
});

const User = mongoose.model('User', userSchema);

// Registration Route
app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if email already exists 
        const existingUser = await User.findOne({ email });
        if (existingUser) { 
            return res.status(400).send('Email is already registered'); 
        }
        //Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const registeredAt = new Date().toLocaleString();
        const newUser = new User({ 
          email, 
          password: hashedPassword,
          registeredAt: registeredAt           
        });
        await newUser.save();
        res.status(201).send('User registered successfully');
        
    } catch (error) {
        res.status(500).send('Error registering user');
    }
});


// Login Route
app.post('/login', async (req, res) => {
    const { email, password, token } = req.body;

  try {
    const captchaResponse = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      null,
      {
        params: {
          secret: `${process.env.RECAPTCHA_SECRET}`,
          response: token,
        },
      }
    );

      if (!captchaResponse.data.success) {
        return res.status(400).send('CAPTCHA verification failed');
      }
  
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).send('Invalid email or password');
      }
  
      // Compare the entered password with the hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send('Invalid email or password');
      }
  
      // Password matches, proceed with login
      const loginTimestamp = new Date().toLocaleString();
      user.loginTimestamps.push(loginTimestamp);
      await user.save();

      res.status(200).send('Login successful');
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).send('Error logging in user');
    }
  });
  

// Get User Profile Route
app.get('/profile', async (req, res) => {
  const { email } = req.query;

  try {
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(404).send('User not found');
      }

      res.status(200).send({
          email: user.email,
          registeredAt: user.registeredAt,
          loginTimestamps: user.loginTimestamps,
          files: user.files,
      });
  } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).send('Error fetching user profile');
  }
});

// Configure Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

//Upload Route
app.post('/upload', upload.single('file'), async (req, res) => {
  const { email } = req.body;
  const file = req.file;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Generate AES key and IV
    const aesSecretKey = process.env.AES_SECRET_KEY;
    const key = aesjs.utils.utf8.toBytes(aesSecretKey); // 16-byte key
    const iv = crypto.randomBytes(16); // Generate a new IV for each file upload

    // Encrypt the file
    const aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);
    const paddedFile = aesjs.padding.pkcs7.pad(file.buffer);
    const encryptedBytes = aesCbc.encrypt(paddedFile);

    // Convert encryptedBytes to a Blob
    const blob = new Blob([encryptedBytes], { type: 'application/octet-stream' });

    // Store the encrypted file in Pinata
    const result = await pinata.upload.file(blob);

    // Save the file reference in MongoDB
    user.files.push({
      filename: file.originalname,
      hash: result.IpfsHash,
      iv: aesjs.utils.hex.fromBytes(iv),
      key: aesjs.utils.hex.fromBytes(key)
    });

    await user.save();
    res.status(200).send('File uploaded and encrypted successfully');
    
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).send('Error uploading file');
  }
});

// Decrypt Route
app.post('/decrypt', async (req, res) => {
  const { email, fileId } = req.body;

  try {
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(404).send('User not found');
      }

      // Find the file by ID
      const file = user.files.id(fileId);
      if (!file) {
          return res.status(404).send('File not found');
      }

      // Retrieve the encrypted file from IPFS using Axios
      const response = await axios.get(
          `https://${process.env.PINATA_GATEWAY}/ipfs/${file.hash}`, 
          { responseType: 'arraybuffer' }
      );
      const encryptedBytes = new Uint8Array(response.data);

      // Convert key and IV from hex to bytes
      const aesKey = aesjs.utils.hex.toBytes(file.key);
      const iv = aesjs.utils.hex.toBytes(file.iv);

      // Initialize AES CBC decryption
      const aesCbc = new aesjs.ModeOfOperation.cbc(aesKey, iv);

      // Decrypt the file
      const decryptedBytes = aesCbc.decrypt(encryptedBytes);

      // Remove padding
      const decryptedBytesUnpadded = aesjs.padding.pkcs7.strip(decryptedBytes);
      
      const downloadDir = path.join(require('os').homedir(), 'Downloads');
      const downloadPath = path.join(downloadDir, file.filename);
      
      fs.writeFileSync(downloadPath, Buffer.from(decryptedBytesUnpadded));

      res.download(downloadPath, file.filename, (err) => {
        if(err){
          console.log('Error downloading file:', err);
        }
      });

  } catch (error) {
      console.error('Error decrypting file:', error);
      res.status(500).send('Error decrypting file');
  }
});

app.post('/share', async(req, res) => {
  const {email ,recipientEmail, fileId }  = req.body;

  try{

    const sender = await User.findOne({ email });
    const recipient = await User.findOne({email: recipientEmail});
    if(!sender || !recipient){
      return res.status(500).send('Sender or Recipient not found');
    }
    const file = sender.files.id(fileId);
    if(!file){
      return res.status(404).send('File not found');
    }

    recipient.files.push({
      filename: file.filename,
      hash: file.hash,
      iv: file.iv,
      key: file.key,
    });

    await recipient.save();
    res.status(200).send('File shared successfully');

  } catch (error) {
     console.log('Error sharing file:', error);
     res.status(500).send('Error sharing file');
  }
});

// Start Server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
