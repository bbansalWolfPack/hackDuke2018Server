var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'gogreen.hackduke@gmail.com',
        pass: 'hackduke2018'
    }
});


module.exports = {
    sendEmail: function(emailAddress, firstName, oldScore, newScore) {
        let fixedMessage = `Hello ${firstName}, \n\n Thank you for shopping with us. \n\n`;
        let newUserSignUp = `Welcome to our community, we hope you will keep going Go Green! \n As a token of appreciation, we have given you a Go Green score of 50 to begin with!`;
        let goodScoreMessage = `Your Go Green score has been increased by ${newScore - oldScore}. Keep loving mother nature and enjoy discounts at our partnered stores for your good deeds`;
        let badScoreMessage = `Your Go Green score has been decreased by ${oldScore - newScore}. Please use e-bills and avoid using plastic bags at the stores. You are also missing on amazing discounts at our stores`;
        if (newScore > oldScore) {
          message = `${fixedMessage} ${goodScoreMessage} \n Regards \n Team Go Green`;
        } else if (newScore < oldScore) {
          message = `${fixedMessage} ${badScoreMessage} \n Regards \n Team Go Green`;
        } else {
          message = `${fixedMessage} ${newUserSignUp} \n Regards \n Team Go Green`;
        }
        var mailOptions = {
            from: 'gogreen.hackduke@gmail.com',
            to: emailAddress,
            subject: 'Go Green Score Update',
            text: message
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }

}
