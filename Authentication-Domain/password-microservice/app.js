const express = require('express');
const cors = require('cors');  
const PasswordController = require('./controllers/passwordController');
const config = require('./config/config');

const app = express();

app.use(cors());

app.get('/generate-password', PasswordController.generatePassword);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});