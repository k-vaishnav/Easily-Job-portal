import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

const filepath =   path.resolve("public","html","mail.html");
 const data = fs.readFileSync(filepath);
// Create a transporter object using the default SMTP transport
async function SendMail(userEmail){
    var transpoter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'komalvaishnav2812@gmail.com',
            pass:'yeurnkqlihbaduqb'
        }
    });
    const mailOptions = {
        from: 'komalvaishnav2812@gmail.com',
        to: userEmail,
        subject: 'Application received',
        html:data
    }
    try{
        const result = await transpoter.sendMail(mailOptions);
        console.log("Email sent successfully",result.response);
      }
      catch(error){
          console.log('Error occurred while sending email',error);
      }
  
}
export default SendMail;