const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const multiparty = require('multiparty');
require('dotenv').config();

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.static(`${__dirname}/public`));

const PORT = process.env.PORT || 5000;
//make the contact page the the first page on the app
app.use('/public', express.static(process.cwd() + '/public'));

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', //replace with your email provider
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

app.post('/send', (req, res) => {
  //1.
  let form = new multiparty.Form();
  let data = {};
  form.parse(req, function (err, fields) {
    console.log(fields);
    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();
    });
    console.log(data);
    //2. You can configure the object however you want
    const mail = {
      from: `${data.name} <${data.email}>`,
      to: process.env.EMAIL,
      subject: data.subject,
      text: `${data.name} <${data.email}> \n${data.message}`,
    };

    //3.
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send('Something went wrong.');
      } else {
        res.status(200).send('Email successfully sent to recipient!');
      }
    });
  });
});

app.route('/').get(function (req, res) {
  res.sendFile(process.cwd() + '/public/index.html');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

// POST route from contact form
// app.post('/contact', (req, res) => {
//   // Instantiate the SMTP server
//   const smtpTrans = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true,
//     auth: {
//       user: process.env.EMAIL,
//       pass: process.env.PASS,
//     },
//   });

//   // Specify what the email will look like
//   const mailOpts = {
//     from: 'Your sender info here', // This is ignored by Gmail
//     to: process.env.EMAIL,
//     subject: 'New message from contact form at tylerkrys.ca',
//     text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`,
//   };

//   // Attempt to send the email
//   smtpTrans.sendMail(mailOpts, (error, response) => {
//     if (error) {
//       res.render('contact-failure'); // Show a page indicating failure
//     } else {
//       res.render('contact-success'); // Show a page indicating success
//     }
//   });
// });
