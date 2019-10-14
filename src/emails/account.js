const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    To: email,
    from: "yg123yash@gmail.com",
    subject: "Thanks For Joining In",
    text: `Welcome to the app ${name},let me know how you get along with the app`
    //html:'' //if you wanna send html  in email
  });
};

const sendCancellationEmail = (email, name) => {
  sgMail.send({
    To: email,
    from: "yg123yash@gmail.com",
    subject: "Your Cancellation Has Been Completed",
    text: `Hope We Will See You Again ${name}`
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail
};
