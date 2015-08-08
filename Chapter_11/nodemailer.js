var credentials = require('./credentials');
var emailService = require('./lib/email')(credentials);

/******
 * Error issue:
 * NODE_TLS_REJECT_UNAUTHORIZED
 * http://stackoverflow.com/questions/10888610/ignore-invalid-self-signed-ssl-certificate-in-node-js-with-https-request
 ******/
emailService.send('k9114658@gmail.com', 'Hello, test', 'Hello, test');