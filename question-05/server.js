const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8005;
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Question 5: Twilio SMS API

app.get('/comp-4537/project-exercises/question_five', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'question_five.html'));
});

app.post('/comp-4537/project-exercises/question_five', (req, res) => {
  const { phone, message } = req.body;

  client.messages
    .create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    })
    .then((message) => res.send(`Message sent! ID: ${message.sid}`))
    .catch((error) => res.status(500).send(`Error: ${error.message}`));
});

app.listen(port, () => {
  console.log(`Server running at ${process.env.DOMAIN}:${port}`);
});

// Question 6: Voice Recognition API (Google Cloud Speech-to-Text)

app.get('/comp-4537/project-exercises/question_six', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'question_six.html'));
});

