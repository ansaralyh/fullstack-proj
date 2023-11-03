const nodemailer = require('nodemailer')
const   mailgen  = require('mailgen')
const ENV = require('../config.js')



let nodeConfig = {
    // host: "smtp.forwardemail.net",
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'pauline.crist90@ethereal.email',
        pass: 'E8xcwbZAwr6awnEh2a'
  }
}

let transporter = nodemailer.createTransport(nodeConfig);

let mailgenerator = new mailgen({
    theme: "default",
    product : {
        name:"Mailgen",
        link:"https://mailgen.js/"
    }
})

exports.registerMail = async (req,res) => {
    const { username, userEmail, text, subject} = req.body;
    // body of the email


    var email = {
        body:{
            name : username,
            intro : "Hello this is WAPAL SHOGO ",
            outro: "If required any help, just sent an email"
        }
    }

    let emailBody = mailgenerator.generate(email);

    let messege = {
        from:ENV.EMAIL,
        to:userEmail,
        subject: subject || "'signup successful",
        html:emailBody
    }

    // to send mai

    transporter.sendMail(messege)
    .then(()=> {
        return res.status(200).send({msg:"You should receive an email from us"})
    }) 
    .catch(error => res.status(500).send({error} ))
}