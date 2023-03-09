const express = require('express');
const { encryptData, decryptData } = require('./utils/hash');
const userController = require("./controllers/userController")
const upload = require('./utils/upload');
const { verifyToken } = require('./middlewares/authMiddleware');
const app = express();

app.use(express.json())

app.post('/upload', upload.single('file'), function(req, res) {
  res.send('File uploaded successfully!');
});

app.post('/hash', function(req, res) {
    let x = encryptData(req.body.hash, "kode")
    let y = decryptData(x, 'kode')
    res.json({
        x, y
    });
});

app.post('/register', userController.signUp);
app.post('/login', userController.login);
app.get('/me', verifyToken, userController.me);

  
  

app.listen(3000, function() {
  console.log('Server is running on port 3000');
});