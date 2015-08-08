var nodemailer = require('nodemailer');

module.exports = function (credentials) {
  var mailTransport = nodemailer.createTransport({
    service: 'Yahoo',
    auth: {
      user: credentials.yahoo_mail.user,
      pass: credentials.yahoo_mail.pass
    }
  });

  var from = '"TerryLee" <k9114658@yahoo.com.tw>';
  var errorRecipent = 'k9114658@gmail.com';

  return {
    send: function (to, subj, body) {
      mailTransport.sendMail({
        from: from,
        to: to,
        subject: subj,
        html: body,
        generateTextFromHtml: true
      }, function (err, info) {
        if (err) { return console.error('Unable to send mail: ' + err); }
        console.log('Message Send: ' + info);
        mailTransport.close();
      });
    },
    emailError: function () {

    }
  }
};