var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'gogreen.hackduke@gmail.com',
        pass: 'hackduke2018'
    }
});


module.exports = {

    sendEmail: function(emailAddress) {

        message = "Hello friend, \n" + "\n" + "Your Go Green Score has been updated.";
        var mailOptions = {
            from: 'gogreen.hackduke@gmail.com',
            to: 'kbisht@ncsu.edu',
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
