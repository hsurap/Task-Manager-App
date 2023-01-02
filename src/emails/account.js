const sgMail=require('@sendgrid/mail')
// const sendgridAPIKey="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"

//sgMail.setApiKey(sendgridAPIKey)
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail=(email,name)=>{
    sgMail.send({
        to:email,
        from:'pparush_be20@thapar.edu',
        subject:'Thanks for Joining in',
        text:`welcome to the app, ${name}. Let me know how get along with the app`
    })
}

const sendCancelationEmail=(email,name)=>{
    sgMail.send({
        to:email,
        from:'pparush_be20@thapar.edu',
        subject:'Sorry to see you go',
        text:`Good Bye, ${name}. I hope to see tou back sometime soon`
    })
}

module.exports={
    sendWelcomeEmail:sendWelcomeEmail,
    sendCancelationEmail:sendCancelationEmail
}

// const message={
//     to:'parush786garg@gmail.com',
//     from:'parush786garg@gmail.com',
//     subject:'this is my first creation',
//     text:'i hope this one actually get to you'
// };
// sgMail.send(message).then(()=>{
//     console.log('mail sent');
// }).catch((err)=>{
//     console.log(err.message);
// })
