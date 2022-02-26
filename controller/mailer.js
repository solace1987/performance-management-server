import config from "../config.js";
import nodemailer from "nodemailer";

const sendMailer = (name, surname, nextaccesor, unit, receiver1, receiver2) => {
  const email = `<div class="m_-3506188800443199890wrapper" style="background:#ffffff;background-color:#ffffff;margin:0px auto;border-radius:12px;max-width:480px">
  <font color="#888888">
      </font><font color="#888888">
    </font><font color="#888888">
  </font><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;border-radius:12px">
    <tbody>
      <tr>
        <td style="direction:ltr;font-size:0px;padding:0;text-align:center">
          
          <div class="m_-3506188800443199890main-section" style="margin:0px auto;max-width:500px">
            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%">
              <tbody>
                <tr>
                  <td style="direction:ltr;font-size:0px;padding:0;padding-bottom:32px;padding-left:20px;padding-right:20px;padding-top:48px;text-align:center">
                    
                    <div class="m_-3506188800443199890mj-column-per-100" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%">
                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                        <tbody>
                          <tr>
                            <td style="vertical-align:top;padding:0">
                              <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                <tbody>
                                  <tr>
                                    <td align="center" class="m_-3506188800443199890h1 m_-3506188800443199890fw500 m_-3506188800443199890blue-dark m_-3506188800443199890center" style="font-size:0px;padding:0;word-break:break-word">
                                      <div style="font-family:Helvetica,Arial,sans-serif;font-size:13px;line-height:1;text-align:center;color:#000000">
                                        <h1 class="m_-3506188800443199890h1 m_-3506188800443199890fw500 m_-3506188800443199890blue-dark m_-3506188800443199890center">${name} ${surname}  Submited Scorecard</h1>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" class="m_-3506188800443199890p m_-3506188800443199890fw500 m_-3506188800443199890blue-dark" style="font-size:0px;padding:0;padding-top:20px;word-break:break-word">
                                      <div style="font-family:Helvetica,Arial,sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000">
                                        <p class="m_-3506188800443199890p m_-3506188800443199890fw500 m_-3506188800443199890blue-dark"> Score card has been submitted by ${name} ${surname} Of ${unit} Unit kindly login to evaluate as ${nextaccesor} under the ${nextaccesor} score column </p>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="center" class="m_-3506188800443199890button" style="font-size:0px;padding:0;padding-top:32px;word-break:break-word">
                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;width:100%;line-height:100%">
                                        <tbody>
                                          <tr>
                                            <td align="center" bgcolor="#0C6CF2" role="presentation" style="border:none;border-radius:8px;font-style:normal;height:48px;background:#0c6cf2" valign="middle">
                                              <a href="http://192.168.88.86:3000/" style="display:inline-block;background:#0c6cf2;color:#ffffff;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-style:normal;font-weight:600;line-height:150%;margin:0;text-decoration:none;text-transform:none;padding:0 15px;border-radius:8px" target="_blank" > Assess Him </a>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" class="m_-3506188800443199890p m_-3506188800443199890fw500 m_-3506188800443199890blue-dark" style="font-size:0px;padding:0;padding-top:16px;word-break:break-word">
                                      <div style="font-family:Helvetica,Arial,sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000">
                                        <p class="m_-3506188800443199890p m_-3506188800443199890fw500 m_-3506188800443199890blue-dark">Thank you </p>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div style="margin:0px auto;max-width:480px">
            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%">
              <tbody>
                <tr>
                  <td style="direction:ltr;font-size:0px;padding:0;padding-bottom:32px;text-align:center">
                    
                    <div class="m_-3506188800443199890mj-column-per-100" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%">
                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                        <tbody>
                          <tr>
                            <td style="vertical-align:top;padding:0">
                              <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                <tbody>
                                  <tr>
                                    <td align="center" style="font-size:0px;padding:0;word-break:break-word">
                                      <p style="border-top:solid 1px #eeeeee;font-size:1px;margin:0px auto;width:100%">
                                      </p>
                                      
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div style="margin:0px auto;max-width:480px">
            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%">
              <tbody>
                <tr>
                  <td style="direction:ltr;font-size:0px;padding:0;padding-bottom:15px;padding-left:20px;padding-right:20px;text-align:center">
                    
                    <div class="m_-3506188800443199890mj-column-per-100" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%">
                      
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div style="margin:0px auto;max-width:480px">
            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%">
              <tbody>
                <tr>
                  <td style="direction:ltr;font-size:0px;padding:0;padding-bottom:20px;padding-left:50px;padding-right:50px;text-align:center">
                    
                  
                    
                    <div class="m_-3506188800443199890mj-column-per-50" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%">
                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                        <tbody>
                          <tr>
                            <td style="vertical-align:top;padding:0;padding-right:5px;padding-bottom:5px;padding-left:5px">
                              <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                <tbody>
                                  <tr>
                                    <td align="center" style="font-size:0px;padding:0;word-break:break-word">
                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px">
                                        <tbody>
                                          <tr>
                                            
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div style="margin:0px auto;max-width:480px">
            <font color="#888888">
                </font><font color="#888888">
              </font><font color="#888888">
            </font><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%">
              <tbody>
                <tr>
                  <td style="direction:ltr;font-size:0px;padding:0;padding-bottom:50px;padding-left:20px;padding-right:20px;text-align:center">
                    
                    <div class="m_-3506188800443199890mj-column-px-300" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%">
                      <font color="#888888">
                          </font><font color="#888888">
                        </font><font color="#888888">
                      </font><table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                        <tbody>
                          <tr>
                            <td style="vertical-align:top;padding:0">
                              <font color="#888888">
                                  </font><font color="#888888">
                                </font><font color="#888888">
                              </font><table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                <tbody>
                                  <tr>
                                    <td align="left" class="m_-3506188800443199890h2 m_-3506188800443199890center m_-3506188800443199890gray m_-3506188800443199890fw500" style="font-size:0px;padding:0;word-break:break-word">
                                      
                            </font></td></tr></tbody></table><font color="#888888">
                    </font></div><font color="#888888">
                    
                  </font></td></tr></tbody></table><font color="#888888">
          </font></div><font color="#888888">
          
        </font></td></tr></tbody></table><font color="#888888">
</font></div>`;
  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    //let testAccount = await nodemailer.createTestAccount();
    const accessors = (receiver2)=>{
      return (receiver2 =='francesetafo@globalplusonline.com' || receiver2===undefined)? "":'francesetafo@globalplusonline.com';
    }
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: config.smptpServer,
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: config.username, // generated ethereal user
        pass: config.password, // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Performance App" <webservices@globalplusonline.com>', // sender address
      to: receiver1, // list of receivers
      cc:accessors,
      subject: `${name} Scorecard ✨` ,// Subject line
      html: email, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
  main().catch(console.error);
};

export { sendMailer };
