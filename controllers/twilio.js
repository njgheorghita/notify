exports.text = async (phone, message) => {
  // Twilio Credentials
  const accountSid = process.env.TWILIO_SID;
  const authToken = process.env.TWILIO_TOKEN;

  // require the Twilio module and create a REST client
  const client = require('twilio')(accountSid, authToken);

  client.messages
	.create({
	  to: phone,
	  from: '+18162031038',
	  body: message
	})
	.then(message => console.log(message.sid));
}
